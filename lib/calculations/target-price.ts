import {
  TargetPriceInputs,
  TargetPriceOutputs,
} from '@/lib/types/calculator';
import { roundTo } from './formatting';

/**
 * Calculates the required selling price to achieve a desired profit margin %.
 */
export function calculateTargetPrice(
  inputs: TargetPriceInputs
): TargetPriceOutputs {
  const productCost = Math.max(0, inputs.productCost || 0);
  const shippingPaid = Math.max(0, inputs.shippingPaidBySeller || 0);
  const packaging = Math.max(0, inputs.packagingCost || 0);
  const shippingCharged = Math.max(0, inputs.shippingChargedToCustomer || 0);
  const marketplaceFeeRate = Math.max(0, inputs.marketplaceFeePercent || 0) / 100;
  const paymentFeeRate = Math.max(0, inputs.paymentProcessingPercent || 0) / 100;
  const fixedTransactionFee = Math.max(0, inputs.fixedTransactionFee || 0);
  const adSpend = Math.max(0, inputs.adSpendPerOrder || 0);
  const otherExpenses = Math.max(0, inputs.otherExpenses || 0);
  const targetMarginRate = (inputs.targetMarginPercent || 0) / 100;

  const fixedCosts =
    productCost +
    shippingPaid +
    packaging +
    fixedTransactionFee +
    adSpend +
    otherExpenses;

  const variableFeeRate = marketplaceFeeRate + paymentFeeRate;

  // 1. Break-even calculation (0% profit margin)
  let breakEvenSellingPrice: number | null = null;
  if (variableFeeRate < 1) {
    const breakEvenRevenue = fixedCosts / (1 - variableFeeRate);
    breakEvenSellingPrice = roundTo(
      Math.max(0, breakEvenRevenue - shippingCharged),
      2
    );
  }

  // 2. Target margin calculation
  const denominator = 1 - variableFeeRate - targetMarginRate;

  if (targetMarginRate < 0) {
    return {
      targetSellingPrice: null,
      totalRevenue: null,
      totalCosts: null,
      projectedProfit: null,
      effectiveMarginPercent: null,
      isPossible: false,
      errorMessage: 'Target margin percentage must be 0% or higher.',
      breakEvenSellingPrice,
    };
  }

  if (denominator <= 0) {
    const feePercent = roundTo(variableFeeRate * 100, 1);
    const targetPercent = roundTo(targetMarginRate * 100, 1);
    const sumPercent = roundTo(feePercent + targetPercent, 1);

    return {
      targetSellingPrice: null,
      totalRevenue: null,
      totalCosts: null,
      projectedProfit: null,
      effectiveMarginPercent: null,
      isPossible: false,
      errorMessage: `Mathematically impossible target: Variable fees (${feePercent}%) plus your target margin (${targetPercent}%) sum to ${sumPercent}%, which meets or exceeds 100% of revenue. To fix this, decrease your target margin or reduce platform fee percentages.`,
      breakEvenSellingPrice,
    };
  }

  const rawTargetRevenue = fixedCosts / denominator;
  const targetRevenue = roundTo(rawTargetRevenue, 2);
  const targetSellingPrice = roundTo(
    Math.max(0, rawTargetRevenue - shippingCharged),
    2
  );

  const totalFees = roundTo(
    targetRevenue * variableFeeRate + fixedTransactionFee,
    2
  );
  const totalCosts = roundTo(
    productCost + shippingPaid + packaging + totalFees + adSpend + otherExpenses,
    2
  );
  const projectedProfit = roundTo(targetRevenue - totalCosts, 2);
  const effectiveMarginPercent =
    targetRevenue > 0
      ? roundTo((projectedProfit / targetRevenue) * 100, 2)
      : 0;

  return {
    targetSellingPrice,
    totalRevenue: targetRevenue,
    totalCosts,
    projectedProfit,
    effectiveMarginPercent,
    isPossible: true,
    breakEvenSellingPrice,
  };
}

export const DEFAULT_TARGET_PRICE_INPUTS: TargetPriceInputs = {
  productCost: 18.0,
  shippingPaidBySeller: 5.5,
  packagingCost: 1.25,
  shippingChargedToCustomer: 0.0, // free shipping to customer
  marketplaceFeePercent: 12.5,
  paymentProcessingPercent: 2.9,
  fixedTransactionFee: 0.3,
  adSpendPerOrder: 4.0,
  otherExpenses: 0.5,
  targetMarginPercent: 30.0,
  currency: 'USD',
};
