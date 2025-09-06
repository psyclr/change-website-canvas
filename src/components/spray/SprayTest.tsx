import React from 'react';
import { SprayLine, SprayUnderline, SprayMarker } from './index';

/**
 * Test component to verify spray-line system functionality
 * This can be used for development and testing purposes
 */
export const SprayTest: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold mb-4">Spray Line System Test</h2>
      
      {/* Basic SprayLine tests */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Spray Lines</h3>
        
        <div className="space-y-2">
          <p>Horizontal Main:</p>
          <SprayLine type="main" direction="horizontal" length={200} />
        </div>
        
        <div className="space-y-2">
          <p>Diagonal Micro:</p>
          <SprayLine type="micro" direction="diagonal" length={150} />
        </div>
        
        <div className="space-y-2">
          <p>Curved Underline:</p>
          <SprayLine type="underline" direction="curved" length={180} />
        </div>
      </div>

      {/* SprayUnderline test */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Spray Underline</h3>
        <SprayUnderline direction="horizontal">
          <span className="text-xl font-bold">This text has a spray underline</span>
        </SprayUnderline>
      </div>

      {/* SprayMarker test */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Spray Marker</h3>
        <div className="relative inline-block p-4 border">
          <span>Hover to see marker</span>
          <SprayMarker 
            trigger={true} 
            position="right" 
            size="medium" 
            direction="horizontal"
          />
        </div>
      </div>

      {/* Dark section test */}
      <div className="bg-gray-900 text-white p-8 space-y-4">
        <h3 className="text-lg font-semibold">Dark Section with Halo</h3>
        <SprayLine type="main" direction="horizontal" length={200} isDark={true} />
        <SprayUnderline isDark={true}>
          <span className="text-xl">Dark section underline</span>
        </SprayUnderline>
      </div>
    </div>
  );
};

export default SprayTest;