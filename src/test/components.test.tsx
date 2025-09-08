/**
 * Component tests for pricing-related React components
 * Tests UI components, accessibility, and integration with pricing data
 */

import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { HelmetProvider } from 'react-helmet-async';

// Import components to test
import StructuredData from '@/components/seo/StructuredData';
import { pricingData } from '@/data/pricing';

// Mock translations
const mockTranslations = {
  pl: {
    common: {
      pricing: {
        title: 'Przejrzyste ceny',
        subtitle: 'Wybierz pakiet idealny dla Twojego biznesu',
        popular: 'Najpopularniejszy',
        recommended: 'Najlepsza wartość',
        tiers: {
          start: {
            feature1: 'Responsywna strona (do 7 podstron)',
            feature2: 'Formularz kontaktowy',
            feature3: 'Podstawowe SEO',
            feature4: 'Hosting na 1 rok w cenie',
            feature5: '2 miesiące wsparcia technicznego'
          },
          standard: {
            feature1: 'Wszystko z pakietu Start',
            feature2: 'Responsywna strona (do 15 podstron)',
            feature3: 'Zaawansowane SEO + Google Analytics',
            feature4: 'Blog/aktualności',
            feature5: 'Integracja z social media',
            feature6: '6 miesięcy wsparcia technicznego'
          }
        },
        cta: {
          order: 'Zamów teraz',
          consult: 'Skonsultuj się'
        }
      }
    }
  }
};

// Initialize i18n for testing
i18n.use(initReactI18next).init({
  lng: 'pl',
  resources: mockTranslations,
  interpolation: {
    escapeValue: false,
  },
});

// Test wrapper component
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <HelmetProvider>
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  </HelmetProvider>
);

describe('Pricing Components', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('StructuredData Component', () => {
    it('should render structured data scripts without visible content', () => {
      const { container } = render(
        <TestWrapper>
          <StructuredData 
            packages={pricingData.packages}
            activePromotions={pricingData.activePromotions}
          />
        </TestWrapper>
      );

      // StructuredData should not render visible content
      expect(container.firstChild).toBeNull();
    });

    it('should generate JSON-LD scripts in document head', () => {
      render(
        <TestWrapper>
          <StructuredData 
            packages={pricingData.packages}
            activePromotions={pricingData.activePromotions}
          />
        </TestWrapper>
      );

      // Check that scripts were added to the document
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      expect(scripts.length).toBeGreaterThan(0);

      // Verify at least one script contains valid JSON
      const firstScript = scripts[0];
      expect(() => JSON.parse(firstScript.textContent || '')).not.toThrow();
    });

    it('should include organization schema', () => {
      render(
        <TestWrapper>
          <StructuredData 
            packages={pricingData.packages}
            activePromotions={pricingData.activePromotions}
          />
        </TestWrapper>
      );

      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      let foundOrganization = false;

      scripts.forEach(script => {
        try {
          const data = JSON.parse(script.textContent || '');
          if (data['@type'] && (data['@type'] === 'Organization' || 
              (Array.isArray(data['@type']) && data['@type'].includes('Organization')))) {
            foundOrganization = true;
            expect(data.name).toBeDefined();
            expect(data.url).toBeDefined();
          }
        } catch (e) {
          // Skip invalid JSON
        }
      });

      expect(foundOrganization).toBe(true);
    });

    it('should include offer schemas for each package', () => {
      render(
        <TestWrapper>
          <StructuredData 
            packages={pricingData.packages}
            activePromotions={pricingData.activePromotions}
          />
        </TestWrapper>
      );

      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      let offerCount = 0;

      scripts.forEach(script => {
        try {
          const data = JSON.parse(script.textContent || '');
          if (data['@type'] === 'Offer' || 
              (Array.isArray(data['@type']) && data['@type'].includes('Offer'))) {
            offerCount++;
            expect(data.price).toBeDefined();
            expect(data.priceCurrency).toBe('PLN');
            expect(data.availability).toBeDefined();
          }
        } catch (e) {
          // Skip invalid JSON
        }
      });

      // Should have at least as many offers as packages
      expect(offerCount).toBeGreaterThanOrEqual(pricingData.packages.length);
    });

    it('should handle promotional offers correctly', () => {
      const promotionalPackages = pricingData.packages.filter(pkg => 
        pricingData.activePromotions.some(promo => 
          promo.applicablePackages.includes(pkg.id) && promo.isActive
        )
      );

      render(
        <TestWrapper>
          <StructuredData 
            packages={pricingData.packages}
            activePromotions={pricingData.activePromotions}
          />
        </TestWrapper>
      );

      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      let foundPromotionalOffer = false;

      scripts.forEach(script => {
        try {
          const data = JSON.parse(script.textContent || '');
          if (data['@type'] && (
              data['@type'].includes?.('DiscountOffer') || 
              data.discount || 
              data.originalPrice
            )) {
            foundPromotionalOffer = true;
            // Promotional offers should have discount information
            expect(data.originalPrice || data.discount).toBeDefined();
          }
        } catch (e) {
          // Skip invalid JSON
        }
      });

      if (promotionalPackages.length > 0) {
        expect(foundPromotionalOffer).toBe(true);
      }
    });

    it('should include FAQ schema', () => {
      render(
        <TestWrapper>
          <StructuredData 
            packages={pricingData.packages}
            activePromotions={pricingData.activePromotions}
          />
        </TestWrapper>
      );

      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      let foundFAQ = false;

      scripts.forEach(script => {
        try {
          const data = JSON.parse(script.textContent || '');
          if (data['@type'] === 'FAQPage') {
            foundFAQ = true;
            expect(data.mainEntity).toBeDefined();
            expect(Array.isArray(data.mainEntity)).toBe(true);
            expect(data.mainEntity.length).toBeGreaterThan(0);
            
            // Check first FAQ item structure
            const firstFAQ = data.mainEntity[0];
            expect(firstFAQ['@type']).toBe('Question');
            expect(firstFAQ.name).toBeDefined();
            expect(firstFAQ.acceptedAnswer).toBeDefined();
            expect(firstFAQ.acceptedAnswer['@type']).toBe('Answer');
            expect(firstFAQ.acceptedAnswer.text).toBeDefined();
          }
        } catch (e) {
          // Skip invalid JSON
        }
      });

      expect(foundFAQ).toBe(true);
    });

    it('should include breadcrumb schema', () => {
      render(
        <TestWrapper>
          <StructuredData 
            packages={pricingData.packages}
            activePromotions={pricingData.activePromotions}
          />
        </TestWrapper>
      );

      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      let foundBreadcrumb = false;

      scripts.forEach(script => {
        try {
          const data = JSON.parse(script.textContent || '');
          if (data['@type'] === 'BreadcrumbList') {
            foundBreadcrumb = true;
            expect(data.itemListElement).toBeDefined();
            expect(Array.isArray(data.itemListElement)).toBe(true);
            
            // Check breadcrumb structure
            data.itemListElement.forEach((item: any, index: number) => {
              expect(item['@type']).toBe('ListItem');
              expect(item.position).toBe(index + 1);
              expect(item.name).toBeDefined();
              expect(item.item).toBeDefined();
            });
          }
        } catch (e) {
          // Skip invalid JSON
        }
      });

      expect(foundBreadcrumb).toBe(true);
    });

    it('should generate valid Schema.org markup', () => {
      render(
        <TestWrapper>
          <StructuredData 
            packages={pricingData.packages}
            activePromotions={pricingData.activePromotions}
          />
        </TestWrapper>
      );

      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      
      scripts.forEach(script => {
        const jsonData = JSON.parse(script.textContent || '');
        
        // All structured data should have @context
        expect(jsonData['@context']).toBe('https://schema.org');
        
        // All structured data should have @type
        expect(jsonData['@type']).toBeDefined();
        
        // Validate common required fields based on type
        if (jsonData['@type'] === 'Organization') {
          expect(jsonData.name).toBeDefined();
          expect(jsonData.url).toBeDefined();
        } else if (jsonData['@type'] === 'Offer') {
          expect(jsonData.price).toBeDefined();
          expect(jsonData.priceCurrency).toBeDefined();
          expect(jsonData.availability).toBeDefined();
        } else if (jsonData['@type'] === 'Service') {
          expect(jsonData.name).toBeDefined();
          expect(jsonData.provider).toBeDefined();
        }
      });
    });

    it('should handle custom organization info', () => {
      const customOrgInfo = {
        name: 'Custom Company',
        url: 'https://custom.com',
        logo: 'https://custom.com/logo.png',
        description: 'Custom description',
        telephone: '+48-999-888-777',
        email: 'contact@custom.com',
        address: {
          streetAddress: 'Test Street 456',
          addressLocality: 'Krakow',
          addressRegion: 'Malopolskie',
          postalCode: '30-001',
          addressCountry: 'PL'
        },
        foundingDate: '2020-01-01',
        numberOfEmployees: '50-100'
      };

      render(
        <TestWrapper>
          <StructuredData 
            packages={pricingData.packages}
            activePromotions={pricingData.activePromotions}
            organizationInfo={customOrgInfo}
          />
        </TestWrapper>
      );

      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      let foundCustomOrg = false;

      scripts.forEach(script => {
        try {
          const data = JSON.parse(script.textContent || '');
          if (data['@type'] && (
              data['@type'] === 'Organization' || 
              (Array.isArray(data['@type']) && data['@type'].includes('Organization'))
            )) {
            if (data.name === 'Custom Company') {
              foundCustomOrg = true;
              expect(data.url).toBe('https://custom.com');
              expect(data.telephone).toBe('+48-999-888-777');
              expect(data.address.addressLocality).toBe('Krakow');
            }
          }
        } catch (e) {
          // Skip invalid JSON
        }
      });

      expect(foundCustomOrg).toBe(true);
    });
  });

  describe('SEO Meta Tags', () => {
    it('should include proper meta tags for pricing', () => {
      render(
        <TestWrapper>
          <StructuredData 
            packages={pricingData.packages}
            activePromotions={pricingData.activePromotions}
          />
        </TestWrapper>
      );

      // Check for SEO meta tags in the head
      const robotsMeta = document.querySelector('meta[name="robots"]');
      expect(robotsMeta).toBeTruthy();
      expect(robotsMeta?.getAttribute('content')).toContain('index');

      const priceMeta = document.querySelector('meta[name="price"]');
      expect(priceMeta).toBeTruthy();
      expect(priceMeta?.getAttribute('content')).toContain('PLN');
    });
  });
});

describe('Component Integration', () => {
  it('should handle empty packages array gracefully', () => {
    expect(() => {
      render(
        <TestWrapper>
          <StructuredData 
            packages={[]}
            activePromotions={[]}
          />
        </TestWrapper>
      );
    }).not.toThrow();
  });

  it('should handle missing promotional data', () => {
    expect(() => {
      render(
        <TestWrapper>
          <StructuredData 
            packages={pricingData.packages}
            activePromotions={undefined}
          />
        </TestWrapper>
      );
    }).not.toThrow();
  });
});

// Cleanup after each test
afterEach(() => {
  // Remove all structured data scripts from document head
  document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
    script.remove();
  });
  
  // Remove meta tags added by StructuredData component
  document.querySelectorAll('meta[name="robots"], meta[name="price"], meta[name="geo.region"]').forEach(meta => {
    meta.remove();
  });
});