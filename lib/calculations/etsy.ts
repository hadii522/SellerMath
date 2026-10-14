import { EtsyInputs, EtsyOutputs } from '@/lib/types/calculator';
import { ETSY_FEE_CONFIGS } from '@/lib/fees/etsy-fees';
import { roundTo } from './formatting';

/**
 * Calculates net profit and fee breakdown for an Etsy order.
 */
export function calculateEtsyProfit(inputs: EtsyInputs): EtsyOutputs {
  const sellingPrice = Math.max(0, inputs.sellingPrice || 0);
  const shippingCharged = Math.max(0, inputs.shippingCharged || 0);
  const productCost = Math.max(0, inputs.productCost || 0);
  const shippingPaid = Math.max(0, inputs.shippingPaid || 0);
  const packagingCost = Math.max(0, inputs.packagingCost || 0);
  const offsiteAdsPercent = Math.max(0, inputs.offsiteAdsPercent || 0);
  const otherCosts = Math.max(0, inputs.otherCosts || 0);
  const itemsPerListing = Math.max(1, inputs.itemsPerListing || 1);

  const marketConfig = ETSY_FEE_CONFIGS[inputs.country] || ETSY_FEE_CONFIGS.US;

  const totalRevenue = roundTo(sellingPrice + shippingCharged, 2);

  // 1. Listing fee ($0.20 per item sold or auto-renewed)
  const listingFee =
    totalRevenue > 0 ? roundTo(marketConfig.listingFee / itemsPerListing, 2) : 0;

  // 2. Transaction fee (6.5% on item price + shipping charged)
  const transactionFee = roundTo(
    totalRevenue * (marketConfig.transactionFeePercent / 100),
    2
  );

  // 3. Payment processing fee (e.g. 3.0% + $0.25)
  const paymentProcessingFee =
    totalRevenue > 0
      ? roundTo(
          totalRevenue * (marketConfig.paymentProcessingPercent / 100) +
            marketConfig.paymentProcessingFixed,
          2
        )
      : 0;

  // 4. Regulatory Operating fee (e.g. UK 0.32%)
  const regulatoryOperatingFee = roundTo(
    totalRevenue * (marketConfig.regulatoryOperatingFeePercent / 100),
    2
  );

  // 5. Offsite Ads fee (0%, 12%, or 15% on total revenue when applicable)
  const offsiteAdsFee = roundTo(
    totalRevenue * (offsiteAdsPercent / 100),
    2
  );

  const totalEtsyFees = roundTo(
    listingFee +
      transactionFee +
      paymentProcessingFee +
      regulatoryOperatingFee +
      offsiteAdsFee,
    2
  );

  const shippingCostTotal = roundTo(shippingPaid + packagingCost, 2);

  const totalCosts = roundTo(
    productCost + shippingCostTotal + totalEtsyFees + otherCosts,
    2
  );

  const netProfit = roundTo(totalRevenue - totalCosts, 2);

  const profitMarginPercent =
    totalRevenue > 0 ? roundTo((netProfit / totalRevenue) * 100, 2) : 0;

  const returnOnCostPercent =
    productCost > 0 ? roundTo((netProfit / productCost) * 100, 2) : null;

  const effectiveFeeRatePercent =
    totalRevenue > 0 ? roundTo((totalEtsyFees / totalRevenue) * 100, 2) : 0;

  return {
    totalRevenue,
    listingFee,
    transactionFee,
    paymentProcessingFee,
    regulatoryOperatingFee,
    offsiteAdsFee,
    totalEtsyFees,
    productCost,
    shippingCostTotal,
    otherCosts,
    totalCosts,
    netProfit,
    profitMarginPercent,
    returnOnCostPercent,
    effectiveFeeRatePercent,
  };
}

export const DEFAULT_ETSY_INPUTS: EtsyInputs = {
  sellingPrice: 32.0,
  shippingCharged: 4.5,
  productCost: 8.5,
  shippingPaid: 4.25,
  packagingCost: 1.2,
  country: 'US',
  offsiteAdsPercent: 0,
  otherCosts: 0.5,
  currency: 'USD',
  itemsPerListing: 1,
};
