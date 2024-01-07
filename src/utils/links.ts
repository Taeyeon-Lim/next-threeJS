type NaviPaths = {
  path: string;
  name: string;
  createdByUpdate: string[];
  subPaths?: NaviPaths;
}[];

/**
 * @param createdByUpdate [0]='최초 완성일', [1~]=중요 업데이트 일시
 * @param subPaths  중첩 경로 (권장: 1번 이상 중첩X)
 */
const NAVIGATOR_LINKS: NaviPaths = [
  {
    path: '/',
    name: 'Home',
    createdByUpdate: ['2023-07-30'],
  },
  {
    path: '/Box',
    name: 'Box',
    createdByUpdate: ['2023-07-07', '2024-01-02'],
  },
  // {
  //   path: '/Galaxy',
  //   name: 'Galaxy',
  //   createdByUpdate: '2023-07-09',
  // },
  // {
  //   path: '/Camera',
  //   name: 'Camera',
  //   createdByUpdate: '2023-07-14',
  // },
  {
    path: '/Potal',
    name: 'Potal',
    createdByUpdate: ['2023-07-29'],
  },
  {
    path: '/Totoro',
    name: 'Totoro',
    createdByUpdate: ['2023-08-03'],
  },
  {
    path: '/Naver',
    name: 'Letter',
    createdByUpdate: ['XXXX-XX-XX'],
    subPaths: [
      {
        path: '/SearchTrend',
        name: 'SearchTrend',
        createdByUpdate: ['2023-10-27', '2023-12-17'],
      },
    ],
  },
  // {
  //   path: '/Ripple',
  //   name: 'Ripple',
  //   createdByUpdate: ['XXXX-XX-XX'],
  // },
  {
    path: '/Bead',
    name: 'Bead',
    createdByUpdate: ['2023-12-31', '2024-01-02'],
  },
];

export default NAVIGATOR_LINKS;
