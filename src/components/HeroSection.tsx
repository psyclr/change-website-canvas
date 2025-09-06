
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import SectionContainer from "@/components/layout/SectionContainer";

const HeroSection = () => {
  return (
    <SectionContainer
      variant="light"
      isFirstSection={true}
      className="min-h-[80vh] flex items-center justify-center relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-12 animate-fade-in font-light relative z-10">
          Бизнесу нужен нормальный <span className="font-medium">сайт</span>.
        </h1>

        <div className="flex flex-col sm:flex-row gap-8 justify-center animate-fade-in mb-8" style={{ animationDelay: "0.4s" }}>
          <Button asChild size="lg" className="rounded-full shadow-md hover:shadow-lg group transition-all duration-300 bg-gradient-to-r from-primary to-primary/90">
            <a href="#brief" className="flex items-center gap-2 h-14 px-8">
              Заполнить бриф <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full border-primary/20 h-14 px-8 hover:bg-primary/5">
            <a href="#results">Примеры работ</a>
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
};

export default HeroSection;
