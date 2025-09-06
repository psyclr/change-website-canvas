import React from 'react';
import { BriefData } from './types';

interface BriefPreviewProps {
  briefData: BriefData;
}

const BriefPreview: React.FC<BriefPreviewProps> = ({ briefData }) => {
  const getStyleClasses = () => {
    const style = briefData.style.toLowerCase();
    if (style.includes('минимализм')) {
      return 'font-light text-gray-800';
    } else if (style.includes('деловой') || style.includes('классический')) {
      return 'font-medium text-blue-900';
    } else if (style.includes('яркий') || style.includes('современный')) {
      return 'font-semibold text-orange-600';
    } else if (style.includes('творческий')) {
      return 'font-bold text-purple-700';
    }
    return 'font-normal text-gray-700';
  };

  const getColorScheme = () => {
    const style = briefData.style.toLowerCase();
    if (style.includes('минимализм')) {
      return { bg: 'bg-gray-50', accent: 'bg-gray-800' };
    } else if (style.includes('деловой') || style.includes('классический')) {
      return { bg: 'bg-blue-50', accent: 'bg-blue-600' };
    } else if (style.includes('яркий') || style.includes('современный')) {
      return { bg: 'bg-orange-50', accent: 'bg-orange-500' };
    } else if (style.includes('творческий')) {
      return { bg: 'bg-purple-50', accent: 'bg-purple-600' };
    }
    return { bg: 'bg-white', accent: 'bg-gray-600' };
  };

  const colors = getColorScheme();
  const styleClasses = getStyleClasses();

  return (
    <div className="bg-white rounded-xl border border-muted p-4 shadow-sm">
      <div className="text-xs text-fg/60 mb-3 text-center">Превью сайта</div>
      
      <div className={`rounded-lg overflow-hidden ${colors.bg} border`}>
        {/* Header */}
        <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
          <div className={`font-semibold ${styleClasses}`}>
            {briefData.business || 'Название компании'}
          </div>
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Hero Section */}
        <div className={`px-4 py-6 text-center ${colors.bg}`}>
          <h1 className={`text-lg font-bold mb-2 ${styleClasses}`}>
            {briefData.business || 'Ваш бизнес'}
          </h1>
          <p className="text-xs text-gray-600 mb-3">
            {briefData.audience ? `Для ${briefData.audience}` : 'Описание услуг'}
          </p>
          {(briefData.goals.includes('получать онлайн заявки') || briefData.goals.includes('привлекать новых клиентов')) && (
            <div className={`inline-block px-3 py-1 ${colors.accent} text-white text-xs rounded`}>
              Заказать услугу
            </div>
          )}
        </div>

        {/* Content Sections */}
        <div className="px-4 py-3 space-y-3">
          {(briefData.goals.includes('продавать товары/услуги') || briefData.goals.includes('предоставлять информацию о компании')) && (
            <div className="bg-white rounded p-2">
              <div className="text-xs font-medium mb-1">Услуги</div>
              <div className="grid grid-cols-2 gap-1">
                <div className="bg-gray-100 rounded p-1 text-xs">Услуга 1</div>
                <div className="bg-gray-100 rounded p-1 text-xs">Услуга 2</div>
              </div>
            </div>
          )}

          {briefData.goals.includes('показывать портфолио работ') && (
            <div className="bg-white rounded p-2">
              <div className="text-xs font-medium mb-1">Наши работы</div>
              <div className="grid grid-cols-3 gap-1">
                <div className="bg-gray-200 aspect-square rounded"></div>
                <div className="bg-gray-200 aspect-square rounded"></div>
                <div className="bg-gray-200 aspect-square rounded"></div>
              </div>
            </div>
          )}

          {(briefData.features.includes('интерактивная карта проезда') || briefData.features.includes('интерактивная карта')) && (
            <div className="bg-white rounded p-2">
              <div className="text-xs font-medium mb-1">Где нас найти</div>
              <div className="bg-green-100 h-8 rounded flex items-center justify-center text-xs">
                Карта
              </div>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="px-4 py-3 bg-white border-t">
          <div className="text-xs font-medium mb-2">Контакты</div>
          <div className="flex justify-between items-center">
            {(briefData.features.includes('кнопка для быстрого звонка') || briefData.features.includes('кнопка звонка')) && (
              <div className={`px-2 py-1 ${colors.accent} text-white text-xs rounded`}>
                Позвонить
              </div>
            )}
            {(briefData.features.includes('форма обратной связи') || briefData.features.includes('форма заявки')) && (
              <div className="bg-gray-100 px-2 py-1 text-xs rounded">
                Оставить заявку
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 text-xs text-fg/60 space-y-1">
        {briefData.deadline && (
          <div>Срок: {briefData.deadline}</div>
        )}
        {briefData.budget && (
          <div>Бюджет: {briefData.budget}</div>
        )}
      </div>
    </div>
  );
};

export default BriefPreview;