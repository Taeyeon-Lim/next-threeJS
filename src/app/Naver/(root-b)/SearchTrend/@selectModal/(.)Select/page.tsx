'use client';

import { useSearchParams } from 'next/navigation';

import { useUpdateSearchParams } from '@utils/hookUtils';

import BottomSheet from '@components/BottomSheet';

import { SEARCH_TREND_SELECT_OPTIONS } from '@components/Naver/SearchTrend/variables';

export default function Page() {
  const queryString = useSearchParams();

  const currentOption = SEARCH_TREND_SELECT_OPTIONS.find(
    option => option.queryTag === queryString.get('cursor')
  );

  if (!currentOption || JSON.stringify(currentOption) === '{}') {
    throw new Error('Naver Search Trend Error: Invalid Query in Select Modal');
  }

  const { updateSearchParam } = useUpdateSearchParams(
    null,
    'replace',
    '/Naver/SearchTrend'
  );

  const { queryValues, queryTag, optionName } = currentOption;

  return (
    <BottomSheet
      items={queryValues}
      onClickItem={itemValue => {
        if (
          (queryTag === 'timeUnit' && itemValue === 'date') ||
          (queryTag === 'device' && itemValue === '기기') ||
          (queryTag === 'ages' && itemValue === '전체') ||
          (queryTag === 'gender' && itemValue === '성별')
        ) {
          // 기본 옵션인 경우, queryString 제거
          updateSearchParam(null, null, ['cursor', queryTag]);
        } else {
          updateSearchParam(queryTag, itemValue.toString(), ['cursor']);
        }
      }}
      autoOpen
    />
  );
}
