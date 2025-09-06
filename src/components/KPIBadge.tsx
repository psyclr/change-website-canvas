import React from 'react';

interface KPIBadgeProps {
  text: string;
  className?: string;
}

/**
 * KPIBadge component for displaying key performance indicators
 * Used in Hero section to highlight service promises
 */
const KPIBadge: React.FC<KPIBadgeProps> = ({ text, className = '' }) => {
  return (
    <span className={`kpi-badge ${className}`}>
      {text}
    </span>
  );
};

export default KPIBadge;