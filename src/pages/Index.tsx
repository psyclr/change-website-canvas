
import Header from "@/components/layout/Header";
import HeroSection from "@/components/HeroSection";
import HeroArrow from "@/components/HeroArrow";
import ProcessSection from "@/components/ProcessSection";
import AboutArrow from "@/components/AboutArrow";
import ResultsSection from "@/components/ResultsSection";
import ResultsArrow from "@/components/ResultsArrow";
import BriefSection from "@/components/BriefSection";
import Footer from "@/components/Footer";
import GlobalGraffitiLine from "@/components/GlobalGraffitiLine";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative" style={{scrollSnapType: 'y mandatory', overflowY: 'scroll', height: '100vh'}}>
      {/* Глобальная граффити-линия на уровне всей страницы */}
      <GlobalGraffitiLine />
      
      <Header className="relative z-50 fixed top-0 left-0 right-0" />
      <main className="relative z-10">
        <div style={{scrollSnapAlign: 'start'}}>
          <HeroSection />
          <HeroArrow />
        </div>
        <div style={{scrollSnapAlign: 'start'}}>
          <ProcessSection />
          <AboutArrow />
        </div>
        <div style={{scrollSnapAlign: 'start'}}>
          <ResultsSection />
          <ResultsArrow />
        </div>
        <div style={{scrollSnapAlign: 'start'}} className="h-screen flex flex-col">
          <BriefSection />
        </div>
      </main>
    </div>
  );
};

export default Index;
