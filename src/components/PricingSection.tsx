import React from 'react';
import SectionContainer from '@/components/layout/SectionContainer';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Star, Zap, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PricingComparison from './PricingComparison';
import { usePricing } from '@/hooks/usePricing';
import { 
  PromoBadge, 
  NewClientBadge, 
  PopularBadge, 
  SavingsIndicator,
  UrgencyBadge 
} from '@/components/pricing/PromoBadge';
import { 
  PriceDisplay, 
  ResponsivePriceDisplay, 
  PromotionalPriceBadge 
} from '@/components/pricing/PriceDisplay';
import { formatPrice } from '@/utils/currency';
import { cn } from '@/lib/utils';

const PricingSection: React.FC = () => {
  const { t, i18n } = useTranslation('common');
  
  // Use the enhanced pricing hook with promotional logic
  const { 
    packages, 
    hasActivePromotions, 
    userContext, 
    updateUserContext 
  } = usePricing({
    customerType: 'new', // Default to new customer for launch promotion
    region: 'PL'
  });

  // Get current language for currency formatting
  const currentLanguage = i18n.language || 'pl';

  return (
    <SectionContainer variant="light" id="pricing" className="min-h-screen flex items-center justify-center py-20">
      <div className="container-wide">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-medium mb-6">
              {t('pricing.title')}
            </h2>
            <p className="text-lg text-fg/70 max-w-2xl mx-auto mb-8">
              {t('pricing.subtitle')}
            </p>

            {/* Promotion Announcement */}
            {hasActivePromotions && (
              <div className="mb-8 p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl shadow-lg border-2 border-red-700 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Zap className="h-6 w-6 animate-pulse" />
                  <h3 className="text-xl font-bold">Promocja Nowy Klient!</h3>
                  <Zap className="h-6 w-6 animate-pulse" />
                </div>
                <p className="text-red-100 text-lg mb-2">
                  <span className="font-bold text-2xl text-yellow-300">-70% ZNIŻKI</span> na pakiet Start
                </p>
                <p className="text-red-100 text-sm">
                  Tylko <span className="font-bold">{formatPrice(600, 'PLN', currentLanguage)}</span> zamiast {formatPrice(2000, 'PLN', currentLanguage)} • Ograniczona liczba miejsc
                </p>
              </div>
            )}
            
            <div className="inline-flex items-center bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
              {t('pricing.guarantee')}
            </div>
          </div>


          {/* Pricing Cards - Show all 4 packages: Start (with promo), Standard, Pro, Enterprise */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={cn(
                  'relative bg-white rounded-2xl p-6 lg:p-8 shadow-sm border transition-all duration-200 hover:shadow-md',
                  pkg.popular 
                    ? 'border-accent shadow-accent/10 ring-1 ring-accent/20 transform scale-105' 
                    : 'border-muted hover:border-accent/30',
                  pkg.appliedPromotion && 'ring-2 ring-red-200 border-red-300'
                )}
              >
                {/* Promotional Badges */}
                {pkg.appliedPromotion && (
                  <NewClientBadge 
                    promotion={pkg.appliedPromotion}
                    position="top-center"
                    size="md"
                    showCountdown={true}
                  />
                )}
                
                {pkg.popular && !pkg.appliedPromotion && (
                  <PopularBadge 
                    text={t('pricing.popular')}
                    position="top-center"
                    size="md"
                  />
                )}
                
                {pkg.recommended && !pkg.popular && !pkg.appliedPromotion && (
                  <div className="absolute -top-4 right-4">
                    <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      {t('pricing.recommended')}
                    </div>
                  </div>
                )}

                {/* Urgency Message */}
                {pkg.urgencyMessage && (
                  <UrgencyBadge
                    text={pkg.urgencyMessage}
                    position="top-right" 
                    size="sm"
                    promotion={pkg.appliedPromotion}
                  />
                )}

                {/* Package Name & Price */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-heading font-medium mb-2">
                    {pkg.name}
                  </h3>
                  
                  {/* Price Display */}
                  <div className="mb-2">
                    <ResponsivePriceDisplay
                      price={pkg.finalPrice || pkg.currentPrice}
                      originalPrice={pkg.savings > 0 ? pkg.originalPrice || pkg.basePrice : undefined}
                      currency="PLN"
                      variant="large"
                      packageName={pkg.name}
                      isPrimary={pkg.popular || pkg.recommended}
                      showSavings={true}
                      promotionInfo={pkg.appliedPromotion ? {
                        discountPercentage: pkg.appliedPromotion.discountPercentage,
                        badgeText: pkg.appliedPromotion.badgeText,
                      } : undefined}
                    />
                  </div>

                  {/* Savings Indicator */}
                  {pkg.savings > 0 && pkg.savingsText && (
                    <SavingsIndicator
                      savings={pkg.savings}
                      originalPrice={pkg.originalPrice}
                      className="mb-2"
                    />
                  )}
                  
                  <p className="text-sm text-fg/60">
                    {pkg.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-fg/80">
                        {t(feature)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button 
                  asChild 
                  className={cn(
                    'w-full',
                    pkg.popular || pkg.appliedPromotion
                      ? 'btn-primary' 
                      : 'btn-outline hover:bg-accent hover:text-white hover:border-accent'
                  )}
                >
                  <a href="#brief" className="flex items-center justify-center gap-2">
                    {t(pkg.cta)}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>

                {/* Promotion Timer */}
                {pkg.appliedPromotion && pkg.timeRemaining && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-red-700 text-sm font-medium">
                      <Clock className="h-4 w-4" />
                      <span>Promocja kończy się za: {pkg.timeRemaining && Math.ceil(pkg.timeRemaining / (1000 * 60 * 60 * 24))} dni</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="text-center mt-12">
            <p className="text-fg/60 mb-4">
              {t('pricing.additional_info')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="h-6 w-6 text-accent" />
                </div>
                <h4 className="font-medium mb-2">{t('pricing.benefits.guarantee.title')}</h4>
                <p className="text-sm text-fg/70">{t('pricing.benefits.guarantee.description')}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="h-6 w-6 text-accent" />
                </div>
                <h4 className="font-medium mb-2">{t('pricing.benefits.support.title')}</h4>
                <p className="text-sm text-fg/70">{t('pricing.benefits.support.description')}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="h-6 w-6 text-accent" />
                </div>
                <h4 className="font-medium mb-2">{t('pricing.benefits.payment.title')}</h4>
                <p className="text-sm text-fg/70">{t('pricing.benefits.payment.description')}</p>
              </div>
            </div>
          </div>
          
          {/* Pricing Comparison Table */}
          <PricingComparison />
        </div>
      </div>
    </SectionContainer>
  );
};

export default PricingSection;