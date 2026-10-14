'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, Shield, X, ChevronDown, ChevronUp } from 'lucide-react';
import { siteConfig } from '@/lib/config/site';

export function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const consent = localStorage.getItem('sellermath_cookie_consent');
      if (!consent) {
        setShowBanner(true);
      }
    } catch {
      // LocalStorage unavailable in restrictive private browser modes
      setShowBanner(false);
    }
  }, []);

  const handleConsent = (choice: 'all' | 'essential') => {
    try {
      localStorage.setItem('sellermath_cookie_consent', choice);
    } catch {
      // ignore storage error
    }
    setShowBanner(false);
  };

  if (!mounted || !showBanner) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Consent"
      role="region"
      className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-4 pointer-events-none"
    >
      <div className="max-w-4xl mx-auto bg-neutral-900/95 backdrop-blur-md text-white border border-neutral-800 rounded-2xl shadow-2xl p-4 sm:p-5 pointer-events-auto transition-all">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
              <Cookie className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-semibold text-white flex items-center gap-2">
                <span>Your Privacy & Cookie Choices</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                  GDPR &bull; CCPA
                </span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed max-w-2xl">
                We use cookies and browser storage to remember your regional currency preference, analyze anonymous traffic, and serve contextual ads. Your calculator inputs (costs, margins, sales) are calculated strictly on your device and are never transmitted to our servers.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto flex-shrink-0">
            <button
              type="button"
              onClick={() => handleConsent('essential')}
              className="flex-1 sm:flex-none text-xs font-semibold px-3.5 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
            >
              Essential Only
            </button>
            <button
              type="button"
              onClick={() => handleConsent('all')}
              className="flex-1 sm:flex-none text-xs font-semibold px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>

        {/* Expandable Details Drawer */}
        <div className="mt-3 pt-3 border-t border-neutral-800/80 flex flex-wrap items-center justify-between text-xs text-neutral-400 gap-2">
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium"
          >
            <span>{showDetails ? 'Hide Cookie Categories' : 'Manage Cookie Details'}</span>
            {showDetails ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>

          <div className="flex items-center gap-3">
            <Link
              href="/privacy-policy"
              className="text-neutral-400 hover:text-white underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/security"
              className="text-neutral-400 hover:text-white underline"
            >
              Security Policy
            </Link>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-neutral-400 hover:text-white underline"
            >
              Inquiries: {siteConfig.contactEmail}
            </a>
          </div>
        </div>

        {showDetails && (
          <div className="mt-3 p-3 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-2 text-xs text-neutral-300">
            <div>
              <strong className="text-white">Strictly Necessary (Always Active):</strong> Saves your selected regional currency (USD, GBP, CAD) and your cookie preferences locally on your browser.
            </div>
            <div>
              <strong className="text-white">Analytics & Advertising:</strong> Google AdSense uses cookies to serve contextual advertising that keeps {siteConfig.brandName} 100% free for all sellers.
            </div>
            <div className="text-[11px] text-neutral-400 pt-1">
              Have questions? Email us directly at <a href={`mailto:${siteConfig.contactEmail}`} className="text-emerald-400 underline">{siteConfig.contactEmail}</a>.
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
