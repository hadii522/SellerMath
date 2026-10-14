'use client';

import React, { useState, useMemo } from 'react';
import { AmazonFbaInputs, CountryCode } from '@/lib/types/calculator';
import {
  calculateAmazonFbaProfit,
  DEFAULT_AMAZON_INPUTS,
} from '@/lib/calculations/amazon-fba';
import { AMAZON_FEE_CONFIGS } from '@/lib/fees/amazon-fees';
import { CURRENCY_SYMBOLS } from '@/lib/calculations/formatting';
import { NumberInput } from '@/components/NumberInput';
import { ResultsSummaryCard } from '@/components/ResultsSummaryCard';
import { FeeBreakdownTable, BreakdownItem } from '@/components/FeeBreakdownTable';
import { SourceAttribution } from '@/components/SourceAttribution';
import { RotateCcw, Sparkles, Box, Package, Megaphone } from 'lucide-react';

export function AmazonFbaCalculator() {
  const [inputs, setInputs] = useState<AmazonFbaInputs>(DEFAULT_AMAZON_INPUTS);

  const marketConfig =
    AMAZON_FEE_CONFIGS[inputs.country] || AMAZON_FEE_CONFIGS.US;
  const currency = inputs.currency;
  const currencySymbol = CURRENCY_SYMBOLS[currency] || '$';

  const updateField = (field: keyof AmazonFbaInputs, value: unknown) => {
    setInputs((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'country') {
        const country = value as CountryCode;
        if (country === 'US') next.currency = 'USD';
        else if (country === 'UK') next.currency = 'GBP';
        else if (country === 'CA') next.currency = 'CAD';
        next.category = AMAZON_FEE_CONFIGS[country].categories[0].id;
        next.sizeTier = AMAZON_FEE_CONFIGS[country].sizeTiers[0].id;
        next.estimatedFbaFee =
          AMAZON_FEE_CONFIGS[country].sizeTiers[0].typicalFee;
      }
      return next;
    });
  };

  const handleSizeTierChange = (tierId: string) => {
    const tier = marketConfig.sizeTiers.find((t) => t.id === tierId);
    setInputs((prev) => ({
      ...prev,
      sizeTier: tierId,
      estimatedFbaFee: tier ? tier.typicalFee : prev.estimatedFbaFee,
    }));
  };

  const handleReset = () => {
    setInputs({
      ...DEFAULT_AMAZON_INPUTS,
      country: inputs.country,
      currency: inputs.currency,
      sellingPrice: 0,
      productCost: 0,
      inboundShippingCost: 0,
      prepAndPackagingCost: 0,
      advertisingCost: 0,
    });
  };

  const outputs = useMemo(() => {
    return calculateAmazonFbaProfit(inputs);
  }, [inputs]);

  const breakdownItems: BreakdownItem[] = useMemo(() => {
    return [
      {
        label: 'Product Selling Price',
        amount: outputs.totalRevenue,
        type: 'revenue',
      },
      {
        label: 'Product Manufacturing / Purchase Cost',
        amount: outputs.productCost,
        type: 'cost',
      },
      {
        label: 'Inbound Shipping to Amazon FBA Warehouse',
        amount: outputs.inboundShipping,
        type: 'cost',
      },
      {
        label: 'Prep & Packaging Cost',
        amount: outputs.prepCost,
        type: 'cost',
      },
      {
        label: `Amazon Referral Fee (${outputs.referralFeePercent}%)`,
        amount: outputs.referralFee,
        type: 'cost',
      },
      ...(outputs.individualPerItemFee > 0
        ? [
            {
              label: 'Individual Selling Plan Per-Item Fee',
              amount: outputs.individualPerItemFee,
              type: 'cost' as const,
              notes: `${currencySymbol}${marketConfig.individualPerItemFee.toFixed(2)}/item`,
            },
          ]
        : []),
      {
        label: 'FBA Fulfillment Pick & Pack Fee',
        amount: outputs.fbaFulfillmentFee,
        type: 'cost',
        notes: inputs.sizeTier,
      },
      {
        label: 'FBA Monthly Storage Allocation',
        amount: outputs.storageFee,
        type: 'cost',
      },
      {
        label: 'Amazon PPC Advertising Cost (per unit)',
        amount: outputs.advertisingCost,
        type: 'cost',
      },
      {
        label: `Customer Returns Reserve (${inputs.returnRatePercent}%)`,
        amount: outputs.returnReserve,
        type: 'cost',
      },
      {
        label: 'Total FBA Fees & Product Costs',
        amount: outputs.totalCosts,
        type: 'subtotal',
      },
      {
        label: 'Net FBA Seller Profit',
        amount: outputs.netProfit,
        type: 'profit',
      },
    ];
  }, [outputs, inputs, marketConfig, currencySymbol]);

  return (
    <div className="space-y-8">
      {/* Top Region & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-neutral-200/90 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wide">
            Amazon Marketplace:
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
              🇺🇸 Amazon US ($)
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
              🇬🇧 Amazon UK (£)
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
              🇨🇦 Amazon Canada (CA$)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setInputs(DEFAULT_AMAZON_INPUTS)}
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
          {/* Selling Price & Category */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
              <Box className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
                Product Price & Category
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NumberInput
                label="Amazon Selling Price"
                value={inputs.sellingPrice}
                onChange={(val) => updateField('sellingPrice', val)}
                prefix={currencySymbol}
                placeholder="0.00"
                required
              />

              <div>
                <label
                  htmlFor="amazon-category-select"
                  className="block text-xs font-semibold text-neutral-800 mb-1.5"
                >
                  Referral Fee Category
                </label>
                <select
                  id="amazon-category-select"
                  value={inputs.category}
                  onChange={(e) => updateField('category', e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-lg py-2 px-3 text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {marketConfig.categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Plan toggle */}
            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inputs.isProfessionalPlan}
                  onChange={(e) =>
                    updateField('isProfessionalPlan', e.target.checked)
                  }
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-neutral-300"
                />
                <div>
                  <span className="text-sm font-semibold text-neutral-900">
                    Professional Selling Account (Waives per-item fee)
                  </span>
                  <p className="text-xs text-neutral-500">
                    Individual plan sellers pay {currencySymbol}
                    {marketConfig.individualPerItemFee.toFixed(2)} per item sold.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* FBA Fulfillment & Size Tier */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
              <Package className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
                FBA Pick & Pack Fulfillment Fee
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="amazon-tier-select"
                  className="block text-xs font-semibold text-neutral-800 mb-1.5"
                >
                  Product Size & Weight Tier
                </label>
                <select
                  id="amazon-tier-select"
                  value={inputs.sizeTier}
                  onChange={(e) => handleSizeTierChange(e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-lg py-2 px-3 text-sm font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {marketConfig.sizeTiers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <NumberInput
                label="FBA Pick & Pack Fee (Per Unit)"
                value={inputs.estimatedFbaFee}
                onChange={(val) => updateField('estimatedFbaFee', val)}
                prefix={currencySymbol}
                placeholder="0.00"
                tooltip="Editable benchmark or exact fee from your Amazon Revenue Calculator."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <NumberInput
                label="Storage Months (Average In Stock)"
                value={inputs.monthlyStorageMonths}
                onChange={(val) => updateField('monthlyStorageMonths', val)}
                suffix="months"
                placeholder="1.0"
              />
              <NumberInput
                label="Estimated Monthly Storage (Per Unit)"
                value={inputs.estimatedMonthlyStorage}
                onChange={(val) => updateField('estimatedMonthlyStorage', val)}
                prefix={currencySymbol}
                placeholder="0.15"
                tooltip="Typical storage allocation based on item cubic dimensions."
              />
            </div>
          </div>

          {/* Manufacturing, Inbound & PPC */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
              <Megaphone className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
                Unit Costs & Amazon PPC Ads
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <NumberInput
                label="Product COGS"
                value={inputs.productCost}
                onChange={(val) => updateField('productCost', val)}
                prefix={currencySymbol}
                placeholder="0.00"
                required
              />
              <NumberInput
                label="Inbound Shipping (Per Unit)"
                value={inputs.inboundShippingCost}
                onChange={(val) => updateField('inboundShippingCost', val)}
                prefix={currencySymbol}
                placeholder="0.00"
                tooltip="Freight cost to ship one unit from supplier to Amazon warehouse."
              />
              <NumberInput
                label="Prep & Packaging"
                value={inputs.prepAndPackagingCost}
                onChange={(val) => updateField('prepAndPackagingCost', val)}
                prefix={currencySymbol}
                placeholder="0.00"
                tooltip="Barcode labeling, polybagging, or bubble wrap."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <NumberInput
                label="Amazon PPC Ad Spend (Per Unit)"
                value={inputs.advertisingCost}
                onChange={(val) => updateField('advertisingCost', val)}
                prefix={currencySymbol}
                placeholder="0.00"
                tooltip="Blended TACoS (Total Advertising Cost of Sale) attributed per order."
              />
              <NumberInput
                label="Return Reserve Rate"
                value={inputs.returnRatePercent}
                onChange={(val) => updateField('returnRatePercent', val)}
                suffix="%"
                placeholder="0"
                tooltip="Estimated customer return rate percentage."
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
