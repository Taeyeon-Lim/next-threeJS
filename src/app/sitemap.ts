import { MetadataRoute } from 'next';
import { DOMAIN_URL, NAVIGATOR_LINKS } from 'src/utils/env';

export default function sitemap(): MetadataRoute.Sitemap {
  const LAST_MODIFIED = new Date();

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
