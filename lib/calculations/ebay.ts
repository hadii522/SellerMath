import { EbayInputs, EbayOutputs } from '@/lib/types/calculator';
import { EBAY_FEE_CONFIGS } from '@/lib/fees/ebay-fees';
import { roundTo } from './formatting';

/**
 * Calculates net profit and fee breakdown for an eBay order.
 */
export function calculateEbayProfit(inputs: EbayInputs): EbayOutputs {
  const sellingPrice = Math.max(0, inputs.sellingPrice || 0);
  const shippingCharged = Math.max(0, inputs.shippingCharged || 0);
  const productCost = Math.max(0, inputs.productCost || 0);
  const shippingPaid = Math.max(0, inputs.shippingPaid || 0);
  const packagingCost = Math.max(0, inputs.packagingCost || 0);
  const promotedListingPercent = Math.max(0, inputs.promotedListingPercent || 0);
  const internationalFeePercent = Math.max(0, inputs.internationalFeePercent || 0);
  const otherCosts = Math.max(0, inputs.otherCosts || 0);

  const marketConfig = EBAY_FEE_CONFIGS[inputs.country] || EBAY_FEE_CONFIGS.US;
  const categoryRule =
    marketConfig.categories.find((c) => c.id === inputs.category) ||
    marketConfig.categories[0];

  const totalRevenue = roundTo(sellingPrice + shippingCharged, 2);

  // Determine FVF rate based on store subscription
  const finalValueFeePercent = inputs.hasStoreSubscription
    ? categoryRule.storeRatePercent
    : categoryRule.standardRatePercent;

  // Final Value Fee calculation
  const finalValueFee = roundTo(totalRevenue * (finalValueFeePercent / 100), 2);

  // Fixed per-order fee applies if revenue > 0
  const fixedOrderFee = totalRevenue > 0 ? categoryRule.fixedFee : 0;

  // Promoted Listings fee applies to total sales amount if promoted
  const promotedListingFee = roundTo(
    totalRevenue * (promotedListingPercent / 100),
    2
  );

  // International cross-border fee
  const internationalFee = roundTo(
    totalRevenue * (internationalFeePercent / 100),
    2
  );

  const totalEbayFees = roundTo(
    finalValueFee + fixedOrderFee + promotedListingFee + internationalFee,
    2
  );

  const shippingCostTotal = roundTo(shippingPaid + packagingCost, 2);

  const totalCosts = roundTo(
    productCost + shippingCostTotal + totalEbayFees + otherCosts,
    2
  );

  const netProfit = roundTo(totalRevenue - totalCosts, 2);

  const profitMarginPercent =
    totalRevenue > 0 ? roundTo((netProfit / totalRevenue) * 100, 2) : 0;

  const returnOnCostPercent =
    productCost > 0 ? roundTo((netProfit / productCost) * 100, 2) : null;

  const effectiveFeeRatePercent =
    totalRevenue > 0 ? roundTo((totalEbayFees / totalRevenue) * 100, 2) : 0;

  return {
    totalRevenue,
    productCost,
    shippingCostTotal,
    finalValueFeePercent,
    finalValueFee,
    fixedOrderFee,
    promotedListingFee,
    internationalFee,
    totalEbayFees,
    otherCosts,
    totalCosts,
    netProfit,
    profitMarginPercent,
    returnOnCostPercent,
    effectiveFeeRatePercent,
  };
}

export const DEFAULT_EBAY_INPUTS: EbayInputs = {
  sellingPrice: 45.0,
  shippingCharged: 5.0,
  productCost: 14.0,
  shippingPaid: 6.0,
  packagingCost: 1.5,
  country: 'US',
  category: 'most-categories',
  hasStoreSubscription: false,
  promotedListingPercent: 0,
  internationalFeePercent: 0,
  otherCosts: 0,
  currency: 'USD',
};
