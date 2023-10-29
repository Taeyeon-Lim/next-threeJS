'use client';

import {
  useState,
  useEffect,
  MouseEvent,
  useCallback,
  ChangeEventHandler,
  useRef,
} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useDrag } from '@use-gesture/react';
import { a, useSpring, config } from '@react-spring/web';
import { useUpdateSearchParams } from '@utils/hookUtils';

import styles from './keyword.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import { SELECT_OPTIONS_REGEX } from '@components/Naver/SearchTrend/variables';
const sheetHeight = parseInt(styles.sheetHeight);
const itemHeight = parseInt(styles.itemHeight);
const closeApplyHeight = parseInt(styles.closeApplyHeight);
// const bottomPadding = 80; // 네이버, 카카오 등 인앱 브라우저 주소창에 밀려 안 보이는 것 방지

const tagRegex = /^[ㄱ-힣a-zA-Z0-9\s,]*$/;

const initialTag: {
  searchTag: string;
  keywordTag: string;
  searchError: string;
  keywordError: string;
} = {
  searchTag: '',
  keywordTag: '',
  searchError: '',
  keywordError: '',
};

export default function Page() {
  const height = 2 * itemHeight + closeApplyHeight;
  // const height =
  //   1200 + (window && window?.innerWidth < 500 ? bottomPadding : 0);
  const searchTagRef = useRef<HTMLInputElement | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const isCursor = searchParams.get('cursor');

  const { updateSearchParam } = useUpdateSearchParams(
    null,
    'replace',
    '/Naver/SearchTrend'
  );

  const [tag, setTag] = useState(
    isCursor
      ? {
          ...initialTag,
          searchTag: isCursor,
          keywordTag: searchParams.get(isCursor) || '',
        }
      : initialTag
  );

  const onChangeTag: ChangeEventHandler<HTMLInputElement> = e => {
    const { name, value } = e.currentTarget;
    const trimValue = value.trim();

    // Reset errorMessage
    setTag(prev => ({
      ...prev,
      searchError: '',
      keywordError: '',
    }));

    // Set 'searchTag' errorMessage
    if (name === 'searchTag') {
      if (trimValue.length > 10) {
        setTag(prev => ({
          ...prev,
          searchError: '10자 내외로 입력해주세요',
        }));
        return;
      } else if (trimValue.includes(',')) {
        setTag(prev => ({
          ...prev,
          searchError: '한글, 영문, 숫자로만 입력해주세요',
        }));
        return;
      }
    }

    // Set 'keywordTag' errorMessage
    if (name === 'keywordTag') {
      if (trimValue.split(',').length > 20) {
        setTag(prev => ({
          ...prev,
          keywordError: '20단어 이하로 입력해주세요',
        }));
        return;
      } else if (trimValue.includes(',,')) {
        setTag(prev => ({
          ...prev,
          keywordError: '콤마(,) 연속 사용 불가',
        }));
        return;
      }
    }

    if (tagRegex.test(trimValue)) {
      if (isCursor && trimValue === '') {
        // 'DELETE' Warning message
        setTag(prev => ({
          ...prev,
          [name]: value,
          searchError: '적용 시, 해당 그룹은 삭제됩니다',
        }));
      } else {
        // Change new value
        setTag(prev => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      // Invalid value
      if (name === 'searchTag') {
        setTag(prev => ({
          ...prev,
          searchError: '한글, 영문, 숫자로만 입력해주세요',
        }));
      } else {
        setTag(prev => ({
          ...prev,
          keywordError: '한글, 영문, 숫자로만 입력해주세요',
        }));
      }
    }
  };

  const [{ y }, api] = useSpring(() => ({ y: height }));

  const open = useCallback(
    ({ cancelable }: MouseEvent<HTMLDivElement> | { cancelable: boolean }) => {
      api.start({
        y: 0,
        immediate: false,
        config: cancelable ? config.wobbly : config.stiff,
        onRest: () => {
          searchTagRef.current?.focus();
        },
      });
    },
    [api]
  );

  const close = (velocity = 0, onRestClose: 'cancel' | 'apply') => {
    api.start({
      y: height,
      immediate: false,
      config: { ...config.stiff, velocity },
      onRest: () => {
        if (onRestClose === 'apply') {
          const { searchTag, keywordTag } = tag;

          if (isCursor) {
            if (searchTag === '') {
              // DELETE GROUP
              updateSearchParam(null, null, ['cursor', isCursor]);
            } else {
              // UPDATE PREV GROUP
              updateSearchParam(
                searchTag,
                keywordTag,
                isCursor === searchTag ? ['cursor'] : ['cursor', isCursor]
              );
            }
          } else {
            // ADD NEW GROUP
            updateSearchParam(searchTag, keywordTag);
          }
        } else {
          router.back();
        }
      },
    });
  };

  const bind = useDrag(
    ({
      last,
      velocity: [, vy],
      direction: [, dy],
      offset: [, oy],
      cancel,
      canceled,
    }) => {
      if (oy < -70) cancel();

      if (last) {
        oy > height * 0.5 || (vy > 0.5 && dy > 0)
          ? close(vy, 'cancel')
          : open({ cancelable: canceled });
      } else api.start({ y: oy, immediate: true });
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
      // preventScroll: true, // => Bug (filterTaps 옵션과 동시 사용 시, 둘 다 작동 X)
      // preventDefault: true,
    }
  );

  const display = y.to(py => (py < height ? 'block' : 'none'));

  // Auto open
  useEffect(() => {
    if (!open) return;

    open({ cancelable: false });
  }, [open]);

  return (
    <a.form
      {...bind()}
      style={{
        display,
        bottom: `calc(-100% + ${height - sheetHeight}px)`,
        // bottom: `calc(-100% + minmax(${height - sheetHeight}px, 100%))`,
        y,
      }}
      className={cx('sheet')}
      onSubmit={e => {
        e.stopPropagation();
        e.preventDefault();

        const { searchTag, keywordTag } = tag;

        if (!searchTag && !isCursor) {
          setTag(prev => ({
            ...prev,
            searchError: '검색어를 입력하세요',
          }));

          return;
        }

        if (
          SELECT_OPTIONS_REGEX.test(searchTag) ||
          /^(view)$/i.test(searchTag)
        ) {
          setTag(prev => ({
            ...prev,
            searchError: '허용되지 않는 검색어입니다.',
          }));

          return;
        }

        if (
          keywordTag === ',' ||
          keywordTag[0] === ',' ||
          keywordTag[keywordTag.length - 1] === ','
        ) {
          setTag(prev => ({
            ...prev,
            keywordError: '처음과 끝에 콤마(,) 사용 불가능',
          }));
          return;
        }

        if (searchTag && !keywordTag) {
          setTag(prev => ({
            ...prev,
            keywordError: '추가 키워드를 입력하세요',
          }));

          return;
        }

        close(undefined, 'apply');
      }}
    >
      <div className={cx('item')}>
        <span>
          <label htmlFor='searchTag'>검색어</label>

          {tag?.searchError && <p>({tag.searchError})</p>}
        </span>

        <input
          type='text'
          id='searchTag'
          name='searchTag'
          value={tag.searchTag}
          onChange={onChangeTag}
          ref={searchTagRef}
        />
      </div>

      <div className={cx('item')}>
        <span>
          <label htmlFor='keywordTag'>추가 키워드</label>

          {tag?.keywordError && <p>{tag.keywordError}</p>}
        </span>

        <input
          type='text'
          id='keywordTag'
          name='keywordTag'
          value={tag.keywordTag}
          onChange={onChangeTag}
        />
      </div>

      <div>
        <button
          type='reset'
          key={'select_reset'}
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();

            close(undefined, 'cancel');
          }}
        >
          닫기
        </button>

        <button type='submit' key={'select_close'}>
          {isCursor && tag.searchTag === '' ? '삭제' : '적용'}
        </button>
      </div>
    </a.form>
  );
}
