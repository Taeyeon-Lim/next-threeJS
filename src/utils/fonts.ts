import localFont from 'next/font/local';

const notoSansKR_set = localFont({
  src: [
    {
      path: '../../public/fonts/NotoSansKR-Bold.woff2',
      weight: '300',
    },
    {
      path: '../../public/fonts/NotoSansKR-Regular.woff2',
      weight: '500',
    },
    {
      path: '../../public/fonts/NotoSansKR-Bold.woff2',
      weight: '700',
    },
  ],
  display: 'swap',
  declarations: [
    {
      prop: 'unicode-range',
      value: 'U+AC00-D7A3',
    },
  ],
  variable: '--font-NotoSansKR',
});

const roboto_set = localFont({
  src: [
    {
      path: '../../public/fonts/Roboto-Light.ttf',
      weight: '300',
    },
    {
      path: '../../public/fonts/Roboto-Regular.ttf',
      weight: '500',
    },
    {
      path: '../../public/fonts/Roboto-Bold.ttf',
      weight: '700',
    },
  ],
  display: 'swap',
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+0041-005A, U+0061-007A, U+0030-0039, U+0020-002F, U+003A-0040, U+005B-0060, U+007B-007E',
    },
  ],
  variable: '--font-Roboto',
});

const global_fontFamily = `${roboto_set.variable} ${notoSansKR_set.variable} `;

export default global_fontFamily;

// import { Roboto, Noto_Sans_KR } from 'next/font/google';
// const roboto = Roboto({
//   weight: ['300', '500', '700'],
//   // style: ['normal', 'italic'],
//   subsets: ['latin'],
//   display: 'swap',
// });
// const noto_Sans_KR = Noto_Sans_KR({
//   weight: ['300', '500', '700'],
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-noto-sans-KR',
// });
