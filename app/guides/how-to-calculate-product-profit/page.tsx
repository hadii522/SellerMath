import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo/metadata';
import { ArticleJsonLd } from '@/lib/seo/jsonld';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FaqAccordion } from '@/components/FaqAccordion';
import { AdSlot } from '@/components/AdSlot';
import {
  DollarSign,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  PackageCheck,
  CreditCard,
  Truck,
  RotateCcw,
} from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'How to Calculate Product Profit: Step-by-Step E-Commerce Guide',
  description:
    'Master step-by-step product profit calculation for online sellers. Learn how to account for COGS, shipping, platform fees, payment processing, returns, and ad spend.',
  path: '/guides/how-to-calculate-product-profit',
  keywords: [
    'how to calculate product profit',
    'ecommerce profit calculation',
    'calculate net profit per order',
    'product profit formula',
    'hidden selling costs',
  ],
  type: 'article',
  publishedTime: '2025-01-20T00:00:00Z',
  modifiedTime: '2026-10-01T00:00:00Z',
});

const faqs = [
  {
    question: 'What is the difference between Gross Profit and Net Profit in e-commerce?',
    answer:
      'Gross Profit equals Revenue minus your product acquisition cost (COGS). Net Profit subtracts ALL remaining operational expenses from Gross Profit—including outbound shipping postage, packaging boxes, marketplace sales fees, credit card processing spreads, advertising spend per order, and refund allowances.',
  },
  {
    question: 'How should I allocate monthly overhead to individual product orders?',
    answer:
      'Divide your fixed monthly overhead (software subscriptions, accounting fees, photography tools, warehouse storage) by your average monthly order volume. For example, if your monthly software tools cost $500 and you ship 1,000 orders, allocate $0.50 per order under "Other Expenses".',
  },
  {
    question: 'How much should I reserve for returns and refunds?',
    answer:
      'Most physical goods categories experience return rates between 2% and 8% (higher for apparel and footwear, often 15% to 25%). Setting aside a 3% to 5% return allowance per order protects your operating cash flow when refunds or return shipping labels occur.',
  },
  {
    question: 'Why do payment processors charge fees on sales tax?',
    answer:
      'Payment processors (Stripe, PayPal, Etsy Payments) charge their percentage fee on the entire transaction authorization amount, which includes the sales tax collected from the buyer. Keeping a 3% to 4% blended payment fee expectation prevents small margin erosion.',
  },
];

export default function HowToCalculateProductProfitPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <ArticleJsonLd
        title="How to Calculate Product Profit: The Step-by-Step E-Commerce Guide"
        description="Comprehensive masterclass on calculating net profit per order, accounting for hidden fees and fulfillment costs."
        url="/guides/how-to-calculate-product-profit"
        datePublished="2025-01-20T00:00:00Z"
        dateModified="2026-10-01T00:00:00Z"
      />

      <Breadcrumbs
        items={[
          { name: 'Guides & Education', item: '/guides' },
          {
            name: 'How to Calculate Product Profit',
            item: '/guides/how-to-calculate-product-profit',
          },
        ]}
      />

      {/* Header */}
      <header className="my-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
          <DollarSign className="w-3.5 h-3.5" />
          <span>Financial Accounting Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 leading-tight">
          How to Calculate Product Profit: The Step-by-Step E-Commerce Guide
        </h1>
        <p className="mt-3 text-base text-neutral-600 leading-relaxed">
          Too many sellers celebrate gross sales revenue while their bank balance
          quietly dwindles. Here is the exact step-by-step framework to calculate
          true take-home net profit on every single product you sell.
        </p>
      </header>

      <AdSlot slotId="guide-profit-top" format="horizontal" />

      {/* Content */}
      <div className="my-8 prose prose-neutral max-w-none text-neutral-800 space-y-6 text-sm sm:text-base leading-relaxed">
        <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
          The 7-Step Net Profit Formula
        </h2>

        <p>
          Calculating real product profit requires looking far beyond wholesale
          invoice prices. To calculate your exact take-home profit, execute this
          seven-step accounting sequence:
        </p>

        {/* Step Breakdown Cards */}
        <div className="space-y-4 not-prose my-6">
          <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-neutral-900 text-base mb-1">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">
                1
              </span>
              <span>Calculate Total Gross Revenue</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 pl-8">
              Total Revenue = Item Retail Selling Price + Shipping Fee Charged to
              Customer. If you charge $45.00 for an item and $5.00 for postage,
              your top-line revenue is $50.00.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-neutral-900 text-base mb-1">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">
                2
              </span>
              <span>Deduct Product Cost of Goods Sold (COGS)</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 pl-8">
              Include raw materials, manufacturer invoices, and allocated freight
              charges required to bring the inventory to your facility.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-neutral-900 text-base mb-1">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">
                3
              </span>
              <span>Deduct Outbound Shipping & Packaging</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 pl-8">
              Add the actual postage label purchased (USPS, Royal Mail, Canada
              Post, UPS) plus physical packaging supplies (box, poly mailer,
              thermal label, tape, bubble wrap).
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-neutral-900 text-base mb-1">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">
                4
              </span>
              <span>Deduct Platform & Merchant Processing Fees</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 pl-8">
              Marketplace commissions (e.g. eBay ~13.25%, Etsy 6.5%, Amazon 15%)
              plus payment processing (e.g. Stripe 2.9% + $0.30). Remember: fees
              apply to the entire customer payment, not just the item price!
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-neutral-900 text-base mb-1">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">
                5
              </span>
              <span>Deduct Customer Acquisition Cost (Ad Spend)</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 pl-8">
              Your allocated Cost Per Acquisition (CPA) from Facebook ads, Google
              Shopping, TikTok, or Promoted Listings.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-neutral-900 text-base mb-1">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">
                6
              </span>
              <span>Allocate Return & Damage Reserves</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 pl-8">
              Set aside a 3% to 5% reserve on gross revenue to absorb customer
              refunds, return shipping labels, and carrier damage claims.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs bg-emerald-50/40 border-emerald-200">
            <div className="flex items-center gap-2 font-bold text-emerald-950 text-base mb-1">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">
                7
              </span>
              <span>Compute Net Profit & Net Margin %</span>
            </div>
            <div className="font-mono text-xs font-bold text-emerald-900 pl-8 mt-1">
              Net Profit = Total Revenue - (Steps 2 through 6)
              <br />
              Profit Margin % = (Net Profit ÷ Total Revenue) × 100
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-neutral-900 tracking-tight pt-4">
          The 4 Hidden &quot;Profit Leaks&quot; That Destroy Margins
        </h2>

        <p>
          When e-commerce businesses fail despite high sales, one or more of
          these four unmodeled expenses is almost always responsible:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6 text-xs sm:text-sm">
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
            <div className="font-bold text-neutral-900 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span>1. Fixed Per-Order Transaction Fees</span>
            </div>
            <p className="text-neutral-600">
              A flat $0.30 transaction charge seems negligible on a $100 order
              (0.3%), but on a $10 item, that flat fee alone represents 3.0% of
              your revenue.
            </p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
            <div className="font-bold text-neutral-900 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>2. Box & Packaging Creep</span>
            </div>
            <p className="text-neutral-600">
              High-quality corrugated mailers, custom tape, and protective
              fillers frequently cost $1.25 to $2.50 per parcel. Failing to track
              packaging erodes 3-5% of bottom-line profit.
            </p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
            <div className="font-bold text-neutral-900 flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-emerald-600" />
              <span>3. Unrecoverable Return Shipping</span>
            </div>
            <p className="text-neutral-600">
              When a buyer returns an item, you refund the customer and pay for
              the return label, losing your outbound postage permanently. A 5%
              return rate requires a dedicated reserve.
            </p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1">
            <div className="font-bold text-neutral-900 flex items-center gap-1.5">
              <PackageCheck className="w-4 h-4 text-emerald-600" />
              <span>4. Marketplace Fee on Customer Postage</span>
            </div>
            <p className="text-neutral-600">
              Remember that eBay, Etsy, and Amazon assess their commission on the
              entire customer bill, including shipping and gift wrapping.
            </p>
          </div>
        </div>
      </div>

      {/* Tool Callout */}
      <div className="my-10 bg-emerald-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-emerald-950 text-base">
            Put Your Product Through the Calculator
          </h3>
          <p className="text-xs text-emerald-800 mt-1">
            Calculate your exact net profit, margin %, and break-even selling price
            in seconds with our free tool.
          </p>
        </div>
        <Link
          href="/calculators/product-profit-calculator"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 flex-shrink-0"
        >
          <span>Open Profit Calculator</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <FaqAccordion items={faqs} />
    </article>
  );
}
