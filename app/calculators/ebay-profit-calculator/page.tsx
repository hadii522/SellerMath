import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo/metadata';
import { WebApplicationJsonLd } from '@/lib/seo/jsonld';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { EbayCalculator } from '@/components/calculators/EbayCalculator';
import { WorkedExample } from '@/components/WorkedExample';
import { FaqAccordion } from '@/components/FaqAccordion';
import { AdSlot } from '@/components/AdSlot';
import { Store, ArrowRight, BookOpen, Info } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'eBay Profit Calculator: Final Value Fees & Seller Margins (US, UK, CA)',
  description:
    'Free eBay seller profit calculator for US, UK, and Canadian sellers. Estimate eBay final value fees, store subscription savings, Promoted Listings, and net payout.',
  path: '/calculators/ebay-profit-calculator',
  keywords: [
    'ebay profit calculator',
    'ebay fee calculator',
    'ebay final value fee calculator',
    'ebay margin calculator',
    'ebay seller calculator uk us canada',
  ],
});

const faqs = [
  {
    question: 'How much does eBay charge per sale in the US?',
    answer:
      'For most standard non-store sellers in the US, eBay charges a Final Value Fee (FVF) of 13.25% on the total amount of the sale (item price + shipping charged + any buyer sales tax handled by eBay) up to $7,500, plus a flat $0.30 to $0.40 fixed per-order fee. Portions of a sale over $7,500 are charged at 2.35%.',
  },
  {
    question: 'Do eBay UK private sellers pay 0% fees?',
    answer:
      'Yes, in early 2024 eBay UK eliminated final value selling fees for non-commercial private individual sellers across most consumer categories. However, registered eBay UK business sellers continue to pay standard category final value fees (~11.5% to 12.8% plus £0.30 fixed fee and UK VAT).',
  },
  {
    question: 'Does having an eBay Store subscription lower my selling fees?',
    answer:
      'Yes. An eBay Store subscription (Basic, Premium, Anchor) reduces your Final Value Fee percentage in many categories. For example, in General Merchandise it drops from 13.25% to 12.35%, and in Consumer Electronics from 9.0% down to 7.0%. Once your monthly sales volume exceeds approximately $1,000 to $1,500, the fee savings often outweigh the monthly store subscription cost.',
  },
  {
    question: 'When do I pay Promoted Listings fees on eBay?',
    answer:
      'With Promoted Listings Standard, eBay only charges your selected ad rate percentage if a buyer clicks on your promoted ad and purchases your item within 30 days of that click. If the buyer buys through organic search without clicking the sponsored ad, no advertising fee is charged.',
  },
  {
    question: 'Is buyer sales tax included in eBay fee calculations?',
    answer:
      'Yes, eBay assesses its Final Value Fee percentage on the gross amount received from the buyer, which legally includes state or provincial sales tax collected automatically by eBay as a marketplace facilitator. This calculator models item price and customer shipping; local buyer sales taxes can add a slight additional fee depending on the destination state.',
  },
];

export default function EbayProfitCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <WebApplicationJsonLd
        name="eBay Seller Profit Calculator"
        description="Estimate eBay final value fees, store discounts, promoted listings, and net seller profit for US, UK, and Canadian markets."
        url="/calculators/ebay-profit-calculator"
      />

      <Breadcrumbs
        items={[
          { name: 'Calculators', item: '/calculators/product-profit-calculator' },
          {
            name: 'eBay Profit Calculator',
            item: '/calculators/ebay-profit-calculator',
          },
        ]}
      />

      {/* Page Header */}
      <div className="my-6 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
          <Store className="w-3.5 h-3.5" />
          <span>eBay Marketplace Suite</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
          eBay Seller Profit & Fee Calculator
        </h1>
        <p className="mt-3 text-base text-neutral-600 leading-relaxed">
          Accurately calculate your eBay take-home payout, Final Value Fees
          (FVF), store subscriber discounts, Promoted Listings costs, and net
          profit margin for eBay US, UK, and Canada.
        </p>
      </div>

      <AdSlot slotId="ebay-calc-top" format="horizontal" />

      {/* Main Calculator */}
      <section aria-label="eBay Profit Calculator Tool" className="my-8">
        <EbayCalculator />
      </section>

      <AdSlot slotId="ebay-calc-mid" format="horizontal" />

      {/* Step-by-Step Worked Example */}
      <WorkedExample
        title="Worked Example: Selling a Vintage Camera on eBay US for $120.00"
        scenario="A seller lists a vintage 35mm film camera for $120.00 with $10.00 shipping charged to the buyer. The seller acquired the camera at a thrift market for $35.00, spends $8.50 on USPS Ground Advantage shipping, $2.00 on packaging, uses a standard non-store account in Consumer Electronics (9.0% FVF), and selects a 3.0% Promoted Listings ad rate."
        steps={[
          {
            step: 'Calculate Total Sale Amount',
            formula: 'Item Price + Shipping Charged',
            calculation: '$120.00 + $10.00',
            result: '$130.00',
          },
          {
            step: 'Calculate Final Value Fee (9.0%)',
            formula: 'Total Sale Amount × 9.0%',
            calculation: '$130.00 × 0.09',
            result: '$11.70',
          },
          {
            step: 'Add eBay Fixed Order Fee',
            formula: 'Standard Managed Payments per-order fee',
            calculation: '$0.35 flat',
            result: '$0.35',
          },
          {
            step: 'Add Promoted Listings Fee (3.0%)',
            formula: 'Total Sale Amount × 3.0%',
            calculation: '$130.00 × 0.03',
            result: '$3.90',
          },
          {
            step: 'Sum Total eBay Fees',
            formula: 'FVF ($11.70) + Order Fee ($0.35) + Ad ($3.90)',
            calculation: '$11.70 + $0.35 + $3.90',
            result: '$15.95',
          },
          {
            step: 'Deduct Acquisition & Shipping Costs',
            formula: 'Product ($35) + Actual Postage ($8.50) + Pack ($2.00)',
            calculation: '$35.00 + $8.50 + $2.00',
            result: '$45.50',
          },
          {
            step: 'Calculate Net Seller Profit',
            formula: 'Revenue ($130.00) - Total Deductions ($61.45)',
            calculation: '$130.00 - $61.45',
            result: '$68.55',
          },
        ]}
        conclusion="On a $130.00 gross order, total eBay fees represent 12.27% ($15.95). After covering inventory acquisition and shipping, the reseller pockets $68.55 net profit (52.7% margin, 195.9% ROI)."
      />

      {/* Guide Content */}
      <div className="my-12 prose prose-neutral max-w-none bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-xs space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          Understanding eBay Managed Payments & Final Value Fees
        </h2>

        <p className="text-sm text-neutral-700 leading-relaxed">
          Prior to Managed Payments, eBay sellers paid an insertion fee, a
          separate Final Value Fee to eBay, and a 2.9% + $0.30 fee to PayPal.
          Today, eBay consolidates payment processing and marketplace commission
          into a single combined <strong>Final Value Fee</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono bg-neutral-50 p-4 rounded-xl border border-neutral-200">
          <div className="space-y-1">
            <div className="font-bold text-neutral-900">Standard Most Categories:</div>
            <div className="text-neutral-600">13.25% up to $7,500 + $0.35 order fee</div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-neutral-900">Consumer Electronics:</div>
            <div className="text-neutral-600">9.0% (standard) / 7.0% (with Store subscription)</div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-neutral-900">High-End Athletic Shoes ($150+):</div>
            <div className="text-neutral-600">8.0% discounted rate (no insertion fee)</div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-neutral-900">Physical Books & Media:</div>
            <div className="text-neutral-600">14.95% + $0.35 order fee</div>
          </div>
        </div>

        <h3 className="text-lg font-bold text-neutral-900">
          How to Avoid Losing Money on eBay Shipping
        </h3>
        <p className="text-sm text-neutral-700 leading-relaxed">
          Because eBay applies its ~13.25% fee to the buyer-paid shipping
          charge, charging exact carrier postage means you will lose ~13% on
          every shipping label unless you add a small handling fee or purchase
          discounted labels through eBay Commercial Base Pricing (USPS/UPS/FedEx
          discounts).
        </p>
      </div>

      {/* Related Calculators */}
      <section className="my-10 bg-neutral-900 text-white rounded-2xl p-6 sm:p-8">
        <h2 className="text-lg font-bold">More E-Commerce Margin Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <Link
            href="/calculators/product-profit-calculator"
            className="p-4 bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/60 rounded-xl transition-colors group"
          >
            <div className="font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
              <span>Universal Calculator</span>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Test any custom fee or off-marketplace pricing scenario.
            </p>
          </Link>

          <Link
            href="/calculators/etsy-fee-calculator"
            className="p-4 bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/60 rounded-xl transition-colors group"
          >
            <div className="font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
              <span>Etsy Fee Calculator</span>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Compare eBay vs Etsy selling fees for vintage and handmade goods.
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
              Calculate the exact list price required for a specific margin.
            </p>
          </Link>
        </div>
      </section>

      <FaqAccordion items={faqs} />
    </div>
  );
}
