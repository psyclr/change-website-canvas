/**
 * Currency formatting utilities for multi-language support
 * Provides proper formatting for PLN, USD, and EUR with locale-specific conventions
 */

import { Currency } from '@/types/pricing';

/**
 * Supported locales for currency formatting
 */
export type SupportedLocale = 'pl-PL' | 'en-US' | 'ru-RU';

/**
 * Currency formatting options
 */
export interface CurrencyFormatOptions {
  /** Currency code (PLN, USD, EUR) */
  currency: Currency;
  /** Locale for formatting (pl-PL, en-US, ru-RU) */
  locale: SupportedLocale;
  /** Whether to show decimal places */
  showDecimals?: boolean;
  /** Custom currency symbol override */
  customSymbol?: string;
  /** Minimum fraction digits */
  minimumFractionDigits?: number;
  /** Maximum fraction digits */
  maximumFractionDigits?: number;
}

/**
 * Polish formatting configuration for different currencies
 * Follows Polish localization standards
 */
const POLISH_CURRENCY_CONFIG = {
  PLN: {
    symbol: 'zł',
    placement: 'after', // "2 000 zł" 
    separator: ' ', // Space before currency
    thousandSeparator: ' ', // Space for thousands
  },
  USD: {
    symbol: '$',
    placement: 'after', // "2 000 $" in Polish context
    separator: ' ',
    thousandSeparator: ' ',
  },
  EUR: {
    symbol: '€',
    placement: 'after', // "2 000 €" in Polish context
    separator: ' ',
    thousandSeparator: ' ',
  },
} as const;

/**
 * Gets the appropriate locale based on user language preference
 */
export function getLocaleFromLanguage(language: string): SupportedLocale {
  switch (language) {
    case 'pl':
      return 'pl-PL';
    case 'ru':
      return 'ru-RU';
    case 'en':
    default:
      return 'en-US';
  }
}

/**
 * Custom Polish currency formatter that follows proper PLN conventions
 * Uses space separators and correct currency placement
 */
export function formatCurrencyPL(
  amount: number,
  currency: Currency = 'PLN',
  options?: Partial<CurrencyFormatOptions>
): string {
  const config = POLISH_CURRENCY_CONFIG[currency];
  
  // Format the number with Polish conventions (space as thousand separator)
  const formatter = new Intl.NumberFormat('pl-PL', {
    minimumFractionDigits: options?.minimumFractionDigits ?? 0,
    maximumFractionDigits: options?.maximumFractionDigits ?? 0,
    useGrouping: true,
  });
  
  const formattedNumber = formatter.format(amount);
  
  // Apply Polish currency placement conventions
  if (config.placement === 'after') {
    return `${formattedNumber}${config.separator}${options?.customSymbol || config.symbol}`;
  } else {
    return `${options?.customSymbol || config.symbol}${config.separator}${formattedNumber}`;
  }
}

/**
 * Standard Intl.NumberFormat currency formatter with locale support
 * Provides proper localization for different languages
 */
export function formatCurrency(
  amount: number,
  options: CurrencyFormatOptions
): string {
  const {
    currency,
    locale,
    showDecimals = false,
    minimumFractionDigits,
    maximumFractionDigits,
  } = options;

  // For Polish locale, use custom formatter for better PLN formatting
  if (locale === 'pl-PL' && currency === 'PLN') {
    return formatCurrencyPL(amount, currency, options);
  }

  // Use standard Intl.NumberFormat for other locales/currencies
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: minimumFractionDigits ?? (showDecimals ? 2 : 0),
    maximumFractionDigits: maximumFractionDigits ?? (showDecimals ? 2 : 0),
  });

  return formatter.format(amount);
}

/**
 * Simplified currency formatting function with smart defaults
 * Automatically detects locale and applies appropriate formatting
 */
export function formatPrice(
  amount: number,
  currency: Currency = 'PLN',
  language: string = 'pl'
): string {
  const locale = getLocaleFromLanguage(language);
  
  return formatCurrency(amount, {
    currency,
    locale,
    showDecimals: false,
  });
}

/**
 * Formats currency with compact notation for large amounts
 * E.g., 1000000 PLN becomes "1M zł"
 */
export function formatCurrencyCompact(
  amount: number,
  currency: Currency = 'PLN',
  language: string = 'pl'
): string {
  const locale = getLocaleFromLanguage(language);
  
  // For amounts under 10,000, use regular formatting
  if (amount < 10000) {
    return formatPrice(amount, currency, language);
  }
  
  // Use compact notation for larger amounts
  if (locale === 'pl-PL' && currency === 'PLN') {
    const formatter = new Intl.NumberFormat('pl-PL', {
      notation: 'compact',
      maximumFractionDigits: 1,
    });
    
    return `${formatter.format(amount)} zł`;
  }
  
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    notation: 'compact',
    maximumFractionDigits: 1,
  });

  return formatter.format(amount);
}

/**
 * Validates if a number can be safely formatted as currency
 */
export function isValidCurrencyAmount(amount: number): boolean {
  return (
    typeof amount === 'number' &&
    !isNaN(amount) &&
    isFinite(amount) &&
    amount >= 0
  );
}

/**
 * Calculates percentage savings and formats as text
 */
export function formatSavingsPercentage(
  originalPrice: number,
  discountedPrice: number,
  language: string = 'pl'
): string {
  if (!isValidCurrencyAmount(originalPrice) || !isValidCurrencyAmount(discountedPrice)) {
    return '';
  }
  
  const savings = ((originalPrice - discountedPrice) / originalPrice) * 100;
  
  if (savings <= 0) {
    return '';
  }
  
  // Format percentage based on language
  const formatter = new Intl.NumberFormat(getLocaleFromLanguage(language), {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  const formattedPercentage = formatter.format(savings / 100);
  
  // Return localized savings text
  switch (language) {
    case 'pl':
      return `-${formattedPercentage} zniżki`;
    case 'ru':
      return `-${formattedPercentage} скидка`;
    case 'en':
    default:
      return `-${formattedPercentage} off`;
  }
}

/**
 * Calculates absolute savings amount and formats as currency
 */
export function formatSavingsAmount(
  originalPrice: number,
  discountedPrice: number,
  currency: Currency = 'PLN',
  language: string = 'pl'
): string {
  if (!isValidCurrencyAmount(originalPrice) || !isValidCurrencyAmount(discountedPrice)) {
    return '';
  }
  
  const savings = originalPrice - discountedPrice;
  
  if (savings <= 0) {
    return '';
  }
  
  const formattedSavings = formatPrice(savings, currency, language);
  
  // Return localized savings text
  switch (language) {
    case 'pl':
      return `Oszczędzasz ${formattedSavings}`;
    case 'ru':
      return `Экономия ${formattedSavings}`;
    case 'en':
    default:
      return `Save ${formattedSavings}`;
  }
}

/**
 * Currency symbol utilities
 */
export const CURRENCY_SYMBOLS = {
  PLN: 'zł',
  USD: '$',
  EUR: '€',
} as const;

/**
 * Gets currency symbol for a given currency code
 */
export function getCurrencySymbol(currency: Currency): string {
  return CURRENCY_SYMBOLS[currency];
}

/**
 * Detects if amount should use compact notation based on size
 */
export function shouldUseCompactNotation(amount: number): boolean {
  return amount >= 10000;
}

/**
 * Type guard to check if a string is a valid currency code
 */
export function isValidCurrency(value: string): value is Currency {
  return ['PLN', 'USD', 'EUR'].includes(value);
}

/**
 * Type guard to check if a string is a valid locale
 */
export function isValidLocale(value: string): value is SupportedLocale {
  return ['pl-PL', 'en-US', 'ru-RU'].includes(value);
}