import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateUniversalProfit,
  DEFAULT_UNIVERSAL_INPUTS,
  EMPTY_UNIVERSAL_INPUTS,
} from '../../lib/calculations/product-profit';

test('calculates normal profitable order accurately', () => {
  const result = calculateUniversalProfit(DEFAULT_UNIVERSAL_INPUTS);

  // Revenue = 49.99 + 4.99 = 54.98
  assert.strictEqual(result.totalRevenue, 54.98);
  assert.strictEqual(result.itemRevenue, 49.99);
  assert.strictEqual(result.shippingRevenue, 4.99);

  // Fees: 12% + 2.9% + 0.30
  // Marketplace = 54.98 * 0.12 = 6.60
  assert.strictEqual(result.marketplaceFee, 6.6);
  // Payment = 54.98 * 0.029 + 0.30 = 1.59 + 0.30 = 1.89
  assert.strictEqual(result.paymentProcessingFee, 1.89);
  assert.strictEqual(result.totalFees, 8.49);

  // Shipping & Packaging = 6.50 + 1.50 = 8.00
  assert.strictEqual(result.totalShippingAndPackaging, 8.0);

  // Return allowance = 54.98 * 0.03 = 1.65
  assert.strictEqual(result.estimatedReturnAllowance, 1.65);

  // Total costs = 15 (product) + 8 (shipping/pack) + 8.49 (fees) + 5 (ads) + 0.5 (other) + 1.65 (returns) = 38.64
  assert.strictEqual(result.totalCosts, 38.64);

  // Net Profit = 54.98 - 38.64 = 16.34
  assert.strictEqual(result.netProfit, 16.34);

  // Profit Margin = (16.34 / 54.98) * 100 = 29.72%
  assert.strictEqual(result.profitMarginPercent, 29.72);

  // Return on Product Cost = (16.34 / 15) * 100 = 108.93%
  assert.strictEqual(result.returnOnProductCostPercent, 108.93);

  // Break-even is verified positive
  assert.ok(result.breakEvenSellingPrice !== null);
  assert.ok(result.breakEvenSellingPrice > 0);

  // Target margin is possible
  assert.strictEqual(result.targetMarginPossible, true);
  assert.ok(result.targetMarginSellingPrice !== null);
});

test('handles zero revenue and empty inputs gracefully', () => {
  const result = calculateUniversalProfit(EMPTY_UNIVERSAL_INPUTS);

  assert.strictEqual(result.totalRevenue, 0);
  assert.strictEqual(result.totalCosts, 0);
  assert.strictEqual(result.netProfit, 0);
  assert.strictEqual(result.profitMarginPercent, 0);
  assert.strictEqual(result.returnOnProductCostPercent, null);
  assert.strictEqual(result.breakEvenSellingPrice, 0);
});

test('handles free shipping to customer', () => {
  const inputs = {
    ...DEFAULT_UNIVERSAL_INPUTS,
    shippingCharged: 0,
  };
  const result = calculateUniversalProfit(inputs);

  assert.strictEqual(result.totalRevenue, 49.99);
  assert.strictEqual(result.shippingRevenue, 0);
  assert.ok(result.netProfit < DEFAULT_UNIVERSAL_INPUTS.sellingPrice);
});

test('handles negative-profit orders correctly', () => {
  const inputs = {
    ...DEFAULT_UNIVERSAL_INPUTS,
    sellingPrice: 10.0,
    shippingCharged: 0.0,
    productCost: 20.0, // cost exceeds selling price
  };
  const result = calculateUniversalProfit(inputs);

  assert.strictEqual(result.totalRevenue, 10.0);
  assert.ok(result.netProfit < 0, 'Net profit should be negative');
  assert.ok(result.profitMarginPercent < 0, 'Profit margin should be negative');
  assert.ok(
    result.returnOnProductCostPercent !== null &&
      result.returnOnProductCostPercent < 0
  );
});

test('handles invalid and negative inputs by clamping', () => {
  const inputs = {
    ...DEFAULT_UNIVERSAL_INPUTS,
    sellingPrice: -50,
    productCost: -20,
    shippingPaid: -10,
  };
  const result = calculateUniversalProfit(inputs);

  // Clamps negative inputs to 0
  assert.strictEqual(result.itemRevenue, 0);
  assert.strictEqual(result.productCost, 0);
  assert.strictEqual(result.shippingPaid, 0);
});

test('detects impossible target margins accurately', () => {
  const inputs = {
    ...DEFAULT_UNIVERSAL_INPUTS,
    marketplaceFeePercent: 15.0,
    paymentProcessingPercent: 3.0,
    returnRatePercent: 2.0,
    // Total variable fees = 20%
    // If target margin is 85%, total = 105% >= 100%
    targetMarginPercent: 85.0,
  };
  const result = calculateUniversalProfit(inputs);

  assert.strictEqual(result.targetMarginPossible, false);
  assert.strictEqual(result.targetMarginSellingPrice, null);
  assert.ok(result.targetMarginMessage?.includes('mathematically impossible'));
});

test('handles zero product cost for return on product cost (ROI)', () => {
  const inputs = {
    ...DEFAULT_UNIVERSAL_INPUTS,
    productCost: 0,
  };
  const result = calculateUniversalProfit(inputs);

  assert.strictEqual(result.productCost, 0);
  assert.strictEqual(result.returnOnProductCostPercent, null);
});
