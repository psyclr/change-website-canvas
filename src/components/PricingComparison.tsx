import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, X, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePricing } from '@/hooks/usePricing';
import { legacyPricingMapping } from '@/data/pricing';

interface ComparisonFeature {
  key: string;
  category: string;
  tiers: {
    start: boolean | string;
    standard: boolean | string;
    pro: boolean | string;
    enterprise: boolean | string;
  };
}

const PricingComparison: React.FC = () => {
  const { t } = useTranslation('common');
  const [isVisible, setIsVisible] = useState(false);
  const { packages } = usePricing();

  const comparisonFeatures: ComparisonFeature[] = [
    {
      key: 'pages',
      category: 'basic',
      tiers: {
        start: '5-7',
        standard: '10-15',
        pro: t('pricing.comparison.unlimited'),
        enterprise: t('pricing.comparison.unlimited')
      }
    },
    {
      key: 'responsive_design',
      category: 'basic',
      tiers: {
        start: true,
        standard: true,
        pro: true,
        enterprise: true
      }
    },
    {
      key: 'contact_form',
      category: 'basic',
      tiers: {
        start: true,
        standard: true,
        pro: t('pricing.comparison.advanced'),
        enterprise: t('pricing.comparison.custom')
      }
    },
    {
      key: 'seo_optimization',
      category: 'marketing',
      tiers: {
        start: t('pricing.comparison.basic'),
        standard: t('pricing.comparison.advanced'),
        pro: t('pricing.comparison.advanced'),
        enterprise: t('pricing.comparison.custom')
      }
    },
    {
      key: 'analytics',
      category: 'marketing',
      tiers: {
        start: false,
        standard: true,
        pro: true,
        enterprise: t('pricing.comparison.custom')
      }
    },
    {
      key: 'blog_news',
      category: 'content',
      tiers: {
        start: false,
        standard: true,
        pro: true,
        enterprise: true
      }
    },
    {
      key: 'ecommerce',
      category: 'ecommerce',
      tiers: {
        start: false,
        standard: false,
        pro: t('pricing.comparison.up_to_100'),
        enterprise: t('pricing.comparison.unlimited')
      }
    },
    {
      key: 'admin_panel',
      category: 'management',
      tiers: {
        start: false,
        standard: false,
        pro: true,
        enterprise: t('pricing.comparison.custom')
      }
    },
    {
      key: 'api_integrations',
      category: 'integrations',
      tiers: {
        start: false,
        standard: false,
        pro: t('pricing.comparison.basic'),
        enterprise: t('pricing.comparison.advanced')
      }
    },
    {
      key: 'support_duration',
      category: 'support',
      tiers: {
        start: '2 ' + t('pricing.comparison.months'),
        standard: '6 ' + t('pricing.comparison.months'),
        pro: '12 ' + t('pricing.comparison.months'),
        enterprise: t('pricing.comparison.unlimited')
      }
    }
  ];

  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-5 w-5 text-green-600 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-gray-400 mx-auto" />
      );
    }
    return <span className="text-sm text-center">{value}</span>;
  };

  if (!isVisible) {
    return (
      <div className="text-center mt-8">
        <Button
          variant="outline"
          onClick={() => setIsVisible(true)}
          className="flex items-center gap-2"
        >
          <Eye className="h-4 w-4" />
          {t('pricing.comparison.show_detailed')}
        </Button>
      </div>
    );
  }

  const categories = [...new Set(comparisonFeatures.map(f => f.category))];

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-heading font-medium">
          {t('pricing.comparison.title')}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="flex items-center gap-2"
        >
          <EyeOff className="h-4 w-4" />
          {t('pricing.comparison.hide')}
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-4 font-medium text-gray-600">
                {t('pricing.comparison.features')}
              </th>
              {packages.map((pkg) => (
                <th key={pkg.id} className={`text-center p-4 font-medium ${pkg.popular ? 'relative' : ''}`}>
                  <div className="text-lg font-heading">{pkg.name}</div>
                  <div className="text-sm text-gray-600">
                    {pkg.appliedPromotion ? (
                      <div>
                        <span className="line-through text-gray-400 mr-2">
                          {pkg.originalPrice.toLocaleString()} zł
                        </span>
                        <span className="text-red-600 font-bold">
                          {pkg.finalPrice.toLocaleString()} zł
                        </span>
                      </div>
                    ) : (
                      <span>{pkg.currentPrice.toLocaleString()} {pkg.id === 'enterprise' ? '+' : ''} zł</span>
                    )}
                  </div>
                  {pkg.popular && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                      <div className="bg-accent text-white px-2 py-1 rounded text-xs">
                        {t('pricing.popular')}
                      </div>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <React.Fragment key={category}>
                <tr className="bg-gray-50">
                  <td colSpan={packages.length + 1} className="p-3 font-medium text-gray-700 text-sm uppercase tracking-wide">
                    {t(`pricing.comparison.categories.${category}`)}
                  </td>
                </tr>
                {comparisonFeatures
                  .filter(feature => feature.category === category)
                  .map(feature => (
                    <tr key={feature.key} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4 text-sm">
                        {t(`pricing.comparison.features.${feature.key}`)}
                      </td>
                      {packages.map((pkg, index) => (
                        <td 
                          key={pkg.id} 
                          className={`p-4 text-center ${pkg.popular ? 'bg-accent/5' : ''}`}
                        >
                          {renderFeatureValue(feature.tiers[pkg.id as keyof typeof feature.tiers])}
                        </td>
                      ))}
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricingComparison;