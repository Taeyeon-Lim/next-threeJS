/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  env: {
    naverClient: {
      clientID: '9irpe0J7J5c3E3Rix3m8',
      secret: 'Z85h1LkXdk',
    },
    domainURL: 'https://three-ty.vercel.app',
    navigatorLinks: [
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
    ],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    // remotePatterns: [
    //   {
    //     protocol: 'http',
    //     hostname: 'via.placeholder.com',
    //     port: '',
    //     pathname: '/**',
    //   },
    //   {
    //     protocol: 'https',
    //     hostname: 'via.placeholder.com',
    //     port: '',
    //     pathname: '/**',
    //   },
    // ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  // compiler: {
  //   removeConsole: true // 콘솔 메시지 제거
  // },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // 실험적인 기능, 미리 링크 다음 정보를 가져옴 (특히, 모바일에서 최대 1초 단축)
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          // 브라우저의 콘텐츠 유형 추측 방지 (파일 업로드 및 공유 사이트에 대한 XSS 방지)
          // {
          //   key: 'X-Content-Type-Options',
          //   value: 'nosniff',
          // },
          // DOM 또는 Iframe 내의 브라우저 기능 사용 범위 설정
          {
            key: 'Permissions-Policy',
            value:
              'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          // {
          //   key: 'Strict-Transport-Security',
          //   value: 'max-age=63072000; includeSubDomains; preload',
          // },
          // `미들웨어에서 CSP-policy 설정 시, 필요없음` (IE, Chrome, Safari에서만 작동)
          //  CSP 지원이 안되는 브라우저에서 사용 시에도 XSS 취약점이 있을 수 있음
          // {
          //   key: 'X-XSS-Protection',
          //   value: '1; mode=block',
          // },
          // `미들웨어에서 CSP-policy 설정 시, 필요없음` (frame-ancestors로 사용됨)
          //  타 사이트에 내 콘텐츠 삽입 방지 => 클릭재킹 방어
          // {
          //   key: 'X-Frame-Options',
          //   value: 'SAMEORIGIN',
          // },
          // Vercel 배포인 경우, 자동 추가됨
          // {
          //   key: 'Strict-Transport-Security',
          //   value: 'max-age=63072000; includeSubDomains; preload'
          // }
        ],
      },
    ];
  },
};

module.exports = nextConfig;
