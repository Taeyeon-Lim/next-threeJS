import { SELECT_INITIAL_DATE } from '@components/Naver/SearchTrend/variables';

const [INITIAL_START_DATE, INITIAL_END_DATE] = SELECT_INITIAL_DATE();

type agesRequestItem =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11';
const agesRequest: {
  [key: string]: agesRequestItem;
} = {
  '12세 이하': '1',
  '13 ~ 18세': '2',
  '19 ~ 24세': '3',
  '25 ~29세': '4',
  '30 ~ 34세': '5',
  '35 ~ 39세': '6',
  '40 ~ 44세': '7',
  '45 ~ 49세': '8',
  '50 ~ 54세': '9',
  '55 ~ 59세': '10',
  '60세 이상': '11',
};

export type SearchTrendDataset = {
  period: string;
  ratio: number;
};

export type SearchTrendData = {
  startDate: string;
  endDate: string;
  timeUnit: string;
  results: {
    title: string;
    keywords: string[];
    data: SearchTrendDataset[];
  }[];
};

export const getNaverSearchTrend = async (request: {
  startDate: string;
  endDate: string;
  timeUnit: string;
  keywordGroups:
    | {
        groupName: string;
        keywords: string[];
      }[]
    | [];
  device: string;
  ages: string[];
  gender: string;
}) => {
  if (!process.env.NAVER_CLIENT_ID || !process.env.NAVER_SECRET) {
    throw new Error('Not Found Env : NAVER_CLIENT_KEY');
  }
  if (!request || JSON.stringify(request) === '{}') {
    throw new Error('Invalid Request : Naver Search Trend');
  }

  const { device, ages, gender } = request;
  const optionalRequest: {
    device?: 'pc' | 'mo';
    ages?: [agesRequestItem];
    gender?: 'm' | 'f';
  } = {};

  if (device === 'pc' || device === 'mobile')
    optionalRequest.device = device === 'mobile' ? 'mo' : device;

  const ages_firstIndex = ages[0];
  if (ages && ages_firstIndex !== '' && agesRequest[ages_firstIndex]) {
    optionalRequest.ages = [agesRequest[ages_firstIndex]];
  }

  if (gender === '남성' || gender === '여성')
    optionalRequest.gender = gender === '남성' ? 'm' : 'f';

  const response = await fetch('https://openapi.naver.com/v1/datalab/search', {
    cache: 'force-cache', // default
    method: 'POST',
    headers: {
      'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID || '',
      'X-Naver-Client-Secret': process.env.NAVER_SECRET || '',
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      ...optionalRequest,
      startDate: request.startDate || INITIAL_START_DATE,
      endDate: request.endDate || INITIAL_END_DATE,
      timeUnit: request.timeUnit,
      keywordGroups:
        request.keywordGroups.length < 1 ||
        JSON.stringify(request.keywordGroups) === '[]'
          ? [
              {
                groupName: '네이버',
                keywords: ['네이버'],
              },
            ]
          : request.keywordGroups,
    }),
  });

  const data = await response.json();

  if (response.ok) {
    const result: SearchTrendData = data;

    return result;
  }

  if (response.status === 403) {
    throw new Error('No Auth : Naver Search Trend', {
      cause: '네이버 서치 트렌드 API 사용 권한 없음',
    });
  }

  const errMsg = await data.errMsg;
  if (response.status === 400 && errMsg) {
    throw new Error('FAILED CALL API : Naver Search Trend\n' + errMsg, {
      cause: errMsg,
    });
  }

  if (response.status === 500) {
    throw new Error(
      'FAILED CALL API : Naver Search Trend (NAVER SERVER ERROR)',
      {
        cause: '네이버 API 서버 내부 오류',
      }
    );
  }

  throw new Error('Unknown Error: Naver Search Trend');
};
