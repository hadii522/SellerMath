'use client';

import React from 'react';
import Link from 'next/link';
import { siteConfig, calculatorNavItems, guideNavItems } from '@/lib/config/site';
import { Calculator, ShieldCheck } from 'lucide-react';

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-neutral-950 text-neutral-400 text-sm border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-bold text-xl text-white tracking-tight"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Calculator className="w-4 h-4" />
              </div>
              <span>
                {siteConfig.brandName}
                <span className="text-emerald-500">.</span>
              </span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
              Free, independent seller profit and fee calculators for online
              merchants, resellers, and e-commerce entrepreneurs in the United
              States, United Kingdom, and Canada.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-neutral-300">
              <span className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-md">
                <span>🇺🇸</span> US Market
              </span>
              <span className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-md">
                <span>🇬🇧</span> UK Market
              </span>
              <span className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-md">
                <span>🇨🇦</span> CA Market
              </span>
            </div>
            <div className="pt-2 text-xs text-neutral-400">
              <span>Direct Inquiries: </span>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-emerald-400 hover:text-emerald-300 font-medium underline"
              >
                {siteConfig.contactEmail}
              </a>
            </div>
          </div>

          {/* Calculators Column */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white text-xs uppercase tracking-wider">
              Seller Calculators
            </h3>
            <ul className="space-y-2">
              {calculatorNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Educational Guides Column */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white text-xs uppercase tracking-wider">
              Guides & Education
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/guides"
                  className="hover:text-emerald-400 transition-colors font-medium text-neutral-300"
                >
                  All Seller Guides
                </Link>
              </li>
              {guideNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Legal Column */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white text-xs uppercase tracking-wider">
              Company & Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="hover:text-emerald-400 transition-colors"
                >
                  About & Methodology
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Security & VDP
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Fee Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="mt-12 pt-8 border-t border-neutral-800 text-xs text-neutral-300 space-y-3">
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-neutral-400 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Estimates Disclaimer:</strong> {siteConfig.brandName} is an
              independent educational and analytical tool. Marketplace fee
              structures, referral rates, payment processing fees, and profit
              calculations are estimates intended for planning purposes only.
              Final settlement values may vary due to sales taxes, marketplace
              account standings, variable payment adjustments, and specific seller
              agreements. Verify official rates directly with eBay, Etsy, Amazon,
              or your payment provider.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between text-neutral-300 pt-4">
            <p>
              &copy; {currentYear} {siteConfig.brandName}. All rights reserved.
            </p>
            <p className="mt-2 sm:mt-0">
              Not affiliated with, sponsored by, or endorsed by eBay Inc., Etsy Inc.,
              or Amazon.com, Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
