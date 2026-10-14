'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig, calculatorNavItems } from '@/lib/config/site';
import {
  Calculator,
  Menu,
  X,
  ChevronDown,
  BookOpen,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calculatorsOpen, setCalculatorsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-xl text-neutral-900 tracking-tight hover:opacity-90 transition-opacity"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm">
              <Calculator className="w-5 h-5" />
            </div>
            <span>
              {siteConfig.brandName}
              <span className="text-emerald-600">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-neutral-700">
            {/* Calculators Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCalculatorsOpen(true)}
              onMouseLeave={() => setCalculatorsOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                  pathname.startsWith('/calculators')
                    ? 'text-emerald-700 bg-emerald-50 font-semibold'
                    : 'hover:text-neutral-900 hover:bg-neutral-100'
                }`}
                aria-expanded={calculatorsOpen}
              >
                <span>Calculators</span>
                <ChevronDown className="w-4 h-4 text-neutral-500" />
              </button>

              {calculatorsOpen && (
                <div className="absolute left-0 mt-0 w-80 bg-white rounded-xl shadow-lg border border-neutral-200 p-2 z-50">
                  <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 px-3 py-2">
                    Seller Calculators
                  </div>
                  {calculatorNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setCalculatorsOpen(false)}
                      className={`block px-3 py-2.5 rounded-lg transition-colors ${
                        pathname === item.href
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'hover:bg-neutral-50 text-neutral-800'
                      }`}
                    >
                      <div className="font-medium text-sm text-neutral-900">
                        {item.label}
                      </div>
                      {item.description && (
                        <div className="text-xs text-neutral-600 mt-0.5 line-clamp-1">
                          {item.description}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Guides Link */}
            <Link
              href="/guides"
              className={`px-3 py-2 rounded-md transition-colors ${
                isActive('/guides')
                  ? 'text-emerald-700 bg-emerald-50 font-semibold'
                  : 'hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              Guides
            </Link>

            {/* About Link */}
            <Link
              href="/about"
              className={`px-3 py-2 rounded-md transition-colors ${
                isActive('/about')
                  ? 'text-emerald-700 bg-emerald-50 font-semibold'
                  : 'hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              About
            </Link>

            {/* Contact Link */}
            <Link
              href="/contact"
              className={`px-3 py-2 rounded-md transition-colors ${
                isActive('/contact')
                  ? 'text-emerald-700 bg-emerald-50 font-semibold'
                  : 'hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Quick Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/calculators/product-profit-calculator"
              className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors"
            >
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Universal Calculator</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 bg-white px-4 pt-2 pb-6 space-y-4">
          <div className="font-semibold text-xs text-neutral-500 uppercase tracking-wider px-2 pt-2">
            Calculators
          </div>
          <div className="space-y-1">
            {calculatorNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                  pathname === item.href
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'text-neutral-800 hover:bg-neutral-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-neutral-200 pt-3 space-y-1">
            <Link
              href="/guides"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-neutral-800 hover:bg-neutral-100"
            >
              Guides & Education
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-neutral-800 hover:bg-neutral-100"
            >
              About & Methodology
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-neutral-800 hover:bg-neutral-100"
            >
              Contact Support
            </Link>
          </div>

          <div className="pt-2">
            <Link
              href="/calculators/product-profit-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 px-4 rounded-lg shadow-sm"
            >
              <span>Launch Calculator</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
