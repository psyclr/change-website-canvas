import React from 'react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';

interface ContactCardProps {
  title: string;
  children: React.ReactNode;
}

/**
 * ContactCard - стеклянная карточка для контактной формы
 */
const ContactCard: React.FC<ContactCardProps> = ({
  title,
  children
}) => {
  return (
    <GlassCard className="p-8 max-w-md mx-auto">
      {/* Заголовок */}
      <h2 className="text-2xl font-heading font-medium mb-6 text-center text-fg">
        {title}
      </h2>
      
      {/* Содержимое */}
      {children}
    </GlassCard>
  );
};

export default ContactCard;