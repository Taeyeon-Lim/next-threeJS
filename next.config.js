/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  env: {
    navigatorLinks: [
      {
        path: '/',
        name: 'Home',
        createdBy: '2023-07-30',
      },
      {
        path: '/Box',
        name: 'Box',
        createdBy: '2023-07-07', // First
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
    ],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  // swcMinify: true, // 기본값 = true 적용안되면 제거
  // compiler: {
  //   removeConsole: true // 콘솔 메시지 제거
  // },
};

module.exports = nextConfig;
