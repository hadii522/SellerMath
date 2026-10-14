export type CurrencyCode = 'USD' | 'GBP' | 'CAD';

export type CountryCode = 'US' | 'UK' | 'CA';

export interface FeeScheduleSource {
  sourceUrl: string;
  sourceName: string;
  effectiveDate: string;
  lastVerifiedDate: string;
  applicableMarket: CountryCode;
  notes: string;
  disclaimer: string;
}

// Universal Product Profit Calculator
export interface UniversalProfitInputs {
  sellingPrice: number;
  shippingCharged: number;
  productCost: number;
  shippingPaid: number;
  packagingCost: number;
  marketplaceFeePercent: number;
  paymentProcessingPercent: number;
  fixedTransactionFee: number;
  adSpendPerOrder: number;
  otherExpenses: number;
  returnRatePercent: number;
  currency: CurrencyCode;
  targetMarginPercent: number;
}

export interface UniversalProfitOutputs {
  totalRevenue: number;
  itemRevenue: number;
  shippingRevenue: number;
  productCost: number;
  totalShippingAndPackaging: number;
  shippingPaid: number;
  packagingCost: number;
  marketplaceFee: number;
  paymentProcessingFee: number;
  totalFees: number;
  adSpend: number;
  otherExpenses: number;
  estimatedReturnAllowance: number;
  totalCosts: number;
  netProfit: number;
  profitMarginPercent: number;
  returnOnProductCostPercent: number | null; // null if product cost is 0
  breakEvenSellingPrice: number | null; // null if fees >= 100%
  breakEvenRevenue: number | null;
  targetMarginSellingPrice: number | null; // null if fees + targetMargin >= 100%
  targetMarginRevenue: number | null;
  targetMarginPossible: boolean;
  targetMarginMessage?: string;
}

// Break-Even ROAS Calculator
export interface RoasInputs {
  sellingPrice: number;
  productCost: number;
  shippingAndPackagingCost: number;
  marketplaceAndPaymentFees: number; // can be amount or percent calculated
  otherVariableCosts: number;
  desiredProfitPerOrder: number;
  currency: CurrencyCode;
}

export interface RoasOutputs {
  sellingPrice: number;
  totalCostsBeforeAds: number;
  preAdContribution: number;
  breakEvenAdSpend: number;
  breakEvenRoas: number | null; // null if preAdContribution <= 0
  targetMaxAdSpend: number;
  targetRoas: number | null; // null if targetMaxAdSpend <= 0
  isProfitableBeforeAds: boolean;
  notes: string;
}

// Target Profit Price Calculator
export interface TargetPriceInputs {
  productCost: number;
  shippingPaidBySeller: number;
  packagingCost: number;
  shippingChargedToCustomer: number;
  marketplaceFeePercent: number;
  paymentProcessingPercent: number;
  fixedTransactionFee: number;
  adSpendPerOrder: number;
  otherExpenses: number;
  targetMarginPercent: number;
  currency: CurrencyCode;
}

export interface TargetPriceOutputs {
  targetSellingPrice: number | null;
  totalRevenue: number | null;
  totalCosts: number | null;
  projectedProfit: number | null;
  effectiveMarginPercent: number | null;
  isPossible: boolean;
  errorMessage?: string;
  breakEvenSellingPrice: number | null;
}

// eBay Calculator
export interface EbayCategoryFee {
  id: string;
  name: string;
  standardPercent: number;
  storePercent: number;
  fixedFee: number;
  threshold?: number;
  aboveThresholdPercent?: number;
}

export interface EbayInputs {
  sellingPrice: number;
  shippingCharged: number;
  productCost: number;
  shippingPaid: number;
  packagingCost: number;
  country: CountryCode;
  category: string;
  hasStoreSubscription: boolean;
  promotedListingPercent: number;
  internationalFeePercent: number;
  otherCosts: number;
  currency: CurrencyCode;
}

export interface EbayOutputs {
  totalRevenue: number;
  productCost: number;
  shippingCostTotal: number;
  finalValueFeePercent: number;
  finalValueFee: number;
  fixedOrderFee: number;
  promotedListingFee: number;
  internationalFee: number;
  totalEbayFees: number;
  otherCosts: number;
  totalCosts: number;
  netProfit: number;
  profitMarginPercent: number;
  returnOnCostPercent: number | null;
  effectiveFeeRatePercent: number;
}

// Etsy Calculator
export interface EtsyInputs {
  sellingPrice: number;
  shippingCharged: number;
  productCost: number;
  shippingPaid: number;
  packagingCost: number;
  country: CountryCode;
  offsiteAdsPercent: number; // 0, 12, or 15
  otherCosts: number;
  currency: CurrencyCode;
  itemsPerListing: number;
}

export interface EtsyOutputs {
  totalRevenue: number;
  listingFee: number;
  transactionFee: number;
  paymentProcessingFee: number;
  regulatoryOperatingFee: number;
  offsiteAdsFee: number;
  totalEtsyFees: number;
  productCost: number;
  shippingCostTotal: number;
  otherCosts: number;
  totalCosts: number;
  netProfit: number;
  profitMarginPercent: number;
  returnOnCostPercent: number | null;
  effectiveFeeRatePercent: number;
}

// Amazon FBA Calculator
export interface AmazonFbaInputs {
  sellingPrice: number;
  productCost: number;
  inboundShippingCost: number;
  prepAndPackagingCost: number;
  country: CountryCode;
  category: string;
  isProfessionalPlan: boolean;
  sizeTier: string;
  estimatedFbaFee: number;
  monthlyStorageMonths: number;
  estimatedMonthlyStorage: number;
  advertisingCost: number;
  returnRatePercent: number;
  currency: CurrencyCode;
}

export interface AmazonFbaOutputs {
  totalRevenue: number;
  referralFeePercent: number;
  referralFee: number;
  individualPerItemFee: number;
  fbaFulfillmentFee: number;
  storageFee: number;
  totalAmazonFees: number;
  productCost: number;
  inboundShipping: number;
  prepCost: number;
  advertisingCost: number;
  returnReserve: number;
  totalCosts: number;
  netProfit: number;
  profitMarginPercent: number;
  returnOnCostPercent: number | null;
  effectiveFeeRatePercent: number;
}
