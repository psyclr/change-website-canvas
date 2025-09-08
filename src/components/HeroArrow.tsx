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
        <div
          onClick={handleClick}
          className="relative w-full h-40 cursor-pointer group"
        >
          {/* Левая стрелка */}
          <div className="absolute left-1/2 bottom-0 group-hover:scale-125 transition-transform duration-300" style={{ transform: 'translateX(calc(-50% - 18rem))' }}>
            <HandDrawnArrow />
          </div>

          {/* Правая стрелка */}
          <div className="absolute right-1/2 bottom-0 group-hover:scale-125 transition-transform duration-300" style={{ transform: 'translateX(calc(50% + 18rem))' }}>
            <HandDrawnArrow />
          </div>

          {/* Спрайт внизу */}
          <div className="absolute bottom-0 left-1/2 transition-transform duration-300" style={{ transform: 'translateX(calc(-50% + 1rem)) translateY(1rem) scaleY(0.85)' }}>
            <div className="group-hover:scale-125 transition-transform duration-300">
              <SprayLine
                type="micro"
                direction="horizontal"
                length={240}
                animated={true}
              />
            </div>
          </div>

          {/* Текст в середине */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center whitespace-nowrap">
              {t('hero.arrow_text')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroArrow;