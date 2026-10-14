import { AmazonFbaInputs, AmazonFbaOutputs } from '@/lib/types/calculator';
import { AMAZON_FEE_CONFIGS } from '@/lib/fees/amazon-fees';
import { roundTo } from './formatting';

/**
 * Calculates net profit and fee breakdown for an Amazon FBA order.
 */
export function calculateAmazonFbaProfit(
  inputs: AmazonFbaInputs
): AmazonFbaOutputs {
  const sellingPrice = Math.max(0, inputs.sellingPrice || 0);
  const productCost = Math.max(0, inputs.productCost || 0);
  const inboundShipping = Math.max(0, inputs.inboundShippingCost || 0);
  const prepCost = Math.max(0, inputs.prepAndPackagingCost || 0);
  const estimatedFbaFee = Math.max(0, inputs.estimatedFbaFee || 0);
  const monthlyStorageMonths = Math.max(0, inputs.monthlyStorageMonths || 1);
  const estimatedMonthlyStorage = Math.max(0, inputs.estimatedMonthlyStorage || 0);
  const advertisingCost = Math.max(0, inputs.advertisingCost || 0);
  const returnRatePercent = Math.max(0, inputs.returnRatePercent || 0);

  const marketConfig =
    AMAZON_FEE_CONFIGS[inputs.country] || AMAZON_FEE_CONFIGS.US;

  const categoryRule =
    marketConfig.categories.find((c) => c.id === inputs.category) ||
    marketConfig.categories[0];

  const totalRevenue = roundTo(sellingPrice, 2);

  // 1. Referral fee (e.g. 15% with category closing fee if media)
  const referralFeePercent = categoryRule.referralRatePercent;
  const rawReferralFee =
    totalRevenue * (referralFeePercent / 100) + categoryRule.closingFee;
  const referralFee = totalRevenue > 0 ? roundTo(rawReferralFee, 2) : 0;

  // 2. Individual selling plan fee ($0.99 per item sold if not Professional)
  const individualPerItemFee =
    totalRevenue > 0 && !inputs.isProfessionalPlan
      ? marketConfig.individualPerItemFee
      : 0;

  // 3. FBA fulfillment pick & pack fee
  const fbaFulfillmentFee = totalRevenue > 0 ? roundTo(estimatedFbaFee, 2) : 0;

  // 4. Storage fee per unit
  const storageFee =
    totalRevenue > 0
      ? roundTo(estimatedMonthlyStorage * monthlyStorageMonths, 2)
      : 0;

  const totalAmazonFees = roundTo(
    referralFee + individualPerItemFee + fbaFulfillmentFee + storageFee,
    2
  );

  // 5. Return reserve allowance
  const returnReserve = roundTo(
    totalRevenue * (returnRatePercent / 100),
    2
  );

  const totalCosts = roundTo(
    productCost +
      inboundShipping +
      prepCost +
      totalAmazonFees +
      advertisingCost +
      returnReserve,
    2
  );

  const netProfit = roundTo(totalRevenue - totalCosts, 2);

  const profitMarginPercent =
    totalRevenue > 0 ? roundTo((netProfit / totalRevenue) * 100, 2) : 0;

  const returnOnCostPercent =
    productCost > 0 ? roundTo((netProfit / productCost) * 100, 2) : null;

  const effectiveFeeRatePercent =
    totalRevenue > 0 ? roundTo((totalAmazonFees / totalRevenue) * 100, 2) : 0;

  return {
    totalRevenue,
    referralFeePercent,
    referralFee,
    individualPerItemFee,
    fbaFulfillmentFee,
    storageFee,
    totalAmazonFees,
    productCost,
    inboundShipping,
    prepCost,
    advertisingCost,
    returnReserve,
    totalCosts,
    netProfit,
    profitMarginPercent,
    returnOnCostPercent,
    effectiveFeeRatePercent,
  };
}

export const DEFAULT_AMAZON_INPUTS: AmazonFbaInputs = {
  sellingPrice: 39.99,
  productCost: 9.5,
  inboundShippingCost: 1.25,
  prepAndPackagingCost: 0.75,
  country: 'US',
  category: 'home-kitchen',
  isProfessionalPlan: true,
  sizeTier: 'large-standard-1lb',
  estimatedFbaFee: 3.95,
  monthlyStorageMonths: 1.5,
  estimatedMonthlyStorage: 0.18,
  advertisingCost: 4.5,
  returnRatePercent: 3.5,
  currency: 'USD',
};
