import { RoasInputs, RoasOutputs } from '@/lib/types/calculator';
import { roundTo } from './formatting';

/**
 * Calculates Break-Even and Target Return on Ad Spend (ROAS).
 *
 * Formulas:
 * Pre-Ad Contribution = Selling Price - Product Cost - Fees - Shipping/Packaging - Other Variable Costs
 * Break-Even Ad Spend = Pre-Ad Contribution
 * Break-Even ROAS = Selling Price / Break-Even Ad Spend
 * Target Max Ad Spend = Pre-Ad Contribution - Desired Profit Per Order
 * Target ROAS = Selling Price / Target Max Ad Spend
 */
export function calculateRoas(inputs: RoasInputs): RoasOutputs {
  const sellingPrice = Math.max(0, inputs.sellingPrice || 0);
  const productCost = Math.max(0, inputs.productCost || 0);
  const shippingAndPackaging = Math.max(0, inputs.shippingAndPackagingCost || 0);
  const fees = Math.max(0, inputs.marketplaceAndPaymentFees || 0);
  const otherCosts = Math.max(0, inputs.otherVariableCosts || 0);
  const desiredProfit = Math.max(0, inputs.desiredProfitPerOrder || 0);

  const totalCostsBeforeAds = roundTo(
    productCost + shippingAndPackaging + fees + otherCosts,
    2
  );

  const preAdContribution = roundTo(sellingPrice - totalCostsBeforeAds, 2);
  const isProfitableBeforeAds = preAdContribution > 0;

  let breakEvenAdSpend = 0;
  let breakEvenRoas: number | null = null;
  let targetMaxAdSpend = 0;
  let targetRoas: number | null = null;
  let notes = '';

  if (sellingPrice <= 0) {
    notes = 'Enter a valid selling price greater than zero to calculate ROAS.';
  } else if (!isProfitableBeforeAds) {
    breakEvenAdSpend = 0;
    breakEvenRoas = null;
    targetMaxAdSpend = 0;
    targetRoas = null;
    notes = `Pre-ad costs (${totalCostsBeforeAds}) equal or exceed the selling price (${sellingPrice}). You lose ${Math.abs(
      preAdContribution
    )} per order before advertising, making break-even ROAS impossible.`;
  } else {
    breakEvenAdSpend = preAdContribution;
    breakEvenRoas = roundTo(sellingPrice / breakEvenAdSpend, 2);

    targetMaxAdSpend = roundTo(preAdContribution - desiredProfit, 2);

    if (targetMaxAdSpend <= 0) {
      targetRoas = null;
      notes = `Your desired profit (${desiredProfit}) is greater than or equal to pre-ad contribution (${preAdContribution}). There is no remaining budget for advertising while maintaining this target.`;
    } else {
      targetRoas = roundTo(sellingPrice / targetMaxAdSpend, 2);
      notes = `To break even, your advertising spend must not exceed ${breakEvenAdSpend} per order (minimum ROAS: ${breakEvenRoas.toFixed(
        2
      )}x). To retain ${desiredProfit} profit, spend at most ${targetMaxAdSpend} (target ROAS: ${targetRoas.toFixed(
        2
      )}x).`;
    }
  }

  return {
    sellingPrice,
    totalCostsBeforeAds,
    preAdContribution,
    breakEvenAdSpend,
    breakEvenRoas,
    targetMaxAdSpend: Math.max(0, targetMaxAdSpend),
    targetRoas,
    isProfitableBeforeAds,
    notes,
  };
}

export const DEFAULT_ROAS_INPUTS: RoasInputs = {
  sellingPrice: 80.0,
  productCost: 22.0,
  shippingAndPackagingCost: 7.5,
  marketplaceAndPaymentFees: 10.5,
  otherVariableCosts: 2.0,
  desiredProfitPerOrder: 15.0,
  currency: 'USD',
};
