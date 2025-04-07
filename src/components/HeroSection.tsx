
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-32 md:py-44 relative overflow-hidden">
      {/* Creative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-br from-[#FDE1D3]/30 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#E5DEFF]/20 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute -right-40 top-40 w-80 h-80 rounded-full border border-primary/5 -z-10"></div>
      <div className="absolute -left-20 bottom-20 w-60 h-60 rounded-full border border-primary/5 -z-10"></div>
      
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-12 animate-fade-in font-light relative z-10">
            You just need a <span className="highlight">normal website</span>. We'll make it.
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 mb-12 mx-auto animate-fade-in leading-relaxed" style={{animationDelay: "0.2s"}}>
            We're a small studio that makes websites for people who just want things to work.
            No noise, no pushy marketing, no 'we'll circle back later' — just clear, good websites that reflect what your business really is.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 animate-fade-in" style={{animationDelay: "0.4s"}}>
            <Button asChild size="lg" className="rounded-full shadow-md hover:shadow-lg group transition-all duration-300 bg-gradient-to-r from-primary to-primary/90">
              <a href="#get-started" className="flex items-center gap-2 h-14 px-8">
                Start project <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full border-primary/20 h-14 px-8 hover:bg-primary/5">
              <a href="#services">What we do</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
