import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo/metadata';
import { ArticleJsonLd } from '@/lib/seo/jsonld';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FaqAccordion } from '@/components/FaqAccordion';
import { AdSlot } from '@/components/AdSlot';
import {
  TrendingUp,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Scale,
} from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Profit Margin vs. Markup: The Critical Difference (Formulas & Tables)',
  description:
    'Learn the key mathematical differences between profit margin and markup. Includes side-by-side comparison tables, conversion formulas, and pricing mistakes to avoid.',
  path: '/guides/profit-margin-vs-markup',
  keywords: [
    'profit margin vs markup',
    'difference between margin and markup',
    'margin vs markup formula',
    'markup to margin conversion table',
    'ecommerce pricing strategy',
  ],
  type: 'article',
  publishedTime: '2025-01-15T00:00:00Z',
  modifiedTime: '2026-10-01T00:00:00Z',
});

const faqs = [
  {
    question: 'Can profit margin ever exceed 100%?',
    answer:
      'No. Because profit margin is calculated as Net Profit divided by Total Revenue, and net profit cannot exceed gross revenue in physical trade, profit margin can never reach or exceed 100%. Markup, on the other hand, can easily exceed 100%, 200%, or 1,000% if an item is sold for multiple times its acquisition cost.',
  },
  {
    question: 'How do I convert a 50% markup into profit margin?',
    answer:
      'Use the conversion formula: Margin = Markup ÷ (1 + Markup). If Markup is 50% (0.50), Margin = 0.50 ÷ (1 + 0.50) = 0.50 ÷ 1.50 = 33.33%.',
  },
  {
    question: 'How do I convert a 40% desired profit margin into markup?',
    answer:
      'Use the conversion formula: Markup = Margin ÷ (1 - Margin). If Margin is 40% (0.40), Markup = 0.40 ÷ (1 - 0.40) = 0.40 ÷ 0.60 = 66.67%. You must mark up your product cost by 66.67% to achieve a 40% margin.',
  },
  {
    question: 'Which metric should e-commerce sellers focus on most?',
    answer:
      'Experienced sellers focus on Profit Margin because marketplace fees, credit card charges, advertising budgets, and business expenses are all budgeted as percentages of total revenue. Thinking only in terms of markup leads to underpricing once platform commissions are deducted.',
  },
];

export default function ProfitMarginVsMarkupPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <ArticleJsonLd
        title="Profit Margin vs. Markup: The Critical Difference Explained"
        description="Learn the key mathematical differences between profit margin and markup with side-by-side tables and formulas."
        url="/guides/profit-margin-vs-markup"
        datePublished="2025-01-15T00:00:00Z"
        dateModified="2026-10-01T00:00:00Z"
      />

      <Breadcrumbs
        items={[
          { name: 'Guides & Education', item: '/guides' },
          {
            name: 'Profit Margin vs Markup',
            item: '/guides/profit-margin-vs-markup',
          },
        ]}
      />

      {/* Header */}
      <header className="my-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Pricing Strategy Masterclass</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 leading-tight">
          Profit Margin vs. Markup: The Critical Difference Explained
        </h1>
        <p className="mt-3 text-base text-neutral-600 leading-relaxed">
          Confusing profit margin with markup is one of the most common and
          expensive mistakes online sellers make. Here is the exact math,
          conversion formulas, and why a 50% markup will never give you a 50%
          profit margin.
        </p>
      </header>

      <AdSlot slotId="guide-margin-top" format="horizontal" />

      {/* Main Content Body */}
      <div className="my-8 prose prose-neutral max-w-none text-neutral-800 space-y-6 text-sm sm:text-base leading-relaxed">
        <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
          The Fundamental Distinction
        </h2>

        <p>
          At their core, both margin and markup describe the relationship between
          your <strong>cost</strong> and your <strong>selling price</strong>.
          However, their mathematical denominators are completely different:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6">
          <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
              Profit Margin
            </span>
            <h3 className="text-lg font-bold text-neutral-900">
              Measured Relative to Revenue
            </h3>
            <p className="text-xs text-neutral-600">
              What percentage of the final selling price remains as profit after
              costs are paid.
            </p>
            <div className="bg-neutral-50 p-2.5 rounded font-mono text-xs text-neutral-800 font-semibold border border-neutral-100">
              Margin % = (Profit ÷ Selling Price) × 100
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded">
              Markup
            </span>
            <h3 className="text-lg font-bold text-neutral-900">
              Measured Relative to Cost
            </h3>
            <p className="text-xs text-neutral-600">
              What percentage you add on top of your product acquisition cost to
              set your selling price.
            </p>
            <div className="bg-neutral-50 p-2.5 rounded font-mono text-xs text-neutral-800 font-semibold border border-neutral-100">
              Markup % = (Profit ÷ Product Cost) × 100
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
          The Real-World Mistake: A $50 Cost Example
        </h2>

        <p>
          Imagine you purchase an item from your wholesale supplier for{' '}
          <strong>$50.00</strong>. Your goal is to run a business with a{' '}
          <strong>30% profit margin</strong>.
        </p>

        <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl not-prose space-y-2 text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-bold text-rose-900">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>The Incorrect Approach (Using Markup Instead of Margin):</span>
          </div>
          <p className="text-rose-800">
            The seller takes $50.00 and adds 30% ($15.00), pricing the item at{' '}
            <strong>$65.00</strong>. When the item sells for $65.00, the profit is
            $15.00. The actual profit margin is:
          </p>
          <div className="font-mono font-bold text-rose-950 bg-white p-2 rounded border border-rose-200">
            $15.00 ÷ $65.00 = 23.08% Margin (NOT 30%!)
          </div>
          <p className="text-rose-800">
            The seller fell nearly 7 percentage points short of their business
            target before even paying platform fees.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl not-prose space-y-2 text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-bold text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>The Correct Margin Calculation:</span>
          </div>
          <p className="text-emerald-800">
            To earn a true 30% margin, your cost must represent 70% of the
            selling price (100% - 30% = 70%):
          </p>
          <div className="font-mono font-bold text-emerald-950 bg-white p-2 rounded border border-emerald-200">
            Selling Price = $50.00 ÷ (1 - 0.30) = $50.00 ÷ 0.70 = $71.43
          </div>
          <p className="text-emerald-800">
            At $71.43, profit is $21.43. Divided by $71.43, you achieve an exact{' '}
            <strong>30.00% profit margin</strong>. That requires a{' '}
            <strong>42.86% markup</strong> ($21.43 ÷ $50.00).
          </p>
        </div>

        <h2 className="text-2xl font-bold text-neutral-900 tracking-tight pt-4">
          Margin vs. Markup Quick Reference Table
        </h2>

        <p>
          Use this conversion reference table to see the corresponding markup
          needed to achieve standard e-commerce margin targets on a $100 base
          cost:
        </p>

        <div className="overflow-x-auto not-prose my-6">
          <table className="w-full text-left text-xs sm:text-sm border border-neutral-200 rounded-xl overflow-hidden">
            <thead className="bg-neutral-100 text-neutral-700 font-bold">
              <tr>
                <th className="py-3 px-4">Base Cost</th>
                <th className="py-3 px-4">Markup %</th>
                <th className="py-3 px-4">Selling Price</th>
                <th className="py-3 px-4">Dollar Profit</th>
                <th className="py-3 px-4 text-emerald-700">Profit Margin %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 bg-white">
              <tr>
                <td className="py-2.5 px-4 font-mono">$100.00</td>
                <td className="py-2.5 px-4 font-mono font-medium">15.0%</td>
                <td className="py-2.5 px-4 font-mono">$115.00</td>
                <td className="py-2.5 px-4 font-mono">$15.00</td>
                <td className="py-2.5 px-4 font-mono font-bold text-neutral-900">13.04%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-mono">$100.00</td>
                <td className="py-2.5 px-4 font-mono font-medium">25.0%</td>
                <td className="py-2.5 px-4 font-mono">$125.00</td>
                <td className="py-2.5 px-4 font-mono">$25.00</td>
                <td className="py-2.5 px-4 font-mono font-bold text-neutral-900">20.00%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-mono">$100.00</td>
                <td className="py-2.5 px-4 font-mono font-medium">50.0%</td>
                <td className="py-2.5 px-4 font-mono">$150.00</td>
                <td className="py-2.5 px-4 font-mono">$50.00</td>
                <td className="py-2.5 px-4 font-mono font-bold text-neutral-900">33.33%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-mono">$100.00</td>
                <td className="py-2.5 px-4 font-mono font-medium">66.7%</td>
                <td className="py-2.5 px-4 font-mono">$166.67</td>
                <td className="py-2.5 px-4 font-mono">$66.67</td>
                <td className="py-2.5 px-4 font-mono font-bold text-emerald-700">40.00%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-mono">$100.00</td>
                <td className="py-2.5 px-4 font-mono font-medium">100.0% (Keystone)</td>
                <td className="py-2.5 px-4 font-mono">$200.00</td>
                <td className="py-2.5 px-4 font-mono">$100.00</td>
                <td className="py-2.5 px-4 font-mono font-bold text-emerald-700">50.00%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-mono">$100.00</td>
                <td className="py-2.5 px-4 font-mono font-medium">150.0%</td>
                <td className="py-2.5 px-4 font-mono">$250.00</td>
                <td className="py-2.5 px-4 font-mono">$150.00</td>
                <td className="py-2.5 px-4 font-mono font-bold text-emerald-700">60.00%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-mono">$100.00</td>
                <td className="py-2.5 px-4 font-mono font-medium">300.0%</td>
                <td className="py-2.5 px-4 font-mono">$400.00</td>
                <td className="py-2.5 px-4 font-mono">$300.00</td>
                <td className="py-2.5 px-4 font-mono font-bold text-emerald-700">75.00%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
          Direct Conversion Formulas
        </h2>

        <p>
          You can easily convert between margin and markup using these standard
          algebraic relationships:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6 font-mono text-xs">
          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200">
            <span className="font-bold text-neutral-900 block mb-1">
              Markup to Margin:
            </span>
            <div className="text-emerald-700 font-bold text-sm">
              Margin = Markup ÷ (1 + Markup)
            </div>
            <p className="font-sans text-neutral-500 mt-1">
              Example: 0.50 ÷ 1.50 = 33.3% margin.
            </p>
          </div>

          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200">
            <span className="font-bold text-neutral-900 block mb-1">
              Margin to Markup:
            </span>
            <div className="text-emerald-700 font-bold text-sm">
              Markup = Margin ÷ (1 - Margin)
            </div>
            <p className="font-sans text-neutral-500 mt-1">
              Example: 0.40 ÷ 0.60 = 66.7% markup.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Tool Callout */}
      <div className="my-10 bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-emerald-950 text-base">
            Calculate Your Target Selling Price Instantly
          </h3>
          <p className="text-xs text-emerald-800 mt-1">
            Let our automated pricing calculator factor in marketplace fees,
            postage, and target margins for you.
          </p>
        </div>
        <Link
          href="/calculators/target-profit-price-calculator"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 flex-shrink-0"
        >
          <span>Open Pricing Calculator</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <FaqAccordion items={faqs} />
    </article>
  );
}
