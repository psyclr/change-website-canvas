import React from 'react';
import { cn } from '@/lib/utils';

interface SectionContainerProps {
  variant: 'light' | 'dark' | 'transparent';
  children: React.ReactNode;
  className?: string;
  id?: string;
  useGrid?: boolean;
  isFirstSection?: boolean;
}

/**
 * SectionContainer component for Bold Contrast design system
 * Provides consistent section styling with light/dark variants and proper spacing
 * Supports optional 12-column grid system
 */
const SectionContainer: React.FC<SectionContainerProps> = ({
  variant,
  children,
  className,
  id,
  useGrid = false,
  isFirstSection = false
}) => {
  return (
    <section
      id={id}
      className={cn(
        // Base section styling with responsive spacing
        'section-spacing',
        // Add header offset for first section and scroll margin for all sections
        isFirstSection ? 'header-offset' : 'header-offset-section',
        // Variant-specific background and text colors
        variant === 'light' ? 'section-light' : 
        variant === 'dark' ? 'section-dark' : 'section-transparent',
        className
      )}
    >
      <div className="container-bold">
        {useGrid ? (
          <div className="grid grid-cols-12 gap-3 md:gap-4 lg:gap-6">
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </section>
  );
};

export default SectionContainer;