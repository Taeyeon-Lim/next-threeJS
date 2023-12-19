import { MetadataRoute } from 'next';
import NAVIGATOR_LINKS from '@utils/links';

const DOMAIN_URL = process.env.domainURL;

export default function sitemap(): MetadataRoute.Sitemap {
  const LAST_MODIFIED = new Date();

  if (!DOMAIN_URL) {
    throw new Error('Not Found Domain URL');
  }

  return NAVIGATOR_LINKS.map(link => {
    const firstPath = {
      url: DOMAIN_URL + link.path,
      lastModified: LAST_MODIFIED,
    };

    if (link.subPaths) {
      const subPaths = link.subPaths.map(subLink => ({
        url: DOMAIN_URL + link.path + subLink.path,
        lastModified: LAST_MODIFIED,
      }));

      return subPaths.concat(firstPath);
    } else {
      return firstPath;
    }
  }).flat();
}
