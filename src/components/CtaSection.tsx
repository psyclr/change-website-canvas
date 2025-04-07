
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section id="get-started" className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display mb-6">Want a website that actually feels like yours?</h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
            Message us. No pressure — just a real conversation.
          </p>
          <Button asChild size="lg" className="rounded-full">
            <a href="#contact">Start project</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
