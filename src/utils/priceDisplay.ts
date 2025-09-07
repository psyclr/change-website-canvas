/**
 * Price display utilities for promotional pricing and accessibility
 * Handles promotional price display, strikethrough formatting, and screen reader support
 */

import { 
  formatPrice, 
  formatCurrency, 
  formatSavingsPercentage, 
  formatSavingsAmount,
  isValidCurrencyAmount,
  getLocaleFromLanguage,
  type CurrencyFormatOptions 
} from './currency';
import { Currency, PricingPackage, Promotion } from '@/types/pricing';

/**
 * Price display variant for different contexts
 */
export type PriceDisplayVariant = 
  | 'default'      // Standard price display
  | 'large'        // Large pricing cards
  | 'compact'      // Compact lists/tables
  | 'mobile'       // Mobile-optimized
  | 'comparison';  // Comparison tables

/**
 * Price display context for accessibility and SEO
 */
export interface PriceDisplayContext {
  /** Language code for localization */
  language: string;
  /** Currency to display */
  currency: Currency;
  /** Display variant */
  variant: PriceDisplayVariant;
  /** Whether this is the primary price on the page */
  isPrimary?: boolean;
  /** Package name for screen reader context */
  packageName?: string;
  /** Additional accessibility description */
  accessibilityLabel?: string;
}

/**
 * Promotional price information structure
 */
export interface PromotionalPriceInfo {
  /** Original price before discount */
  originalPrice: number;
  /** Final price after discount */
  discountedPrice: number;
  /** Applied promotion details */
  promotion?: Promotion;
  /** Calculated savings amount */
  savingsAmount: number;
  /** Calculated savings percentage */
  savingsPercentage: number;
  /** Whether this has an active promotion */
  hasPromotion: boolean;
}

/**
 * Price display formatting result
 */
export interface FormattedPriceDisplay {
  /** Main price text (HTML-safe) */
  mainPrice: string;
  /** Original price text (for strikethrough, HTML-safe) */
  originalPrice?: string;
  /** Savings text (HTML-safe) */
  savingsText?: string;
  /** Accessibility text for screen readers */
  accessibilityText: string;
  /** Structured data for SEO */
  structuredData: {
    price: string;
    originalPrice?: string;
    currency: Currency;
    discount?: string;
  };
  /** CSS classes for styling */
  cssClasses: {
    container: string;
    mainPrice: string;
    originalPrice: string;
    savings: string;
  };
}

/**
 * Calculates promotional price information from a package and promotions
 */
export function calculatePromotionalPrice(
  basePrice: number,
  currentPrice: number,
  promotion?: Promotion
): PromotionalPriceInfo {
  const hasPromotion = promotion && currentPrice < basePrice;
  
  return {
    originalPrice: basePrice,
    discountedPrice: currentPrice,
    promotion,
    savingsAmount: hasPromotion ? basePrice - currentPrice : 0,
    savingsPercentage: hasPromotion ? ((basePrice - currentPrice) / basePrice) * 100 : 0,
    hasPromotion: !!hasPromotion,
  };
}

/**
 * Generates CSS classes for price display based on variant and promotion status
 */
function getPriceDisplayClasses(
  variant: PriceDisplayVariant,
  hasPromotion: boolean
): FormattedPriceDisplay['cssClasses'] {
  const baseClasses = {
    container: 'price-display',
    mainPrice: 'price-main',
    originalPrice: 'price-original',
    savings: 'price-savings',
  };

  // Variant-specific classes
  const variantClasses = {
    default: {
      container: 'price-display-default',
      mainPrice: 'text-2xl font-bold',
      originalPrice: 'text-lg text-gray-500 line-through',
      savings: 'text-sm text-green-600 font-medium',
    },
    large: {
      container: 'price-display-large',
      mainPrice: 'text-4xl font-bold',
      originalPrice: 'text-xl text-gray-500 line-through',
      savings: 'text-base text-green-600 font-medium',
    },
    compact: {
      container: 'price-display-compact',
      mainPrice: 'text-lg font-semibold',
      originalPrice: 'text-sm text-gray-500 line-through',
      savings: 'text-xs text-green-600 font-medium',
    },
    mobile: {
      container: 'price-display-mobile',
      mainPrice: 'text-xl font-bold',
      originalPrice: 'text-base text-gray-500 line-through',
      savings: 'text-sm text-green-600 font-medium',
    },
    comparison: {
      container: 'price-display-comparison',
      mainPrice: 'text-lg font-semibold',
      originalPrice: 'text-sm text-gray-500 line-through',
      savings: 'text-xs text-green-600 font-medium',
    },
  };

  // Promotional classes
  const promotionalClasses = hasPromotion ? {
    container: `${baseClasses.container} ${variantClasses[variant].container} price-promotional`,
    mainPrice: `${baseClasses.mainPrice} ${variantClasses[variant].mainPrice} text-red-600`,
    originalPrice: `${baseClasses.originalPrice} ${variantClasses[variant].originalPrice}`,
    savings: `${baseClasses.savings} ${variantClasses[variant].savings}`,
  } : {
    container: `${baseClasses.container} ${variantClasses[variant].container}`,
    mainPrice: `${baseClasses.mainPrice} ${variantClasses[variant].mainPrice}`,
    originalPrice: `${baseClasses.originalPrice} ${variantClasses[variant].originalPrice}`,
    savings: `${baseClasses.savings} ${variantClasses[variant].savings}`,
  };

  return promotionalClasses;
}

/**
 * Generates accessibility text for screen readers
 */
function generateAccessibilityText(
  priceInfo: PromotionalPriceInfo,
  context: PriceDisplayContext
): string {
  const { language, packageName } = context;
  const { originalPrice, discountedPrice, hasPromotion, savingsPercentage } = priceInfo;

  const mainPriceText = formatPrice(discountedPrice, context.currency, language);
  
  let accessibilityText = '';
  
  // Add package context if available
  if (packageName) {
    switch (language) {
      case 'pl':
        accessibilityText += `Cena pakietu ${packageName}: `;
        break;
      case 'ru':
        accessibilityText += `Цена пакета ${packageName}: `;
        break;
      case 'en':
      default:
        accessibilityText += `${packageName} package price: `;
        break;
    }
  }

  if (hasPromotion) {
    const originalPriceText = formatPrice(originalPrice, context.currency, language);
    const savingsText = formatSavingsPercentage(originalPrice, discountedPrice, language);
    
    switch (language) {
      case 'pl':
        accessibilityText += `Cena promocyjna: ${mainPriceText}. Cena pierwotna: ${originalPriceText}. ${savingsText}.`;
        break;
      case 'ru':
        accessibilityText += `Акционная цена: ${mainPriceText}. Первоначальная цена: ${originalPriceText}. Скидка ${savingsPercentage.toFixed(0)}%.`;
        break;
      case 'en':
      default:
        accessibilityText += `Promotional price: ${mainPriceText}. Original price: ${originalPriceText}. ${savingsText}.`;
        break;
    }
  } else {
    switch (language) {
      case 'pl':
        accessibilityText += `${mainPriceText}.`;
        break;
      case 'ru':
        accessibilityText += `${mainPriceText}.`;
        break;
      case 'en':
      default:
        accessibilityText += `${mainPriceText}.`;
        break;
    }
  }

  return accessibilityText;
}

/**
 * Main function to format price display with full promotional and accessibility support
 */
export function formatPriceDisplay(
  priceInfo: PromotionalPriceInfo,
  context: PriceDisplayContext
): FormattedPriceDisplay {
  const { language, currency, variant } = context;
  const { originalPrice, discountedPrice, hasPromotion, savingsPercentage } = priceInfo;

  if (!isValidCurrencyAmount(discountedPrice)) {
    throw new Error('Invalid discounted price amount');
  }

  if (hasPromotion && !isValidCurrencyAmount(originalPrice)) {
    throw new Error('Invalid original price amount');
  }

  // Format main price
  const mainPrice = formatPrice(discountedPrice, currency, language);
  
  // Format original price for strikethrough (if promotional)
  const originalPriceText = hasPromotion 
    ? formatPrice(originalPrice, currency, language)
    : undefined;

  // Format savings text
  const savingsText = hasPromotion && savingsPercentage > 0
    ? formatSavingsPercentage(originalPrice, discountedPrice, language)
    : undefined;

  // Generate accessibility text
  const accessibilityText = generateAccessibilityText(priceInfo, context);

  // Get CSS classes
  const cssClasses = getPriceDisplayClasses(variant, hasPromotion);

  // Generate structured data for SEO
  const structuredData = {
    price: discountedPrice.toString(),
    originalPrice: hasPromotion ? originalPrice.toString() : undefined,
    currency,
    discount: hasPromotion ? savingsPercentage.toFixed(0) : undefined,
  };

  return {
    mainPrice,
    originalPrice: originalPriceText,
    savingsText,
    accessibilityText,
    structuredData,
    cssClasses,
  };
}

/**
 * Convenience function for formatting a pricing package display
 */
export function formatPackagePriceDisplay(
  pkg: PricingPackage,
  context: Omit<PriceDisplayContext, 'packageName'>
): FormattedPriceDisplay {
  const priceInfo = calculatePromotionalPrice(
    pkg.basePrice,
    pkg.currentPrice,
    // Assuming applied promotion info is available on the package
    undefined // This would be the applied promotion from the pricing hook
  );

  return formatPriceDisplay(priceInfo, {
    ...context,
    packageName: pkg.name,
  });
}

/**
 * Validates price display context
 */
export function validatePriceDisplayContext(context: PriceDisplayContext): boolean {
  return (
    typeof context.language === 'string' &&
    ['PLN', 'USD', 'EUR'].includes(context.currency) &&
    ['default', 'large', 'compact', 'mobile', 'comparison'].includes(context.variant)
  );
}

/**
 * Gets responsive variant based on screen size or context
 */
export function getResponsivePriceVariant(
  screenSize: 'mobile' | 'tablet' | 'desktop',
  context: 'card' | 'table' | 'hero'
): PriceDisplayVariant {
  if (screenSize === 'mobile') {
    return 'mobile';
  }
  
  if (context === 'table') {
    return 'comparison';
  }
  
  if (context === 'hero') {
    return 'large';
  }
  
  return 'default';
}

/**
 * Generates price comparison data for multiple packages
 */
export function formatPriceComparison(
  packages: PricingPackage[],
  context: Omit<PriceDisplayContext, 'packageName' | 'variant'>
): Array<FormattedPriceDisplay & { packageId: string; packageName: string }> {
  return packages.map(pkg => ({
    packageId: pkg.id,
    packageName: pkg.name,
    ...formatPackagePriceDisplay(pkg, {
      ...context,
      variant: 'comparison',
    }),
  }));
}

/**
 * Utility to create structured data for price in JSON-LD format
 */
export function createPriceStructuredData(
  priceDisplay: FormattedPriceDisplay,
  packageName: string,
  packageDescription?: string
): object {
  const { structuredData } = priceDisplay;
  
  return {
    "@type": "Offer",
    "name": packageName,
    "description": packageDescription,
    "price": structuredData.price,
    "priceCurrency": structuredData.currency,
    "priceSpecification": structuredData.originalPrice ? {
      "@type": "PriceSpecification",
      "price": structuredData.price,
      "priceCurrency": structuredData.currency,
      "valueAddedTaxIncluded": true
    } : undefined,
    "discount": structuredData.discount,
    "availability": "https://schema.org/InStock",
    "validFrom": new Date().toISOString(),
  };
}

/**
 * Mobile-optimized price display with space constraints
 */
export function formatMobilePriceDisplay(
  priceInfo: PromotionalPriceInfo,
  currency: Currency = 'PLN',
  language: string = 'pl'
): {
  compact: string;
  full: FormattedPriceDisplay;
} {
  const context: PriceDisplayContext = {
    language,
    currency,
    variant: 'mobile',
  };

  const full = formatPriceDisplay(priceInfo, context);
  
  // Create ultra-compact version for very small screens
  let compact = full.mainPrice;
  if (priceInfo.hasPromotion && priceInfo.savingsPercentage > 0) {
    const percentage = Math.round(priceInfo.savingsPercentage);
    compact += ` (-${percentage}%)`;
  }

  return { compact, full };
}