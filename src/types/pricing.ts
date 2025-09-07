/**
 * TypeScript interfaces for pricing data structure
 * Supports pricing packages, promotions, and structured data for SEO
 */

/**
 * Currency type for pricing
 */
export type Currency = 'PLN' | 'USD' | 'EUR';

/**
 * Package limits and constraints
 */
export interface PackageLimits {
  /** Maximum number of projects/websites */
  projects?: number;
  /** Maximum number of pages */
  pages?: number;
  /** Maximum number of revisions */
  revisions?: number;
  /** Support response time in hours */
  supportResponseTime?: number;
  /** Storage limit in GB */
  storageGB?: number;
  /** Bandwidth limit in GB */
  bandwidthGB?: number;
}

/**
 * Individual pricing package definition
 */
export interface PricingPackage {
  /** Unique identifier for the package */
  id: string;
  /** Display name of the package */
  name: string;
  /** Base price before any promotions */
  basePrice: number;
  /** Current effective price (after promotions) */
  currentPrice: number;
  /** Currency code */
  currency: Currency;
  /** List of features included in this package */
  features: string[];
  /** Package limits and constraints */
  limits: PackageLimits;
  /** Whether this package is eligible for promotions */
  isPromoEligible: boolean;
  /** Short description of the package */
  description?: string;
  /** Whether this is marked as popular */
  popular?: boolean;
  /** Whether this is recommended */
  recommended?: boolean;
  /** Call-to-action button text key */
  cta: string;
  /** SEO structured data properties */
  structuredData?: {
    /** Schema.org category */
    category?: string;
    /** Availability status */
    availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
    /** Valid from date */
    validFrom?: string;
    /** Valid through date */
    validThrough?: string;
  };
}

/**
 * Promotion conditions for eligibility
 */
export interface PromotionConditions {
  /** Minimum order value to qualify */
  minimumOrderValue?: number;
  /** Maximum number of uses */
  maxUses?: number;
  /** Current number of uses */
  currentUses?: number;
  /** Required customer type */
  customerType?: 'new' | 'existing' | 'any';
  /** Geographic restrictions */
  allowedRegions?: string[];
  /** Promo code required */
  promoCode?: string;
}

/**
 * Enhanced promotion types for different discount strategies
 */
export type PromotionType = 'percentage' | 'fixed_amount' | 'buy_one_get_one' | 'tiered';

/**
 * Promotion definition
 */
export interface Promotion {
  /** Unique identifier for the promotion */
  id: string;
  /** Display name of the promotion */
  name: string;
  /** Discount percentage (0-100) */
  discountPercentage: number;
  /** Package IDs this promotion applies to */
  applicablePackages: string[];
  /** Promotion valid from date (ISO 8601) */
  validFrom: string;
  /** Promotion valid to date (ISO 8601) */
  validTo: string;
  /** Additional conditions for this promotion */
  conditions?: PromotionConditions;
  /** Whether the promotion is currently active */
  isActive: boolean;
  /** Promotional badge text */
  badgeText?: string;
  /** SEO description for rich snippets */
  description?: string;
  /** Type of promotion calculation */
  promotionType?: PromotionType;
  /** Fixed discount amount (for fixed_amount type) */
  fixedAmount?: number;
  /** Minimum quantity for tiered promotions */
  minQuantity?: number;
  /** Maximum discount cap */
  maxDiscountAmount?: number;
  /** Priority for stacking promotions */
  priority?: number;
}

/**
 * Complete pricing data structure
 */
export interface PricingData {
  /** List of all available packages */
  packages: PricingPackage[];
  /** List of active promotions */
  activePromotions: Promotion[];
  /** Default currency for display */
  defaultCurrency: Currency;
  /** Last updated timestamp */
  lastUpdated: string;
  /** SEO metadata for pricing section */
  seoMetadata?: {
    /** Page title for SEO */
    title?: string;
    /** Meta description */
    description?: string;
    /** Structured data type */
    structuredDataType?: string;
  };
}

/**
 * Legacy compatibility interface for existing PricingTier
 * @deprecated Use PricingPackage instead
 */
export interface PricingTier {
  id: string;
  popular?: boolean;
  recommended?: boolean;
  savings?: string;
  features: string[];
  cta: string;
}

// Type Guards for Runtime Validation

/**
 * Type guard to check if an object is a valid PricingPackage
 */
export function isPricingPackage(obj: unknown): obj is PricingPackage {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof (obj as Record<string, unknown>).id === 'string' &&
    typeof (obj as Record<string, unknown>).name === 'string' &&
    typeof (obj as Record<string, unknown>).basePrice === 'number' &&
    typeof (obj as Record<string, unknown>).currentPrice === 'number' &&
    typeof (obj as Record<string, unknown>).currency === 'string' &&
    ['PLN', 'USD', 'EUR'].includes((obj as Record<string, unknown>).currency as string) &&
    Array.isArray((obj as Record<string, unknown>).features) &&
    ((obj as Record<string, unknown>).features as unknown[]).every((feature: unknown) => typeof feature === 'string') &&
    typeof (obj as Record<string, unknown>).limits === 'object' &&
    typeof (obj as Record<string, unknown>).isPromoEligible === 'boolean' &&
    typeof (obj as Record<string, unknown>).cta === 'string'
  );
}

/**
 * Type guard to check if an object is a valid Promotion
 */
export function isPromotion(obj: unknown): obj is Promotion {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof (obj as Record<string, unknown>).id === 'string' &&
    typeof (obj as Record<string, unknown>).name === 'string' &&
    typeof (obj as Record<string, unknown>).discountPercentage === 'number' &&
    (obj as Record<string, unknown>).discountPercentage >= 0 &&
    (obj as Record<string, unknown>).discountPercentage <= 100 &&
    Array.isArray((obj as Record<string, unknown>).applicablePackages) &&
    ((obj as Record<string, unknown>).applicablePackages as unknown[]).every((pkg: unknown) => typeof pkg === 'string') &&
    typeof (obj as Record<string, unknown>).validFrom === 'string' &&
    typeof (obj as Record<string, unknown>).validTo === 'string' &&
    typeof (obj as Record<string, unknown>).isActive === 'boolean'
  );
}

/**
 * Type guard to check if an object is a valid PricingData structure
 */
export function isPricingData(obj: unknown): obj is PricingData {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    Array.isArray((obj as Record<string, unknown>).packages) &&
    ((obj as Record<string, unknown>).packages as unknown[]).every(isPricingPackage) &&
    Array.isArray((obj as Record<string, unknown>).activePromotions) &&
    ((obj as Record<string, unknown>).activePromotions as unknown[]).every(isPromotion) &&
    typeof (obj as Record<string, unknown>).defaultCurrency === 'string' &&
    ['PLN', 'USD', 'EUR'].includes((obj as Record<string, unknown>).defaultCurrency as string) &&
    typeof (obj as Record<string, unknown>).lastUpdated === 'string'
  );
}

/**
 * Validates if a date string is in valid ISO 8601 format
 */
export function isValidISODate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime()) && dateString === date.toISOString();
}

/**
 * Validates if a promotion is currently active based on dates
 */
export function isPromotionActive(promotion: Promotion): boolean {
  const now = new Date();
  const validFrom = new Date(promotion.validFrom);
  const validTo = new Date(promotion.validTo);
  
  return (
    promotion.isActive &&
    now >= validFrom &&
    now <= validTo &&
    (!promotion.conditions?.maxUses || 
     !promotion.conditions?.currentUses ||
     promotion.conditions.currentUses < promotion.conditions.maxUses)
  );
}

/**
 * Calculates the discounted price for a package with applied promotions
 */
export function calculateDiscountedPrice(
  package_: PricingPackage, 
  promotions: Promotion[]
): number {
  if (!package_.isPromoEligible) {
    return package_.basePrice;
  }

  const applicablePromotions = promotions.filter(promo => 
    promo.applicablePackages.includes(package_.id) && 
    isPromotionActive(promo)
  );

  if (applicablePromotions.length === 0) {
    return package_.basePrice;
  }

  // Apply the best (highest) discount percentage
  const bestDiscount = Math.max(...applicablePromotions.map(p => p.discountPercentage));
  return Math.round(package_.basePrice * (1 - bestDiscount / 100));
}

/**
 * Gets the best applicable promotion for a package
 */
export function getBestPromotion(
  package_: PricingPackage, 
  promotions: Promotion[]
): Promotion | null {
  const applicablePromotions = promotions.filter(promo => 
    promo.applicablePackages.includes(package_.id) && 
    isPromotionActive(promo)
  );

  if (applicablePromotions.length === 0) {
    return null;
  }

  return applicablePromotions.reduce((best, current) => 
    current.discountPercentage > best.discountPercentage ? current : best
  );
}

/**
 * Example data structure for the new pricing model
 * Start: 2000 PLN, Standard: 3500 PLN, Pro: 6000 PLN
 * With -70% New Client Launch promotion for Start package
 */
export const examplePricingData: PricingData = {
  packages: [
    {
      id: 'start',
      name: 'Start',
      basePrice: 2000,
      currentPrice: 600, // After 70% discount
      currency: 'PLN',
      features: [
        'pricing.tiers.start.feature1',
        'pricing.tiers.start.feature2',
        'pricing.tiers.start.feature3',
        'pricing.tiers.start.feature4'
      ],
      limits: {
        projects: 1,
        pages: 5,
        revisions: 3,
        supportResponseTime: 48
      },
      isPromoEligible: true,
      popular: false,
      cta: 'pricing.cta.order',
      structuredData: {
        category: 'WebDevelopmentPackage',
        availability: 'InStock'
      }
    },
    {
      id: 'standard',
      name: 'Standard',
      basePrice: 3500,
      currentPrice: 3500,
      currency: 'PLN',
      features: [
        'pricing.tiers.standard.feature1',
        'pricing.tiers.standard.feature2',
        'pricing.tiers.standard.feature3',
        'pricing.tiers.standard.feature4',
        'pricing.tiers.standard.feature5'
      ],
      limits: {
        projects: 3,
        pages: 15,
        revisions: 5,
        supportResponseTime: 24
      },
      isPromoEligible: false,
      popular: true,
      recommended: true,
      cta: 'pricing.cta.order',
      structuredData: {
        category: 'WebDevelopmentPackage',
        availability: 'InStock'
      }
    },
    {
      id: 'pro',
      name: 'Pro',
      basePrice: 6000,
      currentPrice: 6000,
      currency: 'PLN',
      features: [
        'pricing.tiers.pro.feature1',
        'pricing.tiers.pro.feature2',
        'pricing.tiers.pro.feature3',
        'pricing.tiers.pro.feature4',
        'pricing.tiers.pro.feature5',
        'pricing.tiers.pro.feature6'
      ],
      limits: {
        projects: 10,
        pages: 50,
        revisions: 10,
        supportResponseTime: 12
      },
      isPromoEligible: false,
      popular: false,
      cta: 'pricing.cta.consult',
      structuredData: {
        category: 'WebDevelopmentPackage',
        availability: 'InStock'
      }
    }
  ],
  activePromotions: [
    {
      id: 'new-client-launch',
      name: 'New Client Launch',
      discountPercentage: 70,
      applicablePackages: ['start'],
      validFrom: '2025-01-01T00:00:00.000Z',
      validTo: '2025-12-31T23:59:59.999Z',
      isActive: true,
      badgeText: '-70% Nowy Klient',
      description: 'Special 70% discount for new clients on Start package',
      conditions: {
        customerType: 'new',
        maxUses: 100,
        currentUses: 0
      }
    }
  ],
  defaultCurrency: 'PLN',
  lastUpdated: new Date().toISOString(),
  seoMetadata: {
    title: 'Pricing Plans - Professional Web Development Services',
    description: 'Choose from our flexible pricing plans for web development services. Start from 600 PLN with special launch discount.',
    structuredDataType: 'Product'
  }
};