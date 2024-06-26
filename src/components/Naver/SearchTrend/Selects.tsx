'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { newSearchParams } from '@utils/navigationUtils';

import SelectsDate from './SelectsDate';

import styles from './selects.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import { SEARCH_TREND_SELECT_OPTIONS } from './variables';

function Selects({
  searchParams,
  isReplace = false,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  isReplace?: boolean;
}) {
  const queryString = newSearchParams(searchParams, ['cursor']).toString();

  const nextSearchParams = (href: string) =>
    queryString ? `${href}?${queryString}&cursor=` : `${href}?cursor=`;

  const pathname = usePathname();
  const inactiveLink = pathname.includes('/Select') && !isReplace;

  return (
    <div className={cx('selects-wrap')}>
      <SelectsDate searchParams={searchParams} />

      <div className={cx('select-options')}>
        {SEARCH_TREND_SELECT_OPTIONS.map(option => {
          const { optionName, queryTag, queryValues } = option;
          const pageQuery = searchParams[queryTag];

          if (optionName === '시작일' || optionName === '종료일') return;

          const nextLink =
            nextSearchParams('/Naver/SearchTrend/Select') + queryTag;

          return (
            <Link
              key={optionName}
              href={nextLink}
              replace={isReplace}
              onClick={e => {
                if (inactiveLink) e.preventDefault();
              }}
            >
              {optionName === '기간' && typeof pageQuery !== 'object' ? (
                <>
                  {
                    {
                      date: '일별',
                      week: '주별',
                      month: '월별',
                    }[pageQuery || 'date']
                  }
                </>
              ) : (
                pageQuery || optionName
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Selects;
