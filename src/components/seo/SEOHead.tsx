import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import CriticalCSS from './CriticalCSS';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'service';
  noIndex?: boolean;
  canonicalUrl?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  noIndex = false,
  canonicalUrl
}) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://change.studio';
  const currentUrl = url || baseUrl;
  
  // Default SEO values
  const seoTitle = title || t('seo.default_title', { defaultValue: 'Change | Websites that just work' });
  const seoDescription = description || t('seo.default_description', { 
    defaultValue: 'We make normal websites for people who just want things to work. No noise, no pushy marketing — just clear, good websites that reflect what your business really is.' 
  });
  const seoKeywords = keywords || t('seo.default_keywords', {
    defaultValue: 'website development, web design, change management, digital transformation, business websites, professional web services, Poland'
  });
  const seoImage = image || `${baseUrl}/og-image.png`;
  const canonical = canonicalUrl || currentUrl;

  // Create alternate language links
  const alternateLanguages = ['en', 'pl'].map(lang => ({
    lang,
    url: lang === 'en' ? baseUrl : `${baseUrl}/${lang}`
  }));

  return (
    <>
      {/* Critical CSS - Inline for fastest FCP */}
      <CriticalCSS />
      
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content="Change Studio" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1'} />
      <meta name="googlebot" content="index,follow" />
      
      {/* Language and Locale */}
      <html lang={currentLang} />
      <meta name="language" content={currentLang} />
      <meta name="geo.region" content="PL" />
      <meta name="geo.country" content="Poland" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Alternate Language Links */}
      {alternateLanguages.map(({ lang, url }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={baseUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:image:alt" content={seoTitle} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="Change Studio" />
      <meta property="og:locale" content={currentLang === 'pl' ? 'pl_PL' : 'en_US'} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@changestudio" />
      <meta name="twitter:creator" content="@changestudio" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:image:alt" content={seoTitle} />
      
      {/* Additional Meta Tags for Better SEO */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="application-name" content="Change Studio" />
      <meta name="apple-mobile-web-app-title" content="Change Studio" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="mobile-web-app-capable" content="yes" />
      
      {/* Preconnect to External Domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS Prefetch for Performance */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      
      {/* CSS Preloading - Load main CSS asynchronously */}
      <link 
        rel="preload" 
        href="/assets/index.css" 
        as="style" 
        onLoad="this.onload=null;this.rel='stylesheet'" 
      />
      <noscript><link rel="stylesheet" href="/assets/index.css" /></noscript>
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      </Helmet>
    </>
  );
};

export default SEOHead;