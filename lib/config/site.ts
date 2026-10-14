export interface SiteConfig {
  brandName: string;
  domain: string;
  siteUrl: string;
  tagline: string;
  description: string;
  author: string;
  ads: {
    enabled: boolean;
    client?: string;
  };
  contactEmail: string;
  legalEmail: string;
  securityEmail: string;
  supportedCurrencies: {
    code: 'USD' | 'GBP' | 'CAD';
    symbol: string;
    label: string;
    flag: string;
  }[];
}

const getSiteUrl = (): string => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'https://seller-math-delta.vercel.app';
};

const getDomain = (): string => {
  if (process.env.NEXT_PUBLIC_DOMAIN) {
    return process.env.NEXT_PUBLIC_DOMAIN;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return process.env.VERCEL_PROJECT_PRODUCTION_URL;
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return process.env.NEXT_PUBLIC_VERCEL_URL;
  }
  if (process.env.VERCEL_URL) {
    return process.env.VERCEL_URL;
  }
  return 'seller-math-delta.vercel.app';
};

export const siteConfig: SiteConfig = {
  brandName: process.env.NEXT_PUBLIC_BRAND_NAME || 'SellerMath',
  domain: getDomain(),
  siteUrl: getSiteUrl(),
  tagline: 'Accurate Profit & Fee Calculators for Online Sellers',
  description:
    'Free, instant seller profit, fee, and margin calculators for eBay, Etsy, Amazon FBA, and e-commerce stores in the US, UK, and Canada.',
  author: 'SellerMath Team',
  contactEmail: 'hgoraya522@gmail.com',
  legalEmail: 'hgoraya522@gmail.com',
  securityEmail: 'hgoraya522@gmail.com',
  ads: {
    // Disabled by default to comply with AdSense policy (must have organic traffic & manual approval first)
    enabled: process.env.NEXT_PUBLIC_ADS_ENABLED === 'true',
    client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '',
  },
  supportedCurrencies: [
    { code: 'USD', symbol: '$', label: 'USD ($) - United States', flag: '🇺🇸' },
    { code: 'GBP', symbol: '£', label: 'GBP (£) - United Kingdom', flag: '🇬🇧' },
    { code: 'CAD', symbol: 'CA$', label: 'CAD ($) - Canada', flag: '🇨🇦' },
  ],
};

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  badge?: string;
}

export const calculatorNavItems: NavItem[] = [
  {
    label: 'Universal Profit Calculator',
    href: '/calculators/product-profit-calculator',
    description: 'Calculate net profit, margin %, ROI, and break-even selling price for any product.',
  },
  {
    label: 'eBay Profit Calculator',
    href: '/calculators/ebay-profit-calculator',
    description: 'Estimate eBay final value fees, store discounts, and net payout for US, UK, and CA.',
  },
  {
    label: 'Etsy Fee Calculator',
    href: '/calculators/etsy-fee-calculator',
    description: 'Calculate listing, 6.5% transaction, payment processing, and offsite ad fees.',
  },
  {
    label: 'Amazon FBA Calculator',
    href: '/calculators/amazon-fba-profit-calculator',
    description: 'Estimate referral fees, FBA pick & pack, and monthly storage costs.',
  },
  {
    label: 'Break-Even ROAS Calculator',
    href: '/calculators/break-even-roas-calculator',
    description: 'Find the minimum advertising return required to avoid losing money on paid ads.',
  },
  {
    label: 'Target Profit Price Calculator',
    href: '/calculators/target-profit-price-calculator',
    description: 'Determine the exact selling price needed to achieve your desired profit margin.',
  },
];

export const guideNavItems: NavItem[] = [
  {
    label: 'Profit Margin vs Markup',
    href: '/guides/profit-margin-vs-markup',
    description: 'Learn why confusing margin and markup leads to underpriced products and losses.',
  },
  {
    label: 'How to Calculate Product Profit',
    href: '/guides/how-to-calculate-product-profit',
    description: 'Step-by-step masterclass covering gross vs net profit, hidden fees, and returns.',
  },
  {
    label: 'Break-Even ROAS Explained',
    href: '/guides/break-even-roas-explained',
    description: 'Master advertising unit economics, target ROAS, and contribution margins.',
  },
];
