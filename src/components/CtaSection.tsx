
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  return (
    <section id="get-started" className="py-20 md:py-28 bg-gradient-to-b from-white to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center bg-white p-10 rounded-2xl shadow-sm border border-border/20">
          <h2 className="text-3xl md:text-4xl font-display mb-6 text-gradient">Want a website that actually feels like yours?</h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
            Message us. No pressure — just a real conversation.
          </p>
          <Button asChild size="lg" className="rounded-full shadow-md hover:shadow-lg transition-all duration-300">
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
