import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { siteConfig } from '@/lib/config/site';
import { Scale, FileText, ShieldAlert, AlertCircle, Mail, CheckCircle } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Terms of Service & Usage Limitations',
  description:
    'Review the terms of service, estimation limitations, and usage agreements for the SellerMath website and calculators.',
  path: '/terms',
});

export default function TermsPage() {
  const lastUpdated = 'October 14, 2026';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ name: 'Terms of Service', item: '/terms' }]} />

      <header className="my-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
          <FileText className="w-3.5 h-3.5" />
          <span>Legal Agreement & User Obligations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
          Terms of Service
        </h1>
        <p className="mt-2 text-xs text-neutral-500">
          Effective & Last Updated: {lastUpdated} &bull; Applicable Regions: US, UK, Canada, and International
        </p>
      </header>

      <div className="my-8 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-xs prose prose-neutral max-w-none text-sm sm:text-base leading-relaxed space-y-6 text-neutral-800">
        <section>
          <h2 className="text-xl font-bold text-neutral-950 flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-600" />
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using the website located at{' '}
            <strong>{siteConfig.siteUrl}</strong> ({siteConfig.brandName}), you
            agree to be legally bound by these Terms of Service and our{' '}
            <Link href="/privacy-policy" className="text-emerald-700 underline font-medium">
              Privacy Policy
            </Link>. If you do not agree
            with any portion of these terms, you must discontinue use of our
            calculators and guides immediately.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-950 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            2. Calculator Estimates & Mathematical Limitations
          </h2>
          <p>
            All calculations, profit margins, fee estimates, break-even selling
            prices, and ROAS outputs provided on {siteConfig.brandName} are for{' '}
            <strong>informational, simulation, and business planning purposes only</strong>. While we
            rigorously maintain fee schedules based on published rate cards from eBay, Etsy, Amazon, Shopify, Stripe, and PayPal, actual settlement statements may differ due to:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-neutral-700 pl-2">
            <li>Dynamic state, provincial, or national sales taxes / VAT collected from buyers;</li>
            <li>Marketplace seller performance standing (Top Rated Seller discounts vs. Below Standard surcharges);</li>
            <li>Carrier audited dimensional weights and packaging surcharges;</li>
            <li>Unannounced or localized mid-year fee schedule updates by third-party platforms;</li>
            <li>Foreign exchange rate spreads and international payout conversion fees.</li>
          </ul>
          <p className="mt-2 text-xs text-neutral-600 italic">
            You must independently confirm critical financial figures directly in your official marketplace seller portal or with a certified public accountant (CPA) before making binding capital commitments or bulk inventory purchases.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-950">
            3. Disclaimer of Warranties
          </h2>
          <p>
            This website, including all calculation algorithms, educational
            guides, and content, is provided on an &quot;AS IS&quot; and &quot;AS
            AVAILABLE&quot; basis without warranties of any kind. {siteConfig.brandName} expressly disclaims all warranties, whether express, statutory, or implied, including the implied warranties of merchantability, fitness for a particular commercial purpose, title, and non-infringement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-950">
            4. Limitation of Liability & Maximum Cap
          </h2>
          <p>
            To the maximum extent permitted under applicable law in the United States, United Kingdom, and Canada, in no event shall {siteConfig.brandName}, its founders, developers, or affiliates be liable for any indirect, incidental, special, punitive, exemplary, or consequential damages, including loss of profits, inventory write-downs, revenue losses, business interruption, or tax penalties arising out of or in connection with the use of, or inability to use, our calculation models.
          </p>
          <p>
            In any jurisdiction where liability cannot be entirely excluded, our total aggregate liability to you for all claims arising under these terms shall not exceed ten United States dollars ($10.00 USD).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-950">
            5. Intellectual Property Ownership & Anti-Theft Protections (All Rights Reserved)
          </h2>
          <p>
            All website software code, responsive user interfaces, styling, custom calculator algorithms, text content, educational masterclasses, and branding located on {siteConfig.brandName} are the exclusive proprietary property of the site owner and are fully protected under United States and international copyright laws, trade dress protections, the Berne Convention, and the World Intellectual Property Organization (WIPO) treaties.
          </p>
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs sm:text-sm text-neutral-800 space-y-2">
            <strong className="text-neutral-900 block font-bold">Strict Prohibitions Against Theft & Duplication:</strong>
            <ul className="list-disc list-inside space-y-1 text-xs text-neutral-700 pl-1">
              <li><strong>No Cloning:</strong> You may not copy, mirror, clone, or replicate this website, its source code, or its design on any other domain, subdomain, or mobile application.</li>
              <li><strong>No Automated Scraping:</strong> Automated scraping, data harvesting, robotic content extraction, and unauthorized framing/iFraming without prior written license are strictly prohibited.</li>
              <li><strong>No Algorithm Theft:</strong> Decompiling, reverse engineering, or extracting the client-side calculator algorithms for commercial re-use or resale is a direct violation of these terms.</li>
            </ul>
          </div>
          <p className="text-xs text-neutral-600 mt-2">
            &quot;eBay&quot; is a registered trademark of eBay Inc. &quot;Etsy&quot; is a registered trademark of Etsy Inc. &quot;Amazon&quot; is a registered trademark of Amazon.com, Inc. These third-party trademarks are cited strictly under nominative fair use to describe calculator compatibility with their respective fee structures. {siteConfig.brandName} is not affiliated with or endorsed by these platforms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-950">
            6. DMCA & Copyright Infringement Takedown Policy
          </h2>
          <p>
            We respect intellectual property rights and aggressively enforce our own. If you believe your copyrighted work has been improperly referenced on this website, or if you represent a party regarding copyright inquiries, our designated DMCA Agent can be reached immediately at:
          </p>
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs sm:text-sm text-neutral-800 flex items-center gap-3">
            <Mail className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div>
              <div className="font-semibold text-neutral-900">Designated Copyright & DMCA Agent</div>
              <a
                href={`mailto:${siteConfig.legalEmail}?subject=DMCA%20Notice`}
                className="text-emerald-700 font-bold hover:underline"
              >
                {siteConfig.legalEmail}
              </a>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-950">
            7. Acceptable Use & Security Obligations
          </h2>
          <p>
            You agree not to probe, scan, test the vulnerability of, or breach any security mechanism of {siteConfig.brandName}, nor attempt to disrupt our website availability through denial-of-service (DoS) attacks or automated scrapers that degrade performance for legitimate users. Security researchers should refer to our{' '}
            <Link href="/security" className="text-emerald-700 underline font-medium">
              Vulnerability Disclosure Program
            </Link>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-neutral-950">
            8. Governing Contact & Legal Inquiries
          </h2>
          <p>
            For any licensing requests, formal legal notices, or ownership verification, contact our legal administration at:
          </p>
          <p className="font-bold text-neutral-900 text-sm">
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-emerald-700 font-bold hover:underline"
            >
              {siteConfig.contactEmail}
            </a>
          </p>
        </section>
      </div>

      <div className="mt-8 pt-8 border-t border-neutral-200 flex flex-wrap gap-4 justify-between items-center text-xs">
        <Link
          href="/privacy-policy"
          className="text-neutral-600 hover:text-neutral-900 underline font-medium"
        >
          View Privacy Policy
        </Link>
        <Link
          href="/disclaimer"
          className="text-neutral-600 hover:text-neutral-900 underline font-medium"
        >
          View Fee Disclaimer
        </Link>
        <Link
          href="/contact"
          className="text-emerald-700 hover:text-emerald-800 font-semibold"
        >
          Contact Support &rarr;
        </Link>
      </div>
    </div>
  );
}
