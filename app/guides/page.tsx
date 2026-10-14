import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BookOpen, Clock, ArrowRight, TrendingUp, DollarSign, Scale } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'E-Commerce Seller Guides & Financial Tutorials',
  description:
    'Free in-depth financial guides for online sellers. Learn how to calculate net profit, master profit margins vs markups, and calculate break-even ROAS for paid ads.',
  path: '/guides',
  keywords: [
    'ecommerce profit guides',
    'online seller tutorials',
    'profit margin vs markup',
    'how to calculate product profit',
    'break even roas explained',
  ],
});

interface GuideCard {
  title: string;
  slug: string;
  description: string;
  readTime: string;
  category: string;
  icon: React.ElementType;
}

const guides: GuideCard[] = [
  {
    title: 'Profit Margin vs. Markup: The Critical Difference Explained',
    slug: '/guides/profit-margin-vs-markup',
    description:
      'Confusing margin with markup is the number one reason online sellers underprice products and run out of cash. Master the mathematical differences with side-by-side comparison tables.',
    readTime: '6 min read',
    category: 'Pricing Strategy',
    icon: TrendingUp,
  },
  {
    title: 'How to Calculate Product Profit: The Step-by-Step E-Commerce Guide',
    slug: '/guides/how-to-calculate-product-profit',
    description:
      'Learn how to calculate true take-home net profit per order. Covers gross revenue, COGS, customer-paid shipping, carrier postage, packaging supplies, platform fees, and return allowances.',
    readTime: '8 min read',
    category: 'Financial Modeling',
    icon: DollarSign,
  },
  {
    title: 'Break-Even ROAS Explained: Advertising Unit Economics for Sellers',
    slug: '/guides/break-even-roas-explained',
    description:
      'Stop burning cash on Meta, Google, and Amazon ads. Understand pre-ad contribution margin, break-even ROAS thresholds, and how to set safe Target ROAS goals for your campaigns.',
    readTime: '7 min read',
    category: 'Paid Advertising',
    icon: Scale,
  },
];

export default function GuidesHubPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ name: 'Guides & Education', item: '/guides' }]} />

      <div className="my-6 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Seller Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
          Educational Guides for Online Sellers
        </h1>
        <p className="mt-3 text-base text-neutral-600 leading-relaxed">
          Comprehensive, fluff-free tutorials written for e-commerce
          entrepreneurs, Amazon FBA sellers, eBay flippers, and Etsy makers.
          Learn the real math behind pricing, advertising, and profitability.
        </p>
      </div>

      <div className="my-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {guides.map((g) => {
          const Icon = g.icon;
          return (
            <article
              key={g.slug}
              className="bg-white rounded-2xl border border-neutral-200/90 p-6 flex flex-col justify-between hover:border-emerald-300 hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-4">
                  <span className="text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md">
                    {g.category}
                  </span>
                  <span className="text-neutral-500 flex items-center gap-1 font-normal">
                    <Clock className="w-3.5 h-3.5" />
                    {g.readTime}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-neutral-100 group-hover:bg-emerald-600 group-hover:text-white text-neutral-700 flex items-center justify-center transition-colors mb-4">
                  <Icon className="w-5 h-5" />
                </div>

                <h2 className="text-lg font-bold text-neutral-950 group-hover:text-emerald-700 transition-colors leading-snug">
                  <Link href={g.slug}>{g.title}</Link>
                </h2>

                <p className="mt-2.5 text-xs text-neutral-600 leading-relaxed line-clamp-3">
                  {g.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-emerald-700 group-hover:text-emerald-800">
                <span>Read Full Guide</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          );
        })}
      </div>

      {/* Featured Tools Banner */}
      <div className="my-12 bg-neutral-900 text-white rounded-2xl p-6 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h2 className="text-xl font-bold">Ready to Put the Math to Work?</h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Use our free universal product profit calculator to plug in your
            exact numbers, test markup percentages, and view transparent fee
            breakdowns instantly.
          </p>
        </div>

        <Link
          href="/calculators/product-profit-calculator"
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-sm transition-colors inline-flex items-center gap-2 flex-shrink-0"
        >
          <span>Open Profit Calculator</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
