'use client';

import { MouseEvent, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { a, useSpring, config } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

import styles from './index.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const sheetHeight = parseInt(styles.sheetHeight);
const itemHeight = parseInt(styles.itemHeight);
const bottomPadding = 60; // 네이버, 카카오 등 인앱 브라우저 주소창에 밀려 안 보이는 것 방지

type itemValue = string | number;

/** Simple BottomSheet
 *  @use 일반 컴포넌트 or 병렬 모달 경로(only. 단순 목록 선택만)
 *  @notice 단순 선택이 아닌 복잡한 형태의 경우, 다른 컴포넌트 필요
 */
function BottomSheet({
  items,
  autoOpen,
  onClickItem,
  openButtonName = false,
  closeButtonName,
}: {
  items: itemValue[];
  autoOpen?: boolean;
  onClickItem?: (value: itemValue) => void;
  openButtonName?: string | false;
  closeButtonName?: string;
}) {
  // items + closeButton(+1)
  // bottomPadding = 네이버, 카카오 등 인앱 브라우저 주소창에 밀려 안 보이는 것 방지
  // const height =
  //   (items.length + 1) * itemHeight +
  //   (!!window && window?.innerWidth < 500 ? bottomPadding : 0);
  const isSeparateItem = items.length > 6;
  const itemsHeightCount = isSeparateItem
    ? items.length % 2 === 0
      ? items.length / 2
      : items.length / 2 + 1
    : items.length;
  const height =
    (itemsHeightCount + 1) * itemHeight +
    (!!window && window?.innerWidth < 500 ? bottomPadding : 0);

  const router = useRouter();

  const [{ y }, api] = useSpring(() => ({ y: height }));

  const open = useCallback(
    ({ cancelable }: MouseEvent<HTMLDivElement> | { cancelable: boolean }) => {
      api.start({
        y: 0,
        immediate: false,
        config: cancelable ? config.wobbly : config.stiff,
      });
    },
    [api]
  );

  const close = (
    velocity = 0,
    buttonType?: 'close',
    value?: string | number
  ) => {
    api.start({
      y: height,
      immediate: false,
      config: { ...config.stiff, velocity },
      onRest: () => {
        if (buttonType === 'close') {
          router.back();
          return;
        }

        if (!onClickItem || !value) return;

        onClickItem(value);
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
          ? close(vy)
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

  // next/Link를 이용한 병렬 경로일 경우
  useEffect(() => {
    if (autoOpen !== false) open({ cancelable: false });

    // eslint-disable-next-line
  }, [autoOpen]);

  const display = y.to(py => (py < height ? 'block' : 'none'));

  return (
    <>
      {openButtonName !== false && (
        <div onClick={open}>{openButtonName || 'BottomSheet Button NAME'}</div>
      )}

      <a.div
        {...bind()}
        style={{
          display,
          bottom: `calc(-100% + ${height - sheetHeight}px)`,
          y,
        }}
        className={cx('sheet')}
      >
        <div className={cx('items', { double: isSeparateItem })}>
          {items.map(value => (
            <button
              key={'select_' + value}
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();

                close(undefined, undefined, value);
              }}
              className={cx('item')}
            >
              {value}
            </button>
          ))}
        </div>

        <div className={cx('items')}>
          <button
            key={'select_close'}
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();

              close(undefined, 'close');
            }}
            className={cx('item', 'close')}
          >
            {closeButtonName || '닫기'}
          </button>
        </div>
      </a.div>
    </>
  );
}

export default BottomSheet;
