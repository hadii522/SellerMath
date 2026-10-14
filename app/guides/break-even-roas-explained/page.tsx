import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo/metadata';
import { ArticleJsonLd } from '@/lib/seo/jsonld';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FaqAccordion } from '@/components/FaqAccordion';
import { AdSlot } from '@/components/AdSlot';
import {
  Scale,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Break-Even ROAS Explained: The Complete Advertising Unit Economics Guide',
  description:
    'Master Break-Even ROAS for ecommerce advertising. Learn how to calculate minimum ROAS, maximum allowable CPA, and Target ROAS for Meta, Google, and Amazon campaigns.',
  path: '/guides/break-even-roas-explained',
  keywords: [
    'break even roas explained',
    'what is break even roas',
    'how to calculate break even roas',
    'target roas vs break even roas',
    'ecommerce advertising unit economics',
  ],
  type: 'article',
  publishedTime: '2025-01-25T00:00:00Z',
  modifiedTime: '2026-10-01T00:00:00Z',
});

const faqs = [
  {
    question: 'Why is a 2.0x ROAS not always profitable?',
    answer:
      'A 2.0x ROAS means you generate $2.00 of revenue for every $1.00 spent on advertising (ad spend is 50% of revenue). If your product manufacturing, shipping, and payment processing fees exceed 50% of the sale price, a 2.0x ROAS actually loses money on every sale.',
  },
  {
    question: 'How do I know my maximum allowable CPA (Cost Per Acquisition)?',
    answer:
      'Your maximum break-even CPA equals your pre-ad contribution margin. If an item sells for $60 and product cost + shipping + fees total $35, your pre-ad contribution is $25. Your maximum allowable CPA to break even is exactly $25.00.',
  },
  {
    question: 'How do I calculate Target ROAS for a specific profit margin?',
    answer:
      'Target ROAS = Selling Price ÷ (Pre-Ad Contribution - Desired Profit Per Order). If selling price is $100, pre-ad contribution is $50, and you desire $20 profit per unit, Target Max Ad Spend is $30 ($50 - $20). Your Target ROAS is $100 ÷ $30 = 3.33x.',
  },
  {
    question: 'How does ACoS convert to ROAS?',
    answer:
      'ROAS = 1 ÷ ACoS. For Amazon sellers: an ACoS of 20% (0.20) equals a 5.0x ROAS (1 ÷ 0.20 = 5.0). An ACoS of 33.3% equals a 3.0x ROAS. An ACoS of 50% equals a 2.0x ROAS.',
  },
];

export default function BreakEvenRoasExplainedPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <ArticleJsonLd
        title="Break-Even ROAS Explained: Advertising Unit Economics for Sellers"
        description="Comprehensive guide explaining break-even ROAS, maximum allowable CPA, and how to scale paid ads profitably."
        url="/guides/break-even-roas-explained"
        datePublished="2025-01-25T00:00:00Z"
        dateModified="2026-10-01T00:00:00Z"
      />

      <Breadcrumbs
        items={[
          { name: 'Guides & Education', item: '/guides' },
          {
            name: 'Break-Even ROAS Explained',
            item: '/guides/break-even-roas-explained',
          },
        ]}
      />

      {/* Header */}
      <header className="my-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
          <Scale className="w-3.5 h-3.5" />
          <span>Advertising Unit Economics</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 leading-tight">
          Break-Even ROAS Explained: Advertising Unit Economics for Sellers
        </h1>
        <p className="mt-3 text-base text-neutral-600 leading-relaxed">
          Running paid ads on Meta, Google, TikTok, or Amazon without knowing
          your exact break-even ROAS is like flying blind in a storm. Here is how
          to calculate your minimum advertising threshold and set profit-driven
          target ROAS goals.
        </p>
      </header>

      <AdSlot slotId="guide-roas-top" format="horizontal" />

      {/* Content */}
      <div className="my-8 prose prose-neutral max-w-none text-neutral-800 space-y-6 text-sm sm:text-base leading-relaxed">
        <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
          What is ROAS (Return on Ad Spend)?
        </h2>

        <p>
          <strong>ROAS</strong> stands for <em>Return on Ad Spend</em>. It
          measures the gross revenue generated for every dollar spent on
          advertising:
        </p>

        <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 font-mono text-xs font-bold text-neutral-900 not-prose my-4">
          ROAS = Total Revenue Generated from Ads ÷ Total Ad Spend
        </div>

        <p>
          For example, if you spend <strong>$1,000</strong> on Meta Ads and
          generate <strong>$3,000</strong> in attributed sales, your campaign
          ROAS is <strong>3.0x</strong> (or 300%).
        </p>

        <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
          What is Break-Even ROAS?
        </h2>

        <p>
          While gross ROAS tells you how much revenue you took in,{' '}
          <strong>Break-Even ROAS</strong> tells you the absolute minimum
          performance required so that advertising spend does not cause your
          business to lose money.
        </p>

        <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-xl not-prose my-6 space-y-2">
          <h3 className="font-bold text-emerald-950 text-base">
            The Golden Break-Even Formula:
          </h3>
          <div className="font-mono text-xs font-bold text-emerald-900 bg-white p-3 rounded border border-emerald-200">
            Pre-Ad Contribution = Selling Price - (COGS + Shipping + Platform & Payment Fees)
            <br />
            Break-Even ROAS = Selling Price ÷ Pre-Ad Contribution
          </div>
          <p className="text-xs text-emerald-800 pt-1">
            At your break-even ROAS, Net Profit is exactly $0.00. Any number
            above this threshold generates profit; any number below it drains
            cash.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
          Break-Even ROAS by Profit Margin
        </h2>

        <p>
          Your required ROAS is directly dictated by your product&apos;s pre-ad
          contribution margin percentage:
        </p>

        <div className="overflow-x-auto not-prose my-6">
          <table className="w-full text-left text-xs sm:text-sm border border-neutral-200 rounded-xl overflow-hidden">
            <thead className="bg-neutral-100 text-neutral-700 font-bold">
              <tr>
                <th className="py-3 px-4">Pre-Ad Gross Margin</th>
                <th className="py-3 px-4">Break-Even ROAS</th>
                <th className="py-3 px-4">Equivalent Break-Even ACoS</th>
                <th className="py-3 px-4">Feasibility Assessment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 bg-white">
              <tr>
                <td className="py-2.5 px-4 font-mono font-bold text-emerald-700">80%</td>
                <td className="py-2.5 px-4 font-mono font-bold">1.25x</td>
                <td className="py-2.5 px-4 font-mono">80.0%</td>
                <td className="py-2.5 px-4 text-emerald-700 font-medium">Very Easy to Scale</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-mono font-bold text-emerald-700">60%</td>
                <td className="py-2.5 px-4 font-mono font-bold">1.67x</td>
                <td className="py-2.5 px-4 font-mono">60.0%</td>
                <td className="py-2.5 px-4 text-emerald-700 font-medium">Healthy DTC Benchmark</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-mono font-bold text-neutral-900">50%</td>
                <td className="py-2.5 px-4 font-mono font-bold">2.00x</td>
                <td className="py-2.5 px-4 font-mono">50.0%</td>
                <td className="py-2.5 px-4 text-neutral-700 font-medium">Standard E-Commerce</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-mono font-bold text-amber-700">33.3%</td>
                <td className="py-2.5 px-4 font-mono font-bold">3.00x</td>
                <td className="py-2.5 px-4 font-mono">33.3%</td>
                <td className="py-2.5 px-4 text-amber-700 font-medium">Requires High Ad Optimization</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-mono font-bold text-rose-700">20%</td>
                <td className="py-2.5 px-4 font-mono font-bold">5.00x</td>
                <td className="py-2.5 px-4 font-mono">20.0%</td>
                <td className="py-2.5 px-4 text-rose-700 font-medium">Extremely Difficult on Cold Traffic</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
          How to Calculate Your Target ROAS
        </h2>

        <p>
          Breaking even keeps the lights on, but your goal is to generate
          healthy cash profit. To find your <strong>Target ROAS</strong>, build
          in your desired dollar profit per order:
        </p>

        <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 font-mono text-xs not-prose my-4 space-y-1">
          <div className="font-bold text-neutral-900">
            Target Max CPA = Pre-Ad Contribution - Desired Profit Per Order
          </div>
          <div className="font-bold text-emerald-700">
            Target ROAS = Selling Price ÷ Target Max CPA
          </div>
        </div>

        <p>
          If a product sells for $100 and leaves $45 in pre-ad contribution, your
          break-even CPA is $45.00 (2.22x ROAS). If you want to keep $15.00 in
          profit, your max CPA is $30.00 ($45 - $15). Your Target ROAS is $100 ÷
          $30 = <strong>3.33x</strong>.
        </p>
      </div>

      {/* Tool Callout */}
      <div className="my-10 bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-emerald-950 text-base">
            Calculate Your Break-Even ROAS in Seconds
          </h3>
          <p className="text-xs text-emerald-800 mt-1">
            Input your price, COGS, and fulfillment expenses into our dedicated
            ROAS calculator.
          </p>
        </div>
        <Link
          href="/calculators/break-even-roas-calculator"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 flex-shrink-0"
        >
          <span>Open ROAS Calculator</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <FaqAccordion items={faqs} />
    </article>
  );
}
