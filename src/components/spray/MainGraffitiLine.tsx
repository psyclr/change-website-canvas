import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { getSprayThickness, getOversprayThickness, getSprayOpacity } from '../../utils/spray-utils';
import { cn } from '../../lib/utils';

interface MainGraffitiLineProps {
  points: [number, number][];
  animated?: boolean;
  className?: string;
  color?: string;
  isDark?: boolean;
}

/**
 * Генерирует органичный путь с рандомными закруглениями вместо углов
 */
function generateHandDrawnPath(points: [number, number][], seed: number = 42): string {
  if (points.length < 2) return '';
  
  // Seeded random для консистентности
  let randomSeed = seed;
  const seededRandom = () => {
    randomSeed = (randomSeed * 9301 + 49297) % 233280;
    return randomSeed / 233280;
  };
  
  // Создаем путь с рандомными закруглениями
  let path = `M ${points[0][0]} ${points[0][1]}`;
  
  for (let i = 1; i < points.length; i++) {
    const [currentX, currentY] = points[i];
    const [prevX, prevY] = points[i - 1];
    
    if (i === points.length - 1) {
      // Последняя точка - простая линия
      path += ` L ${currentX} ${currentY}`;
    } else {
      // Создаем закругление с рандомным радиусом
      const [nextX, nextY] = points[i + 1];
      
      // Больший рандомный радиус закругления от 80 до 200 пикселей
      const radius = 80 + seededRandom() * 120;
      
      // Вычисляем направления
      const dx1 = currentX - prevX;
      const dy1 = currentY - prevY;
      const dx2 = nextX - currentX;
      const dy2 = nextY - currentY;
      
      // Нормализуем векторы
      const len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
      const len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
      
      const nx1 = dx1 / len1;
      const ny1 = dy1 / len1;
      const nx2 = dx2 / len2;
      const ny2 = dy2 / len2;
      
      // Увеличиваем offset для более внутренних закруглений
      const offset = Math.min(radius, len1 * 0.6, len2 * 0.6);
      
      const startX = currentX - nx1 * offset;
      const startY = currentY - ny1 * offset;
      const endX = currentX + nx2 * offset;
      const endY = currentY + ny2 * offset;
      
      // Добавляем небольшой шум к точкам закругления
      const noiseX = (seededRandom() - 0.5) * 8;
      const noiseY = (seededRandom() - 0.5) * 8;
      
      // Создаем более внутреннее закругление с квадратичной кривой Безье
      // Сдвигаем контрольную точку внутрь для более глубокого закругления
      const controlOffset = radius * 0.3;
      const controlX = currentX + (seededRandom() - 0.5) * controlOffset;
      const controlY = currentY + (seededRandom() - 0.5) * controlOffset;
      
      path += ` L ${(startX + noiseX).toFixed(2)} ${(startY + noiseY).toFixed(2)}`;
      path += ` Q ${(controlX + noiseX * 0.3).toFixed(2)} ${(controlY + noiseY * 0.3).toFixed(2)} ${(endX + noiseX).toFixed(2)} ${(endY + noiseY).toFixed(2)}`;
    }
  }
  
  return path;
}

/**
 * MainGraffitiLine - основная граффити-линия для навигации по сайту
 * Создает органичный эффект рисования от руки
 */
export const MainGraffitiLine: React.FC<MainGraffitiLineProps> = ({
  points,
  animated = true,
  className,
  color = '#3B82F6',
  isDark = false
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [screenWidth, setScreenWidth] = useState(1024);
  const [handDrawnPath, setHandDrawnPath] = useState('');
  const reducedMotion = useReducedMotion();
  
  const shouldAnimate = animated && !reducedMotion;

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    updateScreenWidth();
    window.addEventListener('resize', updateScreenWidth);
    return () => window.removeEventListener('resize', updateScreenWidth);
  }, []);

  // Генерируем органичный путь при изменении точек
  useEffect(() => {
    // Используем timestamp как seed для небольших вариаций при каждом рендере
    const seed = Date.now() % 1000;
    const path = generateHandDrawnPath(points, seed);
    setHandDrawnPath(path);
  }, [points]);

  // Calculate thickness based on screen size - делаем толще
  const baseThickness = getSprayThickness('main', screenWidth);
  const thickness = baseThickness * 2; // Увеличиваем в 2 раза
  const oversprayThickness = getOversprayThickness(thickness);
  const { main: mainOpacity, overspray: oversprayOpacity } = getSprayOpacity();

  // Calculate path length for animation
  const pathLength = svgRef.current?.querySelector('path')?.getTotalLength() || 1000;

  return (
    <div 
      className={cn(
        'main-graffiti-line absolute inset-0 pointer-events-none',
        isDark && 'graffiti-dark',
        className
      )}
    >
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox="0 0 1000 2600"
        preserveAspectRatio="none"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id="graffiti-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.2"/>
          </filter>
          <filter id="graffiti-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          {isDark && (
            <filter id="graffiti-halo" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="halo"/>
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
          <path
            d={handDrawnPath}
            stroke="white"
            strokeWidth={oversprayThickness * 1.5}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.1"
            filter="url(#graffiti-halo)"
          />
        )}

        {/* Overspray (background blur effect) */}
        <path
          d={handDrawnPath}
          stroke={color}
          strokeWidth={oversprayThickness}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={oversprayOpacity}
          filter="url(#graffiti-blur)"
          className={shouldAnimate ? 'animate-spray-draw' : ''}
          style={{
            strokeDasharray: shouldAnimate ? `${pathLength} ${pathLength}` : 'none',
            strokeDashoffset: shouldAnimate ? `${pathLength}` : '0',
            animation: shouldAnimate ? `spray-draw 800ms ease-out 200ms forwards` : 'none'
          }}
        />

        {/* Main graffiti line */}
        <path
          d={handDrawnPath}
          stroke={color}
          strokeWidth={thickness}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={mainOpacity}
          className={shouldAnimate ? 'animate-spray-draw' : ''}
          style={{
            strokeDasharray: shouldAnimate ? `${pathLength} ${pathLength}` : 'none',
            strokeDashoffset: shouldAnimate ? `${pathLength}` : '0',
            animation: shouldAnimate ? `spray-draw 600ms ease-out forwards` : 'none'
          }}
        />
      </svg>
    </div>
  );
};

export default MainGraffitiLine;