
import { ArrowRight, Globe, PenTool, HandHelping } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ServiceCard = ({ 
  title, 
  description, 
  icon: Icon,
  color
}: { 
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}) => {
  return (
    <Card className="service-card overflow-hidden group border-0 shadow-sm hover:shadow-md">
      <CardContent className="p-10">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${color} mb-8 group-hover:scale-110 transition-all duration-300`}>
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-2xl font-display mb-5 font-light">{title}</h3>
        <p className="text-foreground/70 mb-8 leading-relaxed">{description}</p>
        <a 
          href="#contact" 
          className="inline-flex items-center text-primary group-hover:translate-x-1 transition-all duration-300"
        >
          Learn more
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </CardContent>
    </Card>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="section-spacing relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-primary/5 -z-20"></div>
      <div className="absolute -right-40 top-1/4 w-80 h-80 bg-[#FEF7CD]/30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -left-40 bottom-1/4 w-96 h-96 bg-[#F2FCE2]/20 rounded-full blur-3xl -z-10"></div>
      
      <div className="container-wide">
        <div className="max-w-3xl mx-auto mb-32">
          <h2 className="text-3xl md:text-4xl font-display mb-8 font-light">What we do</h2>
          <p className="text-lg text-foreground/70 leading-relaxed">
            Change is about making honest, useful websites.
            We work with small businesses, friends with ideas, and people who care about what they do.
            No fancy tech talk — just clear structure, clean look, and real attention.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          <ServiceCard 
            title="Website from scratch" 
            description="Need a website? We'll handle everything — layout, design, content, launch. You won't have to think about DNS or CMS or whatever. Just focus on your business."
            icon={Globe}
            color="bg-[#F2FCE2]"
          />
          <ServiceCard 
            title="Fix your old site" 
            description="Got a site that feels outdated, slow or confusing? We'll keep what works, update what doesn't, and make it feel fresh again."
            icon={PenTool}
            color="bg-[#FFDEE2]/50"
          />
          <ServiceCard 
            title="Simple updates & support" 
            description="Need to change a photo? Add a page? We're here. No contracts, no subscriptions — just help when you need it."
            icon={HandHelping}
            color="bg-[#D3E4FD]"
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
