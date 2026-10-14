import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo/metadata';
import { WebApplicationJsonLd } from '@/lib/seo/jsonld';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { TargetProfitPriceCalculator } from '@/components/calculators/TargetProfitPriceCalculator';
import { WorkedExample } from '@/components/WorkedExample';
import { FaqAccordion } from '@/components/FaqAccordion';
import { AdSlot } from '@/components/AdSlot';
import { Target, ArrowRight, BookOpen, Calculator } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Target Profit Price Calculator: Price for Desired Margin %',
  description:
    'Calculate the exact selling price needed to achieve your target profit margin. Accounts for product cost, shipping, marketplace fees, and advertising.',
  path: '/calculators/target-profit-price-calculator',
  keywords: [
    'target profit price calculator',
    'how to price a product for profit',
    'target margin calculator',
    'reverse profit margin calculator',
    'selling price formula',
  ],
});

const faqs = [
  {
    question: 'How do you calculate the selling price needed for a target margin?',
    answer:
      'Selling Price is determined by dividing total fixed expenses (product cost, shipping paid, packaging, ad spend, other expenses, and fixed order fees) by the denominator: [1 - (Variable Fee Rate + Desired Margin Rate)], then subtracting any shipping fee charged to the customer.',
  },
  {
    question: 'Why can’t I just add my target margin percentage to my product cost?',
    answer:
      'Adding a percentage to your cost is markup, not margin. If an item costs $50 and you add 20% ($10), you sell it for $60. Your profit margin is $10 ÷ $60 = 16.7%, NOT 20%. Furthermore, this ignores marketplace fees and payment processing, which are charged on the final total price. This calculator handles the full reverse mathematical formula correctly.',
  },
  {
    question: 'Why does the calculator say my target margin is mathematically impossible?',
    answer:
      'Because marketplace fees and profit margin are both percentages of the final selling price, their sum cannot equal or exceed 100%. If platform and processing fees total 18% and you demand an 85% profit margin, together they require 103% of revenue, leaving less than zero percent to cover your inventory and shipping costs.',
  },
  {
    question: 'Does this calculator handle free shipping?',
    answer:
      'Yes. If you offer free shipping to the buyer, enter $0.00 for "Shipping Charged to Buyer". The calculator will automatically factor your shipping postage cost into the required item price.',
  },
  {
    question: 'Can I include advertising cost per order in my target price calculation?',
    answer:
      'Yes. Including your target Customer Acquisition Cost (CAC or ad spend per order) ensures that your calculated list price covers both manufacturing and marketing while preserving your desired net margin.',
  },
];

export default function TargetProfitPriceCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <WebApplicationJsonLd
        name="Target Profit Price Calculator"
        description="Calculate the exact retail price required to achieve a desired net profit margin percentage."
        url="/calculators/target-profit-price-calculator"
      />

      <Breadcrumbs
        items={[
          { name: 'Calculators', item: '/calculators/product-profit-calculator' },
          {
            name: 'Target Profit Price Calculator',
            item: '/calculators/target-profit-price-calculator',
          },
        ]}
      />

      {/* Header */}
      <div className="my-6 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
          <Target className="w-3.5 h-3.5" />
          <span>Strategic Pricing Suite</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
          Target Profit Margin Price Calculator
        </h1>
        <p className="mt-3 text-base text-neutral-600 leading-relaxed">
          Never underprice a product again. Enter your product costs, fulfillment
          expenses, and platform fee percentages to determine the exact selling
          price required to hit your target net margin.
        </p>
      </div>

      <AdSlot slotId="target-calc-top" format="horizontal" />

      {/* Calculator */}
      <section aria-label="Target Price Calculator Tool" className="my-8">
        <TargetProfitPriceCalculator />
      </section>

      <AdSlot slotId="target-calc-mid" format="horizontal" />

      {/* Worked Example */}
      <WorkedExample
        title="Worked Example: Pricing a Product to Guarantee a 30% Net Profit Margin"
        scenario="A business owner manufactures an item for $18.00, pays $5.50 in carrier postage, $1.20 in packaging, offers free shipping to the customer ($0.00 charged), sells on a marketplace with a 12.0% fee and 2.9% + $0.30 payment processing, and budgets $4.00 for advertising per order. They want to ensure a clean 30.0% net margin."
        steps={[
          {
            step: 'Sum Fixed & Non-Variable Costs',
            formula: 'COGS ($18.00) + Postage ($5.50) + Packaging ($1.20) + Ads ($4.00) + Fixed Fee ($0.30)',
            calculation: '$18.00 + $5.50 + $1.20 + $4.00 + $0.30',
            result: '$29.00',
          },
          {
            step: 'Calculate Combined Variable Fee Rate',
            formula: 'Marketplace Fee (12.0%) + Payment Processing (2.9%)',
            calculation: '12.0% + 2.9%',
            result: '14.9% (0.149)',
          },
          {
            step: 'Compute the Formula Denominator',
            formula: '1 - (Variable Fee Rate + Desired Margin Rate)',
            calculation: '1 - (0.149 + 0.30)',
            result: '0.551',
          },
          {
            step: 'Calculate Required Selling Price',
            formula: 'Fixed Costs ($29.00) ÷ Denominator (0.551)',
            calculation: '$29.00 ÷ 0.551',
            result: '$52.63',
          },
          {
            step: 'Verify the Resulting Profit',
            formula: 'Revenue ($52.63) - Platform Fees ($8.14) - Fixed Costs ($28.70)',
            calculation: '$52.63 - $8.14 - $28.70',
            result: '$15.79 profit',
          },
          {
            step: 'Confirm Effective Margin',
            formula: '($15.79 ÷ $52.63) × 100',
            calculation: '($15.79 ÷ $52.63) × 100',
            result: '30.00% exact',
          },
        ]}
        conclusion="By listing the product at $52.63, the seller covers all $29.00 in fixed fulfillment costs, pays $8.14 in platform commissions, and retains an exact 30.0% ($15.79) net profit margin."
      />

      {/* Guide Content */}
      <div className="my-12 prose prose-neutral max-w-none bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-xs space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          The Reverse Pricing Formula Explained
        </h2>

        <p className="text-sm text-neutral-700 leading-relaxed">
          Standard markup formulas fail because marketplace commissions and
          credit card processing fees are calculated against the final retail
          price, not your original cost. To solve for price when fees and profit
          are both variable percentages, we use algebraic substitution:
        </p>

        <div className="text-xs font-mono bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-2">
          <div className="font-bold text-neutral-900">
            Target Price = Fixed Costs ÷ [1 - (Fee% + Margin%)] - Shipping Charged
          </div>
          <p className="text-neutral-600 font-sans">
            Where <em>Fixed Costs</em> includes product cost, shipping paid,
            packaging, advertising spend, other expenses, and fixed per-order fees.
          </p>
        </div>

        <h3 className="text-lg font-bold text-neutral-900">
          Why Impossible Targets Occur
        </h3>
        <p className="text-sm text-neutral-700 leading-relaxed">
          If your variable fees are 15% and you request an 85% margin, the
          denominator becomes 1 - (0.15 + 0.85) = 0. In financial terms, fees
          and desired profit consume 100% of revenue, leaving $0 to pay for the
          physical product or postage. The calculator flags this immediately so
          you can set realistic, achievable price points.
        </p>
      </div>

      {/* Internal Navigation */}
      <section className="my-10 bg-neutral-900 text-white rounded-2xl p-6 sm:p-8">
        <h2 className="text-lg font-bold">Related Seller Tools & Guides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <Link
            href="/guides/profit-margin-vs-markup"
            className="p-4 bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/60 rounded-xl transition-colors group"
          >
            <div className="font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
              <span>Margin vs Markup Guide</span>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Deep dive into formulas, conversion tables, and real pricing math.
            </p>
          </Link>

          <Link
            href="/calculators/product-profit-calculator"
            className="p-4 bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/60 rounded-xl transition-colors group"
          >
            <div className="font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
              <span>Universal Profit Calculator</span>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Verify your calculated target price inside the complete profit engine.
            </p>
          </Link>

          <Link
            href="/calculators/break-even-roas-calculator"
            className="p-4 bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/60 rounded-xl transition-colors group"
          >
            <div className="font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
              <span>Break-Even ROAS</span>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Find how much ad spend your calculated selling price can support.
            </p>
          </Link>
        </div>
      </section>

      <FaqAccordion items={faqs} />
    </div>
  );
}
