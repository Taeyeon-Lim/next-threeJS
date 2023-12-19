/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  env: {
    domainURL: 'https://three-ty.vercel.app',
    naverClientID: '9irpe0J7J5c3E3Rix3m8',
    naverSecret: 'Z85h1LkXdk',
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
};

module.exports = nextConfig;
