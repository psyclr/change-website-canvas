/**
 * Unit tests for currency formatting utilities
 * Tests comprehensive currency formatting functionality including:
 * - Multi-language support (Polish, English, Russian)
 * - Different currency types (PLN, USD, EUR)
 * - Edge cases and error handling
 * - Savings calculations
 * - Compact notation
 */

import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatCurrencyPL,
  formatPrice,
  formatCurrencyCompact,
  formatSavingsPercentage,
  formatSavingsAmount,
  isValidCurrencyAmount,
  getCurrencySymbol,
  getLocaleFromLanguage,
  shouldUseCompactNotation,
  isValidCurrency,
  isValidLocale,
  CURRENCY_SYMBOLS,
} from '@/utils/currency';

describe('Currency Formatting Utilities', () => {
  describe('Locale Detection', () => {
    it('should map language codes to correct locales', () => {
      expect(getLocaleFromLanguage('pl')).toBe('pl-PL');
      expect(getLocaleFromLanguage('en')).toBe('en-US');
      expect(getLocaleFromLanguage('ru')).toBe('ru-RU');
    });

    it('should default to en-US for unknown languages', () => {
      expect(getLocaleFromLanguage('fr')).toBe('en-US');
      expect(getLocaleFromLanguage('de')).toBe('en-US');
      expect(getLocaleFromLanguage('')).toBe('en-US');
    });
  });

  describe('Polish Currency Formatting', () => {
    it('should format PLN with proper Polish conventions', () => {
      expect(formatCurrencyPL(1000, 'PLN')).toBe('1 000 zł');
      expect(formatCurrencyPL(600, 'PLN')).toBe('600 zł');
      expect(formatCurrencyPL(15000, 'PLN')).toBe('15 000 zł');
    });

    it('should format USD and EUR with Polish conventions', () => {
      expect(formatCurrencyPL(1000, 'USD')).toBe('1 000 $');
      expect(formatCurrencyPL(1000, 'EUR')).toBe('1 000 €');
    });

    it('should handle decimal places when specified', () => {
      expect(formatCurrencyPL(1234.56, 'PLN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
        .toBe('1 234,56 zł');
    });

    it('should support custom currency symbols', () => {
      expect(formatCurrencyPL(1000, 'PLN', { customSymbol: 'PLN' }))
        .toBe('1 000 PLN');
    });
  });

  describe('Standard Currency Formatting', () => {
    it('should format currencies with different locales', () => {
      // Polish locale with PLN should use custom formatter
      expect(formatCurrency(1000, { currency: 'PLN', locale: 'pl-PL' }))
        .toBe('1 000 zł');

      // English locale with USD
      expect(formatCurrency(1000, { currency: 'USD', locale: 'en-US' }))
        .toBe('$1,000');
    });

    it('should respect showDecimals option', () => {
      expect(formatCurrency(1234.56, { 
        currency: 'USD', 
        locale: 'en-US', 
        showDecimals: true 
      })).toBe('$1,234.56');

      expect(formatCurrency(1234.56, { 
        currency: 'USD', 
        locale: 'en-US', 
        showDecimals: false 
      })).toBe('$1,235'); // Rounded
    });
  });

  describe('Simplified Price Formatting', () => {
    it('should format prices with smart defaults', () => {
      expect(formatPrice(1000, 'PLN', 'pl')).toBe('1 000 zł');
      expect(formatPrice(1000, 'USD', 'en')).toBe('$1,000');
      expect(formatPrice(1000)).toBe('1 000 zł'); // Default PLN in Polish
    });

    it('should handle different languages correctly', () => {
      expect(formatPrice(1500, 'PLN', 'pl')).toBe('1 500 zł');
      expect(formatPrice(1500, 'USD', 'en')).toBe('$1,500');
    });
  });

  describe('Compact Currency Formatting', () => {
    it('should use regular formatting for small amounts', () => {
      expect(formatCurrencyCompact(5000, 'PLN', 'pl')).toBe('5 000 zł');
      expect(formatCurrencyCompact(9999, 'PLN', 'pl')).toBe('9 999 zł');
    });

    it('should use compact notation for large amounts', () => {
      expect(formatCurrencyCompact(15000, 'PLN', 'pl')).toBe('15 tys. zł');
      expect(formatCurrencyCompact(1000000, 'PLN', 'pl')).toBe('1 mln zł');
    });

    it('should format compact amounts in different currencies', () => {
      expect(formatCurrencyCompact(50000, 'USD', 'en')).toBe('$50K');
      expect(formatCurrencyCompact(1000000, 'EUR', 'en')).toBe('€1M');
    });
  });

  describe('Savings Calculations', () => {
    describe('Percentage Savings', () => {
      it('should calculate and format percentage savings correctly', () => {
        expect(formatSavingsPercentage(2000, 600, 'pl')).toBe('-70% zniżki');
        expect(formatSavingsPercentage(1000, 750, 'pl')).toBe('-25% zniżki');
      });

      it('should format percentage in different languages', () => {
        expect(formatSavingsPercentage(1000, 500, 'en')).toBe('-50% off');
        expect(formatSavingsPercentage(1000, 500, 'ru')).toBe('-50% скидка');
      });

      it('should return empty string for invalid inputs', () => {
        expect(formatSavingsPercentage(1000, 1200, 'pl')).toBe(''); // No savings
        expect(formatSavingsPercentage(-100, 50, 'pl')).toBe(''); // Invalid original price
        expect(formatSavingsPercentage(100, -50, 'pl')).toBe(''); // Invalid discounted price
      });
    });

    describe('Amount Savings', () => {
      it('should calculate and format amount savings correctly', () => {
        expect(formatSavingsAmount(2000, 600, 'PLN', 'pl')).toBe('Oszczędzasz 1 400 zł');
        expect(formatSavingsAmount(1000, 750, 'PLN', 'pl')).toBe('Oszczędzasz 250 zł');
      });

      it('should format savings in different languages and currencies', () => {
        expect(formatSavingsAmount(1000, 500, 'USD', 'en')).toBe('Save $500');
        expect(formatSavingsAmount(1000, 500, 'EUR', 'ru')).toBe('Экономия €500');
      });

      it('should return empty string for invalid inputs', () => {
        expect(formatSavingsAmount(1000, 1200, 'PLN', 'pl')).toBe(''); // No savings
        expect(formatSavingsAmount(NaN, 500, 'PLN', 'pl')).toBe(''); // Invalid price
      });
    });
  });

  describe('Validation Functions', () => {
    describe('Currency Amount Validation', () => {
      it('should validate correct currency amounts', () => {
        expect(isValidCurrencyAmount(1000)).toBe(true);
        expect(isValidCurrencyAmount(0)).toBe(true);
        expect(isValidCurrencyAmount(1.99)).toBe(true);
      });

      it('should reject invalid currency amounts', () => {
        expect(isValidCurrencyAmount(-100)).toBe(false); // Negative
        expect(isValidCurrencyAmount(NaN)).toBe(false);
        expect(isValidCurrencyAmount(Infinity)).toBe(false);
        expect(isValidCurrencyAmount('1000' as any)).toBe(false); // String
      });
    });

    describe('Currency Code Validation', () => {
      it('should validate supported currency codes', () => {
        expect(isValidCurrency('PLN')).toBe(true);
        expect(isValidCurrency('USD')).toBe(true);
        expect(isValidCurrency('EUR')).toBe(true);
      });

      it('should reject unsupported currency codes', () => {
        expect(isValidCurrency('GBP')).toBe(false);
        expect(isValidCurrency('JPY')).toBe(false);
        expect(isValidCurrency('invalid')).toBe(false);
        expect(isValidCurrency('')).toBe(false);
      });
    });

    describe('Locale Validation', () => {
      it('should validate supported locales', () => {
        expect(isValidLocale('pl-PL')).toBe(true);
        expect(isValidLocale('en-US')).toBe(true);
        expect(isValidLocale('ru-RU')).toBe(true);
      });

      it('should reject unsupported locales', () => {
        expect(isValidLocale('fr-FR')).toBe(false);
        expect(isValidLocale('de-DE')).toBe(false);
        expect(isValidLocale('invalid')).toBe(false);
      });
    });
  });

  describe('Utility Functions', () => {
    describe('Currency Symbol Utilities', () => {
      it('should return correct currency symbols', () => {
        expect(getCurrencySymbol('PLN')).toBe('zł');
        expect(getCurrencySymbol('USD')).toBe('$');
        expect(getCurrencySymbol('EUR')).toBe('€');
      });

      it('should have correct currency symbols constant', () => {
        expect(CURRENCY_SYMBOLS.PLN).toBe('zł');
        expect(CURRENCY_SYMBOLS.USD).toBe('$');
        expect(CURRENCY_SYMBOLS.EUR).toBe('€');
      });
    });

    describe('Compact Notation Detection', () => {
      it('should correctly identify when to use compact notation', () => {
        expect(shouldUseCompactNotation(5000)).toBe(false);
        expect(shouldUseCompactNotation(9999)).toBe(false);
        expect(shouldUseCompactNotation(10000)).toBe(true);
        expect(shouldUseCompactNotation(50000)).toBe(true);
      });
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle zero values correctly', () => {
      expect(formatPrice(0, 'PLN', 'pl')).toBe('0 zł');
      expect(formatSavingsAmount(100, 100, 'PLN', 'pl')).toBe(''); // No savings
    });

    it('should handle very large numbers', () => {
      expect(formatCurrencyCompact(999999999, 'PLN', 'pl')).toContain('mld'); // Polish billions
      expect(formatCurrencyCompact(1000000000, 'USD', 'en')).toBe('$1B');
    });

    it('should handle very small decimal amounts', () => {
      expect(formatPrice(0.01, 'PLN', 'pl')).toBe('0 zł'); // Rounded to whole numbers
      expect(formatCurrencyPL(0.99, 'PLN')).toBe('1 zł'); // Rounded up
    });

    it('should handle floating point precision issues', () => {
      const amount = 0.1 + 0.2; // This equals 0.30000000000000004 in JS
      expect(formatPrice(amount, 'PLN', 'pl')).toBe('0 zł'); // Should handle gracefully
    });

    it('should handle missing parameters gracefully', () => {
      expect(formatPrice(1000)).toBe('1 000 zł'); // Uses defaults
      expect(formatCurrencyPL(1000)).toBe('1 000 zł'); // Uses PLN default
    });
  });

  describe('Localization Consistency', () => {
    const testAmount = 1234.56;
    
    it('should maintain consistent formatting across Polish functions', () => {
      const standardPL = formatPrice(testAmount, 'PLN', 'pl');
      const customPL = formatCurrencyPL(testAmount, 'PLN');
      
      // Both should use similar formatting (space separators, zł symbol)
      expect(standardPL).toContain('zł');
      expect(customPL).toContain('zł');
      expect(standardPL).toContain(' ');
      expect(customPL).toContain(' ');
    });

    it('should handle multi-language pricing consistently', () => {
      const polishPrice = formatPrice(testAmount, 'PLN', 'pl');
      const englishPrice = formatPrice(testAmount, 'USD', 'en');
      const russianPrice = formatPrice(testAmount, 'EUR', 'ru');
      
      // Each should be properly formatted for their locale
      expect(polishPrice).toBe('1 235 zł');
      expect(englishPrice).toBe('$1,235');
      expect(russianPrice).toBe('1 235 €'); // Russian uses space separators too
    });
  });

  describe('Business Logic Integration', () => {
    it('should correctly calculate promotional savings', () => {
      const originalPrice = 2000;
      const promotionalPrice = 600;
      
      const percentageSavings = formatSavingsPercentage(originalPrice, promotionalPrice, 'pl');
      const amountSavings = formatSavingsAmount(originalPrice, promotionalPrice, 'PLN', 'pl');
      
      expect(percentageSavings).toBe('-70% zniżki');
      expect(amountSavings).toBe('Oszczędzasz 1 400 zł');
    });

    it('should handle pricing tier comparisons', () => {
      const prices = [600, 3500, 6000, 15000];
      const formattedPrices = prices.map(price => formatPrice(price, 'PLN', 'pl'));
      
      expect(formattedPrices).toEqual([
        '600 zł',
        '3 500 zł', 
        '6 000 zł',
        '15 000 zł'
      ]);
    });

    it('should format compact prices for marketing displays', () => {
      const marketingPrices = [50000, 100000, 500000];
      const compactPrices = marketingPrices.map(price => 
        formatCurrencyCompact(price, 'PLN', 'pl')
      );
      
      expect(compactPrices).toEqual([
        '50 tys. zł',
        '100 tys. zł',
        '500 tys. zł'
      ]);
    });
  });
});