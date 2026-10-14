import { CountryCode, FeeScheduleSource } from '@/lib/types/calculator';

export interface EbayCategoryRule {
  id: string;
  name: string;
  standardRatePercent: number;
  storeRatePercent: number;
  fixedFee: number;
  notes: string;
}

export interface EbayMarketConfig {
  country: CountryCode;
  currency: 'USD' | 'GBP' | 'CAD';
  source: FeeScheduleSource;
  defaultFixedFee: number;
  categories: EbayCategoryRule[];
  exclusions: string[];
}

export const EBAY_FEE_CONFIGS: Record<CountryCode, EbayMarketConfig> = {
  US: {
    country: 'US',
    currency: 'USD',
    source: {
      sourceUrl: 'https://www.ebay.com/help/selling/fees-credits-invoices/selling-fees?id=4822',
      sourceName: 'eBay US Seller Center - Standard Selling Fees',
      effectiveDate: '2024-01-15',
      lastVerifiedDate: '2026-10-01',
      applicableMarket: 'US',
      notes:
        'eBay Managed Payments Final Value Fee (FVF) consists of a percentage of the total amount of the sale (item price + shipping + sales tax handled by eBay) plus $0.30-$0.40 fixed per order.',
      disclaimer:
        'Calculations are estimates based on standard seller accounts in good standing. Does not include optional listing upgrades, promoted listings standard/advanced, store subscription monthly fees, or international cross-border fees.',
    },
    defaultFixedFee: 0.35, // average between $0.30 (> $10) and $0.40 (<= $10)
    categories: [
      {
        id: 'most-categories',
        name: 'Most Categories (General Merchandise)',
        standardRatePercent: 13.25,
        storeRatePercent: 12.35,
        fixedFee: 0.35,
        notes: '13.25% on total amount up to $7,500; 2.35% thereafter (plus $0.30-$0.40 order fee).',
      },
      {
        id: 'electronics',
        name: 'Consumer Electronics & Computers',
        standardRatePercent: 9.0,
        storeRatePercent: 7.0,
        fixedFee: 0.35,
        notes: 'Reduced FVF rate for laptops, tablets, smart home, and audio equipment.',
      },
      {
        id: 'clothing',
        name: 'Clothing, Shoes & Accessories',
        standardRatePercent: 13.25,
        storeRatePercent: 12.0,
        fixedFee: 0.35,
        notes: 'Standard apparel rate. Athletic shoes over $150 qualify for lower 8% rate.',
      },
      {
        id: 'media',
        name: 'Books, Movies, DVDs & Music',
        standardRatePercent: 14.95,
        storeRatePercent: 14.55,
        fixedFee: 0.35,
        notes: 'Higher category rate applies to physical books and media.',
      },
      {
        id: 'musical-instruments',
        name: 'Guitars & Musical Instruments',
        standardRatePercent: 6.35,
        storeRatePercent: 6.0,
        fixedFee: 0.35,
        notes: 'Special lower category fee for guitars and musical equipment.',
      },
      {
        id: 'custom',
        name: 'Custom / Other Category Rate',
        standardRatePercent: 13.25,
        storeRatePercent: 12.0,
        fixedFee: 0.35,
        notes: 'Enter your custom agreed or specific category percentage.',
      },
    ],
    exclusions: [
      'State sales tax charged to the buyer (eBay adds sales tax before computing FVF)',
      'Optional listing upgrades (subtitles, bold font, gallery plus)',
      'Monthly store subscription fees ($4.95 - $299.95/mo)',
      'Below Standard seller penalty surcharge (+6%)',
      'International / cross-border currency conversion fee (1.65%)',
    ],
  },
  UK: {
    country: 'UK',
    currency: 'GBP',
    source: {
      sourceUrl: 'https://www.ebay.co.uk/help/selling/fees-credits-invoices/selling-fees?id=4822',
      sourceName: 'eBay UK Seller Fees Documentation',
      effectiveDate: '2024-04-01',
      lastVerifiedDate: '2026-10-01',
      applicableMarket: 'UK',
      notes:
        'In 2024, eBay UK dropped selling fees for individual non-business private sellers. Registered business sellers continue to pay standard category fees (~12.8% + £0.30 + VAT).',
      disclaimer:
        'This calculator applies to eBay UK business sellers and sellers paying standard final value fees. Private non-commercial sellers may have 0% standard selling fees.',
    },
    defaultFixedFee: 0.3,
    categories: [
      {
        id: 'business-general',
        name: 'UK Business Sellers (General Categories)',
        standardRatePercent: 12.8,
        storeRatePercent: 11.5,
        fixedFee: 0.3,
        notes: 'Standard business seller rate on gross sale.',
      },
      {
        id: 'business-electronics',
        name: 'Tech & Electronics (Business)',
        standardRatePercent: 8.5,
        storeRatePercent: 7.0,
        fixedFee: 0.3,
        notes: 'Reduced business category rate for electronics.',
      },
      {
        id: 'business-clothing',
        name: 'Fashion & Apparel (Business)',
        standardRatePercent: 11.9,
        storeRatePercent: 10.5,
        fixedFee: 0.3,
        notes: 'Fashion business category rate.',
      },
      {
        id: 'private-seller',
        name: 'UK Private Seller (0% Selling Fee)',
        standardRatePercent: 0.0,
        storeRatePercent: 0.0,
        fixedFee: 0.0,
        notes: 'eBay UK private individual sellers enjoy 0% final value fees for eligible categories.',
      },
      {
        id: 'custom',
        name: 'Custom Category Rate',
        standardRatePercent: 12.8,
        storeRatePercent: 11.5,
        fixedFee: 0.3,
        notes: 'Editable custom rate.',
      },
    ],
    exclusions: [
      '20% UK VAT on eBay seller fees',
      'Regulatory Operating Fee (0.35%) where applicable',
      'Promoted Listings ad rates',
      'International transaction fees (approx 1.2% - 2.0%)',
    ],
  },
  CA: {
    country: 'CA',
    currency: 'CAD',
    source: {
      sourceUrl: 'https://www.ebay.ca/help/selling/fees-credits-invoices/selling-fees?id=4822',
      sourceName: 'eBay Canada Seller Fees',
      effectiveDate: '2024-01-15',
      lastVerifiedDate: '2026-10-01',
      applicableMarket: 'CA',
      notes:
        'eBay Canada Final Value Fee is computed on total sale amount (item + shipping) in Canadian Dollars, plus CA$0.30 - CA$0.40 per order.',
      disclaimer:
        'Calculations reflect standard Canadian seller accounts. Does not include GST/HST on seller fees, optional store subscriptions, or international buyer surcharges.',
    },
    defaultFixedFee: 0.35,
    categories: [
      {
        id: 'ca-general',
        name: 'Most Categories (Canada)',
        standardRatePercent: 13.0,
        storeRatePercent: 12.1,
        fixedFee: 0.35,
        notes: 'Standard 13% rate up to CA$7,500; 2.35% thereafter.',
      },
      {
        id: 'ca-electronics',
        name: 'Consumer Electronics & Tech',
        standardRatePercent: 9.0,
        storeRatePercent: 7.2,
        fixedFee: 0.35,
        notes: 'Tech equipment and computers.',
      },
      {
        id: 'ca-clothing',
        name: 'Clothing & Fashion',
        standardRatePercent: 13.0,
        storeRatePercent: 11.8,
        fixedFee: 0.35,
        notes: 'Apparel and accessories.',
      },
      {
        id: 'custom',
        name: 'Custom Category Rate',
        standardRatePercent: 13.0,
        storeRatePercent: 12.0,
        fixedFee: 0.35,
        notes: 'Editable custom rate.',
      },
    ],
    exclusions: [
      'GST/HST/PST provincial sales taxes',
      'Currency conversion spread if listing in USD from Canada',
      'Optional listing upgrades',
    ],
  },
};
