import React from 'react';
import SectionContainer from '@/components/layout/SectionContainer';
import InteractiveBrief from '@/components/brief/InteractiveBrief';
import { useTranslation } from 'react-i18next';

const BriefSection: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <SectionContainer variant="light" id="brief" className="flex flex-col">
      {/* Основной контент брифа - компактная версия */}
      <div className="flex-1 pt-8 md:pt-12">
        <div className="w-full max-w-6xl mx-auto">
          {/* Заголовок и описание секции - компактные отступы */}
          <div className="text-center mb-4 md:mb-6 relative z-20">
            <h2 className="text-2xl md:text-3xl font-heading font-medium mb-3 text-fg">
              {t('brief.title')}
            </h2>
            <p className="text-base text-fg/70 max-w-2xl mx-auto mb-4">
              {t('brief.subtitle')}
            </p>
          </div>

          <InteractiveBrief />
        </div>
      </div>

    </SectionContainer>
  );
};

export default BriefSection;