import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'dark';
  hover?: boolean;
}

/**
 * GlassCard - стеклянная карточка с эффектом backdrop-blur
 * Создает современный полупрозрачный эффект, подходящий для размещения поверх граффити-линии
 */
const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  variant = 'light',
  hover = true
}) => {
  const glassStyles = variant === 'light' 
    ? {
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    : {
        background: 'rgba(10, 10, 10, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      };

  return (
    <div
      style={glassStyles}
      className={cn(
        // Z-index для инфо-карточек поверх всего
        'relative z-20',
        // Hover эффекты через CSS классы
        hover && (variant === 'light' ? 'hover:-translate-y-1.5 hover:shadow-2xl' : 'hover:-translate-y-1.5'),
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;