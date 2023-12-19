import { MetadataRoute } from 'next';

const DOMAIN_URL = process.env.domainURL;

export default function robots(): MetadataRoute.Robots {
  if (!DOMAIN_URL) {
    throw new Error('Not Found Domain URL');
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      //   disallow: '/private/',
    },
    sitemap: DOMAIN_URL + '/sitemap.xml',
  };
}
// type Robots = {
//     rules:
//       | {
//           userAgent?: string | string[]
//           allow?: string | string[]
//           disallow?: string | string[]
//           crawlDelay?: number
//         }
//       | Array<{
//           userAgent: string | string[]
//           allow?: string | string[]
//           disallow?: string | string[]
//           crawlDelay?: number
//         }>
//     sitemap?: string | string[]
//     host?: string
//   }
