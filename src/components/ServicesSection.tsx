
import { ArrowRight, Globe, PenTool, Share2 } from "lucide-react";

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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display mb-4">What we do</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Simple, focused services that solve real business problems without unnecessary complexity.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard 
            title="Website Design" 
            description="Clean, focused websites that help your customers understand what you offer in seconds."
            icon={Globe}
          />
          <ServiceCard 
            title="Brand Identity" 
            description="Visual language that communicates your values and connects with your audience."
            icon={PenTool}
          />
          <ServiceCard 
            title="Digital Strategy" 
            description="Practical approaches to get your message to the right people at the right time."
            icon={Share2}
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
