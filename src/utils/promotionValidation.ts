/**
 * Time-based promotion validation and eligibility logic
 * Phase 2.1: Advanced promotion validation system with real-time checks
 */

import { Promotion } from '@/types/pricing';
import { EnhancedPromotion } from '@/utils/promotions';

/**
 * Promotion validation result
 */
export interface PromotionValidationResult {
  isValid: boolean;
  isActive: boolean;
  isUpcoming: boolean;
  isExpired: boolean;
  timeRemaining?: number;
  timeUntilStart?: number;
  usageRemaining?: number;
  eligibilityIssues: string[];
}

/**
 * Time zone configuration for promotion validation
 */
export const PROMOTION_TIMEZONE = 'Europe/Warsaw'; // Poland timezone

/**
 * Get current time in promotion timezone
 */
export function getCurrentTimeInPromotionTimezone(): Date {
  return new Date();
}

/**
 * Comprehensive promotion validation
 */
export function validatePromotion(
  promotion: EnhancedPromotion,
  context?: {
    customerType?: 'new' | 'existing' | 'any';
    region?: string;
    orderValue?: number;
  }
): PromotionValidationResult {
  const now = getCurrentTimeInPromotionTimezone();
  const validFrom = new Date(promotion.validFrom);
  const validTo = new Date(promotion.validTo);
  const eligibilityIssues: string[] = [];

  // Check if promotion is manually disabled
  if (!promotion.isActive) {
    eligibilityIssues.push('Promotion is manually disabled');
  }

  // Check timing
  const isUpcoming = now < validFrom;
  const isExpired = now > validTo;
  const isInTimeRange = now >= validFrom && now <= validTo;

  if (isUpcoming) {
    eligibilityIssues.push('Promotion has not started yet');
  }

  if (isExpired) {
    eligibilityIssues.push('Promotion has expired');
  }

  // Calculate time remaining
  let timeRemaining: number | undefined;
  let timeUntilStart: number | undefined;

  if (isUpcoming) {
    timeUntilStart = validFrom.getTime() - now.getTime();
  } else if (isInTimeRange) {
    timeRemaining = validTo.getTime() - now.getTime();
  }

  // Check usage limits
  let usageRemaining: number | undefined;
  if (promotion.conditions?.maxUses) {
    const currentUses = promotion.conditions.currentUses || 0;
    const maxUses = promotion.conditions.maxUses;
    usageRemaining = maxUses - currentUses;

    if (currentUses >= maxUses) {
      eligibilityIssues.push('Promotion usage limit reached');
    }
  }

  // Check customer type restrictions
  if (context?.customerType && promotion.conditions?.customerType) {
    const requiredType = promotion.conditions.customerType;
    if (requiredType !== 'any' && context.customerType !== requiredType) {
      eligibilityIssues.push(`Only available for ${requiredType} customers`);
    }
  }

  // Check geographic restrictions
  if (context?.region && promotion.conditions?.allowedRegions) {
    const allowedRegions = promotion.conditions.allowedRegions;
    if (allowedRegions.length > 0 && !allowedRegions.includes(context.region)) {
      eligibilityIssues.push('Not available in your region');
    }
  }

  // Check minimum order value
  if (context?.orderValue && promotion.conditions?.minimumOrderValue) {
    const minValue = promotion.conditions.minimumOrderValue;
    if (context.orderValue < minValue) {
      eligibilityIssues.push(`Minimum order value: ${minValue} PLN required`);
    }
  }

  return {
    isValid: promotion.isActive && isInTimeRange && eligibilityIssues.length === 0,
    isActive: promotion.isActive && isInTimeRange,
    isUpcoming,
    isExpired,
    timeRemaining,
    timeUntilStart,
    usageRemaining,
    eligibilityIssues,
  };
}

/**
 * Check if a promotion is currently active
 */
export function isPromotionCurrentlyActive(promotion: EnhancedPromotion): boolean {
  const validation = validatePromotion(promotion);
  return validation.isActive && validation.isValid;
}

/**
 * Get active promotions from a list
 */
export function getActivePromotions(promotions: EnhancedPromotion[]): EnhancedPromotion[] {
  return promotions.filter(promotion => isPromotionCurrentlyActive(promotion));
}

/**
 * Sort promotions by priority and discount value
 */
export function sortPromotionsByValue(promotions: EnhancedPromotion[]): EnhancedPromotion[] {
  return promotions.sort((a, b) => {
    // First sort by priority (higher priority first)
    const priorityDiff = (b.priority || 0) - (a.priority || 0);
    if (priorityDiff !== 0) return priorityDiff;

    // Then by discount percentage (higher discount first)
    const discountDiff = b.discountPercentage - a.discountPercentage;
    if (discountDiff !== 0) return discountDiff;

    // Finally by fixed amount if applicable
    return (b.fixedAmount || 0) - (a.fixedAmount || 0);
  });
}

/**
 * Check promotion schedule conflicts
 */
export function hasPromotionConflicts(
  promotions: EnhancedPromotion[]
): {
  hasConflicts: boolean;
  conflicts: Array<{
    promotion1: EnhancedPromotion;
    promotion2: EnhancedPromotion;
    reason: string;
  }>;
} {
  const conflicts: Array<{
    promotion1: EnhancedPromotion;
    promotion2: EnhancedPromotion;
    reason: string;
  }> = [];

  for (let i = 0; i < promotions.length; i++) {
    for (let j = i + 1; j < promotions.length; j++) {
      const promo1 = promotions[i];
      const promo2 = promotions[j];

      // Check if they target the same packages
      const commonPackages = promo1.applicablePackages.filter(pkg => 
        promo2.applicablePackages.includes(pkg)
      );

      if (commonPackages.length > 0) {
        // Check time overlap
        const start1 = new Date(promo1.validFrom);
        const end1 = new Date(promo1.validTo);
        const start2 = new Date(promo2.validFrom);
        const end2 = new Date(promo2.validTo);

        const hasTimeOverlap = start1 <= end2 && start2 <= end1;

        if (hasTimeOverlap) {
          conflicts.push({
            promotion1: promo1,
            promotion2: promo2,
            reason: `Time overlap for packages: ${commonPackages.join(', ')}`
          });
        }
      }
    }
  }

  return {
    hasConflicts: conflicts.length > 0,
    conflicts,
  };
}

/**
 * Format time remaining for display
 */
export function formatTimeRemaining(milliseconds: number): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
} {
  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
  const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

  let formatted = '';
  
  if (days > 0) {
    formatted = `${days}d ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    formatted = `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    formatted = `${minutes}m ${seconds}s`;
  } else {
    formatted = `${seconds}s`;
  }

  return { days, hours, minutes, seconds, formatted };
}

/**
 * Generate urgency indicators based on time remaining
 */
export function generateUrgencyIndicators(timeRemaining: number): {
  level: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  color: 'green' | 'yellow' | 'orange' | 'red';
  shouldPulse: boolean;
} {
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days === 0 && hours <= 1) {
    return {
      level: 'critical',
      message: 'Kończy się za godzinę!',
      color: 'red',
      shouldPulse: true
    };
  } else if (days === 0 && hours <= 6) {
    return {
      level: 'high',
      message: `Zostało ${hours}h!`,
      color: 'red',
      shouldPulse: true
    };
  } else if (days === 0) {
    return {
      level: 'high',
      message: 'Ostatni dzień!',
      color: 'orange',
      shouldPulse: true
    };
  } else if (days <= 2) {
    return {
      level: 'medium',
      message: `Zostały ${days} dni!`,
      color: 'orange',
      shouldPulse: false
    };
  } else if (days <= 7) {
    return {
      level: 'low',
      message: `Kończy się za ${days} dni`,
      color: 'yellow',
      shouldPulse: false
    };
  } else {
    return {
      level: 'low',
      message: `Dostępne przez ${days} dni`,
      color: 'green',
      shouldPulse: false
    };
  }
}

/**
 * New Client Launch promotion specific validation
 */
export function validateNewClientLaunchPromotion(
  customerType: 'new' | 'existing' | 'any' = 'new'
): {
  isEligible: boolean;
  reason?: string;
  requirements?: string[];
} {
  if (customerType !== 'new') {
    return {
      isEligible: false,
      reason: 'This promotion is only available for new clients',
      requirements: ['Must be a new client', 'Applies only to Start package']
    };
  }

  return {
    isEligible: true
  };
}

/**
 * Real-time promotion monitoring
 */
export class PromotionMonitor {
  private callbacks: Array<(promotions: EnhancedPromotion[]) => void> = [];
  private interval: NodeJS.Timeout | null = null;
  private promotions: EnhancedPromotion[] = [];

  constructor(promotions: EnhancedPromotion[]) {
    this.promotions = promotions;
  }

  /**
   * Start monitoring promotions
   */
  start(intervalMs: number = 60000): void {
    this.interval = setInterval(() => {
      const activePromotions = getActivePromotions(this.promotions);
      this.callbacks.forEach(callback => callback(activePromotions));
    }, intervalMs);
  }

  /**
   * Stop monitoring
   */
  stop(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  /**
   * Subscribe to promotion updates
   */
  subscribe(callback: (promotions: EnhancedPromotion[]) => void): () => void {
    this.callbacks.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
    };
  }

  /**
   * Update promotions list
   */
  updatePromotions(promotions: EnhancedPromotion[]): void {
    this.promotions = promotions;
  }
}

export default {
  validatePromotion,
  isPromotionCurrentlyActive,
  getActivePromotions,
  sortPromotionsByValue,
  hasPromotionConflicts,
  formatTimeRemaining,
  generateUrgencyIndicators,
  validateNewClientLaunchPromotion,
  PromotionMonitor,
};