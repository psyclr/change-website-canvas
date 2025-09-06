/**
 * Utility functions for generating spray-line SVG paths and effects
 * Part of the Bold Contrast Design System
 */

export type SprayDirection = 'horizontal' | 'diagonal' | 'curved';
export type SprayType = 'main' | 'micro' | 'underline';

/**
 * Generates an SVG path for spray-line effect with noise/displacement
 */
export function generateSprayPath(
  direction: SprayDirection = 'horizontal',
  length: number = 100,
  height: number = 20,
  seed?: number
): string {
  const points: [number, number][] = [];
  const numPoints = Math.max(12, Math.floor(length / 8));
  
  // Use seed for consistent randomness if provided
  const random = seed ? seededRandom(seed) : Math.random;
  
  for (let i = 0; i <= numPoints; i++) {
    const progress = i / numPoints;
    const x = progress * length;
    let y = height / 2;
    
    // Enhanced noise with multiple frequencies for more organic look
    const primaryNoise = (random() - 0.5) * 4;
    const secondaryNoise = (random() - 0.5) * 1.5;
    const totalNoise = primaryNoise + secondaryNoise;
    
    switch (direction) {
      case 'horizontal':
        y += totalNoise;
        // Add slight variation in thickness along the line
        y += Math.sin(progress * Math.PI * 3) * 0.8;
        break;
      case 'diagonal':
        // Diagonal spray with organic curve
        y += (progress * height * 0.4) + totalNoise;
        y += Math.sin(progress * Math.PI * 2) * 1.2;
        break;
      case 'curved':
        // S-curve with natural spray variation
        const curve = Math.sin(progress * Math.PI) * (height * 0.3);
        y += curve + totalNoise;
        y += Math.cos(progress * Math.PI * 4) * 0.6;
        break;
    }
    
    points.push([x, y]);
  }
  
  // Generate smooth path using cubic Bezier curves for more natural look
  if (points.length < 2) return '';
  
  let path = `M ${points[0][0]} ${points[0][1]}`;
  
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    
    if (i === 1) {
      // First curve
      const cp1x = x0 + (x1 - x0) * 0.3;
      const cp1y = y0 + (y1 - y0) * 0.1;
      const cp2x = x0 + (x1 - x0) * 0.7;
      const cp2y = y0 + (y1 - y0) * 0.9;
      path += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${x1} ${y1}`;
    } else {
      // Smooth continuation
      const prevPoint = points[i - 2];
      const nextPoint = points[i + 1] || points[i];
      
      const cp1x = x0 + (x1 - prevPoint[0]) * 0.2;
      const cp1y = y0 + (y1 - prevPoint[1]) * 0.2;
      const cp2x = x1 - (nextPoint[0] - x0) * 0.2;
      const cp2y = y1 - (nextPoint[1] - y0) * 0.2;
      
      path += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${x1} ${y1}`;
    }
  }
  
  return path;
}

/**
 * Simple seeded random number generator for consistent spray patterns
 */
function seededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
}

/**
 * Calculates spray thickness based on screen size and type
 */
export function getSprayThickness(type: SprayType, screenWidth: number): number {
  let baseThickness: number;
  
  if (screenWidth < 640) {
    baseThickness = 6; // mobile: 6-8px
  } else if (screenWidth < 1024) {
    baseThickness = 10; // tablet: 10px
  } else {
    baseThickness = 12; // desktop: 12-14px
  }
  
  switch (type) {
    case 'main':
      return baseThickness;
    case 'micro':
      return Math.max(4, baseThickness * 0.6);
    case 'underline':
      return baseThickness * 0.8;
    default:
      return baseThickness;
  }
}

/**
 * Calculates overspray thickness (2.4x multiplier as per requirements)
 */
export function getOversprayThickness(baseThickness: number): number {
  return baseThickness * 2.4;
}

/**
 * Gets spray opacity values for main line and overspray
 */
export function getSprayOpacity(): { main: number; overspray: number } {
  return {
    main: 1.0,
    overspray: 0.18
  };
}

/**
 * Gets halo effect opacity for dark sections
 */
export function getHaloOpacity(): number {
  return 0.15;
}

/**
 * Generates CSS custom properties for spray-line styling
 */
export function getSprayStyles(
  type: SprayType,
  color: string = 'var(--accent)',
  animated: boolean = true
): React.CSSProperties {
  return {
    '--spray-color': color,
    '--spray-animation-duration': animated ? '200ms' : '0ms',
    '--spray-type': type,
  } as React.CSSProperties;
}

/**
 * Determines if animations should be disabled based on user preference
 */
export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Generates multiple spray paths for layered effect
 */
export function generateLayeredSprayPaths(
  direction: SprayDirection,
  length: number,
  height: number,
  layers: number = 2
): string[] {
  const paths: string[] = [];
  
  for (let i = 0; i < layers; i++) {
    const seed = i * 1000; // Different seed for each layer
    const layerHeight = height + (i * 2); // Slightly different height for variation
    paths.push(generateSprayPath(direction, length, layerHeight, seed));
  }
  
  return paths;
}

/**
 * Calculates spray viewBox dimensions
 */
export function getSprayViewBox(
  length: number,
  thickness: number,
  direction: SprayDirection
): string {
  const padding = thickness * 2;
  let width = length + padding * 2;
  let height = thickness * 4 + padding * 2;
  
  // Adjust for diagonal sprays
  if (direction === 'diagonal') {
    height = Math.max(height, length * 0.3 + padding * 2);
  }
  
  return `0 0 ${width} ${height}`;
}

/**
 * Generates spray animation keyframes
 */
export function getSprayAnimationKeyframes(length: number): string {
  return `
    @keyframes spray-draw {
      0% {
        stroke-dasharray: 0 ${length * 2};
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      100% {
        stroke-dasharray: ${length} 0;
        opacity: 1;
      }
    }
  `;
}

/**
 * Creates spray filter effects for blur and glow
 */
export function createSprayFilters(): string {
  return `
    <defs>
      <filter id="spray-blur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.8"/>
      </filter>
      <filter id="spray-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
  `;
}