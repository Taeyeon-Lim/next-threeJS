'use client';

import { ChangeEventHandler, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { newSearchParams } from '@utils/navigationUtils';

import SimpleSpinner from '@components/SimpleSpinner';

import { SELECT_INITIAL_DATE } from './variables';
const [INITIAL_START_DATE, INITIAL_END_DATE] = SELECT_INITIAL_DATE();

function SelectsDate({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();

  const [date, setDate] = useState({
    startDate:
      searchParams['startDate'] && typeof searchParams['startDate'] !== 'object'
        ? searchParams['startDate']
        : INITIAL_START_DATE,
    endDate:
      searchParams['endDate'] && typeof searchParams['endDate'] !== 'object'
        ? searchParams['endDate']
        : INITIAL_END_DATE,
  });

  const [isPending, startTransition] = useTransition();

  const handleDate: ChangeEventHandler<HTMLInputElement> = e => {
    const { name, value } = e.currentTarget;

    setDate(prev => ({
      ...prev,
      [name]: value,
    }));

    if (name && value) {
      startTransition(() => {
        const queryString = newSearchParams(searchParams, ['cursor']);
        queryString.set(name, value);

        router.replace(`/Naver/SearchTrend?${queryString.toString()}`);
      });
    }
  };

  return (
    <>
      {isPending && <SimpleSpinner size={25} borderWidth={5} />}

      <input
        type='date'
        name='startDate'
        value={date.startDate}
        onChange={handleDate}
        min='2016-01-01'
        max={date.endDate}
      />

      <input
        type='date'
        name='endDate'
        value={date.endDate}
        onChange={handleDate}
        min={date.startDate}
        max={INITIAL_END_DATE}
      />
    </>
  );
}

export default SelectsDate;
