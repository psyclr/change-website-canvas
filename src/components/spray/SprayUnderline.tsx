import React from 'react';
import { SprayLine } from './SprayLine';
import { cn } from '../../lib/utils';
import type { SprayDirection } from '../../utils/spray-utils';

interface SprayUnderlineProps {
  children: React.ReactNode;
  direction?: SprayDirection;
  animated?: boolean;
  className?: string;
  color?: string;
  isDark?: boolean;
  offset?: number; // Distance below text in pixels
}

export const SprayUnderline: React.FC<SprayUnderlineProps> = ({
  children,
  direction = 'horizontal',
  animated = true,
  className,
  color,
  isDark = false,
  offset = 4
}) => {
  return (
    <span 
      className={cn(
        'spray-underline-wrapper',
        'relative inline-block',
        className
      )}
    >
      {children}
      <span 
        className="spray-underline-line absolute left-0 w-full pointer-events-none"
        style={{
          bottom: `-${offset}px`,
          height: '20px'
        }}
      >
        <SprayLine
          type="underline"
          direction={direction}
          length={100} // Will be adjusted by CSS to fit container
          animated={animated}
          color={color}
          isDark={isDark}
          className="w-full h-full"
        />
      </span>
    </span>
  );
};

export default SprayUnderline;