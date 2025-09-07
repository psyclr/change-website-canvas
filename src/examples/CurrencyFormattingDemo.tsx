/**
 * Demonstration component showcasing the new currency formatting utilities
 * Shows Polish PLN formatting, promotional pricing, and accessibility features
 */

import React from 'react';
import { 
  PriceDisplay, 
  CompactPriceDisplay, 
  LargePriceDisplay, 
  MobilePriceDisplay,
  PromotionalPriceBadge,
  PriceComparison,
  ResponsivePriceDisplay
} from '@/components/pricing/PriceDisplay';
import { formatPrice, formatSavingsPercentage, formatSavingsAmount } from '@/utils/currency';

const CurrencyFormattingDemo: React.FC = () => {
  return (
    <div className="p-8 space-y-12 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        Currency Formatting Demo - Phase 2.2
      </h1>
      
      {/* Polish PLN Formatting Examples */}
      <section className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-semibold mb-4">Polish PLN Formatting</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">Start Package</div>
            <div className="text-2xl font-bold">{formatPrice(600, 'PLN', 'pl')}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">Original Start</div>
            <div className="text-2xl font-bold">{formatPrice(2000, 'PLN', 'pl')}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">Standard Package</div>
            <div className="text-2xl font-bold">{formatPrice(3500, 'PLN', 'pl')}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">Pro Package</div>
            <div className="text-2xl font-bold">{formatPrice(6000, 'PLN', 'pl')}</div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-gray-50 rounded">
          <h3 className="font-medium mb-2">Polish Formatting Features:</h3>
          <ul className="text-sm space-y-1">
            <li>✓ Space separators for thousands: "2 000 zł" (not "2,000 zł")</li>
            <li>✓ Currency symbol after amount: "600 zł"</li>
            <li>✓ Proper Polish locale formatting</li>
            <li>✓ Space before currency symbol</li>
          </ul>
        </div>
      </section>

      {/* Promotional Pricing Display */}
      <section className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-semibold mb-4">Promotional Pricing Display</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Start Package with 70% Discount */}
          <div className="relative border border-red-200 rounded-lg p-4 bg-red-50">
            <PromotionalPriceBadge
              originalPrice={2000}
              discountedPrice={600}
              position="top-right"
              savingsDisplay="percentage"
            />
            <h3 className="font-semibold text-lg mb-2">Start Package</h3>
            <PriceDisplay
              price={600}
              originalPrice={2000}
              currency="PLN"
              variant="large"
              packageName="Start Package"
              showSavings={true}
            />
            <div className="mt-2 text-sm text-green-600">
              {formatSavingsAmount(2000, 600, 'PLN', 'pl')}
            </div>
          </div>

          {/* Standard Package (no promotion) */}
          <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
            <h3 className="font-semibold text-lg mb-2">Standard Package</h3>
            <PriceDisplay
              price={3500}
              currency="PLN"
              variant="large"
              packageName="Standard Package"
              isPrimary={true}
            />
            <div className="mt-2 text-sm text-gray-600">
              Most Popular Choice
            </div>
          </div>

          {/* Pro Package */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">Pro Package</h3>
            <PriceDisplay
              price={6000}
              currency="PLN"
              variant="large"
              packageName="Pro Package"
            />
            <div className="mt-2 text-sm text-gray-600">
              Enterprise Solution
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded">
          <h3 className="font-medium mb-2">Promotional Features:</h3>
          <ul className="text-sm space-y-1">
            <li>✓ Strikethrough original prices</li>
            <li>✓ Highlighted discounted prices in red</li>
            <li>✓ Automatic savings calculations</li>
            <li>✓ Promotional badges with percentages</li>
            <li>✓ Multi-language savings text</li>
          </ul>
        </div>
      </section>

      {/* Responsive Display Variants */}
      <section className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-semibold mb-4">Responsive Display Variants</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Large Display (Hero Sections)</h3>
            <LargePriceDisplay
              price={600}
              originalPrice={2000}
              currency="PLN"
              packageName="Start Package"
              showSavings={true}
            />
          </div>

          <div>
            <h3 className="font-medium mb-2">Default Display (Cards)</h3>
            <PriceDisplay
              price={3500}
              currency="PLN"
              variant="default"
              packageName="Standard Package"
            />
          </div>

          <div>
            <h3 className="font-medium mb-2">Compact Display (Lists)</h3>
            <CompactPriceDisplay
              price={6000}
              currency="PLN"
              packageName="Pro Package"
            />
          </div>

          <div>
            <h3 className="font-medium mb-2">Mobile Display</h3>
            <MobilePriceDisplay
              price={600}
              originalPrice={2000}
              currency="PLN"
              packageName="Start Package"
              showSavings={true}
            />
          </div>

          <div>
            <h3 className="font-medium mb-2">Responsive Display (Auto-adapts)</h3>
            <ResponsivePriceDisplay
              price={600}
              originalPrice={2000}
              currency="PLN"
              packageName="Start Package"
              showSavings={true}
            />
          </div>
        </div>
      </section>

      {/* Price Comparison */}
      <section className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-semibold mb-4">Price Comparison Display</h2>
        
        <PriceComparison
          prices={[
            { label: 'Start', price: 600, originalPrice: 2000, highlight: false },
            { label: 'Standard', price: 3500, highlight: true },
            { label: 'Pro', price: 6000, highlight: false },
          ]}
          currency="PLN"
          layout="horizontal"
        />
      </section>

      {/* Accessibility Features */}
      <section className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-semibold mb-4">Accessibility Features</h2>
        
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-medium mb-2">Screen Reader Support:</h3>
          <ul className="text-sm space-y-1">
            <li>✓ Proper ARIA labels for all price displays</li>
            <li>✓ Screen reader friendly promotional text</li>
            <li>✓ Live regions for dynamic price updates</li>
            <li>✓ Semantic HTML structure for price information</li>
            <li>✓ Alternative text for promotional badges</li>
          </ul>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-600">
            <strong>Example screen reader text:</strong> "Start package price: Promotional price: 600 zł. Original price: 2 000 zł. -70% zniżki."
          </p>
        </div>
      </section>

      {/* Multi-language Support */}
      <section className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-semibold mb-4">Multi-language Support</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-medium mb-2">Polish (pl-PL)</h3>
            <div className="space-y-2">
              <div>{formatPrice(2000, 'PLN', 'pl')}</div>
              <div className="text-sm">{formatSavingsPercentage(2000, 600, 'pl')}</div>
              <div className="text-sm">{formatSavingsAmount(2000, 600, 'PLN', 'pl')}</div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">English (en-US)</h3>
            <div className="space-y-2">
              <div>{formatPrice(2000, 'PLN', 'en')}</div>
              <div className="text-sm">{formatSavingsPercentage(2000, 600, 'en')}</div>
              <div className="text-sm">{formatSavingsAmount(2000, 600, 'PLN', 'en')}</div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Russian (ru-RU)</h3>
            <div className="space-y-2">
              <div>{formatPrice(2000, 'PLN', 'ru')}</div>
              <div className="text-sm">{formatSavingsPercentage(2000, 600, 'ru')}</div>
              <div className="text-sm">{formatSavingsAmount(2000, 600, 'PLN', 'ru')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Examples */}
      <section className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-semibold mb-4">Integration with Existing System</h2>
        
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-medium mb-2">How to Use:</h3>
          <pre className="text-xs bg-gray-800 text-green-400 p-2 rounded overflow-x-auto">
{`// Import the utilities
import { formatPrice } from '@/utils/currency';
import { PriceDisplay } from '@/components/pricing/PriceDisplay';

// Simple price formatting
const price = formatPrice(2000, 'PLN', 'pl'); // "2 000 zł"

// Component usage
<PriceDisplay
  price={600}
  originalPrice={2000}
  currency="PLN"
  variant="large"
  packageName="Start Package"
  showSavings={true}
/>`}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default CurrencyFormattingDemo;