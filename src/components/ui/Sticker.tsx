import React from 'react';

interface StickerProps {
  children: React.ReactNode;
  rotation?: number;
  className?: string;
}

const Sticker: React.FC<StickerProps> = ({ children, rotation = 0, className = "" }) => {
  const glassStyles = {
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: `rotate(${rotation}deg)`
  };

  return (
    <div 
      className={`p-4 relative z-20 hover:-translate-y-1.5 hover:shadow-2xl ${className}`}
      style={glassStyles}
    >
      {children}
    </div>
  );
};

export default Sticker;