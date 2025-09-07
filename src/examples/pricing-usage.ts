/**
 * Usage example demonstrating how to use the pricing interfaces
 * This file shows practical implementation patterns for the pricing system
 */

import {
  PricingData,
  PricingPackage,
  Promotion,
  calculateDiscountedPrice,
  getBestPromotion,
  isPromotionActive,
  isPricingData,
  examplePricingData
} from '../types/pricing';

/**
 * Example: Loading and validating pricing data from an API
 */
export async function loadPricingData(): Promise<PricingData | null> {
  try {
    // Simulate API call
    const response = await fetch('/api/pricing');
    const data = await response.json();
    
    // Validate the data structure using type guards
    if (isPricingData(data)) {
      return data;
    } else {
      console.error('Invalid pricing data structure received from API');
      return null;
    }
  } catch (error) {
    console.error('Failed to load pricing data:', error);
    return null;
  }
}

/**
 * Example: Processing packages for display with applied promotions
 */
export function processPackagesForDisplay(pricingData: PricingData): Array<PricingPackage & { 
  effectivePrice: number;
  savings: number;
  applicablePromotion: Promotion | null;
}> {
  return pricingData.packages.map(package_ => {
    const effectivePrice = calculateDiscountedPrice(package_, pricingData.activePromotions);
    const savings = package_.basePrice - effectivePrice;
    const applicablePromotion = getBestPromotion(package_, pricingData.activePromotions);
    
    return {
      ...package_,
      effectivePrice,
      savings,
      applicablePromotion
    };
  });
}

/**
 * Example: Finding packages by criteria
 */
export function findPackagesByCriteria(
  pricingData: PricingData,
  criteria: {
    maxPrice?: number;
    minProjects?: number;
    promoEligible?: boolean;
  }
): PricingPackage[] {
  return pricingData.packages.filter(package_ => {
    const effectivePrice = calculateDiscountedPrice(package_, pricingData.activePromotions);
    
    if (criteria.maxPrice && effectivePrice > criteria.maxPrice) {
      return false;
    }
    
    if (criteria.minProjects && (!package_.limits.projects || package_.limits.projects < criteria.minProjects)) {
      return false;
    }
    
    if (criteria.promoEligible !== undefined && package_.isPromoEligible !== criteria.promoEligible) {
      return false;
    }
    
    return true;
  });
}

/**
 * Example: Getting active promotions only
 */
export function getActivePromotions(pricingData: PricingData): Promotion[] {
  return pricingData.activePromotions.filter(isPromotionActive);
}

/**
 * Example: Formatting price for display
 */
export function formatPrice(
  price: number, 
  currency = 'PLN', 
  locale = 'pl-PL'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

/**
 * Example: Creating structured data for SEO (Schema.org)
 */
export function generateStructuredData(pricingData: PricingData): object {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Web Development Services",
    "description": "Professional web development packages with flexible pricing",
    "offers": pricingData.packages.map(package_ => {
      const effectivePrice = calculateDiscountedPrice(package_, pricingData.activePromotions);
      const bestPromo = getBestPromotion(package_, pricingData.activePromotions);
      
      return {
        "@type": "Offer",
        "name": package_.name,
        "description": package_.description,
        "price": effectivePrice,
        "priceCurrency": package_.currency,
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": effectivePrice,
          "priceCurrency": package_.currency,
          ...(bestPromo && {
            "discount": {
              "@type": "QuantitativeValue",
              "value": bestPromo.discountPercentage,
              "unitText": "PERCENT"
            }
          })
        },
        "availability": package_.structuredData?.availability || "https://schema.org/InStock",
        "validFrom": package_.structuredData?.validFrom,
        "validThrough": package_.structuredData?.validThrough,
        "category": package_.structuredData?.category || "WebDevelopmentService"
      };
    })
  };
}

/**
 * Example usage with the provided example data
 */
export function demonstrateUsage(): void {
  console.log('=== Pricing System Usage Examples ===');
  
  // 1. Process packages for display
  const processedPackages = processPackagesForDisplay(examplePricingData);
  console.log('Processed packages:', processedPackages.map(p => ({
    name: p.name,
    originalPrice: p.basePrice,
    effectivePrice: p.effectivePrice,
    savings: p.savings,
    hasPromotion: !!p.applicablePromotion
  })));
  
  // 2. Find affordable packages (under 4000 PLN)
  const affordablePackages = findPackagesByCriteria(examplePricingData, {
    maxPrice: 4000
  });
  console.log('Affordable packages:', affordablePackages.map(p => p.name));
  
  // 3. Get active promotions
  const activePromotions = getActivePromotions(examplePricingData);
  console.log('Active promotions:', activePromotions.map(p => p.name));
  
  // 4. Format prices
  console.log('Formatted prices:', examplePricingData.packages.map(p => ({
    name: p.name,
    price: formatPrice(calculateDiscountedPrice(p, examplePricingData.activePromotions))
  })));
  
  // 5. Generate structured data for SEO
  const structuredData = generateStructuredData(examplePricingData);
  console.log('SEO structured data generated:', Object.keys(structuredData));
}