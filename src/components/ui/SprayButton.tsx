import React from 'react';
import { SprayLine } from "@/components/spray/SprayLine";

interface SprayButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const SprayButton: React.FC<SprayButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  className = ''
}) => {
  const baseClasses = "relative inline-flex items-center gap-2 h-14 px-8 rounded-full font-medium text-center justify-center transition-colors duration-300";
  
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-white text-gray-800 hover:bg-gray-50"
  };

  const sprayColor = variant === 'primary' ? '#3B82F6' : '#374151';
  const sprayScale = variant === 'primary' ? 'scale-y-75' : 'scale-y-50';

  const buttonContent = (
    <>
      <div className={`relative z-10 ${baseClasses} ${variantClasses[variant]} ${className}`}>
        {children}
      </div>
      <div className="absolute -inset-2 pointer-events-none">
        <SprayLine
          type="micro"
          direction="horizontal"
          length={variant === 'primary' ? 220 : 200}
          animated={false}
          color={sprayColor}
          className={sprayScale}
        />
      </div>
    </>
  );

  if (href) {
    return (
      <div className="relative w-full sm:w-auto">
        <a href={href} className="block">
          {buttonContent}
        </a>
      </div>
    );
  }

  return (
    <div className="relative w-full sm:w-auto">
      <button onClick={onClick} className="block w-full sm:w-auto">
        {buttonContent}
      </button>
    </div>
  );
};