import React from 'react';
import SectionContainer from '@/components/layout/SectionContainer';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PricingTier {
  id: string;
  popular?: boolean;
  features: string[];
  cta: string;
}

const PricingSection: React.FC = () => {
  const { t } = useTranslation('common');

  const pricingTiers: PricingTier[] = [
    {
      id: 'starter',
      features: [
        'pricing.tiers.starter.feature1',
        'pricing.tiers.starter.feature2', 
        'pricing.tiers.starter.feature3',
        'pricing.tiers.starter.feature4',
        'pricing.tiers.starter.feature5'
      ],
      cta: 'pricing.cta.order'
    },
    {
      id: 'business',
      popular: true,
      features: [
        'pricing.tiers.business.feature1',
        'pricing.tiers.business.feature2',
        'pricing.tiers.business.feature3', 
        'pricing.tiers.business.feature4',
        'pricing.tiers.business.feature5',
        'pricing.tiers.business.feature6'
      ],
      cta: 'pricing.cta.order'
    },
    {
      id: 'professional',
      features: [
        'pricing.tiers.professional.feature1',
        'pricing.tiers.professional.feature2',
        'pricing.tiers.professional.feature3',
        'pricing.tiers.professional.feature4', 
        'pricing.tiers.professional.feature5',
        'pricing.tiers.professional.feature6',
        'pricing.tiers.professional.feature7'
      ],
      cta: 'pricing.cta.consult'
    },
    {
      id: 'enterprise',
      features: [
        'pricing.tiers.enterprise.feature1',
        'pricing.tiers.enterprise.feature2',
        'pricing.tiers.enterprise.feature3',
        'pricing.tiers.enterprise.feature4',
        'pricing.tiers.enterprise.feature5'
      ],
      cta: 'pricing.cta.consult'
    }
  ];

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
            <div className="inline-flex items-center bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium">
              {t('pricing.guarantee')}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
            {pricingTiers.map((tier) => (
              <div
                key={tier.id}
                className={`relative bg-white rounded-2xl p-6 lg:p-8 shadow-sm border transition-all duration-200 hover:shadow-md ${
                  tier.popular 
                    ? 'border-accent shadow-accent/10 ring-1 ring-accent/20' 
                    : 'border-muted hover:border-accent/30'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                      {t('pricing.popular')}
                    </div>
                  </div>
                )}

                {/* Package Name & Price */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-heading font-medium mb-2">
                    {t(`pricing.tiers.${tier.id}.name`)}
                  </h3>
                  <div className="mb-2">
                    <span className="text-3xl font-bold">
                      {t(`pricing.tiers.${tier.id}.price`)}
                    </span>
                    <span className="text-fg/60 ml-1">zł</span>
                  </div>
                  <p className="text-sm text-fg/60">
                    {t(`pricing.tiers.${tier.id}.description`)}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {tier.features.map((feature, index) => (
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
                  className={`w-full ${
                    tier.popular 
                      ? 'btn-primary' 
                      : 'btn-outline hover:bg-accent hover:text-white hover:border-accent'
                  }`}
                >
                  <a href="#brief" className="flex items-center justify-center gap-2">
                    {t(tier.cta)}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
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
        </div>
      </div>
    </SectionContainer>
  );
};

export default PricingSection;