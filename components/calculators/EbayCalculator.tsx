'use client';

import React, { useState, useMemo } from 'react';
import { EbayInputs, CountryCode, CurrencyCode } from '@/lib/types/calculator';
import {
  calculateEbayProfit,
  DEFAULT_EBAY_INPUTS,
} from '@/lib/calculations/ebay';
import { EBAY_FEE_CONFIGS } from '@/lib/fees/ebay-fees';
import { CURRENCY_SYMBOLS } from '@/lib/calculations/formatting';
import { NumberInput } from '@/components/NumberInput';
import { ResultsSummaryCard } from '@/components/ResultsSummaryCard';
import { FeeBreakdownTable, BreakdownItem } from '@/components/FeeBreakdownTable';
import { SourceAttribution } from '@/components/SourceAttribution';
import { RotateCcw, Sparkles, Store, ShoppingCart, Percent } from 'lucide-react';

export function EbayCalculator() {
  const [inputs, setInputs] = useState<EbayInputs>(DEFAULT_EBAY_INPUTS);

  const marketConfig = EBAY_FEE_CONFIGS[inputs.country] || EBAY_FEE_CONFIGS.US;
  const currency = inputs.currency;
  const currencySymbol = CURRENCY_SYMBOLS[currency] || '$';

  const updateField = (field: keyof EbayInputs, value: unknown) => {
    setInputs((prev) => {
      const next = { ...prev, [field]: value };
      // Sync currency if country changes
      if (field === 'country') {
        const country = value as CountryCode;
        if (country === 'US') next.currency = 'USD';
        else if (country === 'UK') next.currency = 'GBP';
        else if (country === 'CA') next.currency = 'CAD';
        // Reset category to default for that country
        next.category = EBAY_FEE_CONFIGS[country].categories[0].id;
      }
      return next;
    });
  };

  const handleReset = () => {
    setInputs({
      ...DEFAULT_EBAY_INPUTS,
      country: inputs.country,
      currency: inputs.currency,
      category: marketConfig.categories[0].id,
      sellingPrice: 0,
      shippingCharged: 0,
      productCost: 0,
      shippingPaid: 0,
      packagingCost: 0,
    });
  };

  const outputs = useMemo(() => {
    return calculateEbayProfit(inputs);
  }, [inputs]);

  const breakdownItems: BreakdownItem[] = useMemo(() => {
    return [
      {
        label: 'Item Selling Price',
        amount: inputs.sellingPrice,
        type: 'revenue',
      },
      {
        label: 'Shipping Charged to Customer',
        amount: inputs.shippingCharged,
        type: 'revenue',
      },
      {
        label: 'Total Sale Amount',
        amount: outputs.totalRevenue,
        type: 'subtotal',
      },
      {
        label: 'Product Acquisition Cost',
        amount: outputs.productCost,
        type: 'cost',
      },
      {
        label: 'Actual Shipping & Packaging',
        amount: outputs.shippingCostTotal,
        type: 'cost',
      },
      {
        label: `eBay Final Value Fee (${outputs.finalValueFeePercent}%)`,
        amount: outputs.finalValueFee,
        type: 'cost',
      },
      {
        label: 'eBay Fixed Order Fee',
        amount: outputs.fixedOrderFee,
        type: 'cost',
      },
      ...(outputs.promotedListingFee > 0
        ? [
            {
              label: `Promoted Listings (${inputs.promotedListingPercent}%)`,
              amount: outputs.promotedListingFee,
              type: 'cost' as const,
            },
          ]
        : []),
      ...(outputs.internationalFee > 0
        ? [
            {
              label: `International Cross-Border Fee (${inputs.internationalFeePercent}%)`,
              amount: outputs.internationalFee,
              type: 'cost' as const,
            },
          ]
        : []),
      {
        label: 'Other Order Expenses',
        amount: outputs.otherCosts,
        type: 'cost',
      },
      {
        label: 'Total Deductions',
        amount: outputs.totalCosts,
        type: 'subtotal',
      },
      {
        label: 'Net Payout / Seller Profit',
        amount: outputs.netProfit,
        type: 'profit',
      },
    ];
  }, [outputs, inputs]);

  return (
    <div className="space-y-8">
      {/* Top Country Selector & Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-neutral-200/90 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wide">
            Marketplace Region:
          </span>
          <div className="inline-flex rounded-lg border border-neutral-300 p-0.5 bg-neutral-100 text-xs font-medium">
            <button
              type="button"
              onClick={() => updateField('country', 'US')}
              className={`px-3 py-1 rounded-md transition-colors ${
                inputs.country === 'US'
                  ? 'bg-white text-neutral-900 font-semibold shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              🇺🇸 eBay US ($)
            </button>
            <button
              type="button"
              onClick={() => updateField('country', 'UK')}
              className={`px-3 py-1 rounded-md transition-colors ${
                inputs.country === 'UK'
                  ? 'bg-white text-neutral-900 font-semibold shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              🇬🇧 eBay UK (£)
            </button>
            <button
              type="button"
              onClick={() => updateField('country', 'CA')}
              className={`px-3 py-1 rounded-md transition-colors ${
                inputs.country === 'CA'
                  ? 'bg-white text-neutral-900 font-semibold shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              🇨🇦 eBay Canada (CA$)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setInputs(DEFAULT_EBAY_INPUTS)}
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
          {/* Category & Store Settings */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
              <Store className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
                Category & Seller Tier
              </h2>
            </div>

            <div>
              <label
                htmlFor="ebay-category-select"
                className="block text-xs font-semibold text-neutral-800 mb-1.5"
              >
                Item Category
              </label>
              <select
                id="ebay-category-select"
                value={inputs.category}
                onChange={(e) => updateField('category', e.target.value)}
                className="w-full bg-white border border-neutral-300 rounded-lg py-2 px-3 text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                {marketConfig.categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} ({cat.standardRatePercent}%)
                  </option>
                ))}
              </select>
            </div>

            {/* Store Subscription Toggle */}
            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inputs.hasStoreSubscription}
                  onChange={(e) =>
                    updateField('hasStoreSubscription', e.target.checked)
                  }
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-neutral-300"
                />
                <div>
                  <span className="text-sm font-semibold text-neutral-900">
                    eBay Store Subscriber (Basic, Premium, Anchor)
                  </span>
                  <p className="text-xs text-neutral-500">
                    Store subscribers receive discounted Final Value Fee rates in
                    most categories.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Pricing & Revenue */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
              <ShoppingCart className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
                Item Sale & Postage Charged
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NumberInput
                label="Item Selling Price"
                value={inputs.sellingPrice}
                onChange={(val) => updateField('sellingPrice', val)}
                prefix={currencySymbol}
                placeholder="0.00"
                required
              />
              <NumberInput
                label="Shipping Charged to Buyer"
                value={inputs.shippingCharged}
                onChange={(val) => updateField('shippingCharged', val)}
                prefix={currencySymbol}
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Actual Costs */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
              <Percent className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
                Acquisition & Fulfillment Costs
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <NumberInput
                label="Product Cost"
                value={inputs.productCost}
                onChange={(val) => updateField('productCost', val)}
                prefix={currencySymbol}
                placeholder="0.00"
                required
              />
              <NumberInput
                label="Postage Label Cost"
                value={inputs.shippingPaid}
                onChange={(val) => updateField('shippingPaid', val)}
                prefix={currencySymbol}
                placeholder="0.00"
              />
              <NumberInput
                label="Packaging Materials"
                value={inputs.packagingCost}
                onChange={(val) => updateField('packagingCost', val)}
                prefix={currencySymbol}
                placeholder="0.00"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <NumberInput
                label="Promoted Listings Ad Rate"
                value={inputs.promotedListingPercent}
                onChange={(val) => updateField('promotedListingPercent', val)}
                suffix="%"
                placeholder="0"
                tooltip="Optional ad percentage (e.g. 2%-10%) charged by eBay only when a buyer clicks your ad and purchases within 30 days."
              />
              <NumberInput
                label="International Fee"
                value={inputs.internationalFeePercent}
                onChange={(val) => updateField('internationalFeePercent', val)}
                suffix="%"
                placeholder="0"
                tooltip="Cross-border buyer fee (typically ~1.65% US or 1.2%-2% UK)."
              />
              <NumberInput
                label="Other Expenses"
                value={inputs.otherCosts}
                onChange={(val) => updateField('otherCosts', val)}
                prefix={currencySymbol}
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        {/* Results Sidebar (5 cols) */}
        <div className="lg:col-span-5 space-y-6 sticky top-20">
          <ResultsSummaryCard
            netProfit={outputs.netProfit}
            profitMarginPercent={outputs.profitMarginPercent}
            totalRevenue={outputs.totalRevenue}
            totalCosts={outputs.totalCosts}
            returnOnProductCostPercent={outputs.returnOnCostPercent}
            currency={currency}
          />

          <FeeBreakdownTable
            items={breakdownItems}
            currency={currency}
            totalRevenue={outputs.totalRevenue}
            netProfit={outputs.netProfit}
          />
        </div>
      </div>

      {/* Verified Fee Attribution Footer */}
      <SourceAttribution
        source={marketConfig.source}
        exclusions={marketConfig.exclusions}
      />
    </div>
  );
}
