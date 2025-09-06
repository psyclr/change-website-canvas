import HandDrawnArrow from "@/components/ui/HandDrawnArrow";
import { SprayLine } from "@/components/spray/SprayLine";
import { useTranslation } from 'react-i18next';

const HeroArrow = () => {
  const { t } = useTranslation('common');
  const handleClick = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container-wide -mt-48">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={handleClick}
          className="w-full flex justify-between items-center animate-fade-in pb-8 px-16 py-8 overflow-visible cursor-pointer group transition-all duration-300"
          style={{ animationDelay: "0.6s" }}
        >
          {/* Левая стрелка */}
          <div className="group-hover:scale-110 transition-transform duration-300">
            <HandDrawnArrow />
          </div>

          {/* Текст между стрелками */}
          <div className="text-center relative">
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              {t('hero.arrow_text').split(' ').slice(0, 2).join(' ')} <span className="relative inline-block">
                {t('hero.arrow_text').split(' ').slice(2).join(' ')}
                {/* Спрайт под последним словом */}
                <div className="absolute top-full left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div style={{ filter: 'drop-shadow(0 0 1.5px black) drop-shadow(0 0 1.5px black)' }}>
                    <SprayLine
                      type="micro"
                      direction="horizontal"
                      length={120}
                      animated={true}
                      className="scale-100"
                    />
                  </div>
                </div>
              </span>
            </p>
          </div>

          {/* Правая стрелка */}
          <div className="group-hover:scale-110 transition-transform duration-300">
            <HandDrawnArrow />
          </div>
        </button>
      </div>
    </div>
  );
};

export default HeroArrow;