import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbJsonLd, BreadcrumbItem } from '@/lib/seo/jsonld';

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbProps) {
  const fullItems: BreadcrumbItem[] = [
    { name: 'Home', item: '/' },
    ...items,
  ];

  return (
    <nav
      aria-label="Breadcrumb"
      className="py-3 text-xs text-neutral-500 font-medium"
    >
      <BreadcrumbJsonLd items={fullItems} />
      <ol className="flex items-center flex-wrap gap-1.5">
        {fullItems.map((crumb, idx) => {
          const isLast = idx === fullItems.length - 1;

          return (
            <li key={crumb.item} className="flex items-center gap-1.5">
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />}
              {isLast ? (
                <span
                  className="text-neutral-800 font-semibold truncate max-w-[260px] sm:max-w-none"
                  aria-current="page"
                >
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.item}
                  className="hover:text-emerald-700 transition-colors flex items-center gap-1"
                >
                  {idx === 0 && <Home className="w-3.5 h-3.5" />}
                  <span>{crumb.name}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
