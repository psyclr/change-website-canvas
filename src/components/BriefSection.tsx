import React, { lazy, Suspense } from 'react';
import SectionContainer from '@/components/layout/SectionContainer';
import { useTranslation } from 'react-i18next';

// Lazy load the InteractiveBrief component and its heavy dependencies
const InteractiveBrief = lazy(() => import('@/components/brief/InteractiveBrief'));

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

          <Suspense fallback={
            <div className="min-h-[300px] flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
                <div className="text-foreground/50 text-sm">Loading brief form...</div>
              </div>
            </div>
          }>
            <InteractiveBrief />
          </Suspense>
        </div>
      </div>

    </SectionContainer>
  );
};

export default BriefSection;