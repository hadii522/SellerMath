import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config/site';

interface MetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title,
  description,
  path,
  keywords = [],
  type = 'website',
  publishedTime,
  modifiedTime,
  noIndex = false,
}: MetadataOptions): Metadata {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const canonicalUrl = `${siteConfig.siteUrl}${normalizedPath}`;
  const fullTitle = `${title} | ${siteConfig.brandName}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      'seller profit calculator',
      'ecommerce profit margin',
      'online selling fees',
      'break even roas',
      'target profit calculator',
      ...keywords,
    ],
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    publisher: siteConfig.brandName,
    metadataBase: new URL(siteConfig.siteUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.brandName,
      locale: 'en_US',
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}
