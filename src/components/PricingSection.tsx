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


          {/* Pricing Cards - 3 columns only */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="relative bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-muted hover:border-accent/30 transition-all duration-200 hover:shadow-md flex flex-col justify-between h-full"
              >

                {/* Package Name & Price */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-heading font-medium mb-2">
                    {pkg.name}
                  </h3>
                  
                  {/* Price Display */}
                  <div className="mb-2">
                    {pkg.name === 'Start' ? (
                      <div className="text-center">
                        <div className="text-lg text-gray-500 line-through">2,000 PLN</div>
                        <div className="text-3xl font-bold text-green-600">600 PLN</div>
                        <div className="text-sm text-red-600 font-medium">-70% для новых клиентов</div>
                      </div>
                    ) : (
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
                    )}
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

                <div className="flex-1">
                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {pkg.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-fg/80">
                          {t(feature)}
                        </span>
                      </div>
                    ))}
                    
                    {/* Bonus text */}
                    {t(`pricing.tiers.${pkg.id.toLowerCase()}.bonus`) && (
                      <div className="mt-4 p-3 bg-accent/5 rounded-lg border border-accent/20">
                        <span className="text-sm text-accent font-medium">
                          {t(`pricing.tiers.${pkg.id.toLowerCase()}.bonus`)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>


              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <h3 className="text-2xl md:text-3xl font-heading font-medium mb-4">
              Tell us about your project
            </h3>
            <p className="text-lg text-fg/70 mb-8 max-w-2xl mx-auto">
              A few questions will help us prepare a personalized proposal
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