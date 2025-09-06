import React from 'react';
import SectionContainer from '@/components/layout/SectionContainer';
import SectionGlassCard from '@/components/ui/SectionGlassCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ExternalLink } from 'lucide-react';

/**
 * ResultsSection - секция с портфолио работ
 * Внешняя карусель переключает между проектами
 * Внутренняя карусель показывает скриншоты каждого проекта
 */
const ResultsSection: React.FC = () => {
  const projects = [
    {
      title: 'MaxTempo - Usługi Alpinistyczne',
      description: 'Profesjonalny sайт компании альпинистских услуг. Современный дизайн, портфолио работ и подробное описание услуг для корпоративных клиентов.',
      url: 'https://max-tempo.com',
      screenshots: [
        '/portfolio/maxtempo-homepage.jpg',
        '/portfolio/maxtempo-portfolio.jpg', 
        '/portfolio/maxtempo-services.jpg'
      ],
      screenshotLabels: [
        'Главная страница с hero-секцией',
        'Портфолио реализованных проектов',
        'Описание услуг и процессов работы'
      ]
    }
  ];

  return (
    <SectionContainer variant="light" id="results" className="min-h-[60vh] flex flex-col items-center justify-start pt-24">
      {/* Заголовок и описание секции - компактные */}
      <div className="text-center mb-6 relative z-20">
        <h2 className="text-2xl md:text-3xl font-heading font-medium mb-4 text-fg">
          Примеры работ
        </h2>
      </div>

      {/* Контейнер для родительской карусели - более компактный */}
      <div className="flex items-center justify-center gap-6 relative z-20 max-w-4xl w-full px-4">
        {/* Внешняя карусель - переключение между проектами */}
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full max-w-3xl"
        >
          {/* Левая стрелка родительской карусели */}
          <CarouselPrevious className="text-fg/50 bg-fg/5 backdrop-blur-sm border-fg/10 hover:bg-fg/15 hover:text-fg/70 h-16 w-6 absolute -left-10 top-1/2 -translate-y-1/2 rounded-full transition-all duration-200 z-30" />
          
          <CarouselContent>
            {projects.map((project, projectIndex) => (
              <CarouselItem key={projectIndex} className="basis-full">
                {/* SectionGlassCard с внутренней каруселью - убираем отступы */}
                <SectionGlassCard variant="light" className="!mx-0 !p-3 md:!p-4">
                  <div className="relative z-20">
                    {/* Заголовок и описание проекта - более компактные */}
                    <div className="mb-4 text-center">
                      <h3 className="text-lg md:text-xl font-semibold text-fg mb-2">
                        {project.title}
                      </h3>
                      <p className="text-fg/70 text-xs md:text-sm leading-relaxed max-w-xl mx-auto">
                        {project.description}
                      </p>
                    </div>
                    
                    {/* Карусель скриншотов на весь размер карточки */}
                    <Carousel
                      opts={{
                        align: "center",
                        loop: true,
                      }}
                      className="w-full"
                    >
                      <CarouselContent>
                        {project.screenshots.map((screenshot, screenshotIndex) => (
                          <CarouselItem key={screenshotIndex} className="basis-full">
                            {/* Кликабельное изображение на весь размер */}
                            <a 
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block cursor-pointer group"
                            >
                              <div className="relative aspect-[5/3] rounded-xl overflow-hidden bg-white/10 group-hover:scale-[1.02] transition-transform duration-300">
                                <img
                                  src={screenshot}
                                  alt={project.screenshotLabels ? project.screenshotLabels[screenshotIndex] : `${project.title} - скриншот ${screenshotIndex + 1}`}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                                {/* Overlay для лучшей видимости */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent group-hover:from-black/20 transition-colors duration-300" />
                                
                                {/* Индикатор ссылки */}
                                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <ExternalLink className="h-4 w-4 text-white" />
                                </div>
                              </div>
                            </a>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      
                      {/* Элементы управления внутренней карусели - ВНУТРИ карточки */}
                      <CarouselPrevious className="text-fg/60 bg-white/80 backdrop-blur-sm border-fg/20 hover:bg-white hover:text-fg/80 h-12 w-12 absolute left-2 top-1/2 -translate-y-1/2 rounded-full transition-all duration-200 z-30 shadow-lg" />
                      <CarouselNext className="text-fg/60 bg-white/80 backdrop-blur-sm border-fg/20 hover:bg-white hover:text-fg/80 h-12 w-12 absolute right-2 top-1/2 -translate-y-1/2 rounded-full transition-all duration-200 z-30 shadow-lg" />
                      
                      {/* Индикаторы скриншотов */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                        {project.screenshots.map((_, index) => (
                          <div 
                            key={index} 
                            className="w-2 h-2 rounded-full bg-fg/40 transition-all duration-200"
                          />
                        ))}
                      </div>
                    </Carousel>
                  </div>
                </SectionGlassCard>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Правая стрелка родительской карусели */}
          <CarouselNext className="text-fg/50 bg-fg/5 backdrop-blur-sm border-fg/10 hover:bg-fg/15 hover:text-fg/70 h-16 w-6 absolute -right-10 top-1/2 -translate-y-1/2 rounded-full transition-all duration-200 z-30" />
        </Carousel>
      </div>
    </SectionContainer>
  );
};

export default ResultsSection;