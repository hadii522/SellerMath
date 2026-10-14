import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTargetPrice,
  DEFAULT_TARGET_PRICE_INPUTS,
} from '../../lib/calculations/target-price';

test('calculates selling price required to reach target margin', () => {
  const result = calculateTargetPrice(DEFAULT_TARGET_PRICE_INPUTS);

  assert.strictEqual(result.isPossible, true);
  assert.ok(result.targetSellingPrice !== null && result.targetSellingPrice > 0);
  assert.ok(result.projectedProfit !== null && result.projectedProfit > 0);
  assert.ok(result.effectiveMarginPercent !== null);
  // Verify effective margin matches target margin within rounding precision (30.0%)
  assert.ok(Math.abs(result.effectiveMarginPercent - 30.0) <= 0.2);
});

test('detects impossible target margins when fees + margin >= 100%', () => {
  const inputs = {
    ...DEFAULT_TARGET_PRICE_INPUTS,
    marketplaceFeePercent: 15.0,
    paymentProcessingPercent: 3.0,
    // Variable fee rate = 18%
    // If target margin is 85%, total is 103% >= 100%
    targetMarginPercent: 85.0,
  };
  const result = calculateTargetPrice(inputs);

  assert.strictEqual(result.isPossible, false);
  assert.strictEqual(result.targetSellingPrice, null);
  assert.ok(result.errorMessage?.includes('Mathematically impossible'));
});

test('handles negative target margin percent gracefully', () => {
  const inputs = {
    ...DEFAULT_TARGET_PRICE_INPUTS,
    targetMarginPercent: -5.0,
  };
  const result = calculateTargetPrice(inputs);

  assert.strictEqual(result.isPossible, false);
  assert.strictEqual(result.targetSellingPrice, null);
  assert.ok(result.errorMessage?.includes('0% or higher'));
});

test('calculates break-even selling price accurately alongside target price', () => {
  const result = calculateTargetPrice(DEFAULT_TARGET_PRICE_INPUTS);

  assert.ok(result.breakEvenSellingPrice !== null);
  assert.ok(
    result.targetSellingPrice !== null &&
      result.targetSellingPrice > result.breakEvenSellingPrice
  );
});
