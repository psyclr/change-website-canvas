import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  sizes?: string;
}

/**
 * OptimizedImage component for Lighthouse performance optimization
 * 
 * Features:
 * - Next-gen image formats (WebP, AVIF) with fallbacks
 * - Lazy loading by default
 * - Proper sizing attributes
 * - Responsive images with sizes
 * 
 * Addresses Lighthouse recommendations:
 * - Serve images in next-gen formats
 * - Properly size images
 * - Efficiently encode images
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}) => {
  // Generate WebP and AVIF sources from original src
  const getOptimizedSources = (originalSrc: string) => {
    const basePath = originalSrc.replace(/\.[^/.]+$/, ''); // Remove extension
    return {
      avif: `${basePath}.avif`,
      webp: `${basePath}.webp`,
      original: originalSrc
    };
  };

  const sources = getOptimizedSources(src);

  return (
    <picture className={className}>
      {/* AVIF - Best compression, newest format */}
      <source
        srcSet={sources.avif}
        type="image/avif"
        sizes={sizes}
      />
      
      {/* WebP - Good compression, widely supported */}
      <source
        srcSet={sources.webp}
        type="image/webp"
        sizes={sizes}
      />
      
      {/* Fallback - Original format for older browsers */}
      <img
        src={sources.original}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        sizes={sizes}
        className="w-full h-auto"
        // Performance optimizations
        decoding="async"
        // SEO and accessibility
        itemProp="image"
      />
    </picture>
  );
};

export default OptimizedImage;