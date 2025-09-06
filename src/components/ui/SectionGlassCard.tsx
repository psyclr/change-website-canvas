import React from 'react';
import { cn } from '@/lib/utils';

interface SectionGlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'dark';
}

/**
 * SectionGlassCard - большая стеклянная карточка для секций
 * Создает фон секции в виде стеклянной карточки поверх граффити-линии
 */
const SectionGlassCard: React.FC<SectionGlassCardProps> = ({
  children,
  className,
  variant = 'light'
}) => {
  // Делаем еще более прозрачной чем Header
  const glassStyles = variant === 'light' 
    ? {
        backgroundColor: 'rgba(255, 255, 255, 0.45)', // Очень прозрачная
        backdropFilter: 'blur(4px)', // backdrop-blur-sm = 4px
        WebkitBackdropFilter: 'blur(4px)',
        border: '1px solid rgba(209, 213, 219, 0.5)', // Более прозрачная граница
        borderRadius: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
      }
    : {
        backgroundColor: 'rgba(10, 10, 10, 0.85)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      };

  // Смещения для создания зигзага: светлые вправо, темные влево
  // Максимальные смещения чтобы край карточки далеко выходил за край граффити
  // Еще более уменьшенный левый отступ для светлых секций чтобы край карточки был посередине логотипа
  // Максимальный левый отступ для темных секций чтобы черная карточка доходила до 5-й точки зигзага граффити
  const offsetClasses = variant === 'light' 
    ? 'ml-4 mr-24 md:ml-8 md:mr-48 lg:ml-16 lg:mr-64' // Светлые смещены вправо
    : 'ml-40 mr-8 md:ml-80 md:mr-16 lg:ml-96 lg:mr-24'; // Темные смещены влево до 5-й точки

  return (
    <div
      style={glassStyles}
      className={cn(
        // Z-index для секционных карточек - самый низкий слой
        'relative z-10 p-8 md:p-12 lg:p-16',
        offsetClasses,
        className
      )}
    >
      {children}
    </div>
  );
};

export default SectionGlassCard;