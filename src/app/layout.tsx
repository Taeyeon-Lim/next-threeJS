import Navigator from '@components/Navigator';

import './globals.scss';
import { Roboto } from 'next/font/google';

export const PLACEHOLDER_BASE64_IMAGE =
  'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBAB  bWyZJf74GZgAAAABJRU5ErkJggg==';

const roboto = Roboto({
  weight: ['300', '500', '700'],
  // style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'ThreeJS',
  description: '개인 학습용 토이 프로젝트',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko' className={roboto.className}>
      <head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css'
          integrity='sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=='
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
        />
      </head>

      <body className={roboto.className}>
        <Navigator />

        <main>{children}</main>
      </body>
    </html>
  );
}
