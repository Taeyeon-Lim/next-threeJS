'use client';

import { Dispatch, SetStateAction, Suspense, useState, useMemo } from 'react';

import { useRouter } from 'next/navigation';
import { Canvas } from '@react-three/fiber';
import { Ring, Text, Bounds, useCursor } from '@react-three/drei';

import { SearchTrendData, SearchTrendDataset } from '@api/external/Naver';

import TypoGraphyMetaball from '@components/TypoGraphyMetaball';

import { BsX } from 'react-icons/bs';

import styles from './chart.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

type HoveredDataset = SearchTrendDataset & {
  title?: string;
};

const GAP = 0.001;

const THETA_LENGTH = Math.PI * 2;
const INNER_RADIUS = 1;
const MIN_OUTER_RADIUS = 0.1;
const OUTER_RADIUS = 2;
const OUTER_RADIUS_RATIO =
  (OUTER_RADIUS - INNER_RADIUS - MIN_OUTER_RADIUS) * 0.01;

const PeriodRingChart = ({
  arc,
  start,
  isHovered,
  isMaxDataset,
  isMinDataset,
  dataset,
  setHoveredDataset,
}: {
  arc: number;
  start: number;
  isHovered: boolean;
  isMaxDataset: boolean;
  isMinDataset: boolean;
  dataset: HoveredDataset;
  setHoveredDataset: Dispatch<SetStateAction<HoveredDataset | null>>;
}) => {
  useCursor(isHovered);

  return (
    <Ring
      args={[
        INNER_RADIUS,
        INNER_RADIUS + MIN_OUTER_RADIUS + OUTER_RADIUS_RATIO * dataset.ratio,
        75,
        0,
        Math.PI / 2 + start,
        arc,
      ]}
      rotation={[0, Math.PI, 0]}
      onPointerOver={e => (e.stopPropagation(), setHoveredDataset(dataset))}
      onPointerOut={() => setHoveredDataset(null)}
    >
      <meshBasicMaterial
        color={
          isHovered
            ? '#75a784'
            : isMaxDataset
            ? '#E71915'
            : isMinDataset
            ? '#1C6AD7'
            : dataset.period === '데이터 없음'
            ? 'gray'
            : '#000000'
        }
        side={1}
      />
    </Ring>
  );
};

function Chart({
  viewKeyword,
  searchTrendData,
}: {
  viewKeyword: string;
  searchTrendData: SearchTrendData;
}) {
  const router = useRouter();

  // A) view === 'all'인 경우
  const dataKeywordsLength = searchTrendData.results.length || 0;

  const isAllDataLength = useMemo(
    () =>
      searchTrendData.results.reduce((acc, cur) => {
        return acc < cur.data.length ? cur.data.length : acc;
      }, 0),
    [searchTrendData.results]
  );

  const allTheme = useMemo(
    () =>
      Array.from({ length: isAllDataLength }, (_, i) => {
        let maxRatio: (SearchTrendDataset & { title: string }) | undefined =
          undefined;

        for (let j = 0; j < dataKeywordsLength; j++) {
          if (searchTrendData.results[j].data.length === 0) continue;
          if (!searchTrendData.results[j].data[i]) continue;

          if (
            !maxRatio ||
            maxRatio.ratio < searchTrendData.results[j].data[i].ratio
          ) {
            maxRatio = {
              ...searchTrendData.results[j].data[i],
              title: searchTrendData.results[j].title,
            };
          }
        }

        return maxRatio;
      }).filter(
        // remove undefined
        (str): str is SearchTrendDataset & { title: string } =>
          str !== undefined
      ),
    [isAllDataLength, dataKeywordsLength, searchTrendData.results]
  );

  // B) 주제가 선택된 경우 (vieww !== 'all')
  const seletedTheme = searchTrendData.results.find(
    result => result.title === viewKeyword
  );

  // B-1) chartType = 'Period'
  const barEqualArc =
    viewKeyword === 'all'
      ? THETA_LENGTH / allTheme.length
      : seletedTheme?.data
      ? THETA_LENGTH / seletedTheme.data.length
      : 0;

  const barArc = barEqualArc - GAP;

  const isSingleData = barEqualArc === THETA_LENGTH;

  // 기간별 데이터 정렬
  const isExist_allThemeData =
    viewKeyword === 'all' && JSON.stringify(allTheme) !== '[]';

  const isExist_seletedThemeData =
    seletedTheme?.data && JSON.stringify(seletedTheme.data) !== '[]';

  const minmaxRatios = useMemo(
    () =>
      isExist_allThemeData
        ? [...allTheme].sort((a, b) => a.ratio - b.ratio)
        : isExist_seletedThemeData
        ? [...seletedTheme.data].sort((a, b) => a.ratio - b.ratio)
        : false,
    [
      isExist_allThemeData,
      isExist_seletedThemeData,
      allTheme,
      seletedTheme?.data,
    ]
  );

  // Type 'Ratio' = 비율별 미구현
  const [chartType] = useState<'Period' | 'Ratio'>('Period');

  const [hoveredDataset, setHoveredDataset] = useState<HoveredDataset | null>(
    null
  );

  return (
    <div className={cx('chart')}>
      <div
        className={cx('theme', {
          black:
            (viewKeyword === 'all' && !hoveredDataset?.title) ||
            (viewKeyword !== 'all' && !seletedTheme?.title),
        })}
      >
        <TypoGraphyMetaball
          text={
            viewKeyword === 'all'
              ? hoveredDataset?.title || '기간 미선택'
              : seletedTheme?.title || '알 수 없는 차트'
          }
        />
      </div>

      <div className={cx('tag')}>
        {viewKeyword === 'all'
          ? '날짜별, 모든 키워드에서 가장 큰 검색 비율'
          : seletedTheme?.keywords
          ? 'Tag: ' + seletedTheme.keywords
          : 'Not found Error'}
      </div>

      <button className={cx('close-button')} onClick={() => router.back()}>
        <BsX />
      </button>

      <Canvas dpr={[1, 3]}>
        {/* display chart period */}
        <Suspense fallback={null}>
          <Text
            font={'/fonts/NanumGothic-Regular.woff'}
            color='#75a784'
            anchorX='center'
            anchorY={-0.3}
            fontSize={0.2}
            visible={hoveredDataset === null}
          >
            {searchTrendData?.startDate}~
          </Text>
          <Text
            font={'/fonts/NanumGothic-Regular.woff'}
            color='#75a784'
            anchorX='center'
            anchorY={-0.075}
            fontSize={0.2}
            visible={hoveredDataset === null}
          >
            {searchTrendData?.endDate}
          </Text>
          <Text
            font={'/fonts/NanumGothic-Regular.woff'}
            color='#75a784'
            anchorX='center'
            anchorY={0.2}
            fontSize={0.175}
            visible={hoveredDataset === null}
          >
            {
              {
                date: 'Date(일별)',
                week: 'Week(주별)',
                month: 'Month(월별)',
              }[searchTrendData?.timeUnit]
            }
          </Text>
        </Suspense>

        {/* display period & ratio */}
        <Suspense fallback={null}>
          <Text
            font={'/fonts/NanumGothic-Regular.woff'}
            color='#75a784'
            anchorX='center'
            anchorY={-0.5}
            fontSize={0.225}
            visible={hoveredDataset !== null}
          >
            period
          </Text>
          <Text
            font={'/fonts/NanumGothic-Regular.woff'}
            color='#75a784'
            anchorX='center'
            anchorY={-0.25}
            fontSize={0.25}
            visible={hoveredDataset !== null}
          >
            {hoveredDataset?.period}
          </Text>

          <Text
            font={'/fonts/NanumGothic-Regular.woff'}
            color='#75a784'
            anchorX='center'
            anchorY={0.0275}
            fontSize={0.225}
            visible={hoveredDataset !== null}
          >
            ratio
          </Text>
          <Text
            font={'/fonts/NanumGothic-Regular.woff'}
            color='#75a784'
            anchorX='center'
            anchorY={0.275}
            fontSize={0.25}
            visible={hoveredDataset !== null}
          >
            {hoveredDataset?.ratio}
          </Text>
        </Suspense>

        {/* Chart Ring */}
        <Suspense fallback={null}>
          <Bounds fit clip observe damping={6} margin={0.9}>
            {
              {
                Period: (
                  <>
                    {isExist_allThemeData ? (
                      allTheme.map((dataset, i) => {
                        return (
                          <PeriodRingChart
                            key={`ALL_${i}_` + dataset.period}
                            arc={isSingleData ? barEqualArc : barArc}
                            start={
                              isSingleData ? barEqualArc : barEqualArc * i + GAP
                            }
                            isHovered={
                              hoveredDataset?.period === dataset.period
                            }
                            isMaxDataset={
                              !!minmaxRatios &&
                              minmaxRatios[minmaxRatios.length - 1].period ===
                                dataset.period
                            }
                            isMinDataset={
                              !!minmaxRatios &&
                              minmaxRatios[0].period === dataset.period
                            }
                            dataset={dataset}
                            setHoveredDataset={setHoveredDataset}
                          />
                        );
                      })
                    ) : isExist_seletedThemeData ? (
                      seletedTheme.data.map((dataset, i) => {
                        return (
                          <PeriodRingChart
                            key={seletedTheme.title + dataset.period}
                            arc={isSingleData ? barEqualArc : barArc}
                            start={
                              isSingleData ? barEqualArc : barEqualArc * i + GAP
                            }
                            isHovered={
                              hoveredDataset?.period === dataset.period
                            }
                            isMaxDataset={
                              !!minmaxRatios &&
                              minmaxRatios[minmaxRatios.length - 1].period ===
                                dataset.period
                            }
                            isMinDataset={
                              !!minmaxRatios &&
                              minmaxRatios[0].period === dataset.period
                            }
                            dataset={dataset}
                            setHoveredDataset={setHoveredDataset}
                          />
                        );
                      })
                    ) : (
                      <PeriodRingChart
                        key={'no_Data'}
                        arc={THETA_LENGTH}
                        start={0}
                        isHovered={false}
                        isMaxDataset={false}
                        isMinDataset={false}
                        dataset={{
                          period: '데이터 없음',
                          ratio: 0,
                          title: '모든 데이터 없음',
                        }}
                        setHoveredDataset={setHoveredDataset}
                      />
                    )}
                  </>
                ),
                Ratio: <>미구현</>,
              }[chartType]
            }
          </Bounds>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Chart;
