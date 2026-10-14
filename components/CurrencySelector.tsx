'use client';

import React from 'react';
import { CurrencyCode } from '@/lib/types/calculator';
import { siteConfig } from '@/lib/config/site';

interface CurrencySelectorProps {
  value: CurrencyCode;
  onChange: (currency: CurrencyCode) => void;
  className?: string;
}

export function CurrencySelector({
  value,
  onChange,
  className = '',
}: CurrencySelectorProps) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wide mr-1">
        Currency:
      </span>
      <div className="inline-flex rounded-lg border border-neutral-300 p-0.5 bg-neutral-100 text-xs font-medium shadow-inner">
        {siteConfig.supportedCurrencies.map((c) => {
          const isSelected = value === c.code;
          return (
            <button
              key={c.code}
              type="button"
              onClick={() => onChange(c.code)}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                isSelected
                  ? 'bg-white text-neutral-950 font-semibold shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
              }`}
              title={c.label}
              aria-pressed={isSelected}
            >
              <span>{c.flag}</span>
              <span>{c.code}</span>
              <span className="text-neutral-400 font-normal">({c.symbol})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
