'use client';

import { useState, useEffect, MouseEvent, Fragment } from 'react';
import Link from 'next/link';

import { CgPushChevronLeft, CgPushChevronRight } from 'react-icons/cg';

import styles from './index.module.scss';
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
          {NAVIGATOR_LINKS?.map(({ path, name, subPaths }) => {
            if (path === '/') {
              return (
                <li
                  key={'nav_/home'}
                  className={cx('home')}
                  onClick={handleIsOpenNavi}
                >
                  <Link href={'/'}>All</Link>

                  <CgPushChevronLeft />
                </li>
              );
            } else {
              return (
                <Fragment key={'nav_' + path}>
                  {/* "/Naver" 경로 완성 후, 제거 */}
                  {path !== '/Naver' && (
                    <li onClick={handleIsOpenNavi}>
                      <Link href={path}>{name}</Link>
                    </li>
                  )}

                  {!!subPaths &&
                    subPaths.map(({ path: subPath, name: subName }) => (
                      <li
                        key={'subNav_' + path + subPath}
                        onClick={handleIsOpenNavi}
                      >
                        <Link href={path + subPath} className={cx('sub')}>
                          N.{subName}
                        </Link>
                      </li>
                    ))}
                </Fragment>
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
