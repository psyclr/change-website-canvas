import React, { useState, useEffect } from 'react';
import { SprayLine } from './SprayLine';
import { cn } from '../../lib/utils';
import type { SprayDirection } from '../../utils/spray-utils';

interface SprayMarkerProps {
  trigger?: boolean; // When true, shows the marker
  direction?: SprayDirection;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
  className?: string;
  color?: string;
  isDark?: boolean;
  delay?: number; // Animation delay in ms
}

export const SprayMarker: React.FC<SprayMarkerProps> = ({
  trigger = false,
  direction = 'horizontal',
  position = 'left',
  size = 'medium',
  animated = true,
  className,
  color,
  isDark = false,
  delay = 0
}) => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (trigger) {
      const timer = setTimeout(() => {
        setShouldShow(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setShouldShow(false);
    }
  }, [trigger, delay]);

  // Size configurations
  const sizeConfig = {
    small: { length: 20, thickness: 'micro' as const },
    medium: { length: 40, thickness: 'micro' as const },
    large: { length: 60, thickness: 'underline' as const }
  };

  const { length, thickness } = sizeConfig[size];

  // Position styles
  const positionStyles = {
    left: 'absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full',
    right: 'absolute right-0 top-1/2 -translate-y-1/2 translate-x-full',
    top: 'absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full',
    bottom: 'absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full'
  };

  if (!shouldShow && !trigger) {
    return null;
  }

  return (
    <span 
      className={cn(
        'spray-marker',
        positionStyles[position],
        'pointer-events-none z-10',
        shouldShow ? 'opacity-100' : 'opacity-0',
        'transition-opacity duration-200',
        className
      )}
      style={{
        marginLeft: position === 'left' ? '-8px' : undefined,
        marginRight: position === 'right' ? '-8px' : undefined,
        marginTop: position === 'top' ? '-8px' : undefined,
        marginBottom: position === 'bottom' ? '-8px' : undefined,
      }}
    >
      <SprayLine
        type={thickness}
        direction={direction}
        length={length}
        animated={animated && shouldShow}
        color={color}
        isDark={isDark}
        className="spray-marker-line"
      />
    </span>
  );
};

export default SprayMarker;