import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo/metadata';
import { WebApplicationJsonLd } from '@/lib/seo/jsonld';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { EtsyCalculator } from '@/components/calculators/EtsyCalculator';
import { WorkedExample } from '@/components/WorkedExample';
import { FaqAccordion } from '@/components/FaqAccordion';
import { AdSlot } from '@/components/AdSlot';
import { Tag, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Etsy Fee Calculator: Calculate 6.5% Transaction & Payment Fees (US, UK, CA)',
  description:
    'Free Etsy fee and profit calculator for handmade sellers and vintage shops. Estimate listing fees, 6.5% transaction fees, Etsy Payments processing, and Offsite Ads.',
  path: '/calculators/etsy-fee-calculator',
  keywords: [
    'etsy fee calculator',
    'etsy profit calculator',
    'etsy seller calculator',
    'etsy fee breakdown',
    'etsy 6.5 percent transaction fee',
  ],
});

const faqs = [
  {
    question: 'How much does Etsy charge sellers per sale?',
    answer:
      'Etsy charges four primary fee types: (1) A $0.20 USD listing fee (auto-renewed every 4 months or after each sale); (2) A 6.5% transaction fee applied to the total order amount including postage and gift wrap; (3) An Etsy Payments processing fee (3.0% + $0.25 in the US, 4.0% + £0.20 in the UK, 3.0-4.0% + $0.25 in Canada); and (4) An optional or mandatory 12% to 15% Offsite Ads fee if a sale originates from an external Google/Facebook ad placed by Etsy.',
  },
  {
    question: 'Are Etsy Offsite Ads mandatory?',
    answer:
      'If your Etsy shop made $10,000 USD or more in gross sales over any trailing 12-month period, participation in Offsite Ads is mandatory at a discounted 12% fee on attributed sales. If your shop generated less than $10,000 USD, participation is optional at 15%, and you can opt out at any time in your shop settings.',
  },
  {
    question: 'Does Etsy charge the 6.5% transaction fee on shipping?',
    answer:
      'Yes. Etsy charges its 6.5% transaction fee on both the item listing price AND the shipping postage charged to the customer. This policy prevents sellers from underpricing items and inflating shipping costs to avoid commission fees.',
  },
  {
    question: 'What is the UK Regulatory Operating Fee on Etsy?',
    answer:
      'In the United Kingdom, Etsy charges an additional 0.32% Regulatory Operating Fee on the item price and customer shipping. This small fee was instituted to offset compliance costs associated with UK digital services regulations.',
  },
  {
    question: 'Do I pay listing fees if my item does not sell?',
    answer:
      'Yes. The $0.20 listing fee is charged when you publish or renew an item listing, regardless of whether it sells. Listings remain active for 4 months or until sold. When an item sells, it automatically renews for $0.20 if inventory quantity remains.',
  },
];

export default function EtsyFeeCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <WebApplicationJsonLd
        name="Etsy Fee & Profit Calculator"
        description="Calculate Etsy listing fees, 6.5% transaction fees, Etsy Payments processing, offsite ads, and net profit."
        url="/calculators/etsy-fee-calculator"
      />

      <Breadcrumbs
        items={[
          { name: 'Calculators', item: '/calculators/product-profit-calculator' },
          {
            name: 'Etsy Fee Calculator',
            item: '/calculators/etsy-fee-calculator',
          },
        ]}
      />

      {/* Header */}
      <div className="my-6 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
          <Tag className="w-3.5 h-3.5" />
          <span>Etsy Shop Suite</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
          Etsy Fee & Profit Calculator
        </h1>
        <p className="mt-3 text-base text-neutral-600 leading-relaxed">
          Estimate your exact Etsy fees, net seller payout, and true profit
          margins across the United States, United Kingdom, and Canada. Includes
          the 6.5% transaction fee, Etsy Payments rates, listing fees, and
          Offsite Ads.
        </p>
      </div>

      <AdSlot slotId="etsy-calc-top" format="horizontal" />

      {/* Calculator Component */}
      <section aria-label="Etsy Fee Calculator Tool" className="my-8">
        <EtsyCalculator />
      </section>

      <AdSlot slotId="etsy-calc-mid" format="horizontal" />

      {/* Worked Example */}
      <WorkedExample
        title="Worked Example: Selling a Personalized Leather Keychain for $28.00 on Etsy US"
        scenario="An artisan sells a handmade monogrammed keychain for $28.00 and charges $4.50 for standard shipping. Raw leather and hardware materials cost $5.50. The seller pays $3.80 for USPS postage and $0.70 for packaging. The sale is made directly through organic Etsy search (0% Offsite Ads)."
        steps={[
          {
            step: 'Calculate Total Customer Payment',
            formula: 'Item Price ($28.00) + Shipping Charged ($4.50)',
            calculation: '$28.00 + $4.50',
            result: '$32.50',
          },
          {
            step: 'Etsy Listing Fee',
            formula: 'Standard listing renewal fee',
            calculation: '$0.20 flat',
            result: '$0.20',
          },
          {
            step: 'Etsy Transaction Fee (6.5%)',
            formula: 'Total Payment ($32.50) × 6.5%',
            calculation: '$32.50 × 0.065',
            result: '$2.11',
          },
          {
            step: 'Etsy Payments Processing Fee (3.0% + $0.25)',
            formula: '($32.50 × 3.0%) + $0.25',
            calculation: '$0.98 + $0.25',
            result: '$1.23',
          },
          {
            step: 'Sum Total Etsy Fees',
            formula: '$0.20 + $2.11 + $1.23',
            calculation: '$0.20 + $2.11 + $1.23',
            result: '$3.54 (10.9% of sale)',
          },
          {
            step: 'Deduct Materials & Shipping',
            formula: 'Materials ($5.50) + Postage ($3.80) + Pack ($0.70)',
            calculation: '$5.50 + $3.80 + $0.70',
            result: '$10.00',
          },
          {
            step: 'Calculate Net Seller Profit',
            formula: 'Total Revenue ($32.50) - All Costs ($13.54)',
            calculation: '$32.50 - $13.54',
            result: '$18.96',
          },
        ]}
        conclusion="On a $32.50 total order, Etsy platform deductions total $3.54 (10.9%). After covering materials and postage, the seller earns $18.96 net profit (58.3% profit margin)."
      />

      {/* Guide Content */}
      <div className="my-12 prose prose-neutral max-w-none bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-xs space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          The Anatomy of Etsy Seller Fees in 2026
        </h2>

        <p className="text-sm text-neutral-700 leading-relaxed">
          Etsy fee schedules are straightforward once you understand the four
          distinct components:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-neutral-50 p-4 rounded-xl border border-neutral-200">
          <div className="space-y-1">
            <div className="font-bold text-neutral-900">1. Listing Fee:</div>
            <div className="text-neutral-600 font-mono">
              $0.20 USD / £0.16 GBP / CA$0.27 CAD per listing (valid for 4 months or until sold).
            </div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-neutral-900">2. Transaction Fee:</div>
            <div className="text-neutral-600 font-mono">
              Flat 6.5% on item price + shipping charged + gift wrap.
            </div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-neutral-900">3. Etsy Payments Fee:</div>
            <div className="text-neutral-600 font-mono">
              US: 3.0% + $0.25 | UK: 4.0% + £0.20 | CA: 3.0% + CA$0.25.
            </div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-neutral-900">4. Offsite Ads Fee:</div>
            <div className="text-neutral-600 font-mono">
              0% (organic) | 15% (optional &lt; $10k) | 12% (mandatory &ge; $10k).
            </div>
          </div>
        </div>

        <h3 className="text-lg font-bold text-neutral-900">
          How to Price for Etsy Offsite Ads Without Losing Margins
        </h3>
        <p className="text-sm text-neutral-700 leading-relaxed">
          Because Offsite Ads take an additional 12% to 15% on attributed
          orders, shops with thin margins (under 25%) risk losing money whenever
          a sale originates from a Google Shopping ad. Experienced Etsy sellers
          target profit margins of at least 40% to 50% so that even with a 12% or
          15% ad deduction, the sale remains solidly profitable.
        </p>
      </div>

      {/* Internal Navigation */}
      <section className="my-10 bg-neutral-900 text-white rounded-2xl p-6 sm:p-8">
        <h2 className="text-lg font-bold">Related Financial Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <Link
            href="/calculators/target-profit-price-calculator"
            className="p-4 bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/60 rounded-xl transition-colors group"
          >
            <div className="font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
              <span>Target Profit Price</span>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Find the exact price to list your item to lock in a 30% or 40% margin.
            </p>
          </Link>

          <Link
            href="/calculators/ebay-profit-calculator"
            className="p-4 bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/60 rounded-xl transition-colors group"
          >
            <div className="font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
              <span>eBay Fee Calculator</span>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Compare eBay fees vs Etsy fees for your product catalog.
            </p>
          </Link>

          <Link
            href="/guides/profit-margin-vs-markup"
            className="p-4 bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/60 rounded-xl transition-colors group"
          >
            <div className="font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
              <span>Margin vs Markup Guide</span>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Understand why 50% markup does not equal 50% profit margin.
            </p>
          </Link>
        </div>
      </section>

      <FaqAccordion items={faqs} />
    </div>
  );
}
