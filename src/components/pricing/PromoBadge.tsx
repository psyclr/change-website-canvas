/**
 * PromoBadge Component - Promotional badge display for pricing packages
 * Phase 2.1: Enhanced promotional display with animations and urgency indicators
 */

import React from 'react';
import { 
  Clock, 
  Zap, 
  Percent, 
  Star, 
  Gift, 
  AlertCircle,
  Timer
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { EnhancedPromotion } from '@/utils/promotions';
import { usePromotionTimer } from '@/hooks/usePricing';

/**
 * Badge variant types
 */
export type BadgeVariant = 
  | 'discount' 
  | 'popular' 
  | 'limited' 
  | 'urgent' 
  | 'new' 
  | 'exclusive'
  | 'countdown';

/**
 * Badge position options
 */
export type BadgePosition = 
  | 'top-left' 
  | 'top-right' 
  | 'top-center' 
  | 'bottom-left' 
  | 'bottom-right'
  | 'corner-ribbon';

/**
 * PromoBadge component props
 */
export interface PromoBadgeProps {
  /** Promotion data */
  promotion?: EnhancedPromotion | null;
  /** Badge text override */
  text?: string;
  /** Badge variant style */
  variant?: BadgeVariant;
  /** Badge position */
  position?: BadgePosition;
  /** Custom className */
  className?: string;
  /** Size modifier */
  size?: 'sm' | 'md' | 'lg';
  /** Enable pulsing animation */
  animated?: boolean;
  /** Show countdown timer */
  showCountdown?: boolean;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
}

/**
 * Get badge icon based on variant
 */
const getBadgeIcon = (variant: BadgeVariant, promotion?: EnhancedPromotion | null): React.ReactNode => {
  switch (variant) {
    case 'discount':
      return <Percent className="h-3 w-3" />;
    case 'popular':
      return <Star className="h-3 w-3" />;
    case 'limited':
      return <AlertCircle className="h-3 w-3" />;
    case 'urgent':
      return <Zap className="h-3 w-3" />;
    case 'new':
      return <Gift className="h-3 w-3" />;
    case 'countdown':
      return <Timer className="h-3 w-3" />;
    case 'exclusive':
      return <Star className="h-3 w-3 fill-current" />;
    default:
      return <Percent className="h-3 w-3" />;
  }
};

/**
 * Get badge colors based on variant
 */
const getBadgeColors = (variant: BadgeVariant): string => {
  switch (variant) {
    case 'discount':
      return 'bg-red-500 text-white border-red-600';
    case 'popular':
      return 'bg-amber-500 text-white border-amber-600';
    case 'limited':
      return 'bg-orange-500 text-white border-orange-600';
    case 'urgent':
      return 'bg-red-600 text-white border-red-700 animate-pulse';
    case 'new':
      return 'bg-emerald-500 text-white border-emerald-600';
    case 'exclusive':
      return 'bg-purple-500 text-white border-purple-600';
    case 'countdown':
      return 'bg-blue-500 text-white border-blue-600';
    default:
      return 'bg-accent text-white border-accent-dark';
  }
};

/**
 * Get badge position classes
 */
const getPositionClasses = (position: BadgePosition): string => {
  switch (position) {
    case 'top-left':
      return 'absolute -top-3 -left-3 z-10';
    case 'top-right':
      return 'absolute -top-3 -right-3 z-10';
    case 'top-center':
      return 'absolute -top-4 left-1/2 -translate-x-1/2 z-10';
    case 'bottom-left':
      return 'absolute -bottom-3 -left-3 z-10';
    case 'bottom-right':
      return 'absolute -bottom-3 -right-3 z-10';
    case 'corner-ribbon':
      return 'absolute top-0 right-0 z-10 transform translate-x-3 -translate-y-3 rotate-12';
    default:
      return 'absolute -top-4 left-1/2 -translate-x-1/2 z-10';
  }
};

/**
 * Get size classes
 */
const getSizeClasses = (size: 'sm' | 'md' | 'lg'): string => {
  switch (size) {
    case 'sm':
      return 'px-2 py-1 text-xs';
    case 'lg':
      return 'px-4 py-2 text-base';
    default:
      return 'px-3 py-1 text-sm';
  }
};

/**
 * CountdownTimer component for time-sensitive promotions
 */
const CountdownTimer: React.FC<{ promotion: EnhancedPromotion }> = ({ promotion }) => {
  const { formattedTime, isExpiring, isExpired } = usePromotionTimer(promotion);

  if (isExpired || !formattedTime) {
    return null;
  }

  return (
    <div className={cn(
      "flex items-center gap-1 text-xs",
      isExpiring && "text-red-200 animate-pulse"
    )}>
      <Clock className="h-3 w-3" />
      <span>{formattedTime}</span>
    </div>
  );
};

/**
 * PromoBadge component
 */
export const PromoBadge: React.FC<PromoBadgeProps> = ({
  promotion,
  text,
  variant = 'discount',
  position = 'top-center',
  className,
  size = 'md',
  animated = false,
  showCountdown = false,
  icon,
  onClick,
}) => {
  // Don't render if no promotion and no custom text
  if (!promotion && !text) {
    return null;
  }

  const displayText = text || promotion?.badgeText || `${promotion?.discountPercentage}% OFF`;
  const badgeIcon = icon || getBadgeIcon(variant, promotion);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-full border-2 shadow-lg",
        "transition-all duration-200 hover:scale-105",
        getBadgeColors(variant),
        getSizeClasses(size),
        getPositionClasses(position),
        animated && "animate-bounce",
        onClick && "cursor-pointer hover:shadow-xl",
        className
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {badgeIcon}
      <span className="font-bold">{displayText}</span>
      
      {showCountdown && promotion && (
        <CountdownTimer promotion={promotion} />
      )}
    </div>
  );
};

/**
 * DiscountBadge - Specialized component for discount promotions
 */
export const DiscountBadge: React.FC<{
  discountPercentage: number;
  position?: BadgePosition;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}> = ({ discountPercentage, position = 'top-center', size = 'md', animated = false }) => {
  return (
    <PromoBadge
      text={`-${discountPercentage}%`}
      variant="discount"
      position={position}
      size={size}
      animated={animated}
      icon={<Percent className="h-3 w-3" />}
    />
  );
};

/**
 * PopularBadge - Specialized component for popular packages
 */
export const PopularBadge: React.FC<{
  text?: string;
  position?: BadgePosition;
  size?: 'sm' | 'md' | 'lg';
}> = ({ text = "Popularne", position = 'top-center', size = 'md' }) => {
  return (
    <PromoBadge
      text={text}
      variant="popular"
      position={position}
      size={size}
      icon={<Star className="h-3 w-3 fill-current" />}
    />
  );
};

/**
 * UrgencyBadge - Specialized component for urgent/limited time offers
 */
export const UrgencyBadge: React.FC<{
  text: string;
  position?: BadgePosition;
  size?: 'sm' | 'md' | 'lg';
  showCountdown?: boolean;
  promotion?: EnhancedPromotion;
}> = ({ text, position = 'top-right', size = 'sm', showCountdown = false, promotion }) => {
  return (
    <PromoBadge
      text={text}
      variant="urgent"
      position={position}
      size={size}
      animated={true}
      showCountdown={showCountdown}
      promotion={promotion}
      icon={<Zap className="h-3 w-3" />}
    />
  );
};

/**
 * NewClientBadge - Specialized component for new client promotions
 */
export const NewClientBadge: React.FC<{
  promotion?: EnhancedPromotion;
  position?: BadgePosition;
  size?: 'sm' | 'md' | 'lg';
  showCountdown?: boolean;
}> = ({ promotion, position = 'top-center', size = 'md', showCountdown = false }) => {
  if (!promotion) return null;

  return (
    <PromoBadge
      promotion={promotion}
      variant="discount"
      position={position}
      size={size}
      animated={true}
      showCountdown={showCountdown}
      className="bg-gradient-to-r from-red-500 to-red-600 text-white border-red-700 shadow-lg"
    />
  );
};

/**
 * SavingsIndicator - Component to show savings amount
 */
export const SavingsIndicator: React.FC<{
  savings: number;
  originalPrice: number;
  currency?: string;
  className?: string;
}> = ({ savings, originalPrice, currency = 'PLN', className }) => {
  if (savings <= 0) return null;

  const percentage = Math.round((savings / originalPrice) * 100);
  
  return (
    <div className={cn(
      "inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium",
      className
    )}>
      <Gift className="h-4 w-4" />
      <span>
        Oszczędność: {new Intl.NumberFormat('pl-PL', {
          style: 'currency',
          currency,
          minimumFractionDigits: 0
        }).format(savings)} (-{percentage}%)
      </span>
    </div>
  );
};

/**
 * PromotionCard - Full promotional display card
 */
export const PromotionCard: React.FC<{
  promotion: EnhancedPromotion;
  onApply?: () => void;
  className?: string;
}> = ({ promotion, onApply, className }) => {
  const { formattedTime, isExpiring } = usePromotionTimer(promotion);

  return (
    <div className={cn(
      "relative bg-gradient-to-br from-red-500 to-red-600 text-white p-4 rounded-lg shadow-lg border-2 border-red-700",
      className
    )}>
      {/* Discount Badge */}
      <div className="absolute -top-3 -right-3">
        <div className="bg-yellow-400 text-red-800 font-bold px-3 py-1 rounded-full text-sm shadow-md">
          -{promotion.discountPercentage}%
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div>
          <h3 className="font-bold text-lg">{promotion.name}</h3>
          <p className="text-red-100 text-sm">{promotion.description}</p>
        </div>

        {formattedTime && (
          <div className={cn(
            "flex items-center gap-2 text-sm",
            isExpiring && "animate-pulse"
          )}>
            <Clock className="h-4 w-4" />
            <span>Pozostało: {formattedTime}</span>
          </div>
        )}

        {onApply && (
          <button
            onClick={onApply}
            className="w-full bg-white text-red-600 font-bold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Wykorzystaj promocję
          </button>
        )}
      </div>
    </div>
  );
};

export default PromoBadge;