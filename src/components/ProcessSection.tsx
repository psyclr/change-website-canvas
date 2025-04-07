
const ProcessSection = () => {
  return (
    <section id="process" className="py-20 md:py-28 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display mb-4">How we work</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            A straightforward process focused on your needs and goals.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="timeline-item">
            <h3 className="text-xl font-display mb-2">1. We listen</h3>
            <p className="text-foreground/70">
              We start by understanding your business, your customers, and what makes you unique. No templates, no shortcuts.
            </p>
          </div>
          
          <div className="timeline-item">
            <h3 className="text-xl font-display mb-2">2. We design</h3>
            <p className="text-foreground/70">
              Together, we create a clean, focused design that communicates your message clearly and feels right for your brand.
            </p>
          </div>
          
          <div className="timeline-item">
            <h3 className="text-xl font-display mb-2">3. We build</h3>
            <p className="text-foreground/70">
              We develop a responsive website that works beautifully on every device and loads quickly for everyone.
            </p>
          </div>
          
          <div className="timeline-item">
            <h3 className="text-xl font-display mb-2">4. We launch</h3>
            <p className="text-foreground/70">
              Your site goes live with our support to make sure everything runs smoothly. We're here if you need changes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
