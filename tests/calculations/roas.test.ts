import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateRoas, DEFAULT_ROAS_INPUTS } from '../../lib/calculations/roas';

test('calculates normal break-even and target ROAS accurately', () => {
  const result = calculateRoas(DEFAULT_ROAS_INPUTS);

  // Selling price = 80
  // Costs before ads = 22 (product) + 7.5 (shipping/pack) + 10.5 (fees) + 2.0 (other) = 42.00
  assert.strictEqual(result.sellingPrice, 80.0);
  assert.strictEqual(result.totalCostsBeforeAds, 42.0);

  // Pre-ad contribution = 80 - 42 = 38.00
  assert.strictEqual(result.preAdContribution, 38.0);
  assert.strictEqual(result.isProfitableBeforeAds, true);

  // Break-even ad spend = 38.00
  assert.strictEqual(result.breakEvenAdSpend, 38.0);
  // Break-even ROAS = 80 / 38 = 2.11x
  assert.strictEqual(result.breakEvenRoas, 2.11);

  // Desired profit = 15.00
  // Target max ad spend = 38 - 15 = 23.00
  assert.strictEqual(result.targetMaxAdSpend, 23.0);
  // Target ROAS = 80 / 23 = 3.48x
  assert.strictEqual(result.targetRoas, 3.48);
});

test('handles negative pre-ad contribution correctly', () => {
  const inputs = {
    ...DEFAULT_ROAS_INPUTS,
    sellingPrice: 30.0,
    productCost: 25.0,
    shippingAndPackagingCost: 10.0, // total costs 35+ > 30
  };
  const result = calculateRoas(inputs);

  assert.strictEqual(result.isProfitableBeforeAds, false);
  assert.strictEqual(result.breakEvenRoas, null);
  assert.strictEqual(result.targetRoas, null);
  assert.strictEqual(result.breakEvenAdSpend, 0);
  assert.ok(result.notes.includes('impossible'));
});

test('handles desired profit exceeding pre-ad contribution', () => {
  const inputs = {
    ...DEFAULT_ROAS_INPUTS,
    sellingPrice: 50.0,
    productCost: 20.0,
    shippingAndPackagingCost: 5.0,
    marketplaceAndPaymentFees: 5.0,
    otherVariableCosts: 0,
    // Pre-ad contribution = 50 - 30 = 20
    // Desired profit = 25 (exceeds 20)
    desiredProfitPerOrder: 25.0,
  };
  const result = calculateRoas(inputs);

  assert.strictEqual(result.preAdContribution, 20.0);
  assert.strictEqual(result.breakEvenRoas, 2.5); // 50 / 20 = 2.5x
  assert.strictEqual(result.targetRoas, null);
  assert.strictEqual(result.targetMaxAdSpend, 0);
  assert.ok(result.notes.includes('no remaining budget'));
});

test('handles zero selling price gracefully', () => {
  const inputs = {
    ...DEFAULT_ROAS_INPUTS,
    sellingPrice: 0,
  };
  const result = calculateRoas(inputs);

  assert.strictEqual(result.breakEvenRoas, null);
  assert.strictEqual(result.targetRoas, null);
});
