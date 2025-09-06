import React from 'react';

/**
 * BeforeAfterCard component for Hero section
 * Shows a before/after comparison with proper styling according to Bold Contrast design
 */
const BeforeAfterCard: React.FC = () => {
  return (
    <div className="w-full max-w-md bg-white border border-[#E5E7EB] rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-medium mb-4 text-center">До и После</h3>
        
        <div className="space-y-4">
          {/* Before section */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide">До</h4>
            <div className="bg-gray-100 rounded-lg p-4 min-h-[80px] flex items-center justify-center">
              <span className="text-gray-500 text-sm">Старый дизайн</span>
            </div>
          </div>
          
          {/* Divider */}
          <div className="flex items-center justify-center">
            <div className="w-8 h-px bg-gray-300"></div>
            <span className="mx-3 text-xs text-gray-400 font-medium">VS</span>
            <div className="w-8 h-px bg-gray-300"></div>
          </div>
          
          {/* After section */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-600 uppercase tracking-wide">После</h4>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 min-h-[80px] flex items-center justify-center">
              <span className="text-blue-600 text-sm font-medium">Новый дизайн</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterCard;