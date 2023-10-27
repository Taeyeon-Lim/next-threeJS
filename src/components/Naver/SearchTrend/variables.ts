// 서버 컴포넌트와 클라이언트 컴포넌트에 선언된 변수는 서로 공유되지 못 함.
// 그러나, 이 파일처럼 따로 선언하는 경우 두 컴포넌트에 알아서 사용됨

export const SEARCH_TREND_SELECT_OPTIONS = [
  {
    optionName: '시작일', // 2016.01.01 이후만 가능
    queryTag: 'startDate',
    queryValues: [],
  },
  {
    optionName: '종료일',
    queryTag: 'endDate',
    queryValues: [],
  },
  {
    optionName: '기간',
    queryTag: 'timeUnit',
    queryValues: ['date', 'week', 'month'],
  },
  {
    optionName: '기기',
    queryTag: 'device',
    queryValues: ['기기', 'pc', 'mobile'],
  },
  {
    optionName: '나이',
    queryTag: 'ages',
    queryValues: [
      '전체',
      '12세 이하',
      '13 ~ 18세',
      '19 ~ 24세',
      '25 ~29세',
      '30 ~ 34세',
      '35 ~ 39세',
      '40 ~ 44세',
      '45 ~ 49세',
      '50 ~ 54세',
      '55 ~ 59세',
      '60세 이상',
    ],
  },
  {
    optionName: '성별',
    queryTag: 'gender',
    queryValues: ['성별', '남성', '여성'],
  },
];

export const SELECT_OPTIONS_REGEX =
  /^(startDate|endDate|timeUnit|device|ages|gender)$/i;

export const SELECT_INITIAL_DATE = () => {
  const today = new Date();
  today.setHours(today.getHours() + 9);
  today.setDate(today.getDate() - 1);
  const endDate = today.toISOString().slice(0, 10);
  today.setFullYear(today.getFullYear() - 1);
  const startDate = today.toISOString().slice(0, 10);

  return [startDate, endDate];
};

export const keywordFilter = (searchParams: {
  [key: string]: string | string[] | undefined;
}) => {
  const keywords: { [key: string]: string } = {};

  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof key !== 'string' || typeof value !== 'string') return;
    if (key === 'cursor' || SELECT_OPTIONS_REGEX.test(key) || key === 'view')
      return;

    keywords[key] = value;
  });

  return Object.entries(keywords);
};
