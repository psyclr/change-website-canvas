import React from 'react';

interface HandDrawnArrowProps {
  onClick?: () => void;
  className?: string;
}

/**
 * HandDrawnArrow - рисованная стрелка вниз в стиле фломастера
 */
const HandDrawnArrow: React.FC<HandDrawnArrowProps> = ({ onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`group cursor-pointer transition-all duration-300 hover:scale-110 ${className}`}
      aria-label="Перейти к следующей секции"
    >
      <svg
        width="60"
        height="115"
        viewBox="0 0 60 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        {/* Простая изогнутая линия стрелки */}
        <path
          d="M30 10 C32 20, 28 30, 30 40 C32 50, 28 60, 30 85"
          stroke="#3B82F6"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          className="group-hover:stroke-blue-600 transition-colors duration-300"
        />
        
        {/* Простой широкий наконечник */}
        <path
          d="M20 75 L30 95 L40 75"
          stroke="#3B82F6"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className="group-hover:stroke-blue-600 transition-colors duration-300"
        />
        
        {/* Фильтр для эффекта фломастера */}
        <defs>
          <filter id="roughPaper" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence 
              baseFrequency="0.04" 
              numOctaves="3" 
              result="noise"
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale="1.5"
            />
          </filter>
        </defs>
      </svg>
    </button>
  );
};

export default HandDrawnArrow;