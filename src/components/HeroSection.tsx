
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-white pointer-events-none -z-10"></div>
      <div className="container mx-auto px-4 sm:px-6 text-center md:text-left">
        <div className="max-w-3xl mx-auto md:mx-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 animate-fade-in">
            You just need a <span className="highlight">normal website</span>. We'll make it.
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto md:mx-0 animate-fade-in" style={{animationDelay: "0.2s"}}>
            We're a small studio that makes websites for people who just want things to work.
            No noise, no pushy marketing, no 'we'll circle back later' — just clear, good websites that reflect what your business really is.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in" style={{animationDelay: "0.4s"}}>
            <Button asChild size="lg" className="rounded-full shadow-sm hover:shadow-md group">
              <a href="#get-started" className="flex items-center gap-2">
                Start project <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full border-primary/20">
              <a href="#services">What we do</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
