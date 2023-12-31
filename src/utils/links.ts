type NaviPaths = {
  path: string;
  name: string;
  createdBy: string;
  subPaths?: NaviPaths;
}[];

const NAVIGATOR_LINKS: NaviPaths = [
  {
    path: '/',
    name: 'Home',
    createdBy: '2023-07-30',
  },
  {
    path: '/Box',
    name: 'Box',
    createdBy: '2023-07-07',
  },
  // {
  //   path: '/Galaxy',
  //   name: 'Galaxy',
  //   createdBy: '2023-07-09',
  // },
  // {
  //   path: '/Camera',
  //   name: 'Camera',
  //   createdBy: '2023-07-14',
  // },
  {
    path: '/Potal',
    name: 'Potal',
    createdBy: '2023-07-29',
  },
  {
    path: '/Totoro',
    name: 'Totoro',
    createdBy: '2023-08-03',
  },
  {
    path: '/Naver',
    name: 'Letter',
    createdBy: '20XX-XX-XX',
    subPaths: [
      {
        path: '/SearchTrend',
        name: 'SearchTrend',
        createdBy: '2023-10-27',
      },
    ],
  },
  {
    path: '/Bead',
    name: 'Bead',
    createdBy: '2023-12-31',
  },
];

export default NAVIGATOR_LINKS;
