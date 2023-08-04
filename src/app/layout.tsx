import 'normalize.css';
import './globals.scss';

import { Metadata } from 'next';

import { Roboto } from 'next/font/google';

import Navigator from '@components/Navigator';

import { DOMAIN_URL } from 'src/utils/env';
export const PLACEHOLDER_BASE64_IMAGE =
  'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBAB  bWyZJf74GZgAAAABJRU5ErkJggg==';

const roboto = Roboto({
  weight: ['300', '500', '700'],
  // style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

const META_DESCRIPTION = 'Three.js 토이 프로젝트';
const META_PROJECT_NAME = 'Three-ty';
const META_CREATOR = 'Taeyeon Lim';

export const metadata: Metadata = {
  title: {
    template: '%s | TY',
    default: 'TY', // a default is required when creating a template
  },
  description: META_DESCRIPTION,
  generator: 'Next.js',
  applicationName: 'Next.js',
  referrer: 'origin-when-cross-origin',
  keywords: [META_PROJECT_NAME, 'Next.js', 'TypeScript'],
  authors: [{ name: META_CREATOR, url: 'https://github.com/Taeyeon-Lim' }],
  creator: META_CREATOR,
  publisher: META_CREATOR,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko' className={roboto.className}>
      <head>
        {/* OPEN GRAPH */}
        <meta property='og:title' content={META_PROJECT_NAME} />
        <meta property='og:description' content={META_DESCRIPTION} />
        <meta property='og:url' content={DOMAIN_URL} />
        <meta property='og:site_name' content={META_PROJECT_NAME} />
        <meta property='og:locale' content='ko_KR' />
        <meta property='og:image' content={DOMAIN_URL + '/screen_home.png'} />
        <meta property='og:image:width' content='1223' />
        <meta property='og:image:height' content='689' />
        <meta property='og:image:alt' content={META_PROJECT_NAME} />
        <meta property='og:type' content='website' />

        {/* TWITTER */}
        <meta name='twitter:creator' content={META_CREATOR} />
        <meta name='twitter:title' content={META_PROJECT_NAME} />
        <meta name='twitter:description' content={META_DESCRIPTION} />
        <meta name='twitter:card' content='app' />
        <meta name='twitter:image' content={DOMAIN_URL + '/screen_home.png'} />
        <meta name='twitter:image:alt' content={META_PROJECT_NAME} />
        <meta name='twitter:app:name:iphone' content={META_PROJECT_NAME} />
        <meta name='twitter:app:url:iphone' content={DOMAIN_URL} />
        <meta name='twitter:app:name:ipad' content={META_PROJECT_NAME} />
        <meta name='twitter:app:url:ipad' content={DOMAIN_URL} />
        <meta name='twitter:app:name:googleplay' content={META_PROJECT_NAME} />
      </head>

      <body className={roboto.className}>
        <Navigator />

        <main>{children}</main>
      </body>
    </html>
  );
}
