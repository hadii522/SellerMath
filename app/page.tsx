import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig, calculatorNavItems, guideNavItems } from '@/lib/config/site';
import { constructMetadata } from '@/lib/seo/metadata';
import { FaqAccordion } from '@/components/FaqAccordion';
import { AdSlot } from '@/components/AdSlot';
import {
  Calculator,
  TrendingUp,
  Scale,
  Target,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Store,
  Tag,
  Package,
  DollarSign,
  BookOpen,
  Zap,
} from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'SellerMath: Free Seller Profit, Fee & Margin Calculators',
  description:
    'Free, accurate e-commerce profit calculators for eBay, Etsy, Amazon FBA, and online sellers in the US, UK, and Canada. Calculate net margins, fees, break-even ROAS, and target selling prices.',
  path: '/',
});

const homepageFaqs = [
  {
    question: 'Are all SellerMath calculators really free?',
    answer:
      'Yes, 100% free with no subscriptions, accounts, or paywalls. All calculation engines run entirely client-side in your web browser. We never sell software subscriptions or gate advanced features.',
  },
  {
    question: 'How do you keep marketplace fees accurate?',
    answer:
      'We link directly to official documentation from eBay, Etsy, and Amazon Seller Central, maintaining effective dates and last-verified timestamps for every market (US, UK, Canada). Furthermore, all fee assumptions remain user-editable so you can adjust for custom agreements.',
  },
  {
    question: 'Is my product cost and revenue data kept private?',
    answer:
      'Yes. Unlike cloud-based inventory software, SellerMath processes all math locally inside your browser session. None of your input prices, COGS, margins, or supplier costs are sent to our servers or stored in any database.',
  },
  {
    question: 'Which countries and currencies are supported?',
    answer:
      'We fully support online sellers and e-commerce merchants in the United States (USD, $), United Kingdom (GBP, £), and Canada (CAD, CA$), with market-specific marketplace fee schedules tailored to each region.',
  },
  {
    question: 'What is the most accurate way to calculate profit margin?',
    answer:
      'True profit margin must account for gross revenue (including customer-paid shipping), product wholesale cost, actual postal carrier fees, packaging supplies, platform sales commission, payment processing fees, advertising CPA, and return allowances. Use our Universal Product Profit Calculator for a complete breakdown.',
  },
];

export default function HomePage() {
  const calculatorCards = [
    {
      title: 'Universal Product Profit Calculator',
      href: '/calculators/product-profit-calculator',
      badge: 'Most Popular',
      description:
        'The complete financial model for any product. Calculates net profit, margin %, return on product cost, and break-even selling price.',
      icon: DollarSign,
    },
    {
      title: 'eBay Profit Calculator',
      href: '/calculators/ebay-profit-calculator',
      badge: 'US, UK & CA',
      description:
        'Estimate eBay Managed Payments final value fees, store subscriber discounts, Promoted Listings, and net payout.',
      icon: Store,
    },
    {
      title: 'Etsy Fee Calculator',
      href: '/calculators/etsy-fee-calculator',
      badge: '6.5% Fee Engine',
      description:
        'Calculate listing fees, 6.5% transaction commission, Etsy Payments processing, and 12-15% Offsite Ads deductions.',
      icon: Tag,
    },
    {
      title: 'Amazon FBA Calculator',
      href: '/calculators/amazon-fba-profit-calculator',
      badge: 'FBA Rate Cards',
      description:
        'Estimate category referral fees (8-15%), FBA pick & pack size tiers, monthly warehouse storage, and net unit margins.',
      icon: Package,
    },
    {
      title: 'Break-Even ROAS Calculator',
      href: '/calculators/break-even-roas-calculator',
      badge: 'Paid Ads Tool',
      description:
        'Find your minimum required Return on Ad Spend and maximum allowable CPA for Meta, Google, and Amazon advertising.',
      icon: Scale,
    },
    {
      title: 'Target Profit Price Calculator',
      href: '/calculators/target-profit-price-calculator',
      badge: 'Pricing Strategy',
      description:
        'Reverse-engineer the exact retail selling price needed to lock in your desired 25%, 35%, or 50% net profit margin.',
      icon: Target,
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Independent & Verified Seller Calculators • US, UK & Canada</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 max-w-4xl mx-auto leading-tight">
          Know Your Exact Profit On Every Single Sale.
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          Free, transparent financial calculators for online sellers, flippers,
          and e-commerce brands. Account for hidden marketplace fees, postage,
          packaging, returns, and ad spend before you price.
        </p>

        {/* Quick Launch Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/calculators/product-profit-calculator"
            className="bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-sm transition-all flex items-center gap-2"
          >
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>Launch Universal Calculator</span>
          </Link>

          <Link
            href="/calculators/break-even-roas-calculator"
            className="bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-800 font-semibold text-sm px-5 py-3 rounded-xl shadow-xs transition-colors flex items-center gap-2"
          >
            <Scale className="w-4 h-4 text-neutral-500" />
            <span>Break-Even ROAS Tool</span>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-neutral-500 font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>100% Client-Side Privacy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>No Accounts or Paywalls</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Verified 2026 Fee Rate Cards</span>
          </div>
        </div>
      </section>

      <AdSlot slotId="home-hero-ad" format="horizontal" />

      {/* Featured Calculators Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
            Built for Every E-Commerce Platform
          </h2>
          <p className="text-sm text-neutral-600">
            Select a specialized tool below to model your specific marketplace
            fees, fulfillment tiers, and pricing strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculatorCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.href}
                className="bg-white rounded-2xl border border-neutral-200/90 p-6 flex flex-col justify-between hover:border-emerald-400 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-neutral-600 bg-neutral-100 px-2.5 py-0.5 rounded-full border border-neutral-200">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                    {card.title}
                  </h3>

                  <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100">
                  <Link
                    href={card.href}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center justify-between"
                  >
                    <span>Use Calculator</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works & Core Methodology */}
      <section className="bg-white border-y border-neutral-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              <Zap className="w-3.5 h-3.5" />
              <span>Accounting Precision</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
              Why Standard Profit Math Fails Online Sellers
            </h2>
            <p className="text-sm text-neutral-600">
              Most basic online calculators subtract wholesale cost from selling
              price and stop there. Here is why {siteConfig.brandName} is built
              differently:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="text-base font-bold text-neutral-900">
                Gross Revenue Includes Customer Postage
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Platforms like eBay, Etsy, and Amazon assess their percentage
                commissions on the total customer payment, including shipping.
                Treating shipping as a zero-sum passthrough erodes 8% to 15% of
                your margins.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="text-base font-bold text-neutral-900">
                Fixed Fees Heavily Punish Low Price Points
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                A flat $0.30 transaction fee and $0.20 listing fee represent just
                0.5% on a $100 order, but consume 5.0% on a $10 order. We factor
                fixed fees into your true break-even calculation.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="text-base font-bold text-neutral-900">
                Pre-Ad Contribution Sets Your Ad Ceilings
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Before spending a single dollar on Meta or Google Ads, you must
                know your pre-ad contribution margin. Scaling campaigns without
                an exact break-even ROAS leads straight to cash flow collapse.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Educational Guides */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
              Knowledge Base
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
              Featured Seller Guides & Tutorials
            </h2>
          </div>
          <Link
            href="/guides"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>View All Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guideNavItems.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="bg-white rounded-2xl border border-neutral-200/90 p-6 hover:border-emerald-300 hover:shadow-sm transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-700 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                  {guide.label}
                </h3>
                <p className="mt-2 text-xs text-neutral-600 leading-relaxed line-clamp-3">
                  {guide.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 text-xs font-bold text-emerald-700 flex items-center justify-between">
                <span>Read Tutorial</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Homepage FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FaqAccordion
          items={homepageFaqs}
          title="Frequently Asked Questions About SellerMath"
          description="Everything you need to know about our free seller calculator suite and privacy standards."
        />
      </section>
    </div>
  );
}
