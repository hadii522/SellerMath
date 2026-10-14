import { CountryCode, FeeScheduleSource } from '@/lib/types/calculator';

export interface AmazonCategoryRule {
  id: string;
  name: string;
  referralRatePercent: number;
  closingFee: number;
  notes: string;
}

export interface AmazonFbaSizeTier {
  id: string;
  name: string;
  typicalFee: number;
  description: string;
}

export interface AmazonMarketConfig {
  country: CountryCode;
  currency: 'USD' | 'GBP' | 'CAD';
  source: FeeScheduleSource;
  individualPerItemFee: number;
  categories: AmazonCategoryRule[];
  sizeTiers: AmazonFbaSizeTier[];
  standardMonthlyStoragePerUnit: number; // estimated average standard small unit storage per month
  peakMonthlyStoragePerUnit: number;
  exclusions: string[];
}

export const AMAZON_FEE_CONFIGS: Record<CountryCode, AmazonMarketConfig> = {
  US: {
    country: 'US',
    currency: 'USD',
    source: {
      sourceUrl: 'https://sellercentral.amazon.com/help/hub/reference/external/TG78KX2WSDVJ5TR',
      sourceName: 'Amazon US Seller Central Fee Schedule',
      effectiveDate: '2024-04-15',
      lastVerifiedDate: '2026-10-01',
      applicableMarket: 'US',
      notes:
        'Amazon charges category referral fees (typically 8%-15%), FBA fulfillment pick & pack fees based on dimensional weight, and monthly inventory storage fees.',
      disclaimer:
        'Estimates provide standard seller benchmarks. Does not replace Amazon Revenue Calculator or official settlement statements. Excludes low-inventory-level fees, inbound placement service options, and aged inventory surcharges.',
    },
    individualPerItemFee: 0.99,
    categories: [
      {
        id: 'home-kitchen',
        name: 'Home, Kitchen, Toys & General (15%)',
        referralRatePercent: 15.0,
        closingFee: 0.0,
        notes: 'Standard 15% category referral fee ($0.30 minimum).',
      },
      {
        id: 'electronics',
        name: 'Consumer Electronics & Cameras (8%)',
        referralRatePercent: 8.0,
        closingFee: 0.0,
        notes: 'Lower 8% referral fee applies to consumer electronic devices.',
      },
      {
        id: 'apparel',
        name: 'Apparel & Clothing (17%)',
        referralRatePercent: 17.0,
        closingFee: 0.0,
        notes: '17% on portion above $15; reduced rates may apply to low-price items.',
      },
      {
        id: 'media',
        name: 'Books, Music, Video & DVDs (15% + $1.80 Closing)',
        referralRatePercent: 15.0,
        closingFee: 1.8,
        notes: '15% referral fee plus $1.80 flat closing fee for physical media items.',
      },
      {
        id: 'custom',
        name: 'Custom Category Rate',
        referralRatePercent: 15.0,
        closingFee: 0.0,
        notes: 'Enter your category referral percentage.',
      },
    ],
    sizeTiers: [
      {
        id: 'small-standard',
        name: 'Small Standard (Under 8 oz) — ~$3.45',
        typicalFee: 3.45,
        description: 'Items up to 15 x 12 x 0.75 inches and under 8 oz.',
      },
      {
        id: 'large-standard-1lb',
        name: 'Large Standard (Under 1 lb) — ~$3.95',
        typicalFee: 3.95,
        description: 'Standard product packaging between 8 oz and 1 lb.',
      },
      {
        id: 'large-standard-2lb',
        name: 'Large Standard (1 to 2 lbs) — ~$4.95',
        typicalFee: 4.95,
        description: 'Standard size packages between 1 and 2 lbs.',
      },
      {
        id: 'bulky',
        name: 'Large Bulky / Oversize — ~$9.95+',
        typicalFee: 9.95,
        description: 'Oversized products requiring special fulfillment handling.',
      },
      {
        id: 'custom-fee',
        name: 'Custom FBA Fee (Enter Exact)',
        typicalFee: 4.5,
        description: 'Enter your verified FBA fee from Amazon Seller Central.',
      },
    ],
    standardMonthlyStoragePerUnit: 0.15,
    peakMonthlyStoragePerUnit: 0.45,
    exclusions: [
      'Professional selling plan subscription ($39.99 / month)',
      'FBA Inbound Placement Service fee (minimal / distributed split options)',
      'Low-inventory-level fee (if stock drops below 28 days of historical sales)',
      'Amazon Ads Sponsored Products PPC campaigns',
      'Aged inventory surcharge (items stored > 180 days)',
    ],
  },
  UK: {
    country: 'UK',
    currency: 'GBP',
    source: {
      sourceUrl: 'https://sellercentral.amazon.co.uk/help/hub/reference/external/G200336920',
      sourceName: 'Amazon UK FBA Rate Cards',
      effectiveDate: '2024-04-01',
      lastVerifiedDate: '2026-10-01',
      applicableMarket: 'UK',
      notes:
        'Amazon UK referral fee varies from 7.5% - 15.3% depending on category, plus FBA fulfilment fee based on parcel size.',
      disclaimer:
        'UK seller fees are subject to 20% UK VAT if the seller is not VAT-registered.',
    },
    individualPerItemFee: 0.75,
    categories: [
      {
        id: 'uk-general',
        name: 'General Merchandise & Home (15.3%)',
        referralRatePercent: 15.3,
        closingFee: 0.0,
        notes: 'Standard UK referral fee.',
      },
      {
        id: 'uk-electronics',
        name: 'Consumer Electronics (7.14% - 12%)',
        referralRatePercent: 8.0,
        closingFee: 0.0,
        notes: 'Reduced electronics referral fee.',
      },
      {
        id: 'uk-media',
        name: 'Books & Media (15.3% + £0.50 Closing)',
        referralRatePercent: 15.3,
        closingFee: 0.5,
        notes: 'Books and media UK closing fee.',
      },
      {
        id: 'custom',
        name: 'Custom Category Rate',
        referralRatePercent: 15.0,
        closingFee: 0.0,
        notes: 'Custom referral rate.',
      },
    ],
    sizeTiers: [
      {
        id: 'uk-small-envelope',
        name: 'Small Envelope / Letter — ~£1.85',
        typicalFee: 1.85,
        description: 'Small envelope under 80g.',
      },
      {
        id: 'uk-standard-parcel',
        name: 'Standard Parcel (Under 1kg) — ~£3.40',
        typicalFee: 3.4,
        description: 'Typical parcel up to 1kg.',
      },
      {
        id: 'uk-heavy-parcel',
        name: 'Heavy Parcel (1kg - 2kg) — ~£4.50',
        typicalFee: 4.5,
        description: 'Parcel between 1kg and 2kg.',
      },
      {
        id: 'custom-fee',
        name: 'Custom FBA Fee',
        typicalFee: 3.5,
        description: 'Custom rate.',
      },
    ],
    standardMonthlyStoragePerUnit: 0.12,
    peakMonthlyStoragePerUnit: 0.35,
    exclusions: ['20% UK VAT on seller fees', 'Professional account £25/month'],
  },
  CA: {
    country: 'CA',
    currency: 'CAD',
    source: {
      sourceUrl: 'https://sellercentral.amazon.ca/help/hub/reference/external/G200336920',
      sourceName: 'Amazon Canada FBA Fee Schedule',
      effectiveDate: '2024-04-15',
      lastVerifiedDate: '2026-10-01',
      applicableMarket: 'CA',
      notes:
        'Amazon Canada charges standard referral fees (8%-15%) in Canadian Dollars, plus Canadian FBA fulfillment fees.',
      disclaimer: 'GST/HST taxes on Amazon fees are excluded.',
    },
    individualPerItemFee: 1.49,
    categories: [
      {
        id: 'ca-general',
        name: 'General Merchandise (15%)',
        referralRatePercent: 15.0,
        closingFee: 0.0,
        notes: 'Standard 15% referral fee.',
      },
      {
        id: 'ca-electronics',
        name: 'Electronics (8%)',
        referralRatePercent: 8.0,
        closingFee: 0.0,
        notes: 'Electronics 8% rate.',
      },
      {
        id: 'custom',
        name: 'Custom Category Rate',
        referralRatePercent: 15.0,
        closingFee: 0.0,
        notes: 'Custom rate.',
      },
    ],
    sizeTiers: [
      {
        id: 'ca-standard-under500g',
        name: 'Standard (Under 500g) — ~CA$5.25',
        typicalFee: 5.25,
        description: 'Standard packaged unit under 500 grams.',
      },
      {
        id: 'ca-standard-1kg',
        name: 'Standard (500g - 1kg) — ~CA$6.75',
        typicalFee: 6.75,
        description: 'Standard packaged unit up to 1 kg.',
      },
      {
        id: 'custom-fee',
        name: 'Custom FBA Fee',
        typicalFee: 5.5,
        description: 'Custom rate.',
      },
    ],
    standardMonthlyStoragePerUnit: 0.2,
    peakMonthlyStoragePerUnit: 0.55,
    exclusions: ['GST/HST sales tax', 'Professional plan CA$29.99/month'],
  },
};
