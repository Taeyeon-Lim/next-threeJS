'use client';

import { useState, useEffect, MouseEvent } from 'react';
import Link from 'next/link';

import { CgPushChevronLeft, CgPushChevronRight } from 'react-icons/cg';

import styles from './navigator.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

import { NAVIGATOR_LINKS } from 'src/utils/env';

const Navigator = () => {
  const [isOpenNavi, setIsOpenNavi] = useState(false);

  const handleIsOpenNavi = () => setIsOpenNavi(prev => !prev);

  const onCloseModal = (e: MouseEvent<HTMLDivElement>) =>
    e.target === e.currentTarget && setIsOpenNavi(false);

  useEffect(() => {
    const body = document.querySelector('body') as HTMLElement;

    if (isOpenNavi) {
      body.style.overflow = 'hidden';
    } else {
      body.style.removeProperty('overflow');
    }
  }, [isOpenNavi]);

  if (isOpenNavi) {
    return (
      <nav className={cx('navi-wrapper')} onClick={onCloseModal}>
        <ol className={cx('navi')}>
          {NAVIGATOR_LINKS?.map(({ path, name }) => {
            if (path === '/') {
              return (
                <li
                  key={'nav_' + path}
                  className={cx('home')}
                  onClick={handleIsOpenNavi}
                >
                  <Link href={'/'}>ALL</Link>

                  <CgPushChevronLeft />
                </li>
              );
            } else {
              return (
                <li key={'nav_' + path} onClick={handleIsOpenNavi}>
                  <Link href={path}>{name}</Link>
                </li>
              );
            }
          })}
        </ol>
      </nav>
    );
  }

  return (
    <nav className={cx('navi-wait')}>
      <CgPushChevronRight onClick={handleIsOpenNavi} />
    </nav>
  );
};

export default Navigator;
