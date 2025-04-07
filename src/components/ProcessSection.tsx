
import { Leaf, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";

const ProcessSection = () => {
  return (
    <section id="process" className="section-spacing bg-white overflow-hidden">
      <div className="container-wide relative">
        {/* Decorative background elements */}
        <div className="absolute top-40 right-0 w-64 h-64 bg-primary/5 rounded-full -z-10 blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-[#FEC6A1]/20 rounded-full -z-10 blur-3xl"></div>
        
        <div className="max-w-3xl mx-auto mb-24">
          <h2 className="text-3xl md:text-4xl font-display mb-8 font-light">How we work</h2>
          <p className="text-lg text-foreground/70 leading-relaxed">
            A simple process that puts you first.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-32 relative">
          {/* Connected line through timeline */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/10 via-primary/20 to-transparent"></div>
          
          <div className="timeline-item group">
            <div className="flex mb-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#F2FCE2] flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-sm">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-display ml-6 font-light self-center">1. Talk</h3>
            </div>
            <p className="text-foreground/70 leading-relaxed pl-24">
              You tell us what you want (or what you don't like about your current site). We listen.
            </p>
          </div>
          
          <div className="timeline-item group">
            <div className="flex mb-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#FFDEE2]/50 flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-sm">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-display ml-6 font-light self-center">2. Build</h3>
            </div>
            <p className="text-foreground/70 leading-relaxed pl-24">
              We design and create your site. You see progress. We adjust along the way.
            </p>
          </div>
          
          <div className="timeline-item group">
            <div className="flex mb-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#D3E4FD] flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-sm">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-display ml-6 font-light self-center">3. Launch</h3>
            </div>
            <p className="text-foreground/70 leading-relaxed pl-24">
              Your site goes live. You get a short guide, and we stay in touch if you need us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
