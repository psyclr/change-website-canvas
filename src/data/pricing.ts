/**
 * Comprehensive pricing data configuration
 * Phase 1.2: Core pricing data implementation
 * 
 * Implements the new pricing structure:
 * - Start: 2000 PLN (base price, eligible for -70% New Client Launch promotion)
 * - Standard: 3500 PLN (popular/recommended)
 * - Pro: 6000 PLN (premium tier)
 */

import { 
  PricingData, 
  PricingPackage, 
  Promotion,
  calculateDiscountedPrice,
  getBestPromotion 
} from '@/types/pricing';

/**
 * Core pricing packages configuration
 * Based on realistic Polish market rates and competitive analysis
 */
const packages: PricingPackage[] = [
  {
    id: 'start',
    name: 'Start',
    basePrice: 2000,
    currentPrice: 600, // Calculated after applying 70% New Client Launch promotion
    currency: 'PLN',
    description: 'Perfect for small businesses starting their online presence',
    features: [
      'pricing.tiers.start.feature1', // Responsive website (5-7 pages)
      'pricing.tiers.start.feature2', // Contact form
      'pricing.tiers.start.feature3', // Basic SEO optimization
      'pricing.tiers.start.feature4', // 1 year hosting included
      'pricing.tiers.start.feature5'  // 2 months technical support
    ],
    limits: {
      projects: 1,
      pages: 7,
      revisions: 3,
      supportResponseTime: 48, // hours
      storageGB: 5,
      bandwidthGB: 50
    },
    isPromoEligible: true,
    popular: false,
    recommended: false,
    cta: 'pricing.cta.order',
    structuredData: {
      category: 'WebDevelopmentPackage',
      availability: 'InStock',
      validFrom: '2025-01-01T00:00:00.000Z',
      validThrough: '2025-12-31T23:59:59.999Z'
    }
  },
  {
    id: 'standard',
    name: 'Standard',
    basePrice: 3500,
    currentPrice: 3500,
    currency: 'PLN',
    description: 'Ideal for growing businesses with enhanced features',
    features: [
      'pricing.tiers.standard.feature1', // Everything from Start package
      'pricing.tiers.standard.feature2', // Responsive website (10-15 pages)
      'pricing.tiers.standard.feature3', // Advanced SEO + Google Analytics
      'pricing.tiers.standard.feature4', // Blog/news functionality
      'pricing.tiers.standard.feature5', // Social media integration
      'pricing.tiers.standard.feature6'  // 6 months technical support
    ],
    limits: {
      projects: 3,
      pages: 15,
      revisions: 5,
      supportResponseTime: 24, // hours
      storageGB: 20,
      bandwidthGB: 200
    },
    isPromoEligible: false,
    popular: true,
    recommended: true,
    cta: 'pricing.cta.order',
    structuredData: {
      category: 'WebDevelopmentPackage',
      availability: 'InStock',
      validFrom: '2025-01-01T00:00:00.000Z',
      validThrough: '2025-12-31T23:59:59.999Z'
    }
  },
  {
    id: 'pro',
    name: 'Pro',
    basePrice: 6000,
    currentPrice: 6000,
    currency: 'PLN',
    description: 'Premium solution for demanding projects',
    features: [
      'pricing.tiers.pro.feature1', // Everything from Standard package
      'pricing.tiers.pro.feature2', // Unlimited pages
      'pricing.tiers.pro.feature3', // E-commerce (up to 100 products)
      'pricing.tiers.pro.feature4', // Advanced forms and functionality
      'pricing.tiers.pro.feature5', // Administrative panel
      'pricing.tiers.pro.feature6', // External system integrations
      'pricing.tiers.pro.feature7'  // 12 months technical support
    ],
    limits: {
      projects: 10,
      pages: 50, // Practically unlimited for most use cases
      revisions: 10,
      supportResponseTime: 12, // hours
      storageGB: 100,
      bandwidthGB: 1000
    },
    isPromoEligible: false,
    popular: false,
    recommended: false,
    cta: 'pricing.cta.consult',
    structuredData: {
      category: 'WebDevelopmentPackage',
      availability: 'InStock',
      validFrom: '2025-01-01T00:00:00.000Z',
      validThrough: '2025-12-31T23:59:59.999Z'
    }
  }
];

/**
 * Active promotions configuration
 * Currently includes the New Client Launch -70% promotion for Start package
 */
const activePromotions: Promotion[] = [
  {
    id: 'new-client-launch-70',
    name: 'New Client Launch',
    discountPercentage: 70,
    applicablePackages: ['start'],
    validFrom: '2025-01-01T00:00:00.000Z',
    validTo: '2025-12-31T23:59:59.999Z',
    isActive: true,
    badgeText: '-70% Nowy Klient',
    description: 'Special 70% launch discount for new clients choosing the Start package. Limited time offer to help small businesses establish their online presence.',
    conditions: {
      customerType: 'new',
      maxUses: 100,
      currentUses: 0,
      minimumOrderValue: 0,
      allowedRegions: ['PL', 'EU'],
      promoCode: undefined // Automatic application, no code required
    },
    promotionType: 'percentage',
    priority: 100,
    maxDiscountAmount: 1400 // 70% of 2000 PLN = 1400 PLN discount
  }
];

/**
 * Complete pricing data configuration
 * This is the main export used throughout the application
 */
export const pricingData: PricingData = {
  packages,
  activePromotions,
  defaultCurrency: 'PLN',
  lastUpdated: new Date().toISOString(),
  seoMetadata: {
    title: 'Professional Web Development Services - Transparent Pricing | Change Canvas',
    description: 'Choose from our flexible pricing plans for web development services. Starting from 600 PLN with special launch discount. Professional websites for small businesses.',
    structuredDataType: 'Product'
  }
};

/**
 * Enhanced package configuration with computed promotion data
 * This function recalculates current prices based on active promotions
 */
export const getEnhancedPricingPackages = (): PricingPackage[] => {
  return packages.map(pkg => {
    const enhancedPackage: PricingPackage = {
      ...pkg,
      currentPrice: calculateDiscountedPrice(pkg, activePromotions)
    };
    
    return enhancedPackage;
  });
};

/**
 * Get the best active promotion for a specific package
 */
export const getPackagePromotion = (packageId: string): Promotion | null => {
  const targetPackage = packages.find(pkg => pkg.id === packageId);
  if (!targetPackage) return null;
  
  return getBestPromotion(targetPackage, activePromotions);
};

/**
 * Calculate savings for a package with active promotions
 */
export const calculatePackageSavings = (packageId: string): number => {
  const targetPackage = packages.find(pkg => pkg.id === packageId);
  if (!targetPackage) return 0;
  
  const originalPrice = targetPackage.basePrice;
  const discountedPrice = calculateDiscountedPrice(targetPackage, activePromotions);
  
  return originalPrice - discountedPrice;
};

/**
 * Get formatted savings text for display
 */
export const getFormattedSavings = (packageId: string): string | null => {
  const savings = calculatePackageSavings(packageId);
  if (savings <= 0) return null;
  
  return `Oszczędność ${savings} PLN`;
};

/**
 * Check if a package is currently eligible for any promotions
 */
export const isPackageOnPromotion = (packageId: string): boolean => {
  const promotion = getPackagePromotion(packageId);
  return promotion !== null;
};

/**
 * Legacy compatibility mapping for existing component structure
 * Maps new package IDs to old pricing tier structure
 */
export const legacyPricingMapping = {
  'start': 'starter',
  'standard': 'business', 
  'pro': 'professional'
} as const;

/**
 * Get legacy tier name for backward compatibility
 */
export const getLegacyTierName = (packageId: string): string => {
  return legacyPricingMapping[packageId as keyof typeof legacyPricingMapping] || packageId;
};

/**
 * Feature comparison matrix for detailed package comparison
 * Used by PricingComparison component
 */
export const featureComparisonMatrix = {
  basic: {
    pages: [7, 15, 50],
    responsive_design: [true, true, true],
    contact_form: [true, true, true],
    hosting: [true, true, true]
  },
  marketing: {
    seo_optimization: ['basic', 'advanced', 'advanced'],
    analytics: [false, true, true],
    social_media: [false, true, true]
  },
  content: {
    blog_news: [false, true, true],
    admin_panel: [false, false, true],
    content_management: ['basic', 'standard', 'advanced']
  },
  ecommerce: {
    online_store: [false, false, true],
    product_catalog: [0, 0, 100],
    payment_integration: [false, false, true]
  },
  integrations: {
    api_integrations: [false, 'basic', 'advanced'],
    external_systems: [false, false, true],
    third_party_tools: ['basic', 'standard', 'unlimited']
  },
  support: {
    duration_months: [2, 6, 12],
    response_time: [48, 24, 12],
    priority_support: [false, false, true]
  }
};

/**
 * Structured data for SEO rich snippets
 * Generates Schema.org compliant product data
 */
export const generateStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Professional Web Development Services",
    "description": pricingData.seoMetadata?.description,
    "provider": {
      "@type": "Organization", 
      "name": "Change Canvas",
      "url": "https://changecanvas.pl"
    },
    "offers": packages.map(pkg => ({
      "@type": "Offer",
      "name": `${pkg.name} Package`,
      "price": pkg.currentPrice,
      "priceCurrency": pkg.currency,
      "availability": "https://schema.org/InStock",
      "description": pkg.description,
      "category": "Web Development Services",
      "validFrom": pkg.structuredData?.validFrom,
      "validThrough": pkg.structuredData?.validThrough
    }))
  };
};

/**
 * Export enhanced pricing data with all computed values
 * This is the recommended way to consume pricing data
 */
export const getFullPricingData = (): PricingData & {
  enhancedPackages: PricingPackage[];
  structuredData: ReturnType<typeof generateStructuredData>;
} => {
  return {
    ...pricingData,
    enhancedPackages: getEnhancedPricingPackages(),
    structuredData: generateStructuredData()
  };
};

// Default export for easy importing
export default pricingData;

/**
 * Utility functions for price formatting and display
 */
export const formatPrice = (price: number, currency: string = 'PLN'): string => {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

export const formatPriceShort = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

/**
 * Type-safe package retrieval
 */
export const getPackageById = (id: string): PricingPackage | undefined => {
  return packages.find(pkg => pkg.id === id);
};

/**
 * Get packages sorted by price (ascending)
 */
export const getPackagesSortedByPrice = (): PricingPackage[] => {
  return [...packages].sort((a, b) => a.currentPrice - b.currentPrice);
};

/**
 * Get the most popular/recommended package
 */
export const getRecommendedPackage = (): PricingPackage | undefined => {
  return packages.find(pkg => pkg.recommended || pkg.popular);
};

/**
 * Marketing psychology features
 */
export const marketingFeatures = {
  socialProof: {
    clientsCount: 50,
    averageRating: 4.9,
    satisfactionRate: 98
  },
  urgency: {
    limitedTimeOffer: true,
    remainingSlots: 15,
    offerEndsDate: '2025-12-31T23:59:59.999Z'
  },
  riskReduction: {
    moneyBackGuarantee: true,
    paymentAfterApproval: true,
    flexiblePaymentOptions: true
  }
} as const;