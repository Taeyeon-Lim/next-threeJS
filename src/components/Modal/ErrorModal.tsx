'use client';

import { CSSProperties, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import { BsEmojiDizzy } from 'react-icons/bs';

import styles from './errorModal.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

function ErrorModal({
  title,
  errorMsg,
  pageError,
  errorButton = false,
  cancelButtonClick = false,
  children,
}: {
  pageError?: Error;
  errorMsg?: string;
  errorButton?:
    | {
        reset: () => void;
        name?: string;
        styles?: CSSProperties;
      }
    | false;
  cancelButtonClick?:
    | {
        path?: string;
        name?: string;
        isBack?: boolean;
        styles?: CSSProperties;
      }
    | false;
  title?: string;
  children?: ReactNode;
}) {
  const router = useRouter();

  return (
    <div className={cx('searchTrend-modal_error')}>
      <h2>{title || '문제가 생겼어요..!'}</h2>

      {children || (
        <>
          <BsEmojiDizzy className={cx('imoji')} />

          {errorMsg && <p>{errorMsg}</p>}

          <div className={cx('button-group')}>
            {cancelButtonClick !== false && (
              <button
                style={cancelButtonClick.styles}
                onClick={e => {
                  e.stopPropagation();

                  if (cancelButtonClick.isBack) {
                    router.back();
                    return;
                  }

                  if (cancelButtonClick.path) {
                    router.push(cancelButtonClick.path);
                  }
                }}
                className={cx('cancel')}
              >
                {cancelButtonClick?.name || '닫기'}
              </button>
            )}

            {errorButton !== false && (
              <button
                style={errorButton.styles}
                onClick={e => {
                  e.stopPropagation();

                  errorButton.reset();
                }}
              >
                {errorButton?.name || '새로고침'}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ErrorModal;
