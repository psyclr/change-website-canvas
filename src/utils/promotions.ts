/**
 * Promotion calculation utilities for enhanced pricing logic
 * Phase 2.1: Advanced promotional pricing system with time-based validation
 */

import { 
  PricingPackage, 
  Promotion, 
  PromotionConditions,
  isPromotionActive 
} from '@/types/pricing';

/**
 * Enhanced promotion types for different discount strategies
 */
export type PromotionType = 'percentage' | 'fixed_amount' | 'buy_one_get_one' | 'tiered';

export interface EnhancedPromotion extends Promotion {
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
 * Promotion eligibility result
 */
export interface PromotionEligibility {
  /** Whether the promotion can be applied */
  isEligible: boolean;
  /** Reason for ineligibility (if applicable) */
  reason?: string;
  /** Additional requirements to meet */
  requirements?: string[];
  /** Calculated discount amount */
  discountAmount?: number;
  /** Final price after discount */
  finalPrice?: number;
}

/**
 * Time-based promotion validation with enhanced logic
 */
export function validatePromotionTiming(promotion: Promotion): {
  isValid: boolean;
  timeRemaining?: number;
  status: 'active' | 'upcoming' | 'expired' | 'inactive';
} {
  const now = new Date();
  const validFrom = new Date(promotion.validFrom);
  const validTo = new Date(promotion.validTo);

  if (!promotion.isActive) {
    return { isValid: false, status: 'inactive' };
  }

  if (now < validFrom) {
    const timeUntilStart = validFrom.getTime() - now.getTime();
    return { 
      isValid: false, 
      status: 'upcoming',
      timeRemaining: timeUntilStart
    };
  }

  if (now > validTo) {
    return { isValid: false, status: 'expired' };
  }

  const timeUntilEnd = validTo.getTime() - now.getTime();
  return { 
    isValid: true, 
    status: 'active',
    timeRemaining: timeUntilEnd
  };
}

/**
 * Check promotion usage limits
 */
export function validatePromotionUsage(promotion: Promotion): {
  canUse: boolean;
  usageRemaining?: number;
  isAtLimit: boolean;
} {
  const conditions = promotion.conditions;
  
  if (!conditions?.maxUses) {
    return { canUse: true, isAtLimit: false };
  }

  const currentUses = conditions.currentUses || 0;
  const maxUses = conditions.maxUses;
  const usageRemaining = maxUses - currentUses;

  return {
    canUse: currentUses < maxUses,
    usageRemaining,
    isAtLimit: currentUses >= maxUses
  };
}

/**
 * Validate geographic restrictions
 */
export function validatePromotionRegion(
  promotion: Promotion, 
  userRegion?: string
): boolean {
  const allowedRegions = promotion.conditions?.allowedRegions;
  
  if (!allowedRegions || allowedRegions.length === 0) {
    return true; // No restrictions
  }

  if (!userRegion) {
    return false; // Region required but not provided
  }

  return allowedRegions.includes(userRegion);
}

/**
 * Validate customer type eligibility
 */
export function validateCustomerType(
  promotion: Promotion,
  customerType?: 'new' | 'existing' | 'any'
): boolean {
  const requiredType = promotion.conditions?.customerType;
  
  if (!requiredType || requiredType === 'any') {
    return true;
  }

  return customerType === requiredType;
}

/**
 * Calculate discount amount based on promotion type
 */
export function calculateDiscountAmount(
  basePrice: number,
  promotion: EnhancedPromotion,
  quantity: number = 1
): number {
  const promotionType = promotion.promotionType || 'percentage';

  let discountAmount = 0;

  switch (promotionType) {
    case 'percentage':
      discountAmount = basePrice * (promotion.discountPercentage / 100);
      break;

    case 'fixed_amount':
      discountAmount = promotion.fixedAmount || 0;
      break;

    case 'tiered':
      if (quantity >= (promotion.minQuantity || 1)) {
        discountAmount = basePrice * (promotion.discountPercentage / 100);
      }
      break;

    case 'buy_one_get_one':
      if (quantity >= 2) {
        discountAmount = basePrice * Math.floor(quantity / 2);
      }
      break;

    default:
      discountAmount = basePrice * (promotion.discountPercentage / 100);
  }

  // Apply maximum discount cap if specified
  if (promotion.maxDiscountAmount) {
    discountAmount = Math.min(discountAmount, promotion.maxDiscountAmount);
  }

  return Math.round(discountAmount);
}

/**
 * Comprehensive promotion eligibility check
 */
export function checkPromotionEligibility(
  package_: PricingPackage,
  promotion: EnhancedPromotion,
  context: {
    customerType?: 'new' | 'existing' | 'any';
    userRegion?: string;
    quantity?: number;
    orderValue?: number;
    promoCode?: string;
  } = {}
): PromotionEligibility {
  const requirements: string[] = [];
  
  // Check if package is eligible for promotions
  if (!package_.isPromoEligible) {
    return {
      isEligible: false,
      reason: 'Package is not eligible for promotions',
    };
  }

  // Check if promotion applies to this package
  if (!promotion.applicablePackages.includes(package_.id)) {
    return {
      isEligible: false,
      reason: 'Promotion does not apply to this package',
    };
  }

  // Validate timing
  const timingValidation = validatePromotionTiming(promotion);
  if (!timingValidation.isValid) {
    let reason = 'Promotion is not active';
    if (timingValidation.status === 'upcoming') {
      reason = 'Promotion has not started yet';
    } else if (timingValidation.status === 'expired') {
      reason = 'Promotion has expired';
    }
    
    return {
      isEligible: false,
      reason,
    };
  }

  // Validate usage limits
  const usageValidation = validatePromotionUsage(promotion);
  if (!usageValidation.canUse) {
    return {
      isEligible: false,
      reason: 'Promotion usage limit reached',
    };
  }

  // Validate customer type
  if (!validateCustomerType(promotion, context.customerType)) {
    requirements.push(`Must be ${promotion.conditions?.customerType} customer`);
  }

  // Validate geographic restrictions
  if (!validatePromotionRegion(promotion, context.userRegion)) {
    requirements.push('Must be in eligible region');
  }

  // Validate minimum order value
  const minOrderValue = promotion.conditions?.minimumOrderValue;
  if (minOrderValue && (context.orderValue || package_.basePrice) < minOrderValue) {
    requirements.push(`Minimum order value: ${minOrderValue} PLN`);
  }

  // Validate promo code if required
  if (promotion.conditions?.promoCode && context.promoCode !== promotion.conditions.promoCode) {
    requirements.push('Valid promo code required');
  }

  // If there are unmet requirements, promotion is not eligible
  if (requirements.length > 0) {
    return {
      isEligible: false,
      reason: 'Requirements not met',
      requirements,
    };
  }

  // Calculate discount
  const quantity = context.quantity || 1;
  const discountAmount = calculateDiscountAmount(package_.basePrice, promotion, quantity);
  const finalPrice = Math.max(0, package_.basePrice - discountAmount);

  return {
    isEligible: true,
    discountAmount,
    finalPrice,
  };
}

/**
 * Find the best applicable promotion for a package
 */
export function findBestPromotion(
  package_: PricingPackage,
  promotions: EnhancedPromotion[],
  context: Parameters<typeof checkPromotionEligibility>[2] = {}
): {
  promotion: EnhancedPromotion | null;
  eligibility: PromotionEligibility | null;
} {
  let bestPromotion: EnhancedPromotion | null = null;
  let bestEligibility: PromotionEligibility | null = null;
  let highestDiscount = 0;

  for (const promotion of promotions) {
    const eligibility = checkPromotionEligibility(package_, promotion, context);
    
    if (eligibility.isEligible && (eligibility.discountAmount || 0) > highestDiscount) {
      bestPromotion = promotion;
      bestEligibility = eligibility;
      highestDiscount = eligibility.discountAmount || 0;
    }
  }

  return {
    promotion: bestPromotion,
    eligibility: bestEligibility,
  };
}

/**
 * Calculate multiple promotions with stacking logic
 */
export function calculateStackedPromotions(
  package_: PricingPackage,
  promotions: EnhancedPromotion[],
  context: Parameters<typeof checkPromotionEligibility>[2] = {},
  allowStacking: boolean = false
): {
  appliedPromotions: EnhancedPromotion[];
  totalDiscount: number;
  finalPrice: number;
  savings: number;
} {
  if (!allowStacking) {
    const { promotion, eligibility } = findBestPromotion(package_, promotions, context);
    
    return {
      appliedPromotions: promotion ? [promotion] : [],
      totalDiscount: eligibility?.discountAmount || 0,
      finalPrice: eligibility?.finalPrice || package_.basePrice,
      savings: eligibility?.discountAmount || 0,
    };
  }

  // Stacking logic (sort by priority, then apply sequentially)
  const eligiblePromotions = promotions
    .map(promo => ({
      promotion: promo,
      eligibility: checkPromotionEligibility(package_, promo, context)
    }))
    .filter(({ eligibility }) => eligibility.isEligible)
    .sort((a, b) => (b.promotion.priority || 0) - (a.promotion.priority || 0));

  let currentPrice = package_.basePrice;
  let totalDiscount = 0;
  const appliedPromotions: EnhancedPromotion[] = [];

  for (const { promotion } of eligiblePromotions) {
    const discountAmount = calculateDiscountAmount(currentPrice, promotion, context.quantity);
    
    if (discountAmount > 0) {
      appliedPromotions.push(promotion);
      totalDiscount += discountAmount;
      currentPrice = Math.max(0, currentPrice - discountAmount);
    }
  }

  return {
    appliedPromotions,
    totalDiscount,
    finalPrice: currentPrice,
    savings: totalDiscount,
  };
}

/**
 * Format time remaining for display
 */
export function formatTimeRemaining(milliseconds: number): string {
  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return `${days}d ${hours}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}

/**
 * Generate promotion urgency message
 */
export function generateUrgencyMessage(
  promotion: Promotion,
  timeRemaining?: number
): string | null {
  if (!timeRemaining) return null;

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days === 0 && hours <= 24) {
    return `Ostatnie ${hours}h! Nie przegap okazji!`;
  } else if (days <= 3) {
    return `Zostały tylko ${days} dni!`;
  } else if (days <= 7) {
    return `Oferta kończy się za ${days} dni`;
  }

  return null;
}

/**
 * New Client Launch promotion configuration
 * This is the specific -70% promotion mentioned in requirements
 */
export const NEW_CLIENT_LAUNCH_PROMOTION: EnhancedPromotion = {
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
    promoCode: undefined // Automatic application
  },
  promotionType: 'percentage',
  priority: 100,
  maxDiscountAmount: 1400 // 70% of 2000 PLN
};

/**
 * Export utility functions for easy access
 */
export const promotionUtils = {
  validateTiming: validatePromotionTiming,
  validateUsage: validatePromotionUsage,
  validateRegion: validatePromotionRegion,
  validateCustomerType: validateCustomerType,
  calculateDiscount: calculateDiscountAmount,
  checkEligibility: checkPromotionEligibility,
  findBest: findBestPromotion,
  calculateStacked: calculateStackedPromotions,
  formatTimeRemaining,
  generateUrgencyMessage,
};

export default promotionUtils;