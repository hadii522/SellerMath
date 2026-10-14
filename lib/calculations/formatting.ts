import { CurrencyCode } from '@/lib/types/calculator';

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: '$',
  GBP: '£',
  CAD: 'CA$',
};

export const CURRENCY_LOCALES: Record<CurrencyCode, string> = {
  USD: 'en-US',
  GBP: 'en-GB',
  CAD: 'en-CA',
};

/**
 * Rounds a number to a specified number of decimal places, eliminating floating point artifacts.
 */
export function roundTo(value: number, decimals = 2): number {
  if (!Number.isFinite(value)) return 0;
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

/**
 * Formats a currency value with proper negative sign and symbol.
 */
export function formatCurrency(
  amount: number | null | undefined,
  currency: CurrencyCode = 'USD'
): string {
  if (amount === null || amount === undefined || !Number.isFinite(amount)) {
    return '—';
  }

  const rounded = roundTo(amount, 2);
  const isNegative = rounded < 0;
  const absValue = Math.abs(rounded);
  const symbol = CURRENCY_SYMBOLS[currency] || '$';

  const formattedNumber = absValue.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (isNegative) {
    return `-${symbol}${formattedNumber}`;
  }
  return `${symbol}${formattedNumber}`;
}

/**
 * Formats a percentage value (e.g. 24.5 -> "24.5%").
 */
export function formatPercent(
  value: number | null | undefined,
  decimals = 2
): string {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return '—';
  }
  const rounded = roundTo(value, decimals);
  return `${rounded.toFixed(decimals)}%`;
}

/**
 * Formats a Return on Ad Spend (ROAS) multiplier (e.g. 3.25 -> "3.25x").
 */
export function formatRoas(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value) || value <= 0) {
    return '—';
  }
  return `${roundTo(value, 2).toFixed(2)}x`;
}

/**
 * Safely parses string or number input into a finite number, defaulting to 0 or fallback.
 */
export function parseSafeNumber(value: unknown, defaultValue = 0): number {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : defaultValue;
  }
  if (typeof value === 'string') {
    const cleaned = value.replace(/[^0-9.-]/g, '');
    const parsed = parseFloat(cleaned);
    return Number.isFinite(parsed) ? parsed : defaultValue;
  }
  return defaultValue;
}
