import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo/metadata';
import { WebApplicationJsonLd } from '@/lib/seo/jsonld';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AmazonFbaCalculator } from '@/components/calculators/AmazonFbaCalculator';
import { WorkedExample } from '@/components/WorkedExample';
import { FaqAccordion } from '@/components/FaqAccordion';
import { AdSlot } from '@/components/AdSlot';
import { Package, ArrowRight, BookOpen, Layers } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Amazon FBA Profit Calculator: Referral Fees & Pick & Pack Margins (US, UK, CA)',
  description:
    'Free Amazon FBA calculator for sellers. Estimate category referral fees (8-15%), FBA fulfillment pick and pack fees, monthly storage, and net unit profit.',
  path: '/calculators/amazon-fba-profit-calculator',
  keywords: [
    'amazon fba profit calculator',
    'amazon revenue calculator',
    'amazon fba fee calculator',
    'fba fulfillment fee estimator',
    'amazon seller margin calculator',
  ],
});

const faqs = [
  {
    question: 'How do Amazon FBA fees work?',
    answer:
      'Selling through Fulfillment by Amazon (FBA) involves two main fees paid directly to Amazon: (1) A Category Referral Fee, which is typically 8% to 15% of the item selling price (with a $0.30 minimum in most categories); and (2) An FBA Fulfillment Fee, which covers picking, packing, shipping to customer, customer service, and return handling, priced based on product dimensional weight and size tier.',
  },
  {
    question: 'What is the difference between Individual and Professional plans on Amazon?',
    answer:
      'The Individual selling plan has no monthly subscription fee, but Amazon charges a flat $0.99 USD (£0.75 GBP / CA$1.49 CAD) per-item fee on every unit sold. The Professional selling plan costs $39.99 USD (£25.00 GBP / CA$29.99 CAD) per month but waives the per-item fee. If you sell more than 40 units per month, the Professional plan is more economical.',
  },
  {
    question: 'How are FBA storage fees calculated?',
    answer:
      'Amazon charges monthly inventory storage fees based on the daily average volume in cubic feet occupied by your packaged units. Rates are lower during standard non-peak months (January to September, ~$0.78 to $0.87/cu ft in the US) and increase significantly during the Q4 peak holiday shopping season (October to December, ~$2.40/cu ft).',
  },
  {
    question: 'What are Inbound Placement Service fees on Amazon FBA?',
    answer:
      'Introduced in 2024, Amazon charges an Inbound Placement Service fee when sellers send inventory into fewer distribution centers (Minimal Shipment Splits) or allows sellers to waive the fee by distributing inventory across 4 or more regional fulfillment centers. Our calculator allows sellers to model these prep and inbound logistics costs per unit.',
  },
  {
    question: 'Does this calculator replace the official Amazon Revenue Calculator?',
    answer:
      'SellerMath provides fast, transparent benchmarks and customizable planning scenarios for US, UK, and Canadian sellers. While our fee rules are based on verified official Amazon rate cards, always cross-reference high-volume shipments with your official Amazon Seller Central Revenue Calculator before placing production orders.',
  },
];

export default function AmazonFbaCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <WebApplicationJsonLd
        name="Amazon FBA Seller Profit Calculator"
        description="Calculate Amazon referral fees, FBA pick and pack fulfillment fees, storage, and net seller profit."
        url="/calculators/amazon-fba-profit-calculator"
      />

      <Breadcrumbs
        items={[
          { name: 'Calculators', item: '/calculators/product-profit-calculator' },
          {
            name: 'Amazon FBA Calculator',
            item: '/calculators/amazon-fba-profit-calculator',
          },
        ]}
      />

      {/* Header */}
      <div className="my-6 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
          <Package className="w-3.5 h-3.5" />
          <span>Amazon FBA Suite</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
          Amazon FBA Profit & Fee Calculator
        </h1>
        <p className="mt-3 text-base text-neutral-600 leading-relaxed">
          Estimate your Amazon referral fees, FBA pick & pack fulfillment costs,
          inventory storage, PPC advertising deductions, and net unit margins for
          Amazon US, UK, and Canada.
        </p>
      </div>

      <AdSlot slotId="amazon-calc-top" format="horizontal" />

      {/* Calculator */}
      <section aria-label="Amazon FBA Profit Calculator Tool" className="my-8">
        <AmazonFbaCalculator />
      </section>

      <AdSlot slotId="amazon-calc-mid" format="horizontal" />

      {/* Worked Example */}
      <WorkedExample
        title="Worked Example: Selling a Silicone Spatula Set for $24.99 via Amazon FBA US"
        scenario="A private-label seller sells a 4-piece silicone spatula set for $24.99 in Home & Kitchen (15% referral fee). Manufacturing COGS is $4.50, sea freight shipping to Amazon is $1.20, prep/packaging is $0.50, and the item qualifies as Large Standard (under 1 lb) with a $3.95 FBA pick & pack fee. The seller allocates $3.50 in Amazon PPC ad spend per order and retains 1.5 months of stock."
        steps={[
          {
            step: 'Calculate Amazon Selling Price',
            formula: 'Retail Listing Price',
            calculation: '$24.99 gross revenue',
            result: '$24.99',
          },
          {
            step: 'Calculate Referral Fee (15%)',
            formula: 'Selling Price × 15%',
            calculation: '$24.99 × 0.15',
            result: '$3.75',
          },
          {
            step: 'Add FBA Pick & Pack Fee',
            formula: 'Large Standard under 1 lb tier',
            calculation: '$3.95 flat',
            result: '$3.95',
          },
          {
            step: 'Add Storage & Return Reserve',
            formula: 'Storage ($0.25) + 3.5% Return Reserve ($0.87)',
            calculation: '$0.25 + $0.87',
            result: '$1.12',
          },
          {
            step: 'Sum Total Amazon Platform Fees',
            formula: 'Referral ($3.75) + FBA ($3.95) + Storage/Returns ($1.12)',
            calculation: '$3.75 + $3.95 + $1.12',
            result: '$8.82 (35.3%)',
          },
          {
            step: 'Deduct COGS, Freight & PPC Ads',
            formula: 'Product ($4.50) + Freight ($1.20) + Prep ($0.50) + PPC ($3.50)',
            calculation: '$4.50 + $1.20 + $0.50 + $3.50',
            result: '$9.70',
          },
          {
            step: 'Calculate Net FBA Profit',
            formula: 'Revenue ($24.99) - All Deductions ($18.52)',
            calculation: '$24.99 - $18.52',
            result: '$6.47',
          },
        ]}
        conclusion="On a $24.99 retail price, Amazon takes $8.82 in platform and fulfillment fees (35.3%). After accounting for manufacturing, freight, and $3.50 in advertising, the seller earns $6.47 net profit per unit (25.9% margin, 143.8% ROI on product cost)."
      />

      {/* Guide Content */}
      <div className="my-12 prose prose-neutral max-w-none bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-xs space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          Mastering the Core Components of Amazon FBA Unit Economics
        </h2>

        <p className="text-sm text-neutral-700 leading-relaxed">
          Unlike merchant-fulfilled orders where you pack and ship orders from
          home, Amazon FBA handles logistics, customer returns, and Prime
          delivery in exchange for structured service fees:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-neutral-50 p-4 rounded-xl border border-neutral-200">
          <div className="space-y-1">
            <div className="font-bold text-neutral-900">Referral Commission:</div>
            <div className="text-neutral-600">
              8% to 15% depending on category. Media includes an additional $1.80 closing fee.
            </div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-neutral-900">FBA Fulfillment Fee:</div>
            <div className="text-neutral-600">
              Covers pick, pack, and Prime shipping. Heavily determined by dimensional weight.
            </div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-neutral-900">Monthly Storage Fee:</div>
            <div className="text-neutral-600">
              Charged per cubic foot. Increases roughly 3x during Q4 holiday peak (Oct-Dec).
            </div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-neutral-900">PPC Advertising (TACoS):</div>
            <div className="text-neutral-600">
              Total Advertising Cost of Sale. Critical for ranking new ASINs.
            </div>
          </div>
        </div>

        <h3 className="text-lg font-bold text-neutral-900">
          The &quot;Rule of Thirds&quot; in Amazon FBA
        </h3>
        <p className="text-sm text-neutral-700 leading-relaxed">
          Successful private-label sellers often use the rule of thirds as a
          quick viability rule of thumb: 1/3 of the selling price goes toward
          manufacturing and inbound freight, 1/3 covers Amazon referral and FBA
          fulfillment fees, and 1/3 remains for advertising and net profit. If
          Amazon fees exceed 45% of your retail price, profitability becomes
          fragile.
        </p>
      </div>

      {/* Related Tools */}
      <section className="my-10 bg-neutral-900 text-white rounded-2xl p-6 sm:p-8">
        <h2 className="text-lg font-bold">Related Seller Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <Link
            href="/calculators/break-even-roas-calculator"
            className="p-4 bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/60 rounded-xl transition-colors group"
          >
            <div className="font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
              <span>Break-Even ROAS</span>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Find your break-even ACoS and target ROAS for Amazon Sponsored Products.
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
              Determine the exact Buy Box price required to achieve 25% margin.
            </p>
          </Link>

          <Link
            href="/guides/how-to-calculate-product-profit"
            className="p-4 bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/60 rounded-xl transition-colors group"
          >
            <div className="font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
              <span>Profit Calculation Guide</span>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Comprehensive guide covering gross vs net profit and hidden deductions.
            </p>
          </Link>
        </div>
      </section>

      <FaqAccordion items={faqs} />
    </div>
  );
}
