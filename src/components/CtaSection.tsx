
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  return (
    <section id="get-started" className="section-spacing bg-gradient-to-b from-white to-primary/5">
      <div className="container-wide">
        <div className="max-w-2xl mx-auto text-center p-16 rounded-[2.5rem]">
          <h2 className="text-3xl md:text-4xl font-display mb-10 font-light">Want a website that actually feels like yours?</h2>
          <p className="text-lg text-foreground/70 mb-12 leading-relaxed">
            Message us. No pressure — just a real conversation.
          </p>
          <Button asChild size="lg" className="rounded-full shadow-md hover:shadow-lg transition-all duration-300">
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
