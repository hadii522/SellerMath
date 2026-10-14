import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatCurrency,
  formatPercent,
  formatRoas,
  parseSafeNumber,
  roundTo,
} from '../../lib/calculations/formatting';

test('roundTo rounds numbers correctly eliminating precision errors', () => {
  assert.strictEqual(roundTo(0.1 + 0.2, 2), 0.3);
  assert.strictEqual(roundTo(14.999, 2), 15);
  assert.strictEqual(roundTo(14.994, 2), 14.99);
  assert.strictEqual(roundTo(-10.555, 2), -10.55); // or -10.56
  assert.strictEqual(roundTo(0, 2), 0);
  assert.strictEqual(roundTo(NaN, 2), 0);
});

test('formatCurrency handles positive, negative, zero, and currency symbols', () => {
  assert.strictEqual(formatCurrency(49.99, 'USD'), '$49.99');
  assert.strictEqual(formatCurrency(49.99, 'GBP'), '£49.99');
  assert.strictEqual(formatCurrency(49.99, 'CAD'), 'CA$49.99');
  assert.strictEqual(formatCurrency(-12.5, 'USD'), '-$12.50');
  assert.strictEqual(formatCurrency(0, 'USD'), '$0.00');
  assert.strictEqual(formatCurrency(null, 'USD'), '—');
  assert.strictEqual(formatCurrency(undefined, 'USD'), '—');
});

test('formatPercent formats percentage with decimal precision', () => {
  assert.strictEqual(formatPercent(25.5, 2), '25.50%');
  assert.strictEqual(formatPercent(25.5, 1), '25.5%');
  assert.strictEqual(formatPercent(0, 2), '0.00%');
  assert.strictEqual(formatPercent(-14.25, 2), '-14.25%');
  assert.strictEqual(formatPercent(null, 2), '—');
});

test('formatRoas formats ROAS multiplier with "x" suffix', () => {
  assert.strictEqual(formatRoas(3.25), '3.25x');
  assert.strictEqual(formatRoas(1.0), '1.00x');
  assert.strictEqual(formatRoas(0), '—');
  assert.strictEqual(formatRoas(-2.5), '—');
  assert.strictEqual(formatRoas(null), '—');
});

test('parseSafeNumber parses strings, numbers, and handles invalid inputs gracefully', () => {
  assert.strictEqual(parseSafeNumber(25.4), 25.4);
  assert.strictEqual(parseSafeNumber('25.40'), 25.4);
  assert.strictEqual(parseSafeNumber('$49.99'), 49.99);
  assert.strictEqual(parseSafeNumber('£1,250.50'), 1250.5);
  assert.strictEqual(parseSafeNumber('', 10), 10);
  assert.strictEqual(parseSafeNumber(null, 0), 0);
  assert.strictEqual(parseSafeNumber(undefined, 5), 5);
});
