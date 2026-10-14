import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: ['CCBot', 'Bytespider'],
        disallow: '/',
      },
    ],
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
