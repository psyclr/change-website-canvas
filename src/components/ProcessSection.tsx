
const ProcessSection = () => {
  return (
    <section id="process" className="section-spacing bg-white">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto mb-24">
          <h2 className="text-3xl md:text-4xl font-display mb-8 font-light">How we work</h2>
          <p className="text-lg text-foreground/70 leading-relaxed">
            A simple process that puts you first.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto space-y-16">
          <div className="timeline-item pl-12">
            <h3 className="text-2xl font-display mb-4 font-light">1. Talk</h3>
            <p className="text-foreground/70 leading-relaxed">
              You tell us what you want (or what you don't like about your current site). We listen.
            </p>
          </div>
          
          <div className="timeline-item pl-12">
            <h3 className="text-2xl font-display mb-4 font-light">2. Build</h3>
            <p className="text-foreground/70 leading-relaxed">
              We design and create your site. You see progress. We adjust along the way.
            </p>
          </div>
          
          <div className="timeline-item pl-12">
            <h3 className="text-2xl font-display mb-4 font-light">3. Launch</h3>
            <p className="text-foreground/70 leading-relaxed">
              Your site goes live. You get a short guide, and we stay in touch if you need us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
