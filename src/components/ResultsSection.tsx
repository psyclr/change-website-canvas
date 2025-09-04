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
      title: 'Max Tempo - Музыкальная платформа',
      description: 'Полнофункциональная стриминговая платформа с интерактивным плеером, персонализированными плейлистами и адаптивным дизайном. Реализован поиск по исполнителям, жанрам и настроению.',
      url: 'https://max-tempo.com',
      screenshots: [
        '/portfolio/max-tempo-homepage.jpg', // Главная страница с плеером
        '/portfolio/max-tempo-catalog.jpg',  // Каталог музыки
        '/portfolio/max-tempo-player.jpg',   // Интерактивный плеер
        '/portfolio/max-tempo-mobile.jpg'    // Мобильная версия
      ],
      screenshotLabels: [
        'Главная страница с интерактивным плеером',
        'Каталог музыки с фильтрами',
        'Расширенный музыкальный плеер',
        'Адаптивная мобильная версия'
      ]
    },
    {
      title: 'Интернет-магазин электроники',
      description: 'Современный e-commerce с удобной навигацией и быстрой оплатой',
      url: 'https://example-electronics.com',
      screenshots: [
        '/api/placeholder/800/600', // Главная страница
        '/api/placeholder/800/600', // Каталог товаров
        '/api/placeholder/800/600', // Страница товара
        '/api/placeholder/800/600'  // Корзина
      ]
    },
    {
      title: 'Корпоративный сайт юридической фирмы',
      description: 'Профессиональный сайт с формами обратной связи и каталогом услуг',
      url: 'https://example-law.com',
      screenshots: [
        '/api/placeholder/800/600', // Главная
        '/api/placeholder/800/600', // О компании
        '/api/placeholder/800/600', // Услуги
        '/api/placeholder/800/600'  // Контакты
      ]
    },
    {
      title: 'Лендинг для стартапа',
      description: 'Яркий одностраничник с анимациями и формой подписки',
      url: 'https://example-startup.com',
      screenshots: [
        '/api/placeholder/800/600', // Hero секция
        '/api/placeholder/800/600', // Преимущества
        '/api/placeholder/800/600', // Тарифы
        '/api/placeholder/800/600'  // Форма подписки
      ]
    }
  ];

  return (
    <SectionContainer variant="dark" id="results" className="min-h-screen flex items-center justify-center">
      {/* Заголовок и описание секции - вынесены над карточкой */}
      <div className="text-center mb-8 md:mb-12 relative z-20">
        <h2 className="text-3xl md:text-4xl font-heading font-medium mb-6 text-fg">
          Примеры работ
        </h2>
      </div>

      {/* Контейнер для родительской карусели: стрелка / карточка / стрелка */}
      <div className="flex items-center justify-center gap-6 relative z-20 ml-24">
        {/* Внешняя карусель - переключение между проектами */}
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full max-w-4xl"
        >
          {/* Левая стрелка родительской карусели */}
          <CarouselPrevious className="text-fg/50 bg-fg/5 backdrop-blur-sm border-fg/10 hover:bg-fg/15 hover:text-fg/70 h-16 w-6 absolute -left-10 top-1/2 -translate-y-1/2 rounded-full transition-all duration-200 z-30" />
          
          <CarouselContent>
            {projects.map((project, projectIndex) => (
              <CarouselItem key={projectIndex} className="basis-full">
                {/* SectionGlassCard с внутренней каруселью - убираем отступы */}
                <SectionGlassCard variant="dark" className="!mx-0 !p-4 md:!p-6 lg:!p-8">
                  <div className="relative z-20">
                    {/* Заголовок и описание проекта */}
                    <div className="mb-6 text-center">
                      <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                        {project.title}
                      </h3>
                      <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
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
                              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-white/10 group-hover:scale-[1.02] transition-transform duration-300">
                                <img
                                  src={screenshot}
                                  alt={project.screenshotLabels ? project.screenshotLabels[screenshotIndex] : `${project.title} - скриншот ${screenshotIndex + 1}`}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                                {/* Overlay для лучшей видимости */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-colors duration-300" />
                                
                                {/* Подпись скриншота */}
                                {project.screenshotLabels && (
                                  <div className="absolute bottom-4 left-4 right-4">
                                    <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm">
                                      {project.screenshotLabels[screenshotIndex]}
                                    </div>
                                  </div>
                                )}
                                
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
                      <CarouselPrevious className="text-white/50 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 hover:text-white/80 h-12 w-12 absolute left-2 top-1/2 -translate-y-1/2 rounded-full transition-all duration-200 z-30 shadow-lg" />
                      <CarouselNext className="text-white/50 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 hover:text-white/80 h-12 w-12 absolute right-2 top-1/2 -translate-y-1/2 rounded-full transition-all duration-200 z-30 shadow-lg" />
                      
                      {/* Индикаторы скриншотов */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                        {project.screenshots.map((_, index) => (
                          <div 
                            key={index} 
                            className="w-2 h-2 rounded-full bg-white/30 transition-all duration-200"
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