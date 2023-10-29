import { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { getNaverSearchTrend } from '@api/external/Naver';

import { keywordFilter } from '@components/Naver/SearchTrend/variables';

import Skeleton from '@components/Skeleton';
import Selects from '@components/Naver/SearchTrend/Selects';
import Keywords from '@components/Naver/SearchTrend/Keywords';
const SearchTrend = dynamic(() => import('@components/Naver/SearchTrend'), {
  ssr: false,
  loading: () => (
    <Skeleton
      message='세계를 그리는 중..'
      backgroundColor='#10051b'
      color='#fff'
    />
  ),
});
const KeywordChart = dynamic(
  () => import('@components/Naver/SearchTrend/Chart'),
  {
    ssr: false,
    loading: () => (
      <Skeleton
        message='차트를 그리는 중..'
        backgroundColor='white'
        color='black'
      />
    ),
  }
);

import styles from './searchTrend.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export const metadata: Metadata = {
  title: 'SearchTrend',
};

const initialRequest = {
  startDate: '',
  endDate: '',
  timeUnit: 'date',
  keywordGroups: [],
  device: '',
  ages: [''],
  gender: '',
};

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const keywordOptions = keywordFilter(searchParams);

  const searchTrendData = await getNaverSearchTrend({
    ...initialRequest,
    ...searchParams,
    keywordGroups: keywordOptions.map(group => ({
      groupName: group[0],
      keywords: group[1].split(','),
    })),
  });

  return (
    <article className={cx('searchTrend')}>
      <SearchTrend data={searchTrendData} />

      {searchParams?.view && typeof searchParams?.view === 'string' ? (
        <div className={cx('searchTrend-chart')}>
          <KeywordChart
            viewKeyword={searchParams.view}
            searchTrendData={searchTrendData}
          />
        </div>
      ) : (
        <div className={cx('trend-control')}>
          <Keywords searchParams={searchParams} />
          <Selects searchParams={searchParams} />
        </div>
      )}
    </article>
  );
}
