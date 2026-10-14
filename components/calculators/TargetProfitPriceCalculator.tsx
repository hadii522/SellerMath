'use client';

import React, { useState, useMemo } from 'react';
import { TargetPriceInputs, CurrencyCode } from '@/lib/types/calculator';
import {
  calculateTargetPrice,
  DEFAULT_TARGET_PRICE_INPUTS,
} from '@/lib/calculations/target-price';
import {
  CURRENCY_SYMBOLS,
  formatCurrency,
  formatPercent,
} from '@/lib/calculations/formatting';
import { NumberInput } from '@/components/NumberInput';
import { CurrencySelector } from '@/components/CurrencySelector';
import {
  Target,
  Sparkles,
  RotateCcw,
  AlertTriangle,
  Scale,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

export function TargetProfitPriceCalculator() {
  const [inputs, setInputs] = useState<TargetPriceInputs>(
    DEFAULT_TARGET_PRICE_INPUTS
  );

  const currency = inputs.currency;
  const currencySymbol = CURRENCY_SYMBOLS[currency] || '$';

  const updateField = (field: keyof TargetPriceInputs, value: unknown) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setInputs({
      ...DEFAULT_TARGET_PRICE_INPUTS,
      productCost: 0,
      shippingPaidBySeller: 0,
      packagingCost: 0,
      shippingChargedToCustomer: 0,
      adSpendPerOrder: 0,
      otherExpenses: 0,
      targetMarginPercent: 20,
    });
  };

  const outputs = useMemo(() => {
    return calculateTargetPrice(inputs);
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
            onClick={() => setInputs(DEFAULT_TARGET_PRICE_INPUTS)}
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
          {/* Target Margin Goal */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
              <Target className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
                1. Target Profit Margin Goal
              </h2>
            </div>

            <div className="max-w-sm">
              <NumberInput
                label="Desired Net Profit Margin (%)"
                value={inputs.targetMarginPercent}
                onChange={(val) => updateField('targetMarginPercent', val)}
                suffix="%"
                placeholder="25"
                tooltip="The target net profit margin as a percentage of total revenue."
                required
              />
            </div>
          </div>

          {/* Product & Shipping Costs */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
                2. Product & Shipping Costs
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <NumberInput
                label="Product Cost (COGS)"
                value={inputs.productCost}
                onChange={(val) => updateField('productCost', val)}
                prefix={currencySymbol}
                placeholder="0.00"
                required
              />
              <NumberInput
                label="Shipping Paid by Seller"
                value={inputs.shippingPaidBySeller}
                onChange={(val) => updateField('shippingPaidBySeller', val)}
                prefix={currencySymbol}
                placeholder="0.00"
              />
              <NumberInput
                label="Packaging Cost"
                value={inputs.packagingCost}
                onChange={(val) => updateField('packagingCost', val)}
                prefix={currencySymbol}
                placeholder="0.00"
              />
            </div>

            <div className="pt-2 max-w-sm">
              <NumberInput
                label="Shipping Charged to Buyer"
                value={inputs.shippingChargedToCustomer}
                onChange={(val) =>
                  updateField('shippingChargedToCustomer', val)
                }
                prefix={currencySymbol}
                placeholder="0.00"
                tooltip="Amount customer pays for shipping. Enter 0 for free shipping."
              />
            </div>
          </div>

          {/* Marketplace & Processing Fee Assumptions */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
                3. Platform Fees & Advertising
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <NumberInput
                label="Marketplace Fee (%)"
                value={inputs.marketplaceFeePercent}
                onChange={(val) => updateField('marketplaceFeePercent', val)}
                suffix="%"
                placeholder="0"
                tooltip="Platform sales commission."
              />
              <NumberInput
                label="Payment Processing (%)"
                value={inputs.paymentProcessingPercent}
                onChange={(val) => updateField('paymentProcessingPercent', val)}
                suffix="%"
                placeholder="0"
              />
              <NumberInput
                label="Fixed Order Fee"
                value={inputs.fixedTransactionFee}
                onChange={(val) => updateField('fixedTransactionFee', val)}
                prefix={currencySymbol}
                placeholder="0.00"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <NumberInput
                label="Ad Spend Per Order"
                value={inputs.adSpendPerOrder}
                onChange={(val) => updateField('adSpendPerOrder', val)}
                prefix={currencySymbol}
                placeholder="0.00"
              />
              <NumberInput
                label="Other Expenses"
                value={inputs.otherExpenses}
                onChange={(val) => updateField('otherExpenses', val)}
                prefix={currencySymbol}
                placeholder="0.00"
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
                !outputs.isPossible
                  ? 'bg-rose-50/70 border-rose-100'
                  : 'bg-emerald-50/70 border-emerald-100'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600 flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-emerald-600" />
                  Required Selling Price
                </span>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  {inputs.targetMarginPercent}% Margin
                </span>
              </div>

              <div className="flex items-baseline gap-3">
                <div
                  className={`text-5xl font-extrabold tracking-tight ${
                    !outputs.isPossible
                      ? 'text-rose-700'
                      : 'text-emerald-700'
                  }`}
                >
                  {outputs.isPossible && outputs.targetSellingPrice !== null
                    ? formatCurrency(outputs.targetSellingPrice, currency)
                    : '—'}
                </div>
              </div>

              {!outputs.isPossible && outputs.errorMessage && (
                <div className="mt-3 flex items-start gap-2 text-xs text-rose-800 bg-rose-100/70 p-3 rounded-lg border border-rose-200">
                  <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <p>{outputs.errorMessage}</p>
                </div>
              )}
            </div>

            {/* Metrics List */}
            {outputs.isPossible && (
              <div className="divide-y divide-neutral-100 text-sm">
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-neutral-500 font-medium">
                      Projected Profit Per Unit
                    </div>
                    <div className="text-xs text-neutral-400">
                      Net gain at this selling price
                    </div>
                  </div>
                  <div className="text-base font-bold text-emerald-700">
                    {formatCurrency(outputs.projectedProfit, currency)}
                  </div>
                </div>

                <div className="p-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-neutral-500 font-medium flex items-center gap-1">
                      <Scale className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Break-Even Selling Price</span>
                    </div>
                    <div className="text-xs text-neutral-400">
                      Price needed just to cover costs (0% profit)
                    </div>
                  </div>
                  <div className="text-base font-bold text-neutral-900">
                    {formatCurrency(outputs.breakEvenSellingPrice, currency)}
                  </div>
                </div>

                <div className="p-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-neutral-500 font-medium">
                      Total Projected Revenue
                    </div>
                    <div className="text-xs text-neutral-400">
                      Item price + customer shipping
                    </div>
                  </div>
                  <div className="text-base font-bold text-neutral-900">
                    {formatCurrency(outputs.totalRevenue, currency)}
                  </div>
                </div>

                <div className="p-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-neutral-500 font-medium">
                      Total Calculated Costs
                    </div>
                    <div className="text-xs text-neutral-400">
                      Product, shipping, fees, and ads
                    </div>
                  </div>
                  <div className="text-base font-bold text-neutral-900">
                    {formatCurrency(outputs.totalCosts, currency)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
