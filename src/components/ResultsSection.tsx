import React, { useState } from 'react';
import SectionContainer from '@/components/layout/SectionContainer';
import Sticker from '@/components/ui/Sticker';
import ImageModal from '@/components/ui/ImageModal';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ModalState {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
}

const ResultsSection: React.FC = () => {
  const { t } = useTranslation('common');
  
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    imageSrc: '',
    imageAlt: '',
    title: '',
    description: ''
  });

  const openModal = (imageSrc: string, imageAlt: string, title: string, description: string) => {
    setModal({
      isOpen: true,
      imageSrc,
      imageAlt,
      title,
      description
    });
  };

  const closeModal = () => {
    setModal(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <SectionContainer variant="light" id="results" className="min-h-screen flex items-center justify-center py-20">
      <div className="container-wide">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок секции */}
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-heading font-medium mb-6">
              {t('results.title')}
            </h2>
            <p className="text-lg text-fg/70 max-w-2xl mx-auto">
              {t('results.subtitle')}
            </p>
          </div>

          {/* Стикеры со скриншотами реального проекта */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            
            {/* Стикер 1 - Главная страница */}
            <div className="flex justify-center">
              <Sticker rotation={-2} className="max-w-xs">
                <div className="space-y-3">
                  <div 
                    className="aspect-[4/3] rounded-lg overflow-hidden bg-white/10 cursor-pointer hover:scale-105 transition-transform duration-200 relative group"
                    onClick={() => openModal(
                      "./portfolio/maxtempo-homepage.jpg",
                      t('results.portfolio.page1.title'),
                      t('results.portfolio.page1.title'),
                      t('results.portfolio.page1.description')
                    )}
                  >
                    <img
                      src="./portfolio/maxtempo-homepage.jpg"
                      alt={t('results.portfolio.page1.title')}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75"
                      loading="lazy"
                    />
                    {/* Overlay с лупой при наведении */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                        <Search className="h-6 w-6 text-gray-700" />
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="mb-2 font-bold text-lg">{t('results.portfolio.page1.title')}</div>
                    <div className="text-sm">{t('results.portfolio.page1.description')}</div>
                  </div>
                </div>
              </Sticker>
            </div>

            {/* Стикер 2 - Портфолио */}
            <div className="flex justify-center">
              <Sticker rotation={1} className="max-w-xs">
                <div className="space-y-3">
                  <div 
                    className="aspect-[4/3] rounded-lg overflow-hidden bg-white/10 cursor-pointer hover:scale-105 transition-transform duration-200 relative group"
                    onClick={() => openModal(
                      "./portfolio/maxtempo-portfolio.jpg",
                      t('results.portfolio.page2.title'),
                      t('results.portfolio.page2.title'),
                      t('results.portfolio.page2.description')
                    )}
                  >
                    <img
                      src="./portfolio/maxtempo-portfolio.jpg"
                      alt={t('results.portfolio.page2.title')}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75"
                      loading="lazy"
                    />
                    {/* Overlay с лупой при наведении */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                        <Search className="h-6 w-6 text-gray-700" />
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="mb-2 font-bold text-lg">{t('results.portfolio.page2.title')}</div>
                    <div className="text-sm">{t('results.portfolio.page2.description')}</div>
                  </div>
                </div>
              </Sticker>
            </div>

            {/* Стикер 3 - Услуги */}
            <div className="flex justify-center md:col-span-2 lg:col-span-1">
              <Sticker rotation={-1} className="max-w-xs">
                <div className="space-y-3">
                  <div 
                    className="aspect-[4/3] rounded-lg overflow-hidden bg-white/10 cursor-pointer hover:scale-105 transition-transform duration-200 relative group"
                    onClick={() => openModal(
                      "./portfolio/maxtempo-services.jpg",
                      t('results.portfolio.page3.title'),
                      t('results.portfolio.page3.title'),
                      t('results.portfolio.page3.description')
                    )}
                  >
                    <img
                      src="./portfolio/maxtempo-services.jpg"
                      alt={t('results.portfolio.page3.title')}
                      className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75"
                      loading="lazy"
                    />
                    {/* Overlay с лупой при наведении */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                        <Search className="h-6 w-6 text-gray-700" />
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="mb-2 font-bold text-lg">{t('results.portfolio.page3.title')}</div>
                    <div className="text-sm">{t('results.portfolio.page3.description')}</div>
                  </div>
                </div>
              </Sticker>
            </div>

          </div>
        </div>
      </div>

      {/* Модальное окно для увеличения скриншотов */}
      <ImageModal
        isOpen={modal.isOpen}
        onClose={closeModal}
        imageSrc={modal.imageSrc}
        imageAlt={modal.imageAlt}
        title={modal.title}
        description={modal.description}
      />
    </SectionContainer>
  );
};

export default ResultsSection;