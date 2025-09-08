/**
 * Comprehensive unit tests for pricing functionality
 * Phase 4.2: Testing pricing data, promotional logic, and utility functions
 * 
 * Tests cover:
 * - Pricing data structure validation
 * - Promotional pricing calculations
 * - Currency formatting utilities
 * - Type guards and validation functions
 * - JSON-LD structured data generation
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  PricingPackage,
  Promotion,
  PricingData,
  isPricingPackage,
  isPromotion,
  isPricingData,
  isValidISODate,
  isPromotionActive,
  calculateDiscountedPrice,
  getBestPromotion,
  examplePricingData
} from '@/types/pricing';

import {
  pricingData,
  getEnhancedPricingPackages,
  getPackagePromotion,
  calculatePackageSavings,
  getFormattedSavings,
  isPackageOnPromotion,
  getPackageById,
  getPackagesSortedByPrice,
  getRecommendedPackage,
  formatPrice,
  formatPriceShort,
  generateStructuredData,
  getFullPricingData
} from '@/data/pricing';

// Mock current date for consistent test results
const mockDate = new Date('2025-06-15T10:00:00.000Z');

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(mockDate);
});

describe('Pricing Data Structure', () => {
  describe('Type Guards', () => {
    it('should validate valid PricingPackage objects', () => {
      const validPackage: PricingPackage = {
        id: 'test',
        name: 'Test Package',
        basePrice: 1000,
        currentPrice: 800,
        currency: 'PLN',
        features: ['feature1', 'feature2'],
        limits: { pages: 5 },
        isPromoEligible: true,
        cta: 'order'
      };

      expect(isPricingPackage(validPackage)).toBe(true);
    });

    it('should reject invalid PricingPackage objects', () => {
      const invalidPackage = {
        id: 'test',
        name: 'Test Package',
        basePrice: 'invalid', // Should be number
        currentPrice: 800,
        currency: 'INVALID', // Should be valid currency
        features: ['feature1'],
        limits: {},
        isPromoEligible: true,
        cta: 'order'
      };

      expect(isPricingPackage(invalidPackage)).toBe(false);
    });

    it('should validate valid Promotion objects', () => {
      const validPromotion: Promotion = {
        id: 'test-promo',
        name: 'Test Promotion',
        discountPercentage: 25,
        applicablePackages: ['start'],
        validFrom: '2025-01-01T00:00:00.000Z',
        validTo: '2025-12-31T23:59:59.999Z',
        isActive: true
      };

      expect(isPromotion(validPromotion)).toBe(true);
    });

    it('should reject invalid Promotion objects', () => {
      const invalidPromotion = {
        id: 'test-promo',
        name: 'Test Promotion',
        discountPercentage: 150, // Invalid percentage > 100
        applicablePackages: ['start'],
        validFrom: '2025-01-01T00:00:00.000Z',
        validTo: '2025-12-31T23:59:59.999Z',
        isActive: true
      };

      expect(isPromotion(invalidPromotion)).toBe(false);
    });

    it('should validate complete PricingData structure', () => {
      expect(isPricingData(examplePricingData)).toBe(true);
      expect(isPricingData(pricingData)).toBe(true);
    });
  });

  describe('Date Validation', () => {
    it('should validate correct ISO 8601 date strings', () => {
      expect(isValidISODate('2025-01-01T00:00:00.000Z')).toBe(true);
      expect(isValidISODate('2025-12-31T23:59:59.999Z')).toBe(true);
    });

    it('should reject invalid date strings', () => {
      expect(isValidISODate('2025-01-01')).toBe(false);
      expect(isValidISODate('invalid-date')).toBe(false);
      expect(isValidISODate('2025-13-01T00:00:00.000Z')).toBe(false);
    });
  });
});

describe('Promotional Logic', () => {
  const testPackage: PricingPackage = {
    id: 'start',
    name: 'Start',
    basePrice: 2000,
    currentPrice: 2000,
    currency: 'PLN',
    features: [],
    limits: {},
    isPromoEligible: true,
    cta: 'order'
  };

  const activePromotion: Promotion = {
    id: 'new-client-launch',
    name: 'New Client Launch',
    discountPercentage: 70,
    applicablePackages: ['start'],
    validFrom: '2025-01-01T00:00:00.000Z',
    validTo: '2025-12-31T23:59:59.999Z',
    isActive: true,
    conditions: {
      customerType: 'new',
      maxUses: 100,
      currentUses: 50
    }
  };

  const expiredPromotion: Promotion = {
    ...activePromotion,
    id: 'expired-promo',
    validTo: '2025-01-01T00:00:00.000Z' // Expired
  };

  const inactivePromotion: Promotion = {
    ...activePromotion,
    id: 'inactive-promo',
    isActive: false
  };

  describe('Promotion Activity', () => {
    it('should identify active promotions correctly', () => {
      expect(isPromotionActive(activePromotion)).toBe(true);
    });

    it('should identify expired promotions', () => {
      expect(isPromotionActive(expiredPromotion)).toBe(false);
    });

    it('should identify inactive promotions', () => {
      expect(isPromotionActive(inactivePromotion)).toBe(false);
    });

    it('should handle promotion usage limits', () => {
      const maxedOutPromotion: Promotion = {
        ...activePromotion,
        conditions: {
          ...activePromotion.conditions,
          maxUses: 10,
          currentUses: 10
        }
      };

      expect(isPromotionActive(maxedOutPromotion)).toBe(false);
    });
  });

  describe('Price Calculations', () => {
    it('should calculate discounted price correctly', () => {
      const discountedPrice = calculateDiscountedPrice(testPackage, [activePromotion]);
      expect(discountedPrice).toBe(600); // 2000 * (1 - 0.7) = 600
    });

    it('should return original price when no promotions apply', () => {
      const nonEligiblePackage = { ...testPackage, isPromoEligible: false };
      const originalPrice = calculateDiscountedPrice(nonEligiblePackage, [activePromotion]);
      expect(originalPrice).toBe(2000);
    });

    it('should return original price when no active promotions', () => {
      const originalPrice = calculateDiscountedPrice(testPackage, [expiredPromotion]);
      expect(originalPrice).toBe(2000);
    });

    it('should apply the best available promotion', () => {
      const betterPromotion: Promotion = {
        ...activePromotion,
        id: 'better-promo',
        discountPercentage: 80
      };

      const discountedPrice = calculateDiscountedPrice(testPackage, [activePromotion, betterPromotion]);
      expect(discountedPrice).toBe(400); // 2000 * (1 - 0.8) = 400
    });
  });

  describe('Best Promotion Selection', () => {
    it('should return the best applicable promotion', () => {
      const promotion25 = { ...activePromotion, discountPercentage: 25, id: 'promo25' };
      const promotion50 = { ...activePromotion, discountPercentage: 50, id: 'promo50' };

      const bestPromo = getBestPromotion(testPackage, [promotion25, promotion50, activePromotion]);
      expect(bestPromo?.id).toBe('new-client-launch');
      expect(bestPromo?.discountPercentage).toBe(70);
    });

    it('should return null when no applicable promotions', () => {
      const nonApplicablePromo = {
        ...activePromotion,
        applicablePackages: ['other-package']
      };

      const result = getBestPromotion(testPackage, [nonApplicablePromo]);
      expect(result).toBeNull();
    });
  });
});

describe('Pricing Data Functions', () => {
  describe('Package Retrieval', () => {
    it('should retrieve package by ID', () => {
      const startPackage = getPackageById('start');
      expect(startPackage?.id).toBe('start');
      expect(startPackage?.name).toBe('Start');
    });

    it('should return undefined for non-existent package', () => {
      const nonExistentPackage = getPackageById('non-existent');
      expect(nonExistentPackage).toBeUndefined();
    });

    it('should get recommended package', () => {
      const recommended = getRecommendedPackage();
      expect(recommended?.recommended || recommended?.popular).toBe(true);
    });

    it('should sort packages by price', () => {
      const sortedPackages = getPackagesSortedByPrice();
      expect(sortedPackages[0].currentPrice).toBeLessThanOrEqual(sortedPackages[1].currentPrice);
    });
  });

  describe('Promotional Functions', () => {
    it('should calculate package savings correctly', () => {
      const savings = calculatePackageSavings('start');
      expect(savings).toBe(1400); // 2000 - 600 = 1400
    });

    it('should return zero savings for packages without promotions', () => {
      const savings = calculatePackageSavings('standard');
      expect(savings).toBe(0);
    });

    it('should format savings text correctly', () => {
      const savingsText = getFormattedSavings('start');
      expect(savingsText).toBe('Oszczędność 1400 PLN');
    });

    it('should return null for packages without savings', () => {
      const savingsText = getFormattedSavings('standard');
      expect(savingsText).toBeNull();
    });

    it('should detect promotional packages', () => {
      expect(isPackageOnPromotion('start')).toBe(true);
      expect(isPackageOnPromotion('standard')).toBe(false);
    });

    it('should get package promotion', () => {
      const promotion = getPackagePromotion('start');
      expect(promotion?.discountPercentage).toBe(70);
      expect(promotion?.name).toBe('New Client Launch');
    });
  });

  describe('Enhanced Package Data', () => {
    it('should return enhanced packages with calculated prices', () => {
      const enhancedPackages = getEnhancedPricingPackages();
      const startPackage = enhancedPackages.find(pkg => pkg.id === 'start');
      
      expect(startPackage?.currentPrice).toBe(600);
      expect(startPackage?.basePrice).toBe(2000);
    });

    it('should return full pricing data with structured data', () => {
      const fullData = getFullPricingData();
      
      expect(fullData.enhancedPackages).toBeDefined();
      expect(fullData.structuredData).toBeDefined();
      expect(fullData.structuredData['@context']).toBe('https://schema.org');
    });
  });
});

describe('Currency Formatting', () => {
  describe('formatPrice Function', () => {
    it('should format PLN currency correctly', () => {
      expect(formatPrice(1000, 'PLN')).toBe('1 000 zł');
      expect(formatPrice(600, 'PLN')).toBe('600 zł');
      expect(formatPrice(15000, 'PLN')).toBe('15 000 zł');
    });

    it('should handle decimal values', () => {
      expect(formatPrice(1234.56, 'PLN')).toBe('1 235 zł'); // Rounded to whole numbers
    });

    it('should use default PLN currency when not specified', () => {
      expect(formatPrice(1000)).toBe('1 000 zł');
    });
  });

  describe('formatPriceShort Function', () => {
    it('should format numbers with space thousands separator', () => {
      expect(formatPriceShort(1000)).toBe('1 000');
      expect(formatPriceShort(15000)).toBe('15 000');
      expect(formatPriceShort(600)).toBe('600');
    });
  });
});

describe('SEO Structured Data', () => {
  describe('JSON-LD Schema Generation', () => {
    it('should generate valid Schema.org structured data', () => {
      const structuredData = generateStructuredData();
      
      expect(structuredData['@context']).toBe('https://schema.org');
      expect(structuredData['@type']).toBe('Product');
      expect(structuredData.name).toBe('Professional Web Development Services');
      expect(structuredData.provider.name).toBe('Change Canvas');
      expect(Array.isArray(structuredData.offers)).toBe(true);
    });

    it('should include all packages as offers', () => {
      const structuredData = generateStructuredData();
      
      expect(structuredData.offers).toHaveLength(4); // start, standard, pro, enterprise
      
      const startOffer = structuredData.offers.find((offer: any) => offer.name === 'Start Package');
      expect(startOffer).toBeDefined();
      expect(startOffer.price).toBe(600); // Discounted price
    });

    it('should include proper pricing and currency information', () => {
      const structuredData = generateStructuredData();
      
      structuredData.offers.forEach((offer: any) => {
        expect(offer['@type']).toBe('Offer');
        expect(typeof offer.price).toBe('number');
        expect(offer.priceCurrency).toBe('PLN');
        expect(offer.availability).toBe('https://schema.org/InStock');
      });
    });

    it('should include valid dates for offers', () => {
      const structuredData = generateStructuredData();
      
      structuredData.offers.forEach((offer: any) => {
        expect(isValidISODate(offer.validFrom)).toBe(true);
        expect(isValidISODate(offer.validThrough)).toBe(true);
      });
    });
  });
});

describe('Data Integrity', () => {
  describe('Pricing Data Validation', () => {
    it('should have consistent package structure', () => {
      pricingData.packages.forEach(pkg => {
        expect(isPricingPackage(pkg)).toBe(true);
        expect(pkg.basePrice).toBeGreaterThan(0);
        expect(pkg.currentPrice).toBeGreaterThan(0);
        expect(pkg.currentPrice).toBeLessThanOrEqual(pkg.basePrice);
        expect(pkg.features.length).toBeGreaterThan(0);
      });
    });

    it('should have valid promotional data', () => {
      pricingData.activePromotions.forEach(promo => {
        expect(isPromotion(promo)).toBe(true);
        expect(promo.discountPercentage).toBeGreaterThan(0);
        expect(promo.discountPercentage).toBeLessThanOrEqual(100);
        expect(isValidISODate(promo.validFrom)).toBe(true);
        expect(isValidISODate(promo.validTo)).toBe(true);
      });
    });

    it('should have unique package IDs', () => {
      const packageIds = pricingData.packages.map(pkg => pkg.id);
      const uniqueIds = new Set(packageIds);
      expect(uniqueIds.size).toBe(packageIds.length);
    });

    it('should have unique promotion IDs', () => {
      const promotionIds = pricingData.activePromotions.map(promo => promo.id);
      const uniqueIds = new Set(promotionIds);
      expect(uniqueIds.size).toBe(promotionIds.length);
    });
  });

  describe('Business Logic Validation', () => {
    it('should have reasonable price ranges', () => {
      pricingData.packages.forEach(pkg => {
        expect(pkg.basePrice).toBeGreaterThanOrEqual(100); // Minimum reasonable price
        expect(pkg.basePrice).toBeLessThanOrEqual(50000); // Maximum reasonable price
      });
    });

    it('should have at least one popular or recommended package', () => {
      const hasPopularOrRecommended = pricingData.packages.some(
        pkg => pkg.popular || pkg.recommended
      );
      expect(hasPopularOrRecommended).toBe(true);
    });

    it('should have consistent feature progression', () => {
      // Start package should have fewer features than Standard, etc.
      const startPackage = getPackageById('start');
      const standardPackage = getPackageById('standard');
      
      if (startPackage && standardPackage) {
        expect(startPackage.features.length).toBeLessThanOrEqual(standardPackage.features.length);
        expect(startPackage.basePrice).toBeLessThan(standardPackage.basePrice);
      }
    });
  });
});

describe('Edge Cases and Error Handling', () => {
  it('should handle empty promotions array', () => {
    const testPackage = pricingData.packages[0];
    const price = calculateDiscountedPrice(testPackage, []);
    expect(price).toBe(testPackage.basePrice);
  });

  it('should handle non-eligible packages for promotions', () => {
    const nonEligiblePackage = {
      ...pricingData.packages[0],
      isPromoEligible: false
    };
    const price = calculateDiscountedPrice(nonEligiblePackage, pricingData.activePromotions);
    expect(price).toBe(nonEligiblePackage.basePrice);
  });

  it('should handle future promotions', () => {
    const futurePromotion: Promotion = {
      id: 'future-promo',
      name: 'Future Promotion',
      discountPercentage: 50,
      applicablePackages: ['start'],
      validFrom: '2026-01-01T00:00:00.000Z',
      validTo: '2026-12-31T23:59:59.999Z',
      isActive: true
    };

    expect(isPromotionActive(futurePromotion)).toBe(false);
  });

  it('should handle malformed pricing data gracefully', () => {
    const malformedData = {
      packages: [],
      activePromotions: [],
      defaultCurrency: 'INVALID'
    };

    expect(isPricingData(malformedData)).toBe(false);
  });
});