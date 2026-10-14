import {
  UniversalProfitInputs,
  UniversalProfitOutputs,
} from '@/lib/types/calculator';
import { roundTo } from './formatting';

/**
 * Calculates complete profit, fee, and margin metrics for any physical product.
 *
 * Formulas:
 * Revenue = Selling Price + Shipping Charged to Customer
 * Marketplace Fee = Revenue * (Marketplace Fee % / 100)
 * Payment Fee = Revenue * (Payment Processing % / 100) + Fixed Transaction Fee
 * Total Fees = Marketplace Fee + Payment Fee
 * Return Allowance = Revenue * (Return Rate % / 100)
 * Total Shipping & Packaging = Shipping Paid by Seller + Packaging Cost
 * Total Costs = Product Cost + Total Shipping & Packaging + Total Fees + Ad Spend + Other Expenses + Return Allowance
 * Net Profit = Revenue - Total Costs
 * Profit Margin = (Net Profit / Revenue) * 100 (if Revenue > 0)
 * Return on Product Cost (ROI / Markup on cost) = (Net Profit / Product Cost) * 100 (if Product Cost > 0)
 *
 * Break-even Selling Price:
 * Let F = Product Cost + Shipping Paid + Packaging + Ad Spend + Other Expenses + Fixed Transaction Fee
 * Let v = (Marketplace Fee % + Payment Processing % + Return Rate %) / 100
 * Break-Even Revenue = F / (1 - v)
 * Break-Even Selling Price = Break-Even Revenue - Shipping Charged
 *
 * Target Margin Selling Price:
 * Let m = Target Margin % / 100
 * Target Revenue = F / (1 - v - m)
 * Target Selling Price = Target Revenue - Shipping Charged
 */
export function calculateUniversalProfit(
  inputs: UniversalProfitInputs
): UniversalProfitOutputs {
  const sellingPrice = Math.max(0, inputs.sellingPrice || 0);
  const shippingCharged = Math.max(0, inputs.shippingCharged || 0);
  const productCost = Math.max(0, inputs.productCost || 0);
  const shippingPaid = Math.max(0, inputs.shippingPaid || 0);
  const packagingCost = Math.max(0, inputs.packagingCost || 0);
  const marketplaceFeePercent = Math.max(0, inputs.marketplaceFeePercent || 0);
  const paymentProcessingPercent = Math.max(0, inputs.paymentProcessingPercent || 0);
  const fixedTransactionFee = Math.max(0, inputs.fixedTransactionFee || 0);
  const adSpend = Math.max(0, inputs.adSpendPerOrder || 0);
  const otherExpenses = Math.max(0, inputs.otherExpenses || 0);
  const returnRatePercent = Math.max(0, inputs.returnRatePercent || 0);
  const targetMarginPercent = inputs.targetMarginPercent || 0;

  // 1. Revenue
  const totalRevenue = roundTo(sellingPrice + shippingCharged, 2);

  // 2. Variable and Fixed Fees
  const marketplaceFee = roundTo(
    totalRevenue * (marketplaceFeePercent / 100),
    2
  );
  const paymentProcessingFee = roundTo(
    totalRevenue * (paymentProcessingPercent / 100) +
      (totalRevenue > 0 || fixedTransactionFee > 0 ? fixedTransactionFee : 0),
    2
  );
  const totalFees = roundTo(marketplaceFee + paymentProcessingFee, 2);

  // 3. Shipping & Packaging
  const totalShippingAndPackaging = roundTo(shippingPaid + packagingCost, 2);

  // 4. Return Allowance
  const estimatedReturnAllowance = roundTo(
    totalRevenue * (returnRatePercent / 100),
    2
  );

  // 5. Total Costs
  const totalCosts = roundTo(
    productCost +
      totalShippingAndPackaging +
      totalFees +
      adSpend +
      otherExpenses +
      estimatedReturnAllowance,
    2
  );

  // 6. Net Profit
  const netProfit = roundTo(totalRevenue - totalCosts, 2);

  // 7. Margin & ROI
  const profitMarginPercent =
    totalRevenue > 0 ? roundTo((netProfit / totalRevenue) * 100, 2) : 0;

  const returnOnProductCostPercent =
    productCost > 0 ? roundTo((netProfit / productCost) * 100, 2) : null;

  // 8. Break-Even Calculations
  const fixedCosts =
    productCost +
    shippingPaid +
    packagingCost +
    fixedTransactionFee +
    adSpend +
    otherExpenses;

  const variableFeeRate =
    (marketplaceFeePercent + paymentProcessingPercent + returnRatePercent) / 100;

  let breakEvenRevenue: number | null = null;
  let breakEvenSellingPrice: number | null = null;

  if (variableFeeRate < 1) {
    const rawBreakEvenRev = fixedCosts / (1 - variableFeeRate);
    breakEvenRevenue = roundTo(rawBreakEvenRev, 2);
    breakEvenSellingPrice = roundTo(
      Math.max(0, rawBreakEvenRev - shippingCharged),
      2
    );
  }

  // 9. Target Margin Calculations
  const targetMarginDecimal = targetMarginPercent / 100;
  const denominator = 1 - variableFeeRate - targetMarginDecimal;

  let targetMarginRevenue: number | null = null;
  let targetMarginSellingPrice: number | null = null;
  let targetMarginPossible = true;
  let targetMarginMessage: string | undefined;

  if (targetMarginPercent <= 0) {
    targetMarginRevenue = breakEvenRevenue;
    targetMarginSellingPrice = breakEvenSellingPrice;
    targetMarginPossible = true;
  } else if (denominator <= 0) {
    targetMarginPossible = false;
    const combinedRate = roundTo((variableFeeRate + targetMarginDecimal) * 100, 1);
    targetMarginMessage = `A ${targetMarginPercent}% profit margin is mathematically impossible because variable fees (${roundTo(
      variableFeeRate * 100,
      1
    )}%) plus desired margin total ${combinedRate}% (≥ 100% of revenue).`;
  } else {
    const rawTargetRev = fixedCosts / denominator;
    targetMarginRevenue = roundTo(rawTargetRev, 2);
    targetMarginSellingPrice = roundTo(
      Math.max(0, rawTargetRev - shippingCharged),
      2
    );
    targetMarginPossible = true;
  }

  return {
    totalRevenue,
    itemRevenue: sellingPrice,
    shippingRevenue: shippingCharged,
    productCost,
    totalShippingAndPackaging,
    shippingPaid,
    packagingCost,
    marketplaceFee,
    paymentProcessingFee,
    totalFees,
    adSpend,
    otherExpenses,
    estimatedReturnAllowance,
    totalCosts,
    netProfit,
    profitMarginPercent,
    returnOnProductCostPercent,
    breakEvenSellingPrice,
    breakEvenRevenue,
    targetMarginSellingPrice,
    targetMarginRevenue,
    targetMarginPossible,
    targetMarginMessage,
  };
}

/**
 * Realistic default example data for testing and demonstrations.
 */
export const DEFAULT_UNIVERSAL_INPUTS: UniversalProfitInputs = {
  sellingPrice: 49.99,
  shippingCharged: 4.99,
  productCost: 15.0,
  shippingPaid: 6.5,
  packagingCost: 1.5,
  marketplaceFeePercent: 12.0,
  paymentProcessingPercent: 2.9,
  fixedTransactionFee: 0.3,
  adSpendPerOrder: 5.0,
  otherExpenses: 0.5,
  returnRatePercent: 3.0,
  currency: 'USD',
  targetMarginPercent: 25.0,
};

export const EMPTY_UNIVERSAL_INPUTS: UniversalProfitInputs = {
  sellingPrice: 0,
  shippingCharged: 0,
  productCost: 0,
  shippingPaid: 0,
  packagingCost: 0,
  marketplaceFeePercent: 0,
  paymentProcessingPercent: 0,
  fixedTransactionFee: 0,
  adSpendPerOrder: 0,
  otherExpenses: 0,
  returnRatePercent: 0,
  currency: 'USD',
  targetMarginPercent: 20.0,
};
