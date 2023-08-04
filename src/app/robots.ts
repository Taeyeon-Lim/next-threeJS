import { MetadataRoute } from 'next';
import { DOMAIN_URL } from 'src/utils/env';

export default function robots(): MetadataRoute.Robots {
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
