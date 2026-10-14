'use client';

import React, { useState, useMemo } from 'react';
import { EtsyInputs, CountryCode } from '@/lib/types/calculator';
import {
  calculateEtsyProfit,
  DEFAULT_ETSY_INPUTS,
} from '@/lib/calculations/etsy';
import { ETSY_FEE_CONFIGS } from '@/lib/fees/etsy-fees';
import { CURRENCY_SYMBOLS } from '@/lib/calculations/formatting';
import { NumberInput } from '@/components/NumberInput';
import { ResultsSummaryCard } from '@/components/ResultsSummaryCard';
import { FeeBreakdownTable, BreakdownItem } from '@/components/FeeBreakdownTable';
import { SourceAttribution } from '@/components/SourceAttribution';
import { RotateCcw, Sparkles, Tag, ShoppingBag, Megaphone } from 'lucide-react';

export function EtsyCalculator() {
  const [inputs, setInputs] = useState<EtsyInputs>(DEFAULT_ETSY_INPUTS);

  const marketConfig = ETSY_FEE_CONFIGS[inputs.country] || ETSY_FEE_CONFIGS.US;
  const currency = inputs.currency;
  const currencySymbol = CURRENCY_SYMBOLS[currency] || '$';

  const updateField = (field: keyof EtsyInputs, value: unknown) => {
    setInputs((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'country') {
        const country = value as CountryCode;
        if (country === 'US') next.currency = 'USD';
        else if (country === 'UK') next.currency = 'GBP';
        else if (country === 'CA') next.currency = 'CAD';
      }
      return next;
    });
  };

  const handleReset = () => {
    setInputs({
      ...DEFAULT_ETSY_INPUTS,
      country: inputs.country,
      currency: inputs.currency,
      sellingPrice: 0,
      shippingCharged: 0,
      productCost: 0,
      shippingPaid: 0,
      packagingCost: 0,
      otherCosts: 0,
    });
  };

  const outputs = useMemo(() => {
    return calculateEtsyProfit(inputs);
  }, [inputs]);

  const breakdownItems: BreakdownItem[] = useMemo(() => {
    return [
      {
        label: 'Item Selling Price',
        amount: inputs.sellingPrice,
        type: 'revenue',
      },
      {
        label: 'Shipping Charged to Buyer',
        amount: inputs.shippingCharged,
        type: 'revenue',
      },
      {
        label: 'Total Revenue (Order Total)',
        amount: outputs.totalRevenue,
        type: 'subtotal',
      },
      {
        label: 'Product Acquisition Cost (COGS)',
        amount: outputs.productCost,
        type: 'cost',
      },
      {
        label: 'Shipping & Packaging Cost',
        amount: outputs.shippingCostTotal,
        type: 'cost',
      },
      {
        label: `Listing Fee (${currencySymbol}${marketConfig.listingFee.toFixed(2)}/listing)`,
        amount: outputs.listingFee,
        type: 'cost',
        notes: 'Charged per item sold or auto-renewed',
      },
      {
        label: `Etsy Transaction Fee (${marketConfig.transactionFeePercent}%)`,
        amount: outputs.transactionFee,
        type: 'cost',
        notes: '6.5% on item price + shipping',
      },
      {
        label: `Etsy Payments Processing (${marketConfig.paymentProcessingPercent}% + ${currencySymbol}${marketConfig.paymentProcessingFixed.toFixed(2)})`,
        amount: outputs.paymentProcessingFee,
        type: 'cost',
      },
      ...(outputs.regulatoryOperatingFee > 0
        ? [
            {
              label: `Regulatory Operating Fee (${marketConfig.regulatoryOperatingFeePercent}%)`,
              amount: outputs.regulatoryOperatingFee,
              type: 'cost' as const,
              notes: 'Applicable in the UK',
            },
          ]
        : []),
      ...(outputs.offsiteAdsFee > 0
        ? [
            {
              label: `Offsite Ads Fee (${inputs.offsiteAdsPercent}%)`,
              amount: outputs.offsiteAdsFee,
              type: 'cost' as const,
              notes: 'Attributed from Google/Bing offsite ad click',
            },
          ]
        : []),
      {
        label: 'Other Expenses',
        amount: outputs.otherCosts,
        type: 'cost',
      },
      {
        label: 'Total Etsy Fees & Costs',
        amount: outputs.totalCosts,
        type: 'subtotal',
      },
      {
        label: 'Net Seller Profit',
        amount: outputs.netProfit,
        type: 'profit',
      },
    ];
  }, [outputs, inputs, marketConfig, currencySymbol]);

  return (
    <div className="space-y-8">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-neutral-200/90 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wide">
            Etsy Marketplace:
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
              🇺🇸 United States ($)
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
              🇬🇧 United Kingdom (£)
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
              🇨🇦 Canada (CA$)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setInputs(DEFAULT_ETSY_INPUTS)}
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
          {/* Item Pricing */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
              <ShoppingBag className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
                Item Listing & Customer Postage
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NumberInput
                label="Item Price"
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
                tooltip="Amount paid by the customer for postage."
              />
            </div>
          </div>

          {/* Acquisition & Postage Cost */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
              <Tag className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
                Item Cost & Actual Shipping
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <NumberInput
                label="Materials / Product Cost"
                value={inputs.productCost}
                onChange={(val) => updateField('productCost', val)}
                prefix={currencySymbol}
                placeholder="0.00"
                required
              />
              <NumberInput
                label="Postage Paid by Seller"
                value={inputs.shippingPaid}
                onChange={(val) => updateField('shippingPaid', val)}
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
          </div>

          {/* Offsite Ads & Program Options */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
              <Megaphone className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
                Etsy Offsite Ads & Other Fees
              </h2>
            </div>

            <div>
              <label
                htmlFor="etsy-offsite-ads"
                className="block text-xs font-semibold text-neutral-800 mb-1.5"
              >
                Etsy Offsite Ads Fee
              </label>
              <select
                id="etsy-offsite-ads"
                value={inputs.offsiteAdsPercent}
                onChange={(e) =>
                  updateField('offsiteAdsPercent', parseFloat(e.target.value))
                }
                className="w-full bg-white border border-neutral-300 rounded-lg py-2 px-3 text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value={0}>0% — No Offsite Ads fee (Direct / Organic sale)</option>
                <option value={15}>
                  15% — Standard optional rate (Sellers &lt; $10k annual sales)
                </option>
                <option value={12}>
                  12% — Mandatory rate (Sellers &ge; $10k annual sales)
                </option>
              </select>
            </div>

            <div className="max-w-xs pt-1">
              <NumberInput
                label="Other Order Expenses"
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

      <SourceAttribution
        source={marketConfig.source}
        exclusions={marketConfig.exclusions}
      />
    </div>
  );
}
