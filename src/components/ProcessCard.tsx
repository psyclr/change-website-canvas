import React from 'react';
import { LucideIcon } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

interface ProcessCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  step: number;
}

/**
 * ProcessCard - стеклянная карточка для отображения шагов процесса
 */
const ProcessCard: React.FC<ProcessCardProps> = ({
  icon: Icon,
  title,
  description,
  step
}) => {
  return (
    <GlassCard variant="light" className="p-6 text-center relative">
      {/* Номер шага */}
      <div className="absolute -top-3 -left-3 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-medium shadow-lg">
        {step}
      </div>
      
      {/* Иконка */}
      <div className="mb-4 flex justify-center">
        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Icon className="w-6 h-6 text-accent" />
        </div>
      </div>
      
      {/* Заголовок */}
      <h3 className="text-lg font-medium mb-3 text-fg">
        {title}
      </h3>
      
      {/* Описание */}
      <p className="text-fg/70 text-sm leading-relaxed">
        {description}
      </p>
    </GlassCard>
  );
};

export default ProcessCard;