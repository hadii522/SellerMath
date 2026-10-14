import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { siteConfig } from '@/lib/config/site';
import {
  ShieldCheck,
  CheckCircle2,
  Calculator,
  Scale,
  Award,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'About SellerMath: Purpose, Mission & Calculation Methodology',
  description:
    'Learn about SellerMath, our independent e-commerce financial tools, calculation methodologies, and verified marketplace fee research.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ name: 'About Us', item: '/about' }]} />

      <header className="my-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Independent & Free Financial Tools</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
          About {siteConfig.brandName}
        </h1>
        <p className="mt-3 text-base text-neutral-600 leading-relaxed">
          {siteConfig.brandName} was built to solve a simple, persistent problem:
          too many online sellers work 60-hour weeks only to discover that hidden
          marketplace fees, variable shipping rates, and ad costs have devoured
          their profits.
        </p>
      </header>

      <div className="my-10 space-y-8 text-neutral-800 text-sm sm:text-base leading-relaxed">
        {/* Mission */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-neutral-950 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-600" />
            Our Mission & Core Philosophy
          </h2>
          <p>
            We believe that every e-commerce entrepreneur—from a casual eBay
            flipper to a high-volume Amazon FBA brand—deserves transparent,
            instant, and mathematically accurate financial tools without paying
            costly SaaS subscription fees or surrendering private business data.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
              <div className="font-bold text-neutral-900 text-xs uppercase tracking-wider mb-1">
                100% Client-Side
              </div>
              <p className="text-xs text-neutral-600">
                Calculations execute entirely in your web browser. We never store,
                track, or harvest your private product costs or financial numbers.
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
              <div className="font-bold text-neutral-900 text-xs uppercase tracking-wider mb-1">
                Zero Paywalls
              </div>
              <p className="text-xs text-neutral-600">
                No credit cards, no login gates, and no restricted features. All
                calculators and educational guides remain free forever.
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
              <div className="font-bold text-neutral-900 text-xs uppercase tracking-wider mb-1">
                Verified Fee Rules
              </div>
              <p className="text-xs text-neutral-600">
                We cite official documentation links, effective dates, and last
                verification timestamps for all marketplace fee schedules.
              </p>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-neutral-950 flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-600" />
            Our Calculation Methodology
          </h2>
          <p>
            Financial transparency begins with accounting precision. Our
            calculation engine adheres to four strict principles:
          </p>
          <ul className="space-y-3 text-xs sm:text-sm text-neutral-700 pl-2">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>No Double Counting:</strong> Shipping charged to the
                customer is treated strictly as top-line revenue, and postage paid
                to postal carriers is treated as a fulfillment deduction.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Accurate Commission Basis:</strong> Marketplace fees and
                credit card merchant processing fees are applied to the total
                payment received, accurately matching how eBay, Etsy, and Stripe
                actually bill your account.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Edge-Case Integrity:</strong> Our engine prevents
                misleading or divided-by-zero outputs. When requested margins or
                fee structures are mathematically impossible (e.g. fees + margin
                &ge; 100%), our calculators explain the breakdown explicitly.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Regional Multi-Currency Support:</strong> We maintain
                distinct regional configurations for sellers in the United
                States (USD), United Kingdom (GBP), and Canada (CAD).
              </span>
            </li>
          </ul>
        </section>

        {/* Independence Disclaimer */}
        <section className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200 space-y-2 text-xs sm:text-sm text-neutral-600">
          <h3 className="font-bold text-neutral-900">Independent Publisher Statement</h3>
          <p>
            {siteConfig.brandName} is an independently operated educational tool.
            We are not affiliated with, sponsored by, or endorsed by eBay Inc.,
            Etsy Inc., Amazon.com, Inc., or Shopify Inc. All trademarked names
            and logos belong to their respective copyright owners.
          </p>
          <p className="pt-2 text-neutral-700">
            For press, partnerships, corrections, or any general inquiries, reach our team directly at:{' '}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-emerald-700 font-semibold hover:underline"
            >
              {siteConfig.contactEmail}
            </a>
          </p>
        </section>
      </div>

      <div className="mt-8 pt-8 border-t border-neutral-200 flex justify-between items-center text-xs">
        <Link
          href="/contact"
          className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
        >
          <span>Have a question or feedback? Contact Us</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/disclaimer"
          className="text-neutral-500 hover:text-neutral-800 underline"
        >
          Read Fee Disclaimer
        </Link>
      </div>
    </div>
  );
}
