import React from 'react';
import { siteConfig } from '@/lib/config/site';

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Renders BreadcrumbList Schema.org JSON-LD
 */
export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.item.startsWith('http')
        ? crumb.item
        : `${siteConfig.siteUrl}${crumb.item}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Renders WebApplication / SoftwareApplication Schema.org JSON-LD for calculators
 */
export function WebApplicationJsonLd({
  name,
  description,
  url,
  applicationCategory = 'BusinessApplication',
}: {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: url.startsWith('http') ? url : `${siteConfig.siteUrl}${url}`,
    applicationCategory,
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: siteConfig.brandName,
      url: siteConfig.siteUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Renders FAQPage Schema.org JSON-LD
 */
export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  if (!items || items.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Renders Article Schema.org JSON-LD for educational guides
 */
export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description,
    url: url.startsWith('http') ? url : `${siteConfig.siteUrl}${url}`,
    datePublished,
    dateModified,
    author: {
      '@type': 'Organization',
      name: siteConfig.brandName,
      url: siteConfig.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.brandName,
      url: siteConfig.siteUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
