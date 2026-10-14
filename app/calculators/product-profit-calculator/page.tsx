import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo/metadata';
import { WebApplicationJsonLd } from '@/lib/seo/jsonld';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { UniversalProfitCalculator } from '@/components/calculators/UniversalProfitCalculator';
import { WorkedExample } from '@/components/WorkedExample';
import { FaqAccordion } from '@/components/FaqAccordion';
import { AdSlot } from '@/components/AdSlot';
import {
  DollarSign,
  TrendingUp,
  Scale,
  ShieldCheck,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Product Profit Calculator: Net Margin & Break-Even Tool',
  description:
    'Free universal product profit calculator for online sellers and ecommerce stores. Calculate net profit, margin %, return on product cost, and break-even selling price.',
  path: '/calculators/product-profit-calculator',
  keywords: [
    'product profit calculator',
    'ecommerce margin calculator',
    'net profit calculator',
    'break even selling price',
    'seller margin calculator',
  ],
});

const faqs = [
  {
    question: 'How is net profit calculated for an online order?',
    answer:
      'Net Profit is calculated by subtracting all direct and variable costs from total revenue. Revenue equals the item selling price plus any shipping fee charged to the customer. Deductions include inventory acquisition cost (COGS), actual postage paid to the carrier, packaging supplies, marketplace sales commission, payment processing fees, allocated ad spend, return reserves, and miscellaneous overhead.',
  },
  {
    question: 'What is the difference between profit margin and markup?',
    answer:
      'Profit margin is the percentage of total revenue that remains as profit (Net Profit ÷ Total Revenue × 100). Markup is the percentage added on top of your product cost to arrive at the selling price (Net Profit ÷ Product Cost × 100). A 50% markup yields a 33.3% profit margin.',
  },
  {
    question: 'Why does shipping charged to the customer count as revenue?',
    answer:
      'From an accounting and marketplace perspective, the customer pays you the total combined order amount, and platforms (such as eBay, Etsy, and Amazon) charge percentage fees on the entire transaction including shipping. To avoid distorted margins, both customer shipping revenue and actual postal carrier expenses are tracked independently.',
  },
  {
    question: 'How is the break-even selling price determined?',
    answer:
      'The break-even selling price represents the minimum amount you must charge to yield exactly $0.00 in net profit. It takes all fixed expenses (product cost, shipping paid, packaging, fixed transaction fee, ad spend) and divides them by one minus the variable fee percentage rate (marketplace commission + payment processing + return rate), then subtracts shipping charged to the buyer.',
  },
  {
    question: 'What happens if variable fees exceed 100% of revenue?',
    answer:
      'If the sum of your platform percentage fees, payment fees, and return allowance equals or exceeds 100% of the sale price, it is mathematically impossible to break even or make a profit, regardless of how high you price the item. You must negotiate lower fees or adjust your fulfillment model.',
  },
];

export default function ProductProfitCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <WebApplicationJsonLd
        name="Universal Product Profit Calculator"
        description="Calculate net profit, profit margin, ROI, and break-even selling price for online sellers."
        url="/calculators/product-profit-calculator"
      />

      <Breadcrumbs
        items={[
          { name: 'Calculators', item: '/calculators/product-profit-calculator' },
          {
            name: 'Universal Profit Calculator',
            item: '/calculators/product-profit-calculator',
          },
        ]}
      />

      {/* Page Header */}
      <div className="my-6 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
          <DollarSign className="w-3.5 h-3.5" />
          <span>Universal Seller Tool</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
          Product Profit & Margin Calculator
        </h1>
        <p className="mt-3 text-base text-neutral-600 leading-relaxed">
          Accurately calculate your real take-home net profit, true margin
          percentage, return on product cost (ROI), and break-even selling price.
          Works for any physical product across Shopify, WooCommerce, eBay,
          Etsy, and private e-commerce stores.
        </p>
      </div>

      <AdSlot slotId="calc-top-slot" format="horizontal" />

      {/* Main Calculator */}
      <section aria-label="Product Profit Calculator Tool" className="my-8">
        <UniversalProfitCalculator />
      </section>

      <AdSlot slotId="calc-mid-slot" format="horizontal" />

      {/* Step-by-Step Worked Example */}
      <WorkedExample
        title="Worked Example: Selling a Handcrafted Ceramic Mug for $45.00"
        scenario="A seller purchases a handcrafted ceramic mug from a local maker for $12.00, charges the customer $5.00 for standard shipping, pays $6.50 for postal carrier labels, spends $1.50 on bubble wrap and packaging, pays a 10% marketplace fee, 2.9% + $0.30 payment processing, and spends $4.00 on paid social media ads per order."
        steps={[
          {
            step: 'Calculate Total Revenue',
            formula: 'Selling Price + Customer Shipping',
            calculation: '$45.00 + $5.00',
            result: '$50.00',
          },
          {
            step: 'Calculate Platform & Payment Fees',
            formula: '(Revenue × 10%) + (Revenue × 2.9% + $0.30)',
            calculation: '$5.00 + $1.75',
            result: '$6.75',
          },
          {
            step: 'Calculate Total Fulfillment & Product Costs',
            formula: 'COGS + Postage + Packaging + Ads',
            calculation: '$12.00 + $6.50 + $1.50 + $4.00',
            result: '$24.00',
          },
          {
            step: 'Calculate Total Deductions',
            formula: 'Fulfillment & Product Costs + Platform Fees',
            calculation: '$24.00 + $6.75',
            result: '$30.75',
          },
          {
            step: 'Compute Net Seller Profit',
            formula: 'Total Revenue - Total Deductions',
            calculation: '$50.00 - $30.75',
            result: '$19.25',
          },
          {
            step: 'Compute Net Profit Margin',
            formula: '(Net Profit ÷ Total Revenue) × 100',
            calculation: '($19.25 ÷ $50.00) × 100',
            result: '38.50%',
          },
        ]}
        conclusion="Despite paying $6.75 in platform fees and $8.00 in total shipping and packaging, this product produces a healthy 38.5% net profit margin and a 160.4% return on product acquisition cost."
      />

      {/* Educational Guide & Formula Documentation */}
      <div className="my-12 prose prose-neutral max-w-none bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-xs space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          The Exact Mathematical Formulas Behind This Calculator
        </h2>

        <p className="text-sm text-neutral-700 leading-relaxed">
          Many sellers mistakenly subtract their product wholesale cost from the
          selling price and assume the difference is profit. In real-world
          e-commerce, transaction fees, payment processing spreads, packaging
          materials, and advertising cost per acquisition (CPA) quickly consume
          unaccounted margins.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono bg-neutral-50 p-4 rounded-xl border border-neutral-200">
          <div className="space-y-1">
            <div className="font-bold text-neutral-900">Revenue Equation:</div>
            <div className="text-neutral-600">Total Revenue = Selling Price + Shipping Charged</div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-neutral-900">Net Profit Equation:</div>
            <div className="text-neutral-600">Net Profit = Revenue - Total Costs & Fees</div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-neutral-900">Profit Margin %:</div>
            <div className="text-neutral-600">Margin = (Net Profit ÷ Total Revenue) × 100</div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-neutral-900">Return on Cost (ROI) %:</div>
            <div className="text-neutral-600">ROI = (Net Profit ÷ Product Cost) × 100</div>
          </div>
        </div>

        <h3 className="text-lg font-bold text-neutral-900">
          Why Separating Shipping Charged from Shipping Paid Matters
        </h3>
        <p className="text-sm text-neutral-700 leading-relaxed">
          A common mistake is netting out shipping before calculating platform
          fees. Major marketplaces calculate their commissions on the gross
          payment received from the buyer, which includes the postage fee you
          charged. If you charge $10 for shipping but only spend $6 at the post
          office, the $4 surplus contributes to revenue, but you are also
          assessed fees on that full $10. SellerMath prevents double-counting by
          tracking customer-paid shipping as top-line revenue and carrier
          postage as an operational deduction.
        </p>
      </div>

      {/* Internal Links to Marketplace Tools & Guides */}
      <section className="my-10 bg-neutral-900 text-white rounded-2xl p-6 sm:p-8">
        <h2 className="text-lg font-bold">Explore Marketplace-Specific Calculators</h2>
        <p className="text-sm text-neutral-400 mt-1 mb-6">
          Selling on a specific platform? Use our verified fee engines tailored
          to category schedules and regional rules:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/calculators/ebay-profit-calculator"
            className="p-4 bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/60 rounded-xl transition-colors group"
          >
            <div className="font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
              <span>eBay Fee Calculator</span>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Final value fee tiers, store subscriber rates, and Promoted Listings.
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
              $0.20 listing, 6.5% transaction, and regional Etsy Payments rates.
            </p>
          </Link>

          <Link
            href="/calculators/amazon-fba-profit-calculator"
            className="p-4 bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/60 rounded-xl transition-colors group"
          >
            <div className="font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
              <span>Amazon FBA Calculator</span>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              Referral fees, pick & pack size tiers, and monthly storage costs.
            </p>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqAccordion items={faqs} />
    </div>
  );
}
