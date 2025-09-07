
import Header from "@/components/layout/Header";
import HeroSection from "@/components/HeroSection";
import HeroArrow from "@/components/HeroArrow";
import ProcessSection from "@/components/ProcessSection";
import AboutArrow from "@/components/AboutArrow";
import ResultsSection from "@/components/ResultsSection";
import ResultsArrow from "@/components/ResultsArrow";
import PricingSection from "@/components/PricingSection";
import GlobalGraffitiLine from "@/components/GlobalGraffitiLine";
import SEOHead from "@/components/seo/SEOHead";
import StructuredData from "@/components/seo/StructuredData";
import { lazy, Suspense } from 'react';

// Lazy load heavy components that are below the fold
const BriefSection = lazy(() => import("@/components/BriefSection"));
import { Mail, MapPin, Phone, Globe, Wrench, HeadphonesIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getLocalizedContactInfo } from '@/utils/culturalAdaptations';

const Index = () => {
  const { t } = useTranslation('common');
  const contactInfo = getLocalizedContactInfo();

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* SEO Meta Tags and Structured Data */}
      <SEOHead 
        title={t('seo.homepage_title', { defaultValue: 'Change | Websites that just work' })}
        description={t('seo.homepage_description', { defaultValue: 'We make normal websites for people who just want things to work. No noise, no pushy marketing — just clear, good websites that reflect what your business really is.' })}
        keywords={t('seo.homepage_keywords', { defaultValue: 'website development, web design, change management, digital transformation, business websites, Poland, Wrocław' })}
        type="website"
      />
      <StructuredData type="organization" />
      <StructuredData type="website" />
      
      {/* Глобальная граффити-линия на уровне всей страницы */}
      <GlobalGraffitiLine />
      
      <Header className="relative z-50 fixed top-0 left-0 right-0" />
      
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>
      
      <main id="main-content" className="relative z-20 min-h-screen" role="main">
        {/* Hero Section */}
        <section aria-labelledby="hero-heading" style={{scrollSnapAlign: 'start'}}>
          <HeroSection />
          <HeroArrow />
        </section>
        
        {/* Process Section */}
        <section id="process" aria-labelledby="process-heading" style={{scrollSnapAlign: 'start'}}>
          <ProcessSection />
          <AboutArrow />
        </section>
        
        {/* Results Section */}
        <section id="results" aria-labelledby="results-heading" style={{scrollSnapAlign: 'start'}}>
          <ResultsSection />
          <ResultsArrow />
        </section>
        
        {/* Pricing Section */}
        <section id="pricing" aria-labelledby="pricing-heading" style={{scrollSnapAlign: 'start'}}>
          <PricingSection />
        </section>
        
        {/* Brief Section */}
        <section id="brief" aria-labelledby="brief-heading" style={{scrollSnapAlign: 'start'}} className="flex flex-col">
          <Suspense fallback={
            <div className="min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="animate-pulse text-foreground/50">Loading brief...</div>
              </div>
            </div>
          }>
            <BriefSection />
          </Suspense>
          
          {/* Contact Footer */}
          <footer id="contact" role="contentinfo" className="py-6">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Company Info */}
                <div>
                  <div className="mb-3">
                    <h2 className="text-xl font-display text-primary font-light">Change</h2>
                  </div>
                  <p className="text-foreground/70 max-w-xs leading-tight text-sm">
                    {t('footer.company_description')}
                  </p>
                </div>
                
                {/* Contact Information */}
                <address className="not-italic">
                  <h3 className="text-base font-display mb-2 font-light">{t('footer.contact_title')}</h3>
                  <ul className="space-y-1">
                    <li className="flex items-start">
                      <Mail className="h-3 w-3 text-primary mr-2 mt-1" aria-hidden="true" />
                      <a 
                        href={`mailto:${contactInfo.email}`} 
                        className="text-foreground/70 hover:text-foreground text-sm leading-tight"
                        aria-label={`Send email to ${contactInfo.email}`}
                      >
                        {contactInfo.email}
                      </a>
                    </li>
                    <li className="flex items-start">
                      <Phone className="h-3 w-3 text-primary mr-2 mt-1" aria-hidden="true" />
                      <a 
                        href={`tel:${contactInfo.phone}`} 
                        className="text-foreground/70 hover:text-foreground text-sm leading-tight"
                        aria-label={`Call us at ${contactInfo.phone}`}
                      >
                        {contactInfo.phone}
                      </a>
                    </li>
                    <li className="flex items-start">
                      <MapPin className="h-3 w-3 text-primary mr-2 mt-1" aria-hidden="true" />
                      <span className="text-foreground/70 text-sm leading-tight">{contactInfo.address}</span>
                    </li>
                  </ul>
                </address>
                
                {/* Services Navigation */}
                <nav aria-label="Services">
                  <h3 className="text-base font-display mb-2 font-light">{t('footer.services_title')}</h3>
                  <ul className="space-y-1">
                    <li className="flex items-start">
                      <Globe className="h-3 w-3 text-primary mr-2 mt-1" aria-hidden="true" />
                      <a 
                        href="#pricing" 
                        className="text-foreground/70 hover:text-foreground text-sm leading-tight"
                        aria-label="Learn about new website development services"
                      >
                        {t('footer.services.new_website')}
                      </a>
                    </li>
                    <li className="flex items-start">
                      <Wrench className="h-3 w-3 text-primary mr-2 mt-1" aria-hidden="true" />
                      <a 
                        href="#pricing" 
                        className="text-foreground/70 hover:text-foreground text-sm leading-tight"
                        aria-label="Learn about website optimization services"
                      >
                        {t('footer.services.fix_website')}
                      </a>
                    </li>
                    <li className="flex items-start">
                      <HeadphonesIcon className="h-3 w-3 text-primary mr-2 mt-1" aria-hidden="true" />
                      <a 
                        href="#pricing" 
                        className="text-foreground/70 hover:text-foreground text-sm leading-tight"
                        aria-label="Learn about ongoing website support services"
                      >
                        {t('footer.services.support')}
                      </a>
                    </li>
                  </ul>
                </nav>
                
                {/* Social Media */}
                <div>
                  <h3 className="text-base font-display mb-2 font-light">{t('footer.follow_title')}</h3>
                  <div className="flex space-x-3" role="list" aria-label="Social media links">
                    <a 
                      href="https://twitter.com/changestudio" 
                      className="text-foreground/60 hover:text-foreground transition-colors"
                      aria-label="Follow us on Twitter"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                      </svg>
                    </a>
                    <a 
                      href="https://instagram.com/changestudio" 
                      className="text-foreground/60 hover:text-foreground transition-colors"
                      aria-label="Follow us on Instagram"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
                      </svg>
                    </a>
                    <a 
                      href="https://linkedin.com/company/changestudio" 
                      className="text-foreground/60 hover:text-foreground transition-colors"
                      aria-label="Follow us on LinkedIn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Copyright */}
              <div className="mt-4 pt-3 border-t border-border/10 text-center">
                <p className="text-xs text-foreground/50">
                  {t('footer.copyright', { year: new Date().getFullYear() })}
                </p>
              </div>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
};

export default Index;
