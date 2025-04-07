
import { ArrowRight, Globe, PenTool, HandHelping } from "lucide-react";

const ServiceCard = ({ 
  title, 
  description, 
  icon: Icon 
}: { 
  title: string;
  description: string;
  icon: React.ElementType;
}) => {
  return (
    <div className="service-card">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-6">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <h3 className="text-xl font-display mb-3">{title}</h3>
      <p className="text-foreground/70 mb-6">{description}</p>
      <a href="#contact" className="inline-flex items-center text-primary hover:underline">
        Learn more
        <ArrowRight className="ml-2 h-4 w-4" />
      </a>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display mb-4">What we do</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Change is about making honest, useful websites.
            We work with small businesses, friends with ideas, and people who care about what they do.
            No fancy tech talk — just clear structure, clean look, and real attention.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard 
            title="Website from scratch" 
            description="Need a website? We'll handle everything — layout, design, content, launch. You won't have to think about DNS or CMS or whatever. Just focus on your business."
            icon={Globe}
          />
          <ServiceCard 
            title="Fix your old site" 
            description="Got a site that feels outdated, slow or confusing? We'll keep what works, update what doesn't, and make it feel fresh again."
            icon={PenTool}
          />
          <ServiceCard 
            title="Simple updates & support" 
            description="Need to change a photo? Add a page? We're here. No contracts, no subscriptions — just help when you need it."
            icon={HandHelping}
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
