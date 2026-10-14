import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo/metadata';
import { WebApplicationJsonLd } from '@/lib/seo/jsonld';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BreakEvenRoasCalculator } from '@/components/calculators/BreakEvenRoasCalculator';
import { WorkedExample } from '@/components/WorkedExample';
import { FaqAccordion } from '@/components/FaqAccordion';
import { AdSlot } from '@/components/AdSlot';
import { Scale, ArrowRight, BookOpen, TrendingUp } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Break-Even ROAS Calculator: Ad Spend & Profitability Formula',
  description:
    'Free break-even ROAS calculator for ecommerce advertising. Find your minimum required Return on Ad Spend, maximum CPA, and target ROAS for Meta, Google, and Amazon ads.',
  path: '/calculators/break-even-roas-calculator',
  keywords: [
    'break even roas calculator',
    'roas calculator ecommerce',
    'return on ad spend formula',
    'target roas calculator',
    'break even cpa calculator',
    'acos to roas calculator',
  ],
});

const faqs = [
  {
    question: 'What is Break-Even ROAS?',
    answer:
      'Break-Even ROAS (Return on Ad Spend) is the minimum multiple of revenue your advertising campaigns must generate to cover all product manufacturing, fulfillment, payment, and platform costs without losing money. At your break-even ROAS, net profit from advertising is exactly $0.00.',
  },
  {
    question: 'How is Break-Even ROAS calculated?',
    answer:
      'Break-Even ROAS = Selling Price ÷ Pre-Ad Contribution Margin. For example, if you sell an item for $100 and your product, shipping, and fee expenses total $60, your pre-ad contribution margin is $40. Your break-even ROAS is $100 ÷ $40 = 2.50x. Any campaign operating above 2.50x ROAS produces positive profit.',
  },
  {
    question: 'How do ROAS and ACoS relate to each other?',
    answer:
      'ROAS (Return on Ad Spend) and ACoS (Advertising Cost of Sale) are mathematical inverses: ROAS = 1 ÷ ACoS, and ACoS = 1 ÷ ROAS. A 25% ACoS corresponds to a 4.0x ROAS (1 ÷ 0.25 = 4.0). A 50% ACoS corresponds to a 2.0x ROAS.',
  },
  {
    question: 'What if my pre-ad contribution is negative or zero?',
    answer:
      'If your product cost, shipping, and fees already equal or exceed the selling price before advertising, your pre-ad contribution is zero or negative. In that case, break-even ROAS is mathematically impossible because every sale loses money regardless of ad performance. You must increase your price or lower non-ad costs first.',
  },
  {
    question: 'What is the difference between Break-Even ROAS and Target ROAS?',
    answer:
      'Break-Even ROAS produces zero net profit—it is your safety threshold. Target ROAS is higher than break-even because it builds in your desired dollar profit per order. If your break-even ROAS is 2.0x, you might set a Target ROAS of 3.0x or 3.5x in Google Ads or Meta Ads Manager to secure healthy net earnings.',
  },
];

export default function BreakEvenRoasCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <WebApplicationJsonLd
        name="Break-Even ROAS Calculator"
        description="Calculate break-even Return on Ad Spend (ROAS), maximum CPA, and target ROAS for ecommerce marketing campaigns."
        url="/calculators/break-even-roas-calculator"
      />

      <Breadcrumbs
        items={[
          { name: 'Calculators', item: '/calculators/product-profit-calculator' },
          {
            name: 'Break-Even ROAS Calculator',
            item: '/calculators/break-even-roas-calculator',
          },
        ]}
      />

      {/* Header */}
      <div className="my-6 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
          <Scale className="w-3.5 h-3.5" />
          <span>Paid Advertising Suite</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
          Break-Even ROAS & Target Ad Spend Calculator
        </h1>
        <p className="mt-3 text-base text-neutral-600 leading-relaxed">
          Stop guessing whether your Meta, Google, TikTok, or Amazon advertising
          campaigns are truly making money. Calculate your exact break-even
          ROAS, maximum allowable Cost Per Acquisition (CPA), and target ROAS
          needed to achieve your profit goals.
        </p>
      </div>

      <AdSlot slotId="roas-calc-top" format="horizontal" />

      {/* Calculator Component */}
      <section aria-label="Break-Even ROAS Calculator Tool" className="my-8">
        <BreakEvenRoasCalculator />
      </section>

      <AdSlot slotId="roas-calc-mid" format="horizontal" />

      {/* Worked Example */}
      <WorkedExample
        title="Worked Example: Determining Break-Even and Target ROAS for an $80 Direct-to-Consumer Item"
        scenario="An e-commerce brand sells an ergonomic desk accessory for $80.00 on Shopify. Product manufacturing COGS is $20.00, outbound shipping and box packaging is $7.00, payment processing fees (Shopify Payments 2.9% + $0.30) are $2.62, and variable handling/return allowances total $2.38. The founder wants to earn at least $15.00 net profit per order from Facebook Ads."
        steps={[
          {
            step: 'Calculate Total Costs Before Advertising',
            formula: 'COGS + Shipping + Payment Fees + Other Costs',
            calculation: '$20.00 + $7.00 + $2.62 + $2.38',
            result: '$32.00',
          },
          {
            step: 'Calculate Pre-Ad Contribution Margin',
            formula: 'Selling Price ($80.00) - Pre-Ad Costs ($32.00)',
            calculation: '$80.00 - $32.00',
            result: '$48.00 (60.0%)',
          },
          {
            step: 'Determine Break-Even Advertising Spend',
            formula: 'Maximum allowable CPA to break even ($0 profit)',
            calculation: 'Equal to Pre-Ad Contribution',
            result: '$48.00 / order',
          },
          {
            step: 'Calculate Break-Even ROAS',
            formula: 'Selling Price ($80.00) ÷ Break-Even Ad Spend ($48.00)',
            calculation: '$80.00 ÷ $48.00',
            result: '1.67x ROAS',
          },
          {
            step: 'Calculate Target Max Ad Spend for $15 Profit',
            formula: 'Contribution ($48.00) - Desired Profit ($15.00)',
            calculation: '$48.00 - $15.00',
            result: '$33.00 max CPA',
          },
          {
            step: 'Calculate Target ROAS for $15 Profit',
            formula: 'Selling Price ($80.00) ÷ Target Ad Spend ($33.00)',
            calculation: '$80.00 ÷ $33.00',
            result: '2.42x ROAS',
          },
        ]}
        conclusion="To avoid losing money on ads, campaigns must maintain a minimum 1.67x ROAS. To pocket the founder's target $15.00 profit per unit sold, campaigns must average at least 2.42x ROAS (maximum $33.00 CPA)."
      />

      {/* Guide Content */}
      <div className="my-12 prose prose-neutral max-w-none bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-xs space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          The Danger of Blended Ad Platform ROAS Metrics
        </h2>

        <p className="text-sm text-neutral-700 leading-relaxed">
          In advertising dashboards (like Meta Ads Manager or Google Ads), you
          often see campaign ROAS reported at 2.2x or 3.0x. Without knowing your
          exact cost structure, a 2.5x ROAS can be either wildly profitable or
          actively driving your business into bankruptcy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono bg-neutral-50 p-4 rounded-xl border border-neutral-200">
          <div className="space-y-1">
            <div className="font-bold text-neutral-900">Pre-Ad Contribution:</div>
            <div className="text-neutral-600">Contribution = Revenue - (COGS + Shipping + Fees)</div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-neutral-900">Break-Even ROAS:</div>
            <div className="text-neutral-600">Break-Even ROAS = Revenue ÷ Pre-Ad Contribution</div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-neutral-900">Break-Even ACoS:</div>
            <div className="text-neutral-600">Break-Even ACoS = Pre-Ad Contribution ÷ Revenue</div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-neutral-900">Target ROAS:</div>
            <div className="text-neutral-600">Target ROAS = Revenue ÷ (Contribution - Desired Profit)</div>
          </div>
        </div>

        <h3 className="text-lg font-bold text-neutral-900">
          How Gross Margins Dictate Your Minimum ROAS
        </h3>
        <p className="text-sm text-neutral-700 leading-relaxed">
          High-margin products (e.g., 80% gross margin) require only a 1.25x
          break-even ROAS (1 ÷ 0.80 = 1.25x). Low-margin products (e.g., 25%
          gross margin) require a 4.0x break-even ROAS (1 ÷ 0.25 = 4.0x) just to
          reach $0 profit. Understanding your unit economics before scaling paid
          media is the single most important factor in e-commerce survival.
        </p>
      </div>

      {/* Internal Navigation */}
      <section className="my-10 bg-neutral-900 text-white rounded-2xl p-6 sm:p-8">
        <h2 className="text-lg font-bold">Related Educational Guides & Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <Link
            href="/guides/break-even-roas-explained"
            className="p-4 bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/60 rounded-xl transition-colors group"
          >
            <div className="font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
              <span>Deep-Dive ROAS Guide</span>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Read our full masterclass on unit economics and scaling paid ads safely.
            </p>
          </Link>

          <Link
            href="/calculators/product-profit-calculator"
            className="p-4 bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/60 rounded-xl transition-colors group"
          >
            <div className="font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
              <span>Universal Calculator</span>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Plug in ad spend alongside return allowances and marketplace fees.
            </p>
          </Link>

          <Link
            href="/calculators/target-profit-price-calculator"
            className="p-4 bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/60 rounded-xl transition-colors group"
          >
            <div className="font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
              <span>Target Price Calculator</span>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Increase product pricing to absorb higher advertising acquisition costs.
            </p>
          </Link>
        </div>
      </section>

      <FaqAccordion items={faqs} />
    </div>
  );
}
