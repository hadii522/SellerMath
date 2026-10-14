import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { siteConfig } from '@/lib/config/site';
import {
  ShieldCheck,
  Lock,
  FileCode,
  AlertTriangle,
  Mail,
  CheckCircle2,
  ServerOff,
  KeyRound,
  ExternalLink,
} from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Security Center & Vulnerability Disclosure Program (VDP)',
  description:
    'Learn about SellerMath security architecture, our 100% client-side privacy model, HTTP security headers, and how to report vulnerabilities to hgoraya522@gmail.com.',
  path: '/security',
});

export default function SecurityPage() {
  const lastUpdated = 'October 14, 2026';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ name: 'Security Center', item: '/security' }]} />

      <header className="my-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Security Architecture & VDP</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
          Security Center & Policy
        </h1>
        <p className="mt-2 text-xs text-neutral-500">
          Last Updated: {lastUpdated} &bull; Security Contact:{' '}
          <a
            href={`mailto:${siteConfig.securityEmail}`}
            className="text-emerald-700 underline font-medium"
          >
            {siteConfig.securityEmail}
          </a>
        </p>
      </header>

      <div className="my-8 bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-xs prose prose-neutral max-w-none text-sm sm:text-base leading-relaxed space-y-8 text-neutral-800">
        {/* Core Architecture Highlight */}
        <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
          <div className="font-bold flex items-center gap-2 text-emerald-950 text-base">
            <ServerOff className="w-5 h-5 text-emerald-700 flex-shrink-0" />
            Zero-Storage Client-Side Security Model
          </div>
          <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
            The most secure financial data is data that is never stored. {siteConfig.brandName} is deliberately built without remote databases, backend calculators, user authentication sessions, or cookies that store personal numbers. All calculations execute locally inside your browser sandbox.
          </p>
        </div>

        {/* Section 1: Security Controls */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-neutral-950 flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            1. Platform Security Controls & Hardening
          </h2>
          <p>
            We implement defense-in-depth engineering principles to safeguard our users against common web vulnerabilities:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose text-xs">
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1.5">
              <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                TLS 1.3 & HSTS Preload
              </div>
              <p className="text-neutral-600">
                Enforces end-to-end encrypted HTTPS transmission with modern cipher suites and HTTP Strict Transport Security (max-age 63072000; includeSubDomains; preload).
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1.5">
              <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Content Security Policy (CSP)
              </div>
              <p className="text-neutral-600">
                Restricts script execution, frame embedding, and resource loading strictly to authorized first-party domains and approved Google services.
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1.5">
              <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Anti-Clickjacking Headers
              </div>
              <p className="text-neutral-600">
                Protects users with <code>X-Frame-Options: SAMEORIGIN</code> and <code>frame-ancestors &apos;self&apos;</code> to prevent unauthorized iframe encapsulation.
              </p>
            </div>

            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-1.5">
              <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                MIME Sniffing & Privacy Headers
              </div>
              <p className="text-neutral-600">
                Hardened with <code>X-Content-Type-Options: nosniff</code>, <code>Referrer-Policy: strict-origin-when-cross-origin</code>, and restricted <code>Permissions-Policy</code>.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: VDP */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-neutral-950 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            2. Vulnerability Disclosure Program (VDP) & Safe Harbor
          </h2>
          <p>
            We deeply appreciate responsible security researchers who help protect the e-commerce community. If you discover a security vulnerability or misconfiguration on {siteConfig.brandName}, we invite you to report it directly to us in accordance with our coordinated disclosure guidelines.
          </p>

          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3">
            <h3 className="font-bold text-neutral-900 text-sm">Safe Harbor Principles</h3>
            <p className="text-xs sm:text-sm text-neutral-700">
              When conducting security research in good faith against {siteConfig.brandName}, we pledge that:
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs text-neutral-600 pl-2">
              <li>We will not initiate legal action against you or contact law enforcement;</li>
              <li>We will work collaboratively with you to understand, reproduce, and resolve the issue swiftly;</li>
              <li>We will publicly acknowledge your contribution upon request once remediated.</li>
            </ul>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-neutral-700">
            <h3 className="font-bold text-neutral-900 text-sm">Out-of-Scope Research Activities</h3>
            <p>Please refrain from the following disruptive activities:</p>
            <ul className="list-disc list-inside space-y-1 text-xs text-neutral-600 pl-2">
              <li>Denial-of-Service (DoS / DDoS) testing or high-volume automated fuzzing;</li>
              <li>Spamming contact forms or mailto handlers;</li>
              <li>Social engineering, phishing, or physical attacks;</li>
              <li>Third-party cloud infrastructure attacks (e.g., against Vercel or Cloudflare network backbones).</li>
            </ul>
          </div>
        </section>

        {/* Section 3: Reporting */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-950 flex items-center gap-2">
            <Mail className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            3. How to Report a Vulnerability
          </h2>
          <p>
            To submit a vulnerability report or security inquiry, email our security team directly:
          </p>
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 not-prose">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-neutral-500 font-medium">Security & Inquiries Email</div>
                <a
                  href={`mailto:${siteConfig.securityEmail}?subject=Security%20Vulnerability%20Report`}
                  className="text-sm font-bold text-neutral-900 hover:text-emerald-700 transition-colors"
                >
                  {siteConfig.securityEmail}
                </a>
              </div>
            </div>
            <a
              href={`mailto:${siteConfig.securityEmail}?subject=Security%20Vulnerability%20Report`}
              className="text-xs font-semibold py-2 px-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
            >
              Compose Security Email
            </a>
          </div>

          <div className="text-xs text-neutral-600 space-y-1.5 pt-2">
            <div className="font-semibold text-neutral-800">What to include in your report:</div>
            <ul className="list-disc list-inside space-y-1 text-neutral-600 pl-2">
              <li>Clear description of the issue and potential impact;</li>
              <li>Step-by-step reproduction instructions, payload examples, or proof-of-concept;</li>
              <li>Affected browser versions, operating systems, or URL routes;</li>
              <li>Your preferred attribution name or handle.</li>
            </ul>
            <p className="pt-1 text-neutral-700">
              <strong>Response SLA:</strong> We acknowledge receipt within <strong>48 business hours</strong> and provide regular updates until remediation is deployed.
            </p>
          </div>
        </section>

        {/* Section 4: security.txt */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-neutral-950 flex items-center gap-2">
            <FileCode className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            4. RFC 9116 security.txt Disclosures
          </h2>
          <p>
            In compliance with <strong>RFC 9116</strong> (A File Format to Aid in Security Vulnerability Disclosure), our canonical security policy is accessible via machine-readable standard at:
          </p>
          <div className="p-3 bg-neutral-900 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto not-prose flex items-center justify-between">
            <span>{siteConfig.siteUrl}/.well-known/security.txt</span>
            <a
              href="/.well-known/security.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white flex items-center gap-1 font-sans text-xs underline ml-4 flex-shrink-0"
            >
              <span>View Raw</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
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
          href="/terms"
          className="text-neutral-600 hover:text-neutral-900 underline font-medium"
        >
          View Terms of Service
        </Link>
        <Link
          href="/contact"
          className="text-emerald-700 hover:text-emerald-800 font-semibold"
        >
          Contact Administrative Team &rarr;
        </Link>
      </div>
    </div>
  );
}
