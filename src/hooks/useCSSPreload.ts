import { useEffect } from 'react';

/**
 * Hook to preload CSS files for performance optimization
 * This prevents render-blocking CSS and improves First Contentful Paint
 */
export const useCSSPreload = () => {
  useEffect(() => {
    const preloadCSS = () => {
      // Find all stylesheet links that are not yet loaded
      const stylesheets = document.querySelectorAll('link[rel="preload"][as="style"]');
      
      stylesheets.forEach((link) => {
        const linkElement = link as HTMLLinkElement;
        if (linkElement.onload === null) {
          // Convert preload to stylesheet after load
          linkElement.onload = function() {
            this.onload = null;
            this.rel = 'stylesheet';
          };
        }
      });
      
      // Fallback: Convert preload to stylesheet after 3 seconds
      const fallbackTimer = setTimeout(() => {
        stylesheets.forEach((link) => {
          const linkElement = link as HTMLLinkElement;
          if (linkElement.rel === 'preload' && linkElement.getAttribute('as') === 'style') {
            linkElement.rel = 'stylesheet';
          }
        });
      }, 3000);
      
      return () => clearTimeout(fallbackTimer);
    };
    
    // Run preload optimization
    const cleanup = preloadCSS();
    
    // Cleanup function
    return cleanup;
  }, []);
};

/**
 * Function to create a CSS preload link element
 * This should be used in SSR contexts or dynamic imports
 */
export const createCSSPreload = (href: string): void => {
  if (typeof document === 'undefined') return;
  
  // Check if preload link already exists
  const existingLink = document.querySelector(`link[href="${href}"]`);
  if (existingLink) return;
  
  // Create preload link
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = href;
  link.crossOrigin = 'anonymous';
  
  // Convert to stylesheet after load
  link.onload = function() {
    this.onload = null;
    this.rel = 'stylesheet';
    
    // Trigger reflow to apply styles immediately
    document.body.offsetHeight;
  };
  
  // Fallback for older browsers
  const noscriptFallback = document.createElement('noscript');
  const fallbackLink = document.createElement('link');
  fallbackLink.rel = 'stylesheet';
  fallbackLink.href = href;
  noscriptFallback.appendChild(fallbackLink);
  
  // Add to head
  const head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(link);
  head.appendChild(noscriptFallback);
  
  // Fallback timer
  setTimeout(() => {
    if (link.rel === 'preload') {
      link.rel = 'stylesheet';
    }
  }, 3000);
};

export default useCSSPreload;