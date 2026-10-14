import { CountryCode, FeeScheduleSource } from '@/lib/types/calculator';

export interface EtsyMarketConfig {
  country: CountryCode;
  currency: 'USD' | 'GBP' | 'CAD';
  source: FeeScheduleSource;
  listingFee: number;
  transactionFeePercent: number; // 6.5%
  paymentProcessingPercent: number;
  paymentProcessingFixed: number;
  regulatoryOperatingFeePercent: number;
  exclusions: string[];
}

export const ETSY_FEE_CONFIGS: Record<CountryCode, EtsyMarketConfig> = {
  US: {
    country: 'US',
    currency: 'USD',
    source: {
      sourceUrl: 'https://www.etsy.com/legal/fees/',
      sourceName: 'Etsy Fees & Payments Policy (Official)',
      effectiveDate: '2023-10-01',
      lastVerifiedDate: '2026-10-01',
      applicableMarket: 'US',
      notes:
        'Etsy charges a $0.20 listing fee, 6.5% transaction fee on total order (item + shipping), and Etsy Payments processing fee of 3.0% + $0.25.',
      disclaimer:
        'Estimates reflect official standard Etsy seller fees. Does not include optional Etsy Plus subscription ($10/mo), in-person Square transactions, or currency conversion spreads.',
    },
    listingFee: 0.2,
    transactionFeePercent: 6.5,
    paymentProcessingPercent: 3.0,
    paymentProcessingFixed: 0.25,
    regulatoryOperatingFeePercent: 0.0,
    exclusions: [
      'Etsy Plus subscription ($10 USD / month)',
      'Etsy Ads on-platform pay-per-click budget',
      'Pattern by Etsy custom website hosting ($15 USD / month)',
      'Sales tax collected by Etsy from US buyers',
    ],
  },
  UK: {
    country: 'UK',
    currency: 'GBP',
    source: {
      sourceUrl: 'https://www.etsy.com/legal/fees/',
      sourceName: 'Etsy UK Seller Fees & Charges',
      effectiveDate: '2023-10-01',
      lastVerifiedDate: '2026-10-01',
      applicableMarket: 'UK',
      notes:
        'Listing fee is £0.16, transaction fee is 6.5%, Etsy Payments UK is 4.0% + £0.20, plus UK Regulatory Operating Fee of 0.32% on item price + shipping.',
      disclaimer:
        'Reflects Etsy UK official fee policy. Note that 20% UK VAT is applied to seller fees for non-VAT-registered sellers.',
    },
    listingFee: 0.16,
    transactionFeePercent: 6.5,
    paymentProcessingPercent: 4.0,
    paymentProcessingFixed: 0.2,
    regulatoryOperatingFeePercent: 0.32,
    exclusions: [
      '20% UK VAT on Etsy seller fees',
      'Currency conversion fee (2.5%) if listing currency differs from bank deposit currency',
      'Etsy Ads CPC campaigns',
    ],
  },
  CA: {
    country: 'CA',
    currency: 'CAD',
    source: {
      sourceUrl: 'https://www.etsy.com/legal/fees/',
      sourceName: 'Etsy Canada Fee Structure',
      effectiveDate: '2023-10-01',
      lastVerifiedDate: '2026-10-01',
      applicableMarket: 'CA',
      notes:
        'Listing fee CA$0.27, transaction fee 6.5%, payment processing 3.0% + CA$0.25 for domestic Canadian cards.',
      disclaimer:
        'Reflects Canadian domestic sales. GST/HST/QST applicable to Etsy seller service fees is excluded.',
    },
    listingFee: 0.27,
    transactionFeePercent: 6.5,
    paymentProcessingPercent: 3.0,
    paymentProcessingFixed: 0.25,
    regulatoryOperatingFeePercent: 0.0,
    exclusions: [
      'GST/HST/PST on seller service fees',
      '2.5% currency conversion spread if listing in USD from a Canadian bank account',
      'Optional Etsy Plus membership',
    ],
  },
};
