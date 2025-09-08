import React, { useState } from 'react';
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
  const [isExpanded, setIsExpanded] = useState(false);
  
  const startBrief = () => {
    const briefSection = document.getElementById('brief');
    if (briefSection) {
      briefSection.scrollIntoView({ behavior: 'smooth' });
      // Trigger brief start after scroll
      setTimeout(() => {
        const startButton = briefSection.querySelector('button[data-start-brief]') as HTMLButtonElement;
        if (startButton) {
          startButton.click();
        }
      }, 500);
    }
  };
  
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

          </div>


          {/* Pricing Cards */}
          <div className="flex flex-col items-center gap-6 relative">
            {!isExpanded ? (
              <>
                {/* Single Start card centered with hidden stack underneath */}
                <div className="flex justify-center relative">
                  {/* Hidden stack cards - positioned behind Start card */}
                  <div className="absolute inset-0 z-0">
                    {packages.filter(pkg => pkg.id !== 'start').map((pkg, index) => {
                      const stackLevel = pkg.id === 'pro' ? 1 : 2; // Pro ближе к Start
                      return (
                        <div
                          key={pkg.id}
                          className="absolute bg-white rounded-2xl shadow-sm border border-muted opacity-20"
                          style={{
                            width: '24rem',
                            height: '28rem',
                            transform: `translateY(${stackLevel * 4}px) translateX(${stackLevel * 2}px)`,
                            zIndex: -stackLevel
                          }}
                        />
                      );
                    })}
                  </div>
                  
                  {/* Start card on top */}
                  {packages.filter(pkg => pkg.id === 'start').map((pkg) => (
                    <div
                      key={pkg.id}
                      className="relative bg-white rounded-2xl p-6 shadow-lg border-2 border-accent hover:border-accent/50 transition-all duration-200 hover:shadow-xl z-10"
                      style={{ width: '24rem', height: '28rem' }}
                    >
                      {/* Start package content */}
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-heading font-medium mb-2">
                          {pkg.name}
                        </h3>
                        
                        {/* Price Display */}
                        <div className="mb-3">
                          <div className="text-center">
                            <div className="text-lg text-gray-500 line-through">2,000 PLN</div>
                            <div className="text-3xl font-bold text-green-600">600 PLN</div>
                            <div className="text-sm text-red-600 font-medium">{t('pricing.promo.discount_badge')}</div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-fg/60">
                          {pkg.description}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="space-y-3">
                        {pkg.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <Check className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-fg/80">
                              {t(feature)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Button below Start card */}
                <button
                  onClick={() => setIsExpanded(true)}
                  className="py-2 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 cursor-pointer"
                >
                  <span className="text-sm font-medium text-fg/80">
{t('pricing.expand.need_more')}
                  </span>
                </button>
              </>
            ) : (
              <>
                {/* All 3 cards with stack slide-out animation */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {packages.map((pkg, index) => {
                    const isStart = pkg.id === 'start';
                    const stackOrder = isStart ? 0 : pkg.id === 'standard' ? 2 : 1;
                    
                    return (
                      <div
                        key={pkg.id}
                        className={`relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl flex flex-col justify-between transition-all duration-300 ${
                          isStart 
                            ? 'border-2 border-accent hover:border-accent/50' 
                            : 'border border-muted hover:border-accent/30'
                        }`}
                        style={{
                          width: '24rem',
                          height: '28rem',
                          animation: `slideOut 0.6s ease-out ${stackOrder * 0.15}s both`
                        }}
                      >
                        {/* Package content */}
                        <div className="text-center mb-4">
                          <h3 className="text-xl font-heading font-medium mb-2">
                            {pkg.name}
                          </h3>
                          
                          {/* Price Display */}
                          <div className="mb-3">
                            {isStart ? (
                              <div className="text-center">
                                <div className="text-lg text-gray-500 line-through">2,000 PLN</div>
                                <div className="text-3xl font-bold text-green-600">600 PLN</div>
                                <div className="text-sm text-red-600 font-medium">{t('pricing.promo.discount_badge')}</div>
                              </div>
                            ) : (
                              <ResponsivePriceDisplay
                                price={pkg.finalPrice || pkg.currentPrice}
                                originalPrice={pkg.savings > 0 ? pkg.originalPrice || pkg.basePrice : undefined}
                                currency="PLN"
                                variant="medium"
                                packageName={pkg.name}
                                isPrimary={pkg.popular || pkg.recommended}
                                showSavings={true}
                                promotionInfo={pkg.appliedPromotion ? {
                                  discountPercentage: pkg.appliedPromotion.discountPercentage,
                                  badgeText: pkg.appliedPromotion.badgeText,
                                } : undefined}
                              />
                            )}
                          </div>
                          
                          <p className="text-sm text-fg/60">
                            {pkg.description}
                          </p>
                        </div>

                        {/* Features */}
                        <div className="space-y-3">
                          {pkg.features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <Check className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-fg/80">
                                {t(feature)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Hide button */}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="py-2 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 cursor-pointer"
                >
                  <span className="text-sm font-medium text-fg/80">
{t('pricing.expand.hide_options')}
                  </span>
                </button>
              </>
            )}
            
            {/* CSS Animation for stack effect */}
            <style jsx>{`
              @keyframes slideOut {
                0% {
                  transform: translateY(12px) translateX(6px);
                  opacity: 0;
                }
                100% {
                  transform: translateY(0) translateX(0);
                  opacity: 1;
                }
              }
            `}</style>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <h3 className="text-2xl md:text-3xl font-heading font-medium mb-4">
              {t('pricing.cta_section.title')}
            </h3>
            <p className="text-lg text-fg/70 mb-8 max-w-2xl mx-auto">
              {t('pricing.cta_section.subtitle')}
            </p>
            <Button onClick={startBrief} size="lg" className="rounded-full shadow-md hover:shadow-lg group transition-all duration-300 bg-gradient-to-r from-primary to-primary/90">
              <span className="flex items-center gap-2 h-14 px-8">
                {t('hero.cta_primary')} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default PricingSection;