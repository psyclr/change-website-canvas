
import { ArrowRight } from "lucide-react";
import SectionContainer from "@/components/layout/SectionContainer";
import { useTranslation, Trans } from 'react-i18next';
import { SprayButton } from "@/components/ui/SprayButton";

const HeroSection = () => {
  const { t } = useTranslation('common');
  
  const scrollToResults = () => {
    const resultsSection = document.getElementById('results');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
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

      </div>
    </SectionContainer>
  );
};

export default HeroSection;
