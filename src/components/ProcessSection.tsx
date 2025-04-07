
const ProcessSection = () => {
  return (
    <section id="process" className="py-20 md:py-28 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display mb-4">How we work</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            A simple process that puts you first.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="timeline-item">
            <h3 className="text-xl font-display mb-2">1. Talk</h3>
            <p className="text-foreground/70">
              You tell us what you want (or what you don't like about your current site). We listen.
            </p>
          </div>
          
          <div className="timeline-item">
            <h3 className="text-xl font-display mb-2">2. Build</h3>
            <p className="text-foreground/70">
              We design and create your site. You see progress. We adjust along the way.
            </p>
          </div>
          
          <div className="timeline-item">
            <h3 className="text-xl font-display mb-2">3. Launch</h3>
            <p className="text-foreground/70">
              Your site goes live. You get a short guide, and we stay in touch if you need us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
