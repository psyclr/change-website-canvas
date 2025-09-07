import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  priority?: boolean;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  sizes = '100vw',
  priority = false,
  placeholder,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return; // Skip intersection observer if priority image
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate srcSet for different resolutions
  const generateSrcSet = (baseSrc: string): string => {
    // In a real implementation, you'd have different sizes of the same image
    // For now, we'll use the original image at different scales
    const extensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const hasValidExtension = extensions.some(ext => baseSrc.toLowerCase().includes(ext));
    
    if (!hasValidExtension) return '';
    
    return `${baseSrc} 1x, ${baseSrc} 2x`;
  };

  // Generate WebP source if supported
  const getWebPSrc = (originalSrc: string): string => {
    // In production, you'd convert images to WebP format
    // For now, return original src
    return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  };

  // Check if WebP is supported
  const supportsWebP = (): boolean => {
    if (typeof window === 'undefined') return false;
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('webp') > -1;
  };

  const commonProps = {
    ref: imgRef,
    alt,
    width,
    height,
    className: `${className} ${
      isLoaded ? 'opacity-100' : 'opacity-0'
    } transition-opacity duration-300`,
    loading: priority ? 'eager' : loading,
    decoding: 'async' as const,
    onLoad: handleLoad,
    onError: handleError,
  };

  if (hasError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">Image not available</span>
      </div>
    );
  }

  // Show placeholder while not in view (for lazy loading)
  if (!isInView) {
    return (
      <div
        ref={imgRef}
        className={`bg-gray-100 animate-pulse ${className}`}
        style={{ width, height }}
      />
    );
  }

  // Use picture element for WebP support
  return (
    <div className="relative">
      {/* Placeholder/blur while loading */}
      {!isLoaded && placeholder && (
        <img
          src={placeholder}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover blur-sm ${className}`}
          aria-hidden="true"
        />
      )}
      
      <picture>
        {/* WebP source for supported browsers */}
        {supportsWebP() && (
          <source
            srcSet={generateSrcSet(getWebPSrc(src))}
            sizes={sizes}
            type="image/webp"
          />
        )}
        
        {/* Fallback image */}
        <img
          {...commonProps}
          src={src}
          srcSet={generateSrcSet(src)}
          sizes={sizes}
        />
      </picture>
    </div>
  );
};

// Higher-order component for preloading critical images
export const withImagePreload = (Component: React.ComponentType<any>) => {
  return (props: any) => {
    useEffect(() => {
      if (props.priority && props.src) {
        // Preload critical images
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = props.src;
        document.head.appendChild(link);
        
        return () => {
          document.head.removeChild(link);
        };
      }
    }, [props.src, props.priority]);

    return <Component {...props} />;
  };
};

export default OptimizedImage;