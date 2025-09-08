/**
 * SEO-optimized structured data component for pricing packages
 * Phase 3.2: JSON-LD implementation for search engine visibility
 * 
 * Implements Schema.org markup for:
 * - Service offerings with pricing
 * - Promotional offers with validity periods
 * - Organization/Business information
 * - LocalBusiness details for Polish market
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PricingPackage, Promotion } from '@/types/pricing';
import { formatPrice } from '@/utils/currency';

interface StructuredDataProps {
  packages: PricingPackage[];
  activePromotions?: Promotion[];
  organizationInfo?: OrganizationInfo;
}

interface OrganizationInfo {
  name: string;
  url: string;
  logo: string;
  description: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  foundingDate: string;
  numberOfEmployees: string;
  slogan?: string;
}

const defaultOrganizationInfo: OrganizationInfo = {
  name: "Change Canvas",
  url: "https://changecanvas.pl",
  logo: "https://changecanvas.pl/logo.png",
  description: "Professional web development agency specializing in modern, SEO-optimized websites for Polish businesses. Expert React, TypeScript, and responsive design services.",
  telephone: "+48-123-456-789",
  email: "kontakt@changecanvas.pl",
  address: {
    streetAddress: "ul. Przykładowa 123",
    addressLocality: "Warszawa", 
    addressRegion: "Mazowieckie",
    postalCode: "00-001",
    addressCountry: "PL"
  },
  foundingDate: "2024-01-01",
  numberOfEmployees: "2-10",
  slogan: "Transforming ideas into digital reality"
};

/**
 * Generate Organization structured data (Schema.org/Organization + LocalBusiness)
 */
const generateOrganizationSchema = (orgInfo: OrganizationInfo) => ({
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
  "name": orgInfo.name,
  "alternateName": "Change Canvas Agency",
  "url": orgInfo.url,
  "logo": {
    "@type": "ImageObject",
    "url": orgInfo.logo
  },
  "description": orgInfo.description,
  "slogan": orgInfo.slogan,
  "foundingDate": orgInfo.foundingDate,
  "numberOfEmployees": orgInfo.numberOfEmployees,
  "telephone": orgInfo.telephone,
  "email": orgInfo.email,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": orgInfo.address.streetAddress,
    "addressLocality": orgInfo.address.addressLocality,
    "addressRegion": orgInfo.address.addressRegion,
    "postalCode": orgInfo.address.postalCode,
    "addressCountry": orgInfo.address.addressCountry
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "52.2297700",
    "longitude": "21.0117800"
  },
  "areaServed": [
    {
      "@type": "Country",
      "name": "Poland"
    },
    {
      "@type": "AdministrativeArea", 
      "name": "European Union"
    }
  ],
  "serviceType": "Web Development",
  "priceRange": "600-15000 PLN",
  "currenciesAccepted": "PLN, EUR",
  "paymentAccepted": "Cash, Credit Card, Bank Transfer",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://www.linkedin.com/company/change-canvas",
    "https://github.com/changecanvas",
    "https://www.facebook.com/changecanvas"
  ]
});

/**
 * Generate Service structured data for web development services
 */
const generateServiceSchema = (packages: PricingPackage[], orgInfo: OrganizationInfo) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Professional Web Development Services",
  "description": "Comprehensive web development packages for Polish businesses - from starter websites to enterprise solutions",
  "provider": {
    "@type": "Organization",
    "name": orgInfo.name,
    "url": orgInfo.url
  },
  "areaServed": {
    "@type": "Country",
    "name": "Poland"
  },
  "serviceType": "Web Development",
  "category": "Technology Services",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Web Development Packages",
    "itemListElement": packages.map((pkg, index) => ({
      "@type": "OfferCatalog",
      "name": `${pkg.name} Package`,
      "position": index + 1,
      "itemOffered": {
        "@type": "Service",
        "name": `${pkg.name} Web Development Package`,
        "description": pkg.description,
        "category": "Web Development"
      }
    }))
  }
});

/**
 * Generate individual Offer structured data for each pricing package
 */
const generateOffersSchema = (packages: PricingPackage[], activePromotions: Promotion[] = [], orgInfo: OrganizationInfo) => {
  return packages.map(pkg => {
    const appliedPromo = activePromotions.find(promo => 
      promo.applicablePackages.includes(pkg.id) && promo.isActive
    );

    const baseOffer = {
      "@context": "https://schema.org", 
      "@type": "Offer",
      "name": `${pkg.name} Web Development Package`,
      "description": pkg.description,
      "price": pkg.currentPrice,
      "priceCurrency": "PLN",
      "availability": "https://schema.org/InStock",
      "category": "Web Development Services",
      "seller": {
        "@type": "Organization",
        "name": orgInfo.name,
        "url": orgInfo.url
      },
      "validFrom": pkg.structuredData?.validFrom || new Date().toISOString(),
      "validThrough": pkg.structuredData?.validThrough || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      "eligibleRegion": {
        "@type": "Country",
        "name": "Poland"
      },
      "businessFunction": "https://purl.org/goodrelations/v1#Sell",
      "itemCondition": "https://schema.org/NewCondition",
      "warranty": "2 years technical support included"
    };

    // Add promotional offer details if applicable
    if (appliedPromo) {
      return {
        ...baseOffer,
        "@type": ["Offer", "DiscountOffer"],
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": pkg.currentPrice,
          "priceCurrency": "PLN",
          "valueAddedTaxIncluded": true
        },
        "originalPrice": pkg.basePrice,
        "discount": {
          "@type": "DiscountOffer", 
          "name": appliedPromo.name,
          "description": appliedPromo.description,
          "discountPercentage": appliedPromo.discountPercentage,
          "validFrom": appliedPromo.validFrom,
          "validThrough": appliedPromo.validTo,
          "eligibilityRequirement": {
            "@type": "DeliveryChargeSpecification",
            "description": "New client promotion - first-time customers only"
          }
        },
        "priceValidUntil": appliedPromo.validTo
      };
    }

    return baseOffer;
  });
};

/**
 * Generate comprehensive FAQ structured data for pricing-related questions
 */
const generateFAQSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage", 
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What's included in the Start package?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Start package includes a responsive website up to 7 pages, contact form, basic SEO optimization, 1 year hosting, and 2 months technical support. Perfect for small businesses starting online."
      }
    },
    {
      "@type": "Question",
      "name": "How long does web development take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Development time varies by package: Start (2-3 weeks), Standard (3-4 weeks), Pro (4-6 weeks), Enterprise (6-12 weeks). We provide detailed timelines during initial consultation."
      }
    },
    {
      "@type": "Question",
      "name": "Do you provide ongoing support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! All packages include technical support: Start (2 months), Standard (6 months), Pro (12 months), Enterprise (unlimited). We also offer extended support contracts."
      }
    },
    {
      "@type": "Question",
      "name": "What makes your pricing competitive?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our transparent pricing includes hosting, domain, basic SEO, and support with no hidden costs. New clients get 70% discount on Start package. We offer the best value in Polish market."
      }
    }
  ]
});

/**
 * Generate BreadcrumbList for better navigation understanding
 */
const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://changecanvas.pl"
    },
    {
      "@type": "ListItem", 
      "position": 2,
      "name": "Services",
      "item": "https://changecanvas.pl#services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Pricing",
      "item": "https://changecanvas.pl#pricing"
    }
  ]
});

/**
 * Main structured data component for comprehensive SEO
 */
const StructuredData: React.FC<StructuredDataProps> = ({ 
  packages, 
  activePromotions = [],
  organizationInfo = defaultOrganizationInfo
}) => {
  // Generate all structured data schemas
  const organizationSchema = generateOrganizationSchema(organizationInfo);
  const serviceSchema = generateServiceSchema(packages, organizationInfo);
  const offersSchemas = generateOffersSchema(packages, activePromotions, organizationInfo);
  const faqSchema = generateFAQSchema();
  const breadcrumbSchema = generateBreadcrumbSchema();

  return (
    <Helmet>
      {/* Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* Service Schema */}
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>

      {/* Individual Offer Schemas */}
      {offersSchemas.map((offerSchema, index) => (
        <script key={`offer-${index}`} type="application/ld+json">
          {JSON.stringify(offerSchema)}
        </script>
      ))}

      {/* FAQ Schema */}
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      {/* Breadcrumb Schema */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      {/* Enhanced meta tags for better SEO */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Pricing-specific meta tags */}
      <meta name="price" content={`${Math.min(...packages.map(p => p.currentPrice))}-${Math.max(...packages.map(p => p.currentPrice))} PLN`} />
      <meta name="priceCurrency" content="PLN" />
      <meta name="availability" content="InStock" />
      
      {/* Local business meta tags for Polish market */}
      <meta name="geo.region" content="PL" />
      <meta name="geo.placename" content="Warsaw, Poland" />
      <meta name="geo.position" content="52.2297700;21.0117800" />
      <meta name="ICBM" content="52.2297700, 21.0117800" />
      
      {/* Commercial intent signals */}
      <meta name="commerce" content="true" />
      <meta name="service-type" content="web-development" />
      <meta name="target-market" content="poland, small-business, startup" />
    </Helmet>
  );
};

export default StructuredData;