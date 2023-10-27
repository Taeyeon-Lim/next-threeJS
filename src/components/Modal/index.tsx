'use client';

import {
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { useRouter } from 'next/navigation';

import styles from './index.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

function Modal({ children }: { children: ReactNode }) {
  const overlayRef = useRef(null);
  const wrapperRef = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick: MouseEventHandler = useCallback(
    e => {
      if (e.target === overlayRef.current || e.target === wrapperRef.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlayRef, wrapperRef]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <div className={cx('modal_overlay')} ref={overlayRef} onClick={onClick}>
      <div className={cx('modal_wrapper')} ref={wrapperRef}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
