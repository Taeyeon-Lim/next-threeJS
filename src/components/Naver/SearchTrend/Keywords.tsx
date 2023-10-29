'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { newSearchParams } from '@utils/navigationUtils';
import { keywordFilter } from './variables';

import { BsPlusCircle, BsXCircle } from 'react-icons/bs';

import styles from './keywords.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function Keywords({
  searchParams,
  isReplace = false,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  isReplace?: boolean;
}) {
  const keywordOptions = keywordFilter(searchParams);

  const queryString = newSearchParams(searchParams, ['cursor']).toString();
  const nextSearchParams = (href: string) => {
    return queryString ? `${href}?${queryString}` : href;
  };

  const pathname = usePathname();
  const inactiveLink = pathname.includes('/Keyword');

  const overkeywordFive = keywordOptions.length >= 5;

  return (
    <div className={cx('keywords-wrap')}>
      <div className={cx('keywords', { exceed: overkeywordFive })}>
        {keywordOptions.length > 0 &&
        JSON.stringify(keywordOptions) !== '[]' ? (
          <>
            {keywordOptions.map(param => {
              const [key, value] = param;
              if (!key || !value) return;

              return (
                <Link
                  key={key}
                  href={
                    inactiveLink
                      ? ''
                      : nextSearchParams('/Naver/SearchTrend/Keyword') +
                        '&cursor=' +
                        key.toString()
                  }
                  replace={isReplace}
                >
                  {key}
                </Link>
              );
            })}
          </>
        ) : (
          <Link
            href={
              inactiveLink
                ? ''
                : nextSearchParams('/Naver/SearchTrend/Keyword') +
                  (queryString
                    ? '&cursor=네이버'
                    : '?cursor=네이버&네이버=네이버')
            }
            replace={isReplace}
          >
            네이버
          </Link>
        )}
      </div>

      {overkeywordFive ? (
        <Link
          href={'/Naver/SearchTrend'}
          className={cx('add-keyword_button', 'exceed')}
          replace={isReplace}
        >
          <BsXCircle />
          <span>초기화</span>
        </Link>
      ) : (
        <Link
          href={
            inactiveLink ? '' : nextSearchParams('/Naver/SearchTrend/Keyword')
          }
          className={cx('add-keyword_button')}
          replace={isReplace}
        >
          <BsPlusCircle />
          <span>그룹</span>
        </Link>
      )}
    </div>
  );
}

export default Keywords;
