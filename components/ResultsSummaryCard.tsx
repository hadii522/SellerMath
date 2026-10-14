'use client';

import React, { useState } from 'react';
import { CurrencyCode } from '@/lib/types/calculator';
import {
  formatCurrency,
  formatPercent,
} from '@/lib/calculations/formatting';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  Check,
  Copy,
  Target,
  Scale,
} from 'lucide-react';

interface ResultsSummaryProps {
  netProfit: number;
  profitMarginPercent: number;
  totalRevenue: number;
  totalCosts: number;
  returnOnProductCostPercent?: number | null;
  breakEvenSellingPrice?: number | null;
  targetMarginSellingPrice?: number | null;
  targetMarginPercent?: number;
  targetMarginPossible?: boolean;
  targetMarginMessage?: string;
  currency: CurrencyCode;
}

export function ResultsSummaryCard({
  netProfit,
  profitMarginPercent,
  totalRevenue,
  totalCosts,
  returnOnProductCostPercent,
  breakEvenSellingPrice,
  targetMarginSellingPrice,
  targetMarginPercent,
  targetMarginPossible = true,
  targetMarginMessage,
  currency,
}: ResultsSummaryProps) {
  const [copied, setCopied] = useState(false);

  const isProfitable = netProfit > 0;
  const isLoss = netProfit < 0;

  const handleCopy = () => {
    const summaryText = `Seller Profit Summary (${currency}):
Total Revenue: ${formatCurrency(totalRevenue, currency)}
Total Costs: ${formatCurrency(totalCosts, currency)}
Net Profit: ${formatCurrency(netProfit, currency)}
Profit Margin: ${formatPercent(profitMarginPercent, 2)}
${
  returnOnProductCostPercent !== null && returnOnProductCostPercent !== undefined
    ? `Return on Product Cost (ROI): ${formatPercent(returnOnProductCostPercent, 2)}`
    : ''
}
${
  breakEvenSellingPrice !== null && breakEvenSellingPrice !== undefined
    ? `Break-Even Selling Price: ${formatCurrency(breakEvenSellingPrice, currency)}`
    : ''
}
${
  targetMarginSellingPrice !== null && targetMarginSellingPrice !== undefined
    ? `Target Margin (${targetMarginPercent}%) Price: ${formatCurrency(
        targetMarginSellingPrice,
        currency
      )}`
    : ''
}`.trim();

    navigator.clipboard.writeText(summaryText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-sm overflow-hidden">
      {/* Top Header Card */}
      <div
        className={`p-6 border-b transition-colors ${
          isLoss
            ? 'bg-rose-50/70 border-rose-100'
            : isProfitable
            ? 'bg-emerald-50/70 border-emerald-100'
            : 'bg-neutral-50/70 border-neutral-200'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600 flex items-center gap-1.5">
            {isProfitable ? (
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            ) : isLoss ? (
              <TrendingDown className="w-4 h-4 text-rose-600" />
            ) : (
              <DollarSign className="w-4 h-4 text-neutral-500" />
            )}
            Net Profit Per Order
          </span>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 text-xs font-medium text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200 px-2.5 py-1 rounded-md shadow-xs transition-colors"
            title="Copy calculation summary"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-400" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Primary Value */}
        <div className="flex items-baseline gap-3">
          <div
            className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${
              isLoss
                ? 'text-rose-700'
                : isProfitable
                ? 'text-emerald-700'
                : 'text-neutral-900'
            }`}
          >
            {formatCurrency(netProfit, currency)}
          </div>

          <div
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
              isLoss
                ? 'bg-rose-200 text-rose-900'
                : isProfitable
                ? 'bg-emerald-200 text-emerald-900'
                : 'bg-neutral-200 text-neutral-800'
            }`}
          >
            {formatPercent(profitMarginPercent, 1)} Margin
          </div>
        </div>

        {isLoss && (
          <div className="mt-3 flex items-start gap-2 text-xs text-rose-800 bg-rose-100/70 p-2.5 rounded-lg border border-rose-200">
            <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <p>
              This order loses money. Your total costs exceed your selling price
              and shipping charged by {formatCurrency(Math.abs(netProfit), currency)}.
            </p>
          </div>
        )}
      </div>

      {/* Grid of Key Metrics */}
      <div className="grid grid-cols-2 divide-x divide-y divide-neutral-100 text-sm">
        <div className="p-4">
          <div className="text-xs text-neutral-500 font-medium">Total Revenue</div>
          <div className="text-lg font-bold text-neutral-900 mt-0.5">
            {formatCurrency(totalRevenue, currency)}
          </div>
        </div>

        <div className="p-4">
          <div className="text-xs text-neutral-500 font-medium">Total Costs & Fees</div>
          <div className="text-lg font-bold text-neutral-900 mt-0.5">
            {formatCurrency(totalCosts, currency)}
          </div>
        </div>

        <div className="p-4">
          <div className="text-xs text-neutral-500 font-medium flex items-center gap-1">
            <Scale className="w-3.5 h-3.5 text-neutral-400" />
            <span>Break-Even Price</span>
          </div>
          <div className="text-lg font-bold text-neutral-900 mt-0.5">
            {breakEvenSellingPrice !== null && breakEvenSellingPrice !== undefined
              ? formatCurrency(breakEvenSellingPrice, currency)
              : '—'}
          </div>
        </div>

        <div className="p-4">
          <div className="text-xs text-neutral-500 font-medium">
            ROI on Product Cost
          </div>
          <div className="text-lg font-bold text-neutral-900 mt-0.5">
            {returnOnProductCostPercent !== null &&
            returnOnProductCostPercent !== undefined
              ? formatPercent(returnOnProductCostPercent, 1)
              : '—'}
          </div>
        </div>
      </div>

      {/* Target Margin Callout (if provided) */}
      {targetMarginPercent !== undefined && targetMarginPercent > 0 && (
        <div className="p-4 bg-neutral-50 border-t border-neutral-100 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-semibold text-neutral-800">
              <Target className="w-4 h-4 text-emerald-600" />
              <span>Target Margin Price ({targetMarginPercent}%):</span>
            </div>
            {targetMarginPossible && targetMarginSellingPrice !== null ? (
              <div className="text-sm font-bold text-emerald-700">
                {formatCurrency(targetMarginSellingPrice, currency)}
              </div>
            ) : (
              <span className="text-rose-600 font-semibold">Impossible</span>
            )}
          </div>

          {!targetMarginPossible && targetMarginMessage && (
            <p className="mt-2 text-rose-700 bg-rose-50 p-2 rounded border border-rose-200">
              {targetMarginMessage}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
