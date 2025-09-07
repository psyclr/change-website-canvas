/**
 * Test suite for currency formatting utilities
 * Tests Polish PLN formatting conventions and multi-language support
 */

import {
  formatPrice,
  formatCurrency,
  formatCurrencyPL,
  formatSavingsPercentage,
  formatSavingsAmount,
  getLocaleFromLanguage,
  isValidCurrencyAmount,
  getCurrencySymbol,
  type CurrencyFormatOptions,
} from '../currency';

describe('Currency Formatting Utilities', () => {
  describe('formatCurrencyPL', () => {
    it('should format PLN with correct Polish conventions', () => {
      expect(formatCurrencyPL(2000)).toBe('2 000 zł');
      expect(formatCurrencyPL(600)).toBe('600 zł');
      expect(formatCurrencyPL(3500)).toBe('3 500 zł');
      expect(formatCurrencyPL(6000)).toBe('6 000 zł');
    });

    it('should handle large amounts correctly', () => {
      expect(formatCurrencyPL(100000)).toBe('100 000 zł');
      expect(formatCurrencyPL(1234567)).toBe('1 234 567 zł');
    });

    it('should handle decimals when specified', () => {
      expect(formatCurrencyPL(2000.50, 'PLN', { 
        maximumFractionDigits: 2, 
        minimumFractionDigits: 2 
      })).toBe('2 000,50 zł');
    });

    it('should support custom currency symbols', () => {
      expect(formatCurrencyPL(2000, 'PLN', { customSymbol: 'PLN' })).toBe('2 000 PLN');
    });
  });

  describe('formatPrice', () => {
    it('should format prices with proper localization', () => {
      expect(formatPrice(2000, 'PLN', 'pl')).toBe('2 000 zł');
      expect(formatPrice(2000, 'USD', 'en')).toMatch(/[$]2[, ]000/);
      expect(formatPrice(2000, 'EUR', 'en')).toMatch(/[€]2[, ]000/);
    });

    it('should handle different languages', () => {
      expect(formatPrice(2000, 'PLN', 'pl')).toBe('2 000 zł');
      expect(formatPrice(2000, 'PLN', 'ru')).toBe('2 000 zł');
      expect(formatPrice(2000, 'PLN', 'en')).toBe('2 000 zł');
    });
  });

  describe('formatSavingsPercentage', () => {
    it('should calculate and format savings percentage correctly', () => {
      expect(formatSavingsPercentage(2000, 600, 'pl')).toBe('-70% zniżki');
      expect(formatSavingsPercentage(3500, 3150, 'pl')).toBe('-10% zniżki');
      expect(formatSavingsPercentage(2000, 600, 'en')).toBe('-70% off');
      expect(formatSavingsPercentage(2000, 600, 'ru')).toBe('-70% скидка');
    });

    it('should return empty string for no savings', () => {
      expect(formatSavingsPercentage(2000, 2000, 'pl')).toBe('');
      expect(formatSavingsPercentage(2000, 2500, 'pl')).toBe('');
    });

    it('should handle invalid inputs gracefully', () => {
      expect(formatSavingsPercentage(NaN, 600, 'pl')).toBe('');
      expect(formatSavingsPercentage(2000, NaN, 'pl')).toBe('');
      expect(formatSavingsPercentage(-2000, 600, 'pl')).toBe('');
    });
  });

  describe('formatSavingsAmount', () => {
    it('should calculate and format savings amount correctly', () => {
      expect(formatSavingsAmount(2000, 600, 'PLN', 'pl')).toBe('Oszczędzasz 1 400 zł');
      expect(formatSavingsAmount(2000, 600, 'PLN', 'en')).toBe('Save 1 400 zł');
      expect(formatSavingsAmount(2000, 600, 'PLN', 'ru')).toBe('Экономия 1 400 zł');
    });

    it('should return empty string for no savings', () => {
      expect(formatSavingsAmount(2000, 2000, 'PLN', 'pl')).toBe('');
      expect(formatSavingsAmount(2000, 2500, 'PLN', 'pl')).toBe('');
    });
  });

  describe('getLocaleFromLanguage', () => {
    it('should map language codes to correct locales', () => {
      expect(getLocaleFromLanguage('pl')).toBe('pl-PL');
      expect(getLocaleFromLanguage('ru')).toBe('ru-RU');
      expect(getLocaleFromLanguage('en')).toBe('en-US');
      expect(getLocaleFromLanguage('unknown')).toBe('en-US');
    });
  });

  describe('isValidCurrencyAmount', () => {
    it('should validate currency amounts correctly', () => {
      expect(isValidCurrencyAmount(2000)).toBe(true);
      expect(isValidCurrencyAmount(0)).toBe(true);
      expect(isValidCurrencyAmount(2000.50)).toBe(true);
      
      expect(isValidCurrencyAmount(NaN)).toBe(false);
      expect(isValidCurrencyAmount(Infinity)).toBe(false);
      expect(isValidCurrencyAmount(-100)).toBe(false);
      expect(isValidCurrencyAmount('2000' as any)).toBe(false);
    });
  });

  describe('getCurrencySymbol', () => {
    it('should return correct currency symbols', () => {
      expect(getCurrencySymbol('PLN')).toBe('zł');
      expect(getCurrencySymbol('USD')).toBe('$');
      expect(getCurrencySymbol('EUR')).toBe('€');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero amounts', () => {
      expect(formatPrice(0, 'PLN', 'pl')).toBe('0 zł');
    });

    it('should handle very large amounts', () => {
      const largeAmount = 9999999;
      const result = formatPrice(largeAmount, 'PLN', 'pl');
      expect(result).toContain('zł');
      expect(result).toContain('9');
    });

    it('should handle decimal amounts consistently', () => {
      const result = formatCurrencyPL(1999.99, 'PLN', { 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0 
      });
      expect(result).toBe('2 000 zł'); // Should round to nearest integer
    });
  });

  describe('Polish Market Specific Tests', () => {
    it('should format Polish market pricing correctly', () => {
      // Test the exact prices from the requirements
      expect(formatPrice(600, 'PLN', 'pl')).toBe('600 zł');
      expect(formatPrice(2000, 'PLN', 'pl')).toBe('2 000 zł');
      expect(formatPrice(3500, 'PLN', 'pl')).toBe('3 500 zł');
      expect(formatPrice(6000, 'PLN', 'pl')).toBe('6 000 zł');
    });

    it('should calculate promotional pricing correctly', () => {
      // 70% discount from 2000 PLN to 600 PLN
      const savings = formatSavingsPercentage(2000, 600, 'pl');
      expect(savings).toBe('-70% zniżki');
      
      const savingsAmount = formatSavingsAmount(2000, 600, 'PLN', 'pl');
      expect(savingsAmount).toBe('Oszczędzasz 1 400 zł');
    });

    it('should use proper Polish thousand separators', () => {
      // Polish uses spaces as thousand separators, not commas
      const result = formatPrice(12345, 'PLN', 'pl');
      expect(result).toBe('12 345 zł');
      expect(result).not.toContain(',');
    });
  });
});