import { MetadataRoute } from 'next';
import { DOMAIN_URL, NAVIGATOR_LINKS } from 'src/utils/env';

const LAST_MODIFIED = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return NAVIGATOR_LINKS.map(link => ({
    url: DOMAIN_URL + link.path,
    lastModified: LAST_MODIFIED,
  }));
}
