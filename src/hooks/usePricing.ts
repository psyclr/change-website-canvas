/**
 * usePricing React Hook - Enhanced promotional pricing logic
 * Phase 2.1: Complete pricing management with promotional calculations
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  PricingPackage, 
  Promotion, 
  PricingData 
} from '@/types/pricing';
import { 
  EnhancedPromotion, 
  PromotionEligibility,
  checkPromotionEligibility,
  findBestPromotion,
  calculateStackedPromotions,
  validatePromotionTiming,
  formatTimeRemaining,
  generateUrgencyMessage,
  NEW_CLIENT_LAUNCH_PROMOTION
} from '@/utils/promotions';
import { pricingData, getEnhancedPricingPackages } from '@/data/pricing';

/**
 * User context for promotion calculations
 */
export interface UserContext {
  /** Customer type for promotion eligibility */
  customerType?: 'new' | 'existing' | 'any';
  /** User's geographic region */
  region?: string;
  /** Applied promo code */
  promoCode?: string;
  /** Order quantity */
  quantity?: number;
}

/**
 * Enhanced package with promotion calculations
 */
export interface EnhancedPricingPackage extends PricingPackage {
  /** Applied promotion (if any) */
  appliedPromotion?: EnhancedPromotion;
  /** Promotion eligibility details */
  promotionEligibility?: PromotionEligibility;
  /** Original price before any discounts */
  originalPrice: number;
  /** Final calculated price */
  finalPrice: number;
  /** Total savings amount */
  savings: number;
  /** Formatted savings text */
  savingsText?: string;
  /** Promotion badge text */
  promotionBadge?: string;
  /** Urgency message */
  urgencyMessage?: string;
  /** Time remaining for promotion */
  timeRemaining?: number;
}

/**
 * Pricing hook return interface
 */
export interface UsePricingReturn {
  /** Enhanced packages with promotion calculations */
  packages: EnhancedPricingPackage[];
  /** Original pricing data */
  originalData: PricingData;
  /** Active promotions */
  activePromotions: EnhancedPromotion[];
  /** User context */
  userContext: UserContext;
  /** Update user context */
  updateUserContext: (context: Partial<UserContext>) => void;
  /** Get package by ID */
  getPackage: (id: string) => EnhancedPricingPackage | undefined;
  /** Check if any promotions are active */
  hasActivePromotions: boolean;
  /** Get best promotion for a package */
  getBestPromotionFor: (packageId: string) => {
    promotion: EnhancedPromotion | null;
    eligibility: PromotionEligibility | null;
  };
  /** Calculate custom pricing */
  calculateCustomPricing: (
    packageId: string, 
    customContext?: Partial<UserContext>
  ) => EnhancedPricingPackage | null;
  /** Refresh promotion data */
  refreshPromotions: () => void;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: string | null;
}

/**
 * Format currency for display
 */
const formatCurrency = (amount: number, currency: string = 'PLN'): string => {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Generate savings text
 */
const generateSavingsText = (savings: number, percentage: number): string | undefined => {
  if (savings <= 0) return undefined;
  
  return `Oszczędność ${formatCurrency(savings)} (-${percentage}%)`;
};

/**
 * Enhanced pricing hook with promotional logic
 */
export function usePricing(initialContext: UserContext = {}): UsePricingReturn {
  const [userContext, setUserContext] = useState<UserContext>({
    customerType: 'new', // Default to new customer for launch promotion
    region: 'PL',
    ...initialContext
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  // Enhanced promotions including the New Client Launch promotion
  const activePromotions = useMemo<EnhancedPromotion[]>(() => {
    const basePromotions = pricingData.activePromotions as EnhancedPromotion[];
    
    // Add the New Client Launch promotion
    return [
      ...basePromotions,
      NEW_CLIENT_LAUNCH_PROMOTION
    ].filter(promo => {
      const timing = validatePromotionTiming(promo);
      return timing.isValid && promo.isActive;
    });
  }, [lastRefresh]);

  // Calculate enhanced packages with promotion logic
  const packages = useMemo<EnhancedPricingPackage[]>(() => {
    const basePackages = getEnhancedPricingPackages();
    
    return basePackages.map(pkg => {
      const originalPrice = pkg.basePrice;
      
      // Find best applicable promotion
      const { promotion, eligibility } = findBestPromotion(
        pkg, 
        activePromotions, 
        userContext
      );

      const finalPrice = eligibility?.finalPrice || originalPrice;
      const savings = originalPrice - finalPrice;
      const savingsPercentage = savings > 0 ? Math.round((savings / originalPrice) * 100) : 0;

      // Generate promotion timing info
      let timeRemaining: number | undefined;
      let urgencyMessage: string | undefined;
      
      if (promotion) {
        const timing = validatePromotionTiming(promotion);
        timeRemaining = timing.timeRemaining;
        urgencyMessage = generateUrgencyMessage(promotion, timeRemaining);
      }

      const enhanced: EnhancedPricingPackage = {
        ...pkg,
        appliedPromotion: promotion || undefined,
        promotionEligibility: eligibility || undefined,
        originalPrice,
        finalPrice,
        savings,
        savingsText: generateSavingsText(savings, savingsPercentage),
        promotionBadge: promotion?.badgeText,
        urgencyMessage,
        timeRemaining,
        // Update current price to reflect promotion
        currentPrice: finalPrice
      };

      return enhanced;
    });
  }, [activePromotions, userContext, lastRefresh]);

  // Update user context
  const updateUserContext = useCallback((newContext: Partial<UserContext>) => {
    setUserContext(prev => ({ ...prev, ...newContext }));
  }, []);

  // Get package by ID
  const getPackage = useCallback((id: string): EnhancedPricingPackage | undefined => {
    return packages.find(pkg => pkg.id === id);
  }, [packages]);

  // Get best promotion for a specific package
  const getBestPromotionFor = useCallback((packageId: string) => {
    const pkg = packages.find(p => p.id === packageId);
    if (!pkg) {
      return { promotion: null, eligibility: null };
    }

    return findBestPromotion(pkg, activePromotions, userContext);
  }, [packages, activePromotions, userContext]);

  // Calculate custom pricing with different context
  const calculateCustomPricing = useCallback((
    packageId: string, 
    customContext: Partial<UserContext> = {}
  ): EnhancedPricingPackage | null => {
    const basePackage = pricingData.packages.find(p => p.id === packageId);
    if (!basePackage) return null;

    const context = { ...userContext, ...customContext };
    const { promotion, eligibility } = findBestPromotion(
      basePackage, 
      activePromotions, 
      context
    );

    const originalPrice = basePackage.basePrice;
    const finalPrice = eligibility?.finalPrice || originalPrice;
    const savings = originalPrice - finalPrice;
    const savingsPercentage = savings > 0 ? Math.round((savings / originalPrice) * 100) : 0;

    return {
      ...basePackage,
      appliedPromotion: promotion || undefined,
      promotionEligibility: eligibility || undefined,
      originalPrice,
      finalPrice,
      currentPrice: finalPrice,
      savings,
      savingsText: generateSavingsText(savings, savingsPercentage),
      promotionBadge: promotion?.badgeText,
    };
  }, [activePromotions, userContext]);

  // Refresh promotions
  const refreshPromotions = useCallback(() => {
    setLastRefresh(Date.now());
  }, []);

  // Auto-refresh promotions every minute to update timing
  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(Date.now());
    }, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  return {
    packages,
    originalData: pricingData,
    activePromotions,
    userContext,
    updateUserContext,
    getPackage,
    hasActivePromotions: activePromotions.length > 0,
    getBestPromotionFor,
    calculateCustomPricing,
    refreshPromotions,
    isLoading,
    error
  };
}

/**
 * Hook for specific package pricing
 */
export function usePackagePricing(
  packageId: string, 
  userContext: UserContext = {}
): {
  package: EnhancedPricingPackage | null;
  isOnPromotion: boolean;
  promotionDetails: {
    promotion: EnhancedPromotion | null;
    eligibility: PromotionEligibility | null;
    timeRemaining?: number;
    urgencyMessage?: string;
  };
  refreshPricing: () => void;
} {
  const pricing = usePricing(userContext);
  const packageData = pricing.getPackage(packageId);

  const promotionDetails = useMemo(() => {
    if (!packageData?.appliedPromotion) {
      return {
        promotion: null,
        eligibility: null,
      };
    }

    return {
      promotion: packageData.appliedPromotion,
      eligibility: packageData.promotionEligibility || null,
      timeRemaining: packageData.timeRemaining,
      urgencyMessage: packageData.urgencyMessage,
    };
  }, [packageData]);

  return {
    package: packageData || null,
    isOnPromotion: !!packageData?.appliedPromotion,
    promotionDetails,
    refreshPricing: pricing.refreshPromotions,
  };
}

/**
 * Hook for promotion countdown timer
 */
export function usePromotionTimer(promotion: EnhancedPromotion | null): {
  timeRemaining: number | null;
  formattedTime: string | null;
  isExpiring: boolean;
  isExpired: boolean;
} {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const timeRemaining = useMemo(() => {
    if (!promotion) return null;
    
    const endTime = new Date(promotion.validTo).getTime();
    const remaining = endTime - currentTime;
    
    return remaining > 0 ? remaining : 0;
  }, [promotion, currentTime]);

  const formattedTime = useMemo(() => {
    if (!timeRemaining) return null;
    return formatTimeRemaining(timeRemaining);
  }, [timeRemaining]);

  const isExpiring = timeRemaining !== null && timeRemaining < 24 * 60 * 60 * 1000; // Less than 24 hours
  const isExpired = timeRemaining === 0;

  return {
    timeRemaining,
    formattedTime,
    isExpiring,
    isExpired,
  };
}

export default usePricing;