'use client';

import React, { useState, useMemo } from 'react';
import { RoasInputs, CurrencyCode } from '@/lib/types/calculator';
import {
  calculateRoas,
  DEFAULT_ROAS_INPUTS,
} from '@/lib/calculations/roas';
import {
  CURRENCY_SYMBOLS,
  formatCurrency,
  formatRoas,
} from '@/lib/calculations/formatting';
import { NumberInput } from '@/components/NumberInput';
import { CurrencySelector } from '@/components/CurrencySelector';
import {
  TrendingUp,
  Target,
  Sparkles,
  RotateCcw,
  AlertTriangle,
  Scale,
  DollarSign,
  HelpCircle,
} from 'lucide-react';

export function BreakEvenRoasCalculator() {
  const [inputs, setInputs] = useState<RoasInputs>(DEFAULT_ROAS_INPUTS);

  const currency = inputs.currency;
  const currencySymbol = CURRENCY_SYMBOLS[currency] || '$';

  const updateField = (field: keyof RoasInputs, value: unknown) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setInputs({
      ...DEFAULT_ROAS_INPUTS,
      sellingPrice: 0,
      productCost: 0,
      shippingAndPackagingCost: 0,
      marketplaceAndPaymentFees: 0,
      otherVariableCosts: 0,
      desiredProfitPerOrder: 0,
    });
  };

  const outputs = useMemo(() => {
    return calculateRoas(inputs);
  }, [inputs]);

  return (
    <div className="space-y-8">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-neutral-200/90 shadow-xs">
        <CurrencySelector
          value={currency}
          onChange={(c: CurrencyCode) => updateField('currency', c)}
        />

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setInputs(DEFAULT_ROAS_INPUTS)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Load Example</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-neutral-500" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
                1. Product Economics Before Ads
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NumberInput
                label="Product Selling Price (AOV)"
                value={inputs.sellingPrice}
                onChange={(val) => updateField('sellingPrice', val)}
                prefix={currencySymbol}
                placeholder="0.00"
                tooltip="Average Order Value (revenue per customer order)."
                required
              />

              <NumberInput
                label="Product Acquisition Cost (COGS)"
                value={inputs.productCost}
                onChange={(val) => updateField('productCost', val)}
                prefix={currencySymbol}
                placeholder="0.00"
                tooltip="Unit wholesale or manufacturing cost."
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <NumberInput
                label="Shipping & Packaging"
                value={inputs.shippingAndPackagingCost}
                onChange={(val) => updateField('shippingAndPackagingCost', val)}
                prefix={currencySymbol}
                placeholder="0.00"
                tooltip="Combined postal label and packaging cost paid by you."
              />

              <NumberInput
                label="Marketplace & Payment Fees"
                value={inputs.marketplaceAndPaymentFees}
                onChange={(val) => updateField('marketplaceAndPaymentFees', val)}
                prefix={currencySymbol}
                placeholder="0.00"
                tooltip="Total platform commission and merchant processing fees."
              />

              <NumberInput
                label="Other Variable Costs"
                value={inputs.otherVariableCosts}
                onChange={(val) => updateField('otherVariableCosts', val)}
                prefix={currencySymbol}
                placeholder="0.00"
                tooltip="Any returns reserve or handling cost."
              />
            </div>
          </div>

          {/* Desired Profit Goal */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
              <Target className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
                2. Desired Profit Target (Optional)
              </h2>
            </div>

            <div className="max-w-sm">
              <NumberInput
                label="Desired Profit Per Order"
                value={inputs.desiredProfitPerOrder}
                onChange={(val) => updateField('desiredProfitPerOrder', val)}
                prefix={currencySymbol}
                placeholder="0.00"
                tooltip="Leave at 0 to calculate pure break-even ROAS. Enter a dollar amount to find your target ROAS for that profit."
              />
            </div>
          </div>
        </div>

        {/* Results Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6 sticky top-20">
          <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-sm overflow-hidden">
            {/* Primary Result Card */}
            <div
              className={`p-6 border-b transition-colors ${
                !outputs.isProfitableBeforeAds
                  ? 'bg-rose-50/70 border-rose-100'
                  : 'bg-emerald-50/70 border-emerald-100'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-emerald-600" />
                  Break-Even ROAS Multiplier
                </span>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  Minimum Floor
                </span>
              </div>

              <div className="flex items-baseline gap-3">
                <div
                  className={`text-5xl font-extrabold tracking-tight ${
                    !outputs.isProfitableBeforeAds
                      ? 'text-rose-700'
                      : 'text-emerald-700'
                  }`}
                >
                  {formatRoas(outputs.breakEvenRoas)}
                </div>
              </div>

              <p className="mt-3 text-xs text-neutral-600 leading-relaxed">
                {outputs.notes}
              </p>
            </div>

            {/* Metrics List */}
            <div className="divide-y divide-neutral-100 text-sm">
              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs text-neutral-500 font-medium">
                    Pre-Ad Contribution Margin
                  </div>
                  <div className="text-xs text-neutral-400">
                    Revenue minus all non-ad costs
                  </div>
                </div>
                <div
                  className={`text-base font-bold ${
                    outputs.preAdContribution > 0
                      ? 'text-neutral-900'
                      : 'text-rose-600'
                  }`}
                >
                  {formatCurrency(outputs.preAdContribution, currency)}
                </div>
              </div>

              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs text-neutral-500 font-medium">
                    Max Break-Even Ad Spend (CPA)
                  </div>
                  <div className="text-xs text-neutral-400">
                    Highest cost per acquisition allowed to avoid loss
                  </div>
                </div>
                <div className="text-base font-bold text-neutral-900">
                  {formatCurrency(outputs.breakEvenAdSpend, currency)}
                </div>
              </div>

              {inputs.desiredProfitPerOrder > 0 && (
                <>
                  <div className="p-4 flex items-center justify-between bg-emerald-50/30">
                    <div>
                      <div className="text-xs font-semibold text-emerald-900">
                        Target ROAS for {formatCurrency(inputs.desiredProfitPerOrder, currency)} Profit
                      </div>
                      <div className="text-xs text-neutral-500">
                        Required campaign performance
                      </div>
                    </div>
                    <div className="text-lg font-extrabold text-emerald-700">
                      {formatRoas(outputs.targetRoas)}
                    </div>
                  </div>

                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-neutral-500 font-medium">
                        Target Max Ad Spend
                      </div>
                      <div className="text-xs text-neutral-400">
                        Max CPA to retain desired profit
                      </div>
                    </div>
                    <div className="text-base font-bold text-neutral-900">
                      {formatCurrency(outputs.targetMaxAdSpend, currency)}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
