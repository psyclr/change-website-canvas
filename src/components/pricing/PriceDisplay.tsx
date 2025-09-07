/**
 * Accessible price display components with promotional pricing support
 * Provides proper screen reader support and responsive design
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { 
  formatPriceDisplay, 
  calculatePromotionalPrice,
  type PriceDisplayVariant,
  type PromotionalPriceInfo,
  type PriceDisplayContext 
} from '@/utils/priceDisplay';
import { Currency } from '@/types/pricing';

/**
 * Props for the main PriceDisplay component
 */
export interface PriceDisplayProps {
  /** Current/discounted price */
  price: number;
  /** Original price (if promotional) */
  originalPrice?: number;
  /** Currency code */
  currency?: Currency;
  /** Display variant */
  variant?: PriceDisplayVariant;
  /** Package name for context */
  packageName?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether this is the primary price on the page */
  isPrimary?: boolean;
  /** Custom accessibility label */
  accessibilityLabel?: string;
  /** Show savings information */
  showSavings?: boolean;
  /** Custom promotion information */
  promotionInfo?: {
    discountPercentage?: number;
    badgeText?: string;
    urgencyText?: string;
  };
}

/**
 * Main accessible price display component
 */
export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  originalPrice,
  currency = 'PLN',
  variant = 'default',
  packageName,
  className,
  isPrimary = false,
  accessibilityLabel,
  showSavings = true,
  promotionInfo,
}) => {
  const { i18n } = useTranslation();
  const language = i18n.language || 'pl';

  // Calculate promotional price information
  const priceInfo: PromotionalPriceInfo = calculatePromotionalPrice(
    originalPrice || price,
    price,
    promotionInfo ? {
      id: 'display-promo',
      name: 'Display Promotion',
      discountPercentage: promotionInfo.discountPercentage || 0,
      applicablePackages: [],
      validFrom: '',
      validTo: '',
      isActive: true,
    } : undefined
  );

  // Create display context
  const context: PriceDisplayContext = {
    language,
    currency,
    variant,
    isPrimary,
    packageName,
    accessibilityLabel,
  };

  // Format the price display
  const formatted = formatPriceDisplay(priceInfo, context);

  return (
    <div 
      className={cn(formatted.cssClasses.container, className)}
      role={isPrimary ? 'main' : undefined}
      aria-label={formatted.accessibilityText}
    >
      {/* Main Price */}
      <div className={formatted.cssClasses.mainPrice}>
        <span 
          className="sr-only"
          aria-live={isPrimary ? 'polite' : undefined}
        >
          {formatted.accessibilityText}
        </span>
        <span aria-hidden="true">
          {formatted.mainPrice}
        </span>
      </div>

      {/* Original Price (Strikethrough) */}
      {formatted.originalPrice && (
        <div className={formatted.cssClasses.originalPrice}>
          <span className="sr-only">
            {language === 'pl' ? 'Cena pierwotna: ' : 
             language === 'ru' ? 'Первоначальная цена: ' : 
             'Original price: '}
          </span>
          <span aria-hidden="true">
            {formatted.originalPrice}
          </span>
        </div>
      )}

      {/* Savings Information */}
      {formatted.savingsText && showSavings && (
        <div className={formatted.cssClasses.savings}>
          <span className="sr-only">
            {language === 'pl' ? 'Oszczędność: ' : 
             language === 'ru' ? 'Экономия: ' : 
             'Savings: '}
          </span>
          <span aria-hidden="true">
            {formatted.savingsText}
          </span>
        </div>
      )}

      {/* Structured Data for SEO */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Offer",
            "price": formatted.structuredData.price,
            "priceCurrency": formatted.structuredData.currency,
            ...(formatted.structuredData.originalPrice && {
              "priceSpecification": {
                "@type": "PriceSpecification",
                "price": formatted.structuredData.price,
                "priceCurrency": formatted.structuredData.currency,
                "previousPrice": formatted.structuredData.originalPrice
              }
            })
          })
        }}
      />
    </div>
  );
};

/**
 * Compact price display for mobile or tight spaces
 */
export const CompactPriceDisplay: React.FC<Omit<PriceDisplayProps, 'variant'>> = (props) => (
  <PriceDisplay {...props} variant="compact" />
);

/**
 * Large price display for hero sections or prominent placements
 */
export const LargePriceDisplay: React.FC<Omit<PriceDisplayProps, 'variant'>> = (props) => (
  <PriceDisplay {...props} variant="large" />
);

/**
 * Mobile-optimized price display
 */
export const MobilePriceDisplay: React.FC<Omit<PriceDisplayProps, 'variant'>> = (props) => (
  <PriceDisplay {...props} variant="mobile" />
);

/**
 * Props for promotional price badge
 */
export interface PromotionalPriceBadgeProps {
  /** Original price */
  originalPrice: number;
  /** Discounted price */
  discountedPrice: number;
  /** Currency code */
  currency?: Currency;
  /** Badge position */
  position?: 'top-left' | 'top-right' | 'top-center';
  /** Badge size */
  size?: 'sm' | 'md' | 'lg';
  /** Custom CSS classes */
  className?: string;
  /** Show percentage or amount saved */
  savingsDisplay?: 'percentage' | 'amount' | 'both';
}

/**
 * Promotional price badge component
 */
export const PromotionalPriceBadge: React.FC<PromotionalPriceBadgeProps> = ({
  originalPrice,
  discountedPrice,
  currency = 'PLN',
  position = 'top-right',
  size = 'md',
  className,
  savingsDisplay = 'percentage',
}) => {
  const { i18n } = useTranslation();
  const language = i18n.language || 'pl';

  const savingsAmount = originalPrice - discountedPrice;
  const savingsPercentage = Math.round((savingsAmount / originalPrice) * 100);

  if (savingsAmount <= 0) return null;

  const positionClasses = {
    'top-left': 'absolute -top-2 -left-2',
    'top-right': 'absolute -top-2 -right-2',
    'top-center': 'absolute -top-2 left-1/2 transform -translate-x-1/2',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  let badgeText = '';
  switch (savingsDisplay) {
    case 'percentage':
      badgeText = `-${savingsPercentage}%`;
      break;
    case 'amount':
      badgeText = language === 'pl' ? `-${savingsAmount} zł` : 
                 language === 'ru' ? `-${savingsAmount} ₽` : 
                 `-$${savingsAmount}`;
      break;
    case 'both':
      badgeText = `-${savingsPercentage}%`;
      break;
  }

  const accessibilityText = language === 'pl' 
    ? `${savingsPercentage}% zniżki` 
    : language === 'ru' 
    ? `Скидка ${savingsPercentage}%` 
    : `${savingsPercentage}% off`;

  return (
    <div 
      className={cn(
        'bg-red-500 text-white font-bold rounded-full z-10',
        'shadow-lg border-2 border-white',
        positionClasses[position],
        sizeClasses[size],
        className
      )}
      role="img"
      aria-label={accessibilityText}
    >
      {badgeText}
    </div>
  );
};

/**
 * Props for price comparison display
 */
export interface PriceComparisonProps {
  /** Prices to compare */
  prices: Array<{
    label: string;
    price: number;
    originalPrice?: number;
    highlight?: boolean;
  }>;
  /** Currency code */
  currency?: Currency;
  /** Layout orientation */
  layout?: 'horizontal' | 'vertical';
  /** Custom CSS classes */
  className?: string;
}

/**
 * Price comparison component for displaying multiple price options
 */
export const PriceComparison: React.FC<PriceComparisonProps> = ({
  prices,
  currency = 'PLN',
  layout = 'horizontal',
  className,
}) => {
  const layoutClasses = layout === 'horizontal' 
    ? 'flex flex-row gap-4 justify-center items-baseline'
    : 'flex flex-col gap-2';

  return (
    <div className={cn('price-comparison', layoutClasses, className)}>
      {prices.map((priceItem, index) => (
        <div 
          key={index}
          className={cn(
            'price-comparison-item',
            priceItem.highlight && 'highlight'
          )}
        >
          <div className="text-sm text-gray-600 mb-1">
            {priceItem.label}
          </div>
          <PriceDisplay
            price={priceItem.price}
            originalPrice={priceItem.originalPrice}
            currency={currency}
            variant="comparison"
            className={priceItem.highlight ? 'text-accent' : ''}
          />
        </div>
      ))}
    </div>
  );
};

/**
 * Responsive price display that adapts to screen size
 */
export const ResponsivePriceDisplay: React.FC<PriceDisplayProps> = (props) => {
  return (
    <>
      {/* Desktop and tablet */}
      <div className="hidden sm:block">
        <PriceDisplay {...props} variant="default" />
      </div>
      
      {/* Mobile */}
      <div className="block sm:hidden">
        <PriceDisplay {...props} variant="mobile" />
      </div>
    </>
  );
};

/**
 * Hook for managing price display state and formatting
 */
export function usePriceDisplay(
  price: number,
  originalPrice?: number,
  currency: Currency = 'PLN'
) {
  const { i18n } = useTranslation();
  const language = i18n.language || 'pl';

  const priceInfo = calculatePromotionalPrice(
    originalPrice || price,
    price
  );

  const hasPromotion = priceInfo.hasPromotion;
  const savingsPercentage = Math.round(priceInfo.savingsPercentage);
  const savingsAmount = priceInfo.savingsAmount;

  return {
    priceInfo,
    hasPromotion,
    savingsPercentage,
    savingsAmount,
    language,
    formatPrice: (amount: number) => 
      formatPriceDisplay(
        calculatePromotionalPrice(amount, amount),
        { language, currency, variant: 'default' }
      ).mainPrice,
  };
}