import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

interface WebVitalsMetric {
  id: string;
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB';
  value: number;
  delta: number;
  entries: PerformanceEntry[];
  navigationType: string;
  rating: 'good' | 'needs-improvement' | 'poor';
}

const WebVitalsTracker: React.FC = () => {
  useEffect(() => {
    // Only load web-vitals if in production and in browser
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        const sendToAnalytics = ({ name, value, id, rating }: WebVitalsMetric) => {
          // Send to Google Analytics if available
          if (window.gtag) {
            window.gtag('event', name, {
              custom_parameter_1: 'Web Vitals',
              custom_parameter_2: rating,
              value: Math.round(value),
              metric_id: id,
            });
          }
          
          // Log to console for development
          console.log(`[Web Vitals] ${name}:`, {
            value: Math.round(value),
            rating,
            id
          });
          
          // You could also send to other analytics services here
          // Example: sendToCustomAnalytics({ name, value, id, rating });
        };

        // Measure Core Web Vitals
        getCLS(sendToAnalytics);
        getFID(sendToAnalytics);
        getFCP(sendToAnalytics);
        getLCP(sendToAnalytics);
        getTTFB(sendToAnalytics);
      }).catch(error => {
        console.warn('Failed to load web-vitals:', error);
      });
    }
  }, []);

  return null; // This component doesn't render anything
};

export default WebVitalsTracker;