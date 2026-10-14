'use client';

import React, { useState, useMemo } from 'react';
import {
  UniversalProfitInputs,
  CurrencyCode,
} from '@/lib/types/calculator';
import {
  calculateUniversalProfit,
  DEFAULT_UNIVERSAL_INPUTS,
  EMPTY_UNIVERSAL_INPUTS,
} from '@/lib/calculations/product-profit';
import { CURRENCY_SYMBOLS } from '@/lib/calculations/formatting';
import { NumberInput } from '@/components/NumberInput';
import { CurrencySelector } from '@/components/CurrencySelector';
import { ResultsSummaryCard } from '@/components/ResultsSummaryCard';
import { FeeBreakdownTable, BreakdownItem } from '@/components/FeeBreakdownTable';
import {
  RotateCcw,
  Sparkles,
  ShoppingBag,
  Truck,
  CreditCard,
  Target,
  Percent,
} from 'lucide-react';

export function UniversalProfitCalculator() {
  const [inputs, setInputs] = useState<UniversalProfitInputs>(DEFAULT_UNIVERSAL_INPUTS);

  const currency = inputs.currency;
  const currencySymbol = CURRENCY_SYMBOLS[currency] || '$';

  const updateField = (field: keyof UniversalProfitInputs, value: unknown) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setInputs(EMPTY_UNIVERSAL_INPUTS);
  };

  const handleLoadExample = () => {
    setInputs(DEFAULT_UNIVERSAL_INPUTS);
  };

  const outputs = useMemo(() => {
    return calculateUniversalProfit(inputs);
  }, [inputs]);

  // Breakdown items for the transparent table
  const breakdownItems: BreakdownItem[] = useMemo(() => {
    return [
      {
        label: 'Product Selling Price',
        amount: outputs.itemRevenue,
        type: 'revenue',
      },
      {
        label: 'Shipping Charged to Customer',
        amount: outputs.shippingRevenue,
        type: 'revenue',
      },
      {
        label: 'Total Gross Revenue',
        amount: outputs.totalRevenue,
        type: 'subtotal',
      },
      {
        label: 'Product Acquisition Cost (COGS)',
        amount: outputs.productCost,
        type: 'cost',
        notes: 'Wholesale, manufacturing, or inventory purchase',
      },
      {
        label: 'Shipping Paid by Seller',
        amount: outputs.shippingPaid,
        type: 'cost',
        notes: 'Postage label or carrier charge',
      },
      {
        label: 'Packaging & Prep Materials',
        amount: outputs.packagingCost,
        type: 'cost',
        notes: 'Boxes, mailers, bubble wrap, labels',
      },
      {
        label: `Marketplace Fee (${inputs.marketplaceFeePercent}%)`,
        amount: outputs.marketplaceFee,
        type: 'cost',
        notes: 'Platform commission on total revenue',
      },
      {
        label: `Payment Processing Fee (${inputs.paymentProcessingPercent}% + ${currencySymbol}${inputs.fixedTransactionFee})`,
        amount: outputs.paymentProcessingFee,
        type: 'cost',
        notes: 'Stripe, PayPal, or marketplace merchant fee',
      },
      {
        label: 'Advertising Cost Per Order (CPA)',
        amount: outputs.adSpend,
        type: 'cost',
        notes: 'Paid ads attribution',
      },
      {
        label: `Return & Refund Allowance (${inputs.returnRatePercent}%)`,
        amount: outputs.estimatedReturnAllowance,
        type: 'cost',
        notes: 'Expected reserve for damaged goods or returns',
      },
      {
        label: 'Other Variable Expenses',
        amount: outputs.otherExpenses,
        type: 'cost',
      },
      {
        label: 'Total All Costs & Deductions',
        amount: outputs.totalCosts,
        type: 'subtotal',
      },
      {
        label: 'Net Seller Profit',
        amount: outputs.netProfit,
        type: 'profit',
      },
    ];
  }, [outputs, inputs, currencySymbol]);

  return (
    <div className="space-y-8">
      {/* Top Header Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-neutral-200/90 shadow-xs">
        <CurrencySelector
          value={currency}
          onChange={(c: CurrencyCode) => updateField('currency', c)}
        />

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLoadExample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 rounded-lg transition-colors"
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

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs (Left Column - 7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Pricing & Customer Shipping */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
              <ShoppingBag className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
                1. Selling Price & Revenue
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NumberInput
                label="Product Selling Price"
                value={inputs.sellingPrice}
                onChange={(val) => updateField('sellingPrice', val)}
                prefix={currencySymbol}
                placeholder="0.00"
                tooltip="The listed retail price the buyer pays for the item before shipping charges."
                required
              />

              <NumberInput
                label="Shipping Charged to Buyer"
                value={inputs.shippingCharged}
                onChange={(val) => updateField('shippingCharged', val)}
                prefix={currencySymbol}
                placeholder="0.00"
                tooltip="Amount paid by the customer for postage. Enter 0 for free shipping."
              />
            </div>
          </div>

          {/* Section 2: Product & Fulfillment Costs */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
              <Truck className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
                2. Inventory & Shipping Costs
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <NumberInput
                label="Product Cost (COGS)"
                value={inputs.productCost}
                onChange={(val) => updateField('productCost', val)}
                prefix={currencySymbol}
                placeholder="0.00"
                tooltip="Your unit acquisition cost, manufacturing expense, or wholesale purchase price."
                required
              />

              <NumberInput
                label="Shipping Paid by You"
                value={inputs.shippingPaid}
                onChange={(val) => updateField('shippingPaid', val)}
                prefix={currencySymbol}
                placeholder="0.00"
                tooltip="What you actually pay to the postal carrier (USPS, Royal Mail, Canada Post, UPS, FedEx) to ship the order."
              />

              <NumberInput
                label="Packaging Costs"
                value={inputs.packagingCost}
                onChange={(val) => updateField('packagingCost', val)}
                prefix={currencySymbol}
                placeholder="0.00"
                tooltip="Cost of poly mailers, corrugated boxes, tape, protective bubble wrap, and shipping labels."
              />
            </div>
          </div>

          {/* Section 3: Marketplace & Processing Fees */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
                3. Marketplace & Payment Fees
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <NumberInput
                label="Marketplace Fee"
                value={inputs.marketplaceFeePercent}
                onChange={(val) => updateField('marketplaceFeePercent', val)}
                suffix="%"
                placeholder="0"
                tooltip="Platform sales commission percentage (e.g. eBay ~13.25%, Etsy 6.5%, Amazon 15%, Shopify 0%)."
              />

              <NumberInput
                label="Payment Processing"
                value={inputs.paymentProcessingPercent}
                onChange={(val) => updateField('paymentProcessingPercent', val)}
                suffix="%"
                placeholder="0"
                tooltip="Variable merchant rate (e.g. Stripe 2.9%, PayPal 2.99%, Etsy Payments 3-4%)."
              />

              <NumberInput
                label="Fixed Order Fee"
                value={inputs.fixedTransactionFee}
                onChange={(val) => updateField('fixedTransactionFee', val)}
                prefix={currencySymbol}
                placeholder="0.00"
                tooltip="Fixed flat transaction charge per order (e.g. $0.30 on Stripe/eBay, $0.25 on Etsy)."
              />
            </div>
          </div>

          {/* Section 4: Marketing & Return Reserve */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
              <Percent className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
                4. Marketing, Returns & Overhead
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <NumberInput
                label="Ad Cost Per Order"
                value={inputs.adSpendPerOrder}
                onChange={(val) => updateField('adSpendPerOrder', val)}
                prefix={currencySymbol}
                placeholder="0.00"
                tooltip="Cost Per Acquisition (CPA) from Meta Ads, Google Ads, TikTok, or Promoted Listings."
              />

              <NumberInput
                label="Return Allowance"
                value={inputs.returnRatePercent}
                onChange={(val) => updateField('returnRatePercent', val)}
                suffix="%"
                placeholder="0"
                tooltip="Expected return/refund rate percentage reserved against revenue for refunds, claims, or damages."
              />

              <NumberInput
                label="Other Expenses"
                value={inputs.otherExpenses}
                onChange={(val) => updateField('otherExpenses', val)}
                prefix={currencySymbol}
                placeholder="0.00"
                tooltip="Any additional software allocation, bookkeeping fee, or miscellaneous order cost."
              />
            </div>
          </div>

          {/* Section 5: Target Profit Margin Goal */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
              <Target className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
                5. Target Profit Margin Goal
              </h2>
            </div>

            <div className="max-w-xs">
              <NumberInput
                label="Desired Profit Margin"
                value={inputs.targetMarginPercent}
                onChange={(val) => updateField('targetMarginPercent', val)}
                suffix="%"
                placeholder="20"
                tooltip="The net profit margin percentage you want to maintain on total revenue."
              />
            </div>
          </div>
        </div>

        {/* Results Sidebar (Right Column - 5 cols) */}
        <div className="lg:col-span-5 space-y-6 sticky top-20">
          <ResultsSummaryCard
            netProfit={outputs.netProfit}
            profitMarginPercent={outputs.profitMarginPercent}
            totalRevenue={outputs.totalRevenue}
            totalCosts={outputs.totalCosts}
            returnOnProductCostPercent={outputs.returnOnProductCostPercent}
            breakEvenSellingPrice={outputs.breakEvenSellingPrice}
            targetMarginSellingPrice={outputs.targetMarginSellingPrice}
            targetMarginPercent={inputs.targetMarginPercent}
            targetMarginPossible={outputs.targetMarginPossible}
            targetMarginMessage={outputs.targetMarginMessage}
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
    </div>
  );
}
