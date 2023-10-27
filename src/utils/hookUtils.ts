'use client';

import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useTransition,
  useRef,
} from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

/** Debounce Hook */
export function useDebounce<T>(value: T, delay: number = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export type UpdateQueryOptions = {
  optionName: string;
  queryTag: string;
  queryValues: string[];
}[];
/** Update Query Hook (Only Client Component)
 *
 * @use only! Inside Client Component
 *
 * @example isActive
 * className={cx({'isActive' : selectedOptions.get(queryTag) === value })}
 */
export function useUpdateSearchParams(
  options: UpdateQueryOptions | null,
  routerHistory: 'push' | 'replace',
  SpecifiedPathname?: string
) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [_, startTransition] = useTransition();
  const nextPathname = SpecifiedPathname || pathname;

  const selectedOptions = useMemo<URLSearchParams | null>(() => {
    if (options) {
      const params = new URLSearchParams(
        Object.fromEntries(searchParams.entries())
      );

      options.forEach(option => {
        if (!searchParams.has(option.queryTag)) {
          params.set(option.queryTag, option.queryValues[0]);
        }
      });

      return params;
    }

    return null;
  }, [searchParams, options]);

  const updateSearchParam = useCallback(
    (
      name: string | string[] | null,
      value: string | string[] | null,
      deleteParams?: string[]
    ) => {
      const params = new URLSearchParams(
        Object.fromEntries(searchParams.entries())
      );

      if (name && value) {
        if (typeof name === 'string' && typeof value === 'string') {
          // 단일 쿼리 업데이트
          params.set(name, value);
        } else if (typeof name === 'object' && typeof value === 'object') {
          // 복수 쿼리 업데이트

          // 배열 name, value의 크기 불일치
          if (name.length === value.length)
            throw new Error('Update Query Error: mismatch name and value size');

          name.forEach((n, index) => {
            params.set(n, value[index]);
          });
        } else {
          // name, value의 타입 불일치
          throw new Error('Update Query Error: mismatch name and value type');
        }
      }

      // 제거할 쿼리
      if (deleteParams) {
        deleteParams.forEach(deleteParam => {
          if (params.has(deleteParam)) params.delete(deleteParam);
        });
      }

      // 라우터 변경
      startTransition(() => {
        if (routerHistory === 'push') {
          router.push(nextPathname + '?' + params.toString());
        } else {
          router.replace(nextPathname + '?' + params.toString());
        }
      });
    },
    [router, searchParams, nextPathname, routerHistory]
  );

  return {
    selectedOptions,
    updateSearchParam,
  };
}

/** Timeout hook */
export function useTimeout(
  callback: () => void,
  delay: number | null,
  isRun: boolean
) {
  const savedCallback = useRef(callback);

  // 가장 최근 콜백 업데이트
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay || !isRun) return;

    const id = setTimeout(() => savedCallback.current(), delay);

    return () => clearTimeout(id);
  }, [delay, isRun]);
}
