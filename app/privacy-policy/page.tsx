import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { siteConfig } from '@/lib/config/site';
import { ShieldCheck, Lock, Eye, Cookie, UserCheck, Globe, Mail } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Privacy Policy: Analytics, Cookies & Advertising Disclosures',
  description:
    'Read the SellerMath privacy policy. Learn how we protect your calculator data with 100% client-side execution, comply with GDPR, CCPA, and PIPEDA, and manage cookies and advertising.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  const lastUpdated = 'October 14, 2026';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ name: 'Privacy Policy', item: '/privacy-policy' }]} />

      <header className="my-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Trust, Privacy & Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
          Privacy Policy
        </h1>
        <p className="mt-2 text-xs text-neutral-500">
          Effective & Last Updated: {lastUpdated} &bull; Applicable Regions: United States, United Kingdom, Canada, and Worldwide
        </p>
      </header>

      <div className="my-8 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-xs prose prose-neutral max-w-none text-sm sm:text-base leading-relaxed space-y-8 text-neutral-800">
        {/* Quick Summary Alert */}
        <div className="p-4 sm:p-5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-950 space-y-2">
          <div className="font-bold flex items-center gap-2 text-emerald-900 text-sm">
            <Lock className="w-4 h-4 text-emerald-700" />
            Executive Privacy Summary: Zero Server-Side Financial Data Collection
          </div>
          <p>
            When you enter your sale prices, product COGS, shipping expenses, and fee assumptions into {siteConfig.brandName}, <strong>all mathematical computations run 100% client-side inside your personal web browser</strong>. We do not transmit, log, store, or sell any of your numbers. You can verify this independently in your browser developer tools network tab at any time.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-950 flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            1. Data Controller & Direct Inquiries
          </h2>
          <p>
            {siteConfig.brandName} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the website located at{' '}
            <Link href="/" className="text-emerald-700 underline font-medium">
              {siteConfig.siteUrl}
            </Link>. For any privacy-related questions, data access requests, or regulatory inquiries under GDPR, CCPA/CPRA, or PIPEDA, our designated Data Protection Contact can be reached directly at:
          </p>
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs sm:text-sm text-neutral-800 flex items-center gap-3">
            <Mail className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div>
              <div className="font-semibold text-neutral-900">Privacy & Data Protection Contact</div>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-emerald-700 font-bold hover:underline"
              >
                {siteConfig.contactEmail}
              </a>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-950 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            2. What Information We Do NOT Collect
          </h2>
          <p>
            Unlike typical financial SaaS tools, {siteConfig.brandName} is deliberately architected to eliminate unnecessary data storage:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-neutral-700 pl-2">
            <li><strong>No Account Credentials:</strong> We do not offer user accounts, passwords, or profile storage.</li>
            <li><strong>No Financial / Inventory Data:</strong> Wholesale item costs, supplier pricing, retail selling prices, ad spend, and net profits are processed only in local memory on your client device.</li>
            <li><strong>No Bank or Card Details:</strong> We do not process payments, collect billing addresses, or charge subscription fees.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-950 flex items-center gap-2">
            <Eye className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            3. Information We May Process
          </h2>
          <p>
            Depending on your interaction with the website, minimal technical information may be processed:
          </p>
          <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-neutral-700 pl-2">
            <li>
              <strong>Direct Communications:</strong> When you send an email or form inquiry to{' '}
              <a href={`mailto:${siteConfig.contactEmail}`} className="text-emerald-700 font-medium underline">
                {siteConfig.contactEmail}
              </a>, we collect your email address, name, and message contents strictly to respond to your inquiry. We retain correspondence only as long as needed to address your feedback or support ticket.
            </li>
            <li>
              <strong>Local Browser Storage (localStorage):</strong> To save you time, your browser may save your selected currency preference (USD, GBP, or CAD) and cookie consent status in your browser&apos;s local storage. This never leaves your device.
            </li>
            <li>
              <strong>Aggregated Web Telemetry:</strong> Standard server logs (e.g., HTTP request headers, browser user agent, IP address for security rate-limiting, and referring URL) generated automatically by web hosting infrastructure (such as Vercel) to protect against DDoS attacks and ensure service availability.
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-950 flex items-center gap-2">
            <Cookie className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            4. Cookies & Advertising Disclosures (Google AdSense)
          </h2>
          <p>
            {siteConfig.brandName} supports its free educational mission through transparent digital advertising. When third-party advertising partners such as Google AdSense are active, third-party cookies and tracking technologies operate under the following standards:
          </p>
          <div className="space-y-3 pl-2 text-xs sm:text-sm text-neutral-700">
            <p>
              <strong>Third-Party Vendors & Cookies:</strong> Google and other third-party vendors use cookies to serve ads based on your prior visits to this website or other sites across the web.
            </p>
            <p>
              <strong>Advertising Cookies:</strong> Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visits to our site and/or other sites on the Internet.
            </p>
            <p>
              <strong>How to Opt Out of Personalized Advertising:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>
                You may opt out of personalized advertising by visiting{' '}
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 underline font-medium"
                >
                  Google Ads Settings
                </a>.
              </li>
              <li>
                Alternatively, users in the US can opt out of third-party vendor cookies for personalized advertising by visiting{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 underline font-medium"
                >
                  www.aboutads.info/choices/
                </a>.
              </li>
              <li>
                Users in Canada may manage preferences through the{' '}
                <a
                  href="https://youradchoices.ca/en/tools"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 underline font-medium"
                >
                  Digital Advertising Alliance of Canada (DAAC)
                </a>.
              </li>
              <li>
                Users in the UK and European Union can manage tracking via{' '}
                <a
                  href="https://www.youronlinechoices.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 underline font-medium"
                >
                  Your Online Choices (EDAA)
                </a>.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-950 flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            5. Regional Privacy Rights (UK/GDPR, CCPA/CPRA, PIPEDA)
          </h2>
          
          <div className="space-y-4 text-xs sm:text-sm text-neutral-700">
            <div>
              <h3 className="font-bold text-neutral-900 text-sm mb-1">
                A. European Union (GDPR) & United Kingdom (UK GDPR)
              </h3>
              <p>
                If you are a resident of the EEA or UK, you possess legal rights under the General Data Protection Regulation, including:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 mt-1">
                <li>The right to access personal data we hold about you (e.g., support emails);</li>
                <li>The right to rectify inaccurate information;</li>
                <li>The right to erasure (&quot;Right to be Forgotten&quot;);</li>
                <li>The right to restrict or object to data processing;</li>
                <li>The right to lodge a complaint with your local supervisory authority (such as the UK Information Commissioner&apos;s Office - ICO).</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-neutral-900 text-sm mb-1">
                B. California & United States Residents (CCPA / CPRA)
              </h3>
              <p>
                Under the California Consumer Privacy Act and California Privacy Rights Act:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 mt-1">
                <li><strong>No Sale of Personal Data:</strong> We do not sell your personal information or exchange it for monetary value.</li>
                <li><strong>Right to Know & Delete:</strong> You may request disclosure or deletion of any email correspondence submitted to us.</li>
                <li><strong>Non-Discrimination:</strong> We will never deny services, calculate different results, or provide a degraded experience for exercising your legal privacy rights.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-neutral-900 text-sm mb-1">
                C. Canadian Residents (PIPEDA)
              </h3>
              <p>
                Under the Personal Information Protection and Electronic Documents Act (PIPEDA), Canadian residents have the right to request access to any personal information we retain, know how it is used, and challenge its accuracy.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-950">
            6. Security Safeguards
          </h2>
          <p>
            We deploy modern web security safeguards, including full TLS 1.3 encryption in transit, strict Content Security Policies (CSP), HTTP Strict Transport Security (HSTS), and isolated client-side execution boundaries. To report a security vulnerability or inspect our security posture, visit our{' '}
            <Link href="/security" className="text-emerald-700 underline font-medium">
              Security Center
            </Link>{' '}
            or write directly to{' '}
            <a href={`mailto:${siteConfig.contactEmail}`} className="text-emerald-700 underline font-medium">
              {siteConfig.contactEmail}
            </a>.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-950">
            7. Children&apos;s Online Privacy Protection Act (COPPA)
          </h2>
          <p>
            Our calculators and educational materials are designed for e-commerce business owners and are not intended for children under 13 years of age. We do not knowingly collect personal information from children.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-950">
            8. Changes to this Policy & Contact Information
          </h2>
          <p>
            We may periodically update this Privacy Policy to reflect changing legal requirements or calculator improvements. The &quot;Last Updated&quot; timestamp at the top of this page indicates the effective date.
          </p>
          <p>
            For any questions, legal notices, or feedback regarding this policy, please email:
          </p>
          <p className="font-bold text-neutral-900">
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-emerald-700 hover:text-emerald-800 underline text-base"
            >
              {siteConfig.contactEmail}
            </a>
          </p>
        </section>
      </div>

      <div className="mt-8 pt-8 border-t border-neutral-200 flex flex-wrap gap-4 justify-between items-center text-xs">
        <Link
          href="/terms"
          className="text-neutral-600 hover:text-neutral-900 underline font-medium"
        >
          View Terms of Service
        </Link>
        <Link
          href="/security"
          className="text-neutral-600 hover:text-neutral-900 underline font-medium"
        >
          Security Disclosures & RFC 9116
        </Link>
        <Link
          href="/contact"
          className="text-emerald-700 hover:text-emerald-800 font-semibold"
        >
          Contact Legal Team &rarr;
        </Link>
      </div>
    </div>
  );
}
