import React from 'react';
import { Phone, MessageCircle, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickActionProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({ href, icon: Icon, label, onClick }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className="flex flex-col items-center justify-center py-2 px-3 text-fg/70 hover:text-accent transition-colors duration-200 focus-ring rounded-lg"
    >
      <Icon className="h-5 w-5 mb-1" />
      <span className="text-xs font-medium">{label}</span>
    </a>
  );
};

/**
 * MobileBottomBar component for Bold Contrast design system
 * Provides quick access to key actions on mobile devices
 * Hidden on desktop (md+ breakpoints)
 */
const MobileBottomBar: React.FC = () => {
  const quickActions: QuickActionProps[] = [
    {
      href: "tel:+48123456789",
      icon: Phone,
      label: "Звонок"
    },
    {
      href: "#chat",
      icon: MessageCircle,
      label: "Чат",
      onClick: () => {
        // Handle chat opening logic here
        console.log('Opening chat...');
      }
    },
    {
      href: "#demo",
      icon: Play,
      label: "Демо",
      onClick: () => {
        // Handle demo opening logic here
        console.log('Opening demo...');
      }
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 h-14 bg-bg/95 backdrop-blur-sm border-t border-muted md:hidden">
      <div className="h-full flex items-center justify-around px-4">
        {quickActions.map((action) => (
          <QuickAction
            key={action.href}
            href={action.href}
            icon={action.icon}
            label={action.label}
            onClick={action.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileBottomBar;