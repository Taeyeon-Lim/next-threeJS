'use client';

import { useState, useEffect, MouseEvent, Fragment, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { CgPushChevronLeft, CgPushChevronRight } from 'react-icons/cg';

import styles from './index.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

import NAVIGATOR_LINKS from '@utils/links';

const Navigator = () => {
  const [isOpenNavi, setIsOpenNavi] = useState(false);

  const handleIsOpenNavi = useCallback(() => setIsOpenNavi(prev => !prev), []);

  const onCloseModal = useCallback(
    (e: MouseEvent<HTMLDivElement>) =>
      e.target === e.currentTarget && setIsOpenNavi(false),
    []
  );

  useEffect(() => {
    const body = document.querySelector('body') as HTMLElement;

    if (isOpenNavi) {
      body.style.overflow = 'hidden';
    } else {
      body.style.removeProperty('overflow');
    }
  }, [isOpenNavi]);

  const pathname = usePathname();

  if (isOpenNavi) {
    return (
      <nav className={cx('navi-wrapper')} onClick={onCloseModal}>
        <ol className={cx('navi')}>
          <li className={cx('portfolio')}>
            <Link
              href={'https://tyeon-portfolio.vercel.app'}
              target='_blank'
              // noopener (기존 window 위변조 방지)
              // noreferrer (HTTP referer header 생략, 참조자 정보 전달 방지)
              rel='noopener'
            >
              👏 Who I am?
            </Link>

            <CgPushChevronLeft />
          </li>

          {NAVIGATOR_LINKS?.map(({ path, name, subPaths }) => {
            const subPath_prefix = path.slice(1, 2) + '.';

            return (
              <Fragment key={'nav_' + path}>
                {/* "/Naver" 경로 완성 후, 제거 */}
                {path !== '/Naver' && (
                  <li onClick={handleIsOpenNavi}>
                    <Link
                      href={path}
                      className={cx({ current: pathname === path })}
                      onClick={e => pathname === path && e.stopPropagation()}
                    >
                      {name}
                    </Link>
                  </li>
                )}

                {subPaths?.map(({ path: subPath, name: subName }) => (
                  <li
                    key={'subNav_' + path + subPath}
                    onClick={handleIsOpenNavi}
                  >
                    <Link
                      href={path + subPath}
                      className={cx('sub', {
                        current: pathname === path + subPath,
                      })}
                      onClick={e =>
                        pathname === path + subPath && e.stopPropagation()
                      }
                    >
                      <span>{subPath_prefix}</span>
                      <span>{subName}</span>
                    </Link>
                  </li>
                ))}
              </Fragment>
            );
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
