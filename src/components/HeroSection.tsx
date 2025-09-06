
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import SectionContainer from "@/components/layout/SectionContainer";
import { useTranslation, Trans } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation('common');
  
  return (
    <SectionContainer
      variant="light"
      isFirstSection={true}
      className="min-h-[80vh] flex items-center justify-center relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-8 sm:mb-12 animate-fade-in font-light relative z-10 px-4 sm:px-0">
          <Trans
            i18nKey="hero.title"
            components={{
              1: <span className="font-medium" />
            }}
          />
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center animate-fade-in mb-8 px-4 sm:px-0" style={{ animationDelay: "0.4s" }}>
          <Button asChild size="lg" className="rounded-full shadow-md hover:shadow-lg group transition-all duration-300 bg-gradient-to-r from-primary to-primary/90 w-full sm:w-auto">
            <a href="#brief" className="flex items-center gap-2 h-14 px-8">
              {t('hero.cta_primary')} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full border-primary/20 h-14 px-8 hover:bg-primary/5 w-full sm:w-auto">
            <a href="#results">{t('hero.cta_secondary')}</a>
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
};

export default HeroSection;
