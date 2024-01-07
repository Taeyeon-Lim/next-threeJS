'use client';

import { useState, useEffect, MouseEvent, Fragment, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { CgPushChevronLeft, CgPushChevronRight } from 'react-icons/cg';

import styles from './index.module.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

import NAVIGATOR_LINKS from '@utils/links';

const DAY = 1000 * 60 * 60 * 24;
const isNotOver30Days = (today: Date, diff: string) => {
  return (today.getTime() - new Date(diff).getTime()) / DAY < 31;
};

const Navigator = () => {
  const [today] = useState(() => new Date());
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
              👏 Who am i?
            </Link>

            <CgPushChevronLeft onClick={handleIsOpenNavi} />
          </li>

          {NAVIGATOR_LINKS?.map(({ path, name, subPaths, createdByUpdate }) => {
            // 1. [0]번 index 날짜가 30일이 지나지 않으면 `NEW`
            const isNewPath = isNotOver30Days(today, createdByUpdate[0]);

            // 2. 1의 경우가 아니면서, [-1]번 index 날짜가 30일 지나지 않으면 `UP`
            const isUpdatePath =
              createdByUpdate.length > 1 &&
              isNotOver30Days(today, createdByUpdate.slice(-1)[0]);

            return (
              <Fragment key={'nav_' + path}>
                {/* "/Naver" 경로 완성 후, 제거 */}
                {path !== '/Naver' && (
                  <li onClick={handleIsOpenNavi}>
                    <Link
                      href={path}
                      className={cx({ current: pathname === path })}
                      onClick={e => {
                        if (pathname === path) {
                          e.preventDefault();
                          e.stopPropagation();
                        }
                      }}
                    >
                      {name}
                      <span
                        className={cx({
                          update: isNewPath || isUpdatePath,
                          new: isNewPath,
                        })}
                      />
                    </Link>
                  </li>
                )}

                {subPaths?.map(
                  ({
                    path: subPath,
                    name: subName,
                    createdByUpdate: subUpdate,
                  }) => {
                    const isNewSubPath = isNotOver30Days(today, subUpdate[0]);
                    const isUpdateSubPath =
                      subUpdate.length > 1 &&
                      isNotOver30Days(today, subUpdate.slice(-1)[0]);

                    return (
                      <li
                        key={'subNav_' + path + subPath}
                        onClick={handleIsOpenNavi}
                      >
                        <Link
                          href={path + subPath}
                          className={cx('sub', {
                            current: pathname === path + subPath,
                          })}
                          onClick={e => {
                            if (pathname === path + subPath) {
                              e.preventDefault();
                              e.stopPropagation();
                            }
                          }}
                        >
                          <span>{`${path.slice(1)} - ${subName}`}</span>
                          <span
                            className={cx({
                              update: isNewSubPath || isUpdateSubPath,
                              new: isNewSubPath,
                            })}
                          />
                        </Link>
                      </li>
                    );
                  }
                )}
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
