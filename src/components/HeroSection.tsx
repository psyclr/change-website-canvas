
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 text-center md:text-left">
        <div className="max-w-3xl mx-auto md:mx-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 animate-fade-in">
            Websites that feel like <span className="highlight">real conversations</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto md:mx-0 animate-fade-in" style={{animationDelay: "0.2s"}}>
            We build clear, honest websites for businesses that want to connect with their customers. No jargon, no unnecessary complexity—just clean design that helps you be understood.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in" style={{animationDelay: "0.4s"}}>
            <Button asChild size="lg" className="rounded-full">
              <a href="#get-started">Get your site</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <a href="#services">See our work</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
