import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateEbayProfit, DEFAULT_EBAY_INPUTS } from '../../lib/calculations/ebay';
import { calculateEtsyProfit, DEFAULT_ETSY_INPUTS } from '../../lib/calculations/etsy';
import {
  calculateAmazonFbaProfit,
  DEFAULT_AMAZON_INPUTS,
} from '../../lib/calculations/amazon-fba';

test('eBay US calculation produces accurate final value and fixed fees', () => {
  const result = calculateEbayProfit(DEFAULT_EBAY_INPUTS);

  // Revenue = 45 + 5 = 50
  assert.strictEqual(result.totalRevenue, 50.0);
  // Most categories US standard is 13.25%
  assert.strictEqual(result.finalValueFeePercent, 13.25);
  // 50 * 0.1325 = 6.63
  assert.strictEqual(result.finalValueFee, 6.63);
  assert.strictEqual(result.fixedOrderFee, 0.35);
  assert.strictEqual(result.totalEbayFees, 6.98);
  assert.ok(result.netProfit > 0);
  assert.ok(result.profitMarginPercent > 0);
});

test('eBay UK private seller has 0% final value fees', () => {
  const inputs = {
    ...DEFAULT_EBAY_INPUTS,
    country: 'UK' as const,
    currency: 'GBP' as const,
    category: 'private-seller',
  };
  const result = calculateEbayProfit(inputs);

  assert.strictEqual(result.finalValueFeePercent, 0);
  assert.strictEqual(result.finalValueFee, 0);
  assert.strictEqual(result.fixedOrderFee, 0);
  assert.strictEqual(result.totalEbayFees, 0);
});

test('Etsy US calculates listing fee, 6.5% transaction fee, and payment processing', () => {
  const result = calculateEtsyProfit(DEFAULT_ETSY_INPUTS);

  // Revenue = 32 + 4.5 = 36.50
  assert.strictEqual(result.totalRevenue, 36.5);
  // Listing fee = $0.20
  assert.strictEqual(result.listingFee, 0.2);
  // Transaction fee = 36.50 * 0.065 = 2.37
  assert.strictEqual(result.transactionFee, 2.37);
  // Payment processing = 36.50 * 0.03 + 0.25 = 1.10 + 0.25 = 1.35 (or 1.345 rounded)
  assert.ok(result.paymentProcessingFee >= 1.34 && result.paymentProcessingFee <= 1.35);
  assert.ok(result.totalEtsyFees > 3.8);
  assert.ok(result.netProfit > 0);
});

test('Etsy UK applies regulatory operating fee', () => {
  const inputs = {
    ...DEFAULT_ETSY_INPUTS,
    country: 'UK' as const,
    currency: 'GBP' as const,
  };
  const result = calculateEtsyProfit(inputs);

  assert.ok(result.regulatoryOperatingFee > 0);
  assert.strictEqual(result.listingFee, 0.16);
});

test('Amazon FBA calculates referral fee, FBA fulfillment, and storage', () => {
  const result = calculateAmazonFbaProfit(DEFAULT_AMAZON_INPUTS);

  // Revenue = 39.99
  assert.strictEqual(result.totalRevenue, 39.99);
  // Home & Kitchen referral = 15% -> 39.99 * 0.15 = 6.00
  assert.strictEqual(result.referralFeePercent, 15.0);
  assert.strictEqual(result.referralFee, 6.0);
  assert.strictEqual(result.individualPerItemFee, 0); // Professional plan
  assert.strictEqual(result.fbaFulfillmentFee, 3.95);
  assert.ok(result.storageFee > 0);
  assert.ok(result.totalAmazonFees > 10.0);
  assert.ok(result.netProfit > 0);
});

test('Amazon individual selling plan adds per-item fee', () => {
  const inputs = {
    ...DEFAULT_AMAZON_INPUTS,
    isProfessionalPlan: false,
  };
  const result = calculateAmazonFbaProfit(inputs);

  assert.strictEqual(result.individualPerItemFee, 0.99);
  assert.ok(result.totalAmazonFees > calculateAmazonFbaProfit(DEFAULT_AMAZON_INPUTS).totalAmazonFees);
});
