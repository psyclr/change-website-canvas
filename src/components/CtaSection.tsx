
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  return (
    <section id="get-started" className="py-28 md:py-36 bg-gradient-to-b from-white to-primary/5">
      <div className="container mx-auto px-6 sm:px-10">
        <div className="max-w-2xl mx-auto text-center p-12 rounded-3xl">
          <h2 className="text-3xl md:text-4xl font-display mb-8 font-normal">Want a website that actually feels like yours?</h2>
          <p className="text-lg text-foreground/70 mb-10 leading-relaxed">
            Message us. No pressure — just a real conversation.
          </p>
          <Button asChild size="lg" className="rounded-full shadow-sm hover:shadow-md transition-all duration-300 bg-primary/90 hover:bg-primary">
            <a href="#contact" className="flex items-center gap-2">
              Start project <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
