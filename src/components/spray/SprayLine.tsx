import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import {
  generateSprayPath,
  getSprayThickness,
  getOversprayThickness,
  getSprayOpacity,
  getSprayViewBox,
  type SprayDirection,
  type SprayType
} from '../../utils/spray-utils';
import { cn } from '../../lib/utils';
import '../../styles/spray-animations.css';

interface SprayLineProps {
  type: SprayType;
  direction?: SprayDirection;
  length?: number;
  animated?: boolean;
  className?: string;
  color?: string;
  isDark?: boolean;
}

export const SprayLine: React.FC<SprayLineProps> = ({
  type,
  direction = 'horizontal',
  length = 100,
  animated = true,
  className,
  color = 'var(--accent)',
  isDark = false
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [screenWidth, setScreenWidth] = useState(1024);
  const reducedMotion = useReducedMotion();
  
  // Disable animations if user prefers reduced motion
  const shouldAnimate = animated && !reducedMotion;

  // Update screen width on resize
  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    updateScreenWidth();
    window.addEventListener('resize', updateScreenWidth);
    return () => window.removeEventListener('resize', updateScreenWidth);
  }, []);

  // Calculate dimensions and paths
  const thickness = getSprayThickness(type, screenWidth);
  const oversprayThickness = getOversprayThickness(thickness);
  const { main: mainOpacity, overspray: oversprayOpacity } = getSprayOpacity();
  const viewBox = getSprayViewBox(length, thickness, direction);
  
  // Generate paths
  const mainPath = generateSprayPath(direction, length, thickness * 2);
  const oversprayPath = generateSprayPath(direction, length, thickness * 2.5, 42); // Different seed for variation

  // Animation styles
  const animationDuration = shouldAnimate ? '200ms' : '0ms';
  const animationDelay = shouldAnimate ? '0ms' : '0ms';

  return (
    <div 
      className={cn(
        'spray-line-container',
        `spray-${type}`,
        isDark && 'spray-dark',
        className
      )}
      style={{
        '--spray-color': color,
        '--spray-thickness': `${thickness}px`,
        '--spray-overspray-thickness': `${oversprayThickness}px`,
        '--spray-animation-duration': animationDuration,
        '--spray-animation-delay': animationDelay,
      } as React.CSSProperties}
    >
      <svg
        ref={svgRef}
        viewBox={viewBox}
        className="spray-svg"
        style={{
          width: `${length}px`,
          height: 'auto',
          overflow: 'visible'
        }}
        preserveAspectRatio="none"
      >
        {/* Filters for blur and glow effects */}
        <defs>
          <filter id={`spray-blur-${type}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.8"/>
          </filter>
          <filter id={`spray-glow-${type}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          {isDark && (
            <filter id={`spray-halo-${type}`} x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="halo"/>
              <feColorMatrix in="halo" values="1 1 1 0 0  1 1 1 0 0  1 1 1 0 0  0 0 0 0.15 0"/>
              <feMerge>
                <feMergeNode in="halo"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          )}
        </defs>

        {/* Halo effect for dark sections */}
        {isDark && (
          <>
            {/* Outer halo */}
            <path
              d={mainPath}
              stroke="white"
              strokeWidth={oversprayThickness * 2}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.08"
              filter={`url(#spray-halo-${type})`}
              className="spray-halo-outer"
            />
            {/* Inner halo */}
            <path
              d={mainPath}
              stroke="white"
              strokeWidth={oversprayThickness * 1.2}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.15"
              filter={`url(#spray-blur-${type})`}
              className="spray-halo-inner"
            />
          </>
        )}

        {/* Overspray (background blur effect) */}
        <path
          d={oversprayPath}
          stroke={color}
          strokeWidth={oversprayThickness}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={oversprayOpacity}
          filter={`url(#spray-blur-${type})`}
          className={cn(
            'spray-overspray',
            shouldAnimate && 'spray-animated'
          )}
          style={{
            strokeDasharray: shouldAnimate ? `${length} ${length}` : 'none',
            strokeDashoffset: shouldAnimate ? `${length}` : '0',
            animation: shouldAnimate ? `spray-draw ${animationDuration} ease-out ${animationDelay} forwards` : 'none'
          }}
        />

        {/* Main spray line */}
        <path
          d={mainPath}
          stroke={color}
          strokeWidth={thickness}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={mainOpacity}
          className={cn(
            'spray-main',
            shouldAnimate && 'spray-animated'
          )}
          style={{
            strokeDasharray: shouldAnimate ? `${length} ${length}` : 'none',
            strokeDashoffset: shouldAnimate ? `${length}` : '0',
            animation: shouldAnimate ? `spray-draw ${animationDuration} ease-out ${animationDelay} forwards` : 'none'
          }}
        />
      </svg>


    </div>
  );
};

export default SprayLine;