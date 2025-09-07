import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface StructuredDataProps {
  type?: 'organization' | 'website' | 'service' | 'article';
  data?: Record<string, any>;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type = 'organization', data = {} }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://change.studio';
  
  const getOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Change Studio",
    "alternateName": "Change",
    "description": t('seo.organization_description', { defaultValue: "Professional change management consulting services helping businesses transform and grow through strategic website development and digital solutions." }),
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "image": `${baseUrl}/og-image.png`,
    "founder": {
      "@type": "Person",
      "name": "Change Studio Team"
    },
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Poland",
      "addressCountry": "PL"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+48-123-456-789",
      "contactType": "Customer Service",
      "email": "hello@change.studio",
      "availableLanguage": ["Polish", "English"]
    },
    "sameAs": [
      "https://twitter.com/changestudio",
      "https://linkedin.com/company/changestudio",
      "https://instagram.com/changestudio"
    ],
    "services": [
      {
        "@type": "Service",
        "name": t('services.new_website', { defaultValue: "New Website Development" }),
        "description": t('services.new_website_desc', { defaultValue: "Custom website development services for businesses" })
      },
      {
        "@type": "Service", 
        "name": t('services.fix_website', { defaultValue: "Website Optimization" }),
        "description": t('services.fix_website_desc', { defaultValue: "Website performance optimization and fixes" })
      },
      {
        "@type": "Service",
        "name": t('services.support', { defaultValue: "Ongoing Support" }),
        "description": t('services.support_desc', { defaultValue: "Continuous website maintenance and support" })
      }
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Poland"
    },
    "priceRange": "$$",
    ...data
  });

  const getWebsiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Change Studio - Websites that just work",
    "description": t('seo.website_description', { defaultValue: "We make normal websites for people who just want things to work. No noise, no pushy marketing — just clear, good websites that reflect what your business really is." }),
    "url": baseUrl,
    "inLanguage": currentLang,
    "publisher": {
      "@type": "Organization",
      "name": "Change Studio",
      "logo": `${baseUrl}/logo.png`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "WebPage",
      "@id": `${baseUrl}/#webpage`,
      "url": baseUrl,
      "name": "Change Studio Homepage",
      "description": t('seo.homepage_description', { defaultValue: "Professional website development and change management consulting services" }),
      "inLanguage": currentLang,
      "isPartOf": {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`
      }
    },
    ...data
  });

  const getServiceSchema = () => ({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Change Studio Web Development Services",
    "description": t('seo.service_description', { defaultValue: "Professional website development and digital transformation services for businesses in Poland" }),
    "url": baseUrl,
    "image": `${baseUrl}/services-image.png`,
    "provider": {
      "@type": "Organization",
      "name": "Change Studio"
    },
    "serviceType": "Web Development & Digital Consulting",
    "areaServed": {
      "@type": "Country", 
      "name": "Poland"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": t('services.new_website', { defaultValue: "New Website Development" }),
            "description": t('services.new_website_desc', { defaultValue: "Complete website development from concept to launch" })
          },
          "priceRange": "2000-10000 PLN"
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": t('services.fix_website', { defaultValue: "Website Optimization" }),
            "description": t('services.fix_website_desc', { defaultValue: "Performance optimization and technical improvements" })
          },
          "priceRange": "1000-5000 PLN"
        }
      ]
    },
    ...data
  });

  const getBreadcrumbSchema = (breadcrumbs: Array<{name: string, url: string}>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  });

  const getFAQSchema = (faqs: Array<{question: string, answer: string}>) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  });

  const getSchema = () => {
    switch (type) {
      case 'organization':
        return getOrganizationSchema();
      case 'website':
        return getWebsiteSchema();
      case 'service':
        return getServiceSchema();
      case 'article':
        return data;
      default:
        return getOrganizationSchema();
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(getSchema(), null, 0)}
      </script>
    </Helmet>
  );
};

export default StructuredData;