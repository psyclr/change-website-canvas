import React from 'react';
import SectionContainer from '@/components/layout/SectionContainer';
import Sticker from '@/components/ui/Sticker';

const ProcessSection: React.FC = () => {
  return (
    <SectionContainer variant="light" id="about" className="min-h-screen flex items-center justify-center py-20">
      <div className="container-wide">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок секции */}
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-heading font-medium mb-6">
              О нас
            </h2>
          </div>

          {/* Стикеры с информацией */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            
            {/* Стикер 1 */}
            <div className="flex justify-center">
              <Sticker rotation={-3} className="max-w-xs">
                <div className="text-center">
                  <div className="mb-3 font-bold text-xl">Кто мы?</div>
                  <div>Мы решили делать сайты, чтобы помочь маленьким фирмам быть в интернете</div>
                </div>
              </Sticker>
            </div>

            {/* Стикер 2 */}
            <div className="flex justify-center">
              <Sticker rotation={2} className="max-w-xs">
                <div className="text-center">
                  <div className="mb-3 font-bold text-xl">Команда</div>
                  <div>Мы сами маленькая фирма — разработчик и дизайнер</div>
                </div>
              </Sticker>
            </div>

            {/* Стикер 3 */}
            <div className="flex justify-center md:col-span-2 lg:col-span-1">
              <Sticker rotation={-1} className="max-w-xs">
                <div className="text-center">
                  <div className="mb-3 font-bold text-xl">Технологии</div>
                  <div>Мы используем новейшие технологии, поэтому работаем быстро</div>
                </div>
              </Sticker>
            </div>

          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ProcessSection;