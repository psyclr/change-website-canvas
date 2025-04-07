
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  return (
    <section id="get-started" className="section-spacing relative overflow-hidden">
      {/* Creative background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-primary/5 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-[#FDE1D3]/10 to-transparent -z-10"></div>
      
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center p-16 md:p-20 relative">
          {/* Decorative shapes */}
          <div className="absolute -right-10 top-0 w-40 h-40 border border-primary/10 rounded-full -z-10"></div>
          <div className="absolute -left-10 bottom-0 w-40 h-40 border border-primary/10 rounded-full -z-10"></div>
          <div className="absolute right-1/4 bottom-10 w-20 h-20 bg-[#FEF7CD]/30 rounded-full blur-xl -z-10"></div>
          
          <h2 className="text-3xl md:text-4xl font-display mb-10 font-light">Want a website that actually feels like yours?</h2>
          <p className="text-lg text-foreground/70 mb-12 leading-relaxed max-w-xl mx-auto">
            Message us. No pressure — just a real conversation.
          </p>
          <Button asChild size="lg" className="rounded-full shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-primary to-primary/90">
            <a href="#contact" className="flex items-center gap-2 h-14 px-8">
              Start project <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
