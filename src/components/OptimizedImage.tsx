"use client";

import Image from "next/image";
import { useState } from "react";
import {
  getPlaceholderImage,
  optimizeImageUrl,
  generateGradientPlaceholder,
  IMAGE_CONFIGS,
  type ImageConfig,
} from "@/lib/image-utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  config?: keyof typeof IMAGE_CONFIGS | ImageConfig;
  fallbackType?: "destination" | "experience" | "restaurant" | "hotel";
  fallbackName?: string;
  onError?: () => void;
  onLoad?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  placeholder = "blur",
  blurDataURL,
  config = "card",
  fallbackType,
  fallbackName,
  onError,
  onLoad,
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get image configuration
  const imageConfig =
    typeof config === "string" ? IMAGE_CONFIGS[config] : config;

  // Default blur placeholder - a simple 1x1 gray pixel
  const defaultBlurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rw==";

  // Use provided blurDataURL or default when placeholder is blur
  const finalBlurDataURL = placeholder === "blur" 
    ? (blurDataURL || defaultBlurDataURL)
    : blurDataURL;

  // Handle image error
  const handleError = () => {
    setImageError(true);
    onError?.();
  };

  // Handle image load
  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  // If src is empty or null, use fallback immediately
  if (!src) {
    const fallbackSrc =
      fallbackType && fallbackName
        ? getPlaceholderImage(fallbackType, fallbackName)
        : generateGradientPlaceholder(
            width || imageConfig.width,
            height || imageConfig.height
          );
    
    return (
      <Image
        src={fallbackSrc}
        alt={alt}
        width={width || imageConfig.width}
        height={height || imageConfig.height}
        className={className}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={finalBlurDataURL}
        onLoad={handleLoad}
        quality={imageConfig.quality}
        loading={priority ? "eager" : "lazy"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    );
  }

  // Optimize the source URL
  const optimizedSrc = optimizeImageUrl(src, imageConfig);
  
  // If optimization results in empty string, use fallback
  if (!optimizedSrc) {
    const fallbackSrc =
      fallbackType && fallbackName
        ? getPlaceholderImage(fallbackType, fallbackName)
        : generateGradientPlaceholder(
            width || imageConfig.width,
            height || imageConfig.height
          );
    
    return (
      <Image
        src={fallbackSrc}
        alt={alt}
        width={width || imageConfig.width}
        height={height || imageConfig.height}
        className={className}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={finalBlurDataURL}
        onLoad={handleLoad}
        quality={imageConfig.quality}
        loading={priority ? "eager" : "lazy"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    );
  }

  // If there was an error, show fallback
  if (imageError) {
    return (
      <div
        className={`relative bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center ${className}`}
        style={{
          width: width || imageConfig.width,
          height: height || imageConfig.height,
        }}
      >
        <div className="text-white text-center">
          <div className="text-2xl mb-2">📸</div>
          <div className="text-sm opacity-75">Image unavailable</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={optimizedSrc}
        alt={alt}
        width={width || imageConfig.width}
        height={height || imageConfig.height}
        className={`transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={finalBlurDataURL}
        onError={handleError}
        onLoad={handleLoad}
        quality={imageConfig.quality}
        loading={priority ? "eager" : "lazy"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400">
            <svg
              className="animate-spin h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

// Specialized components for different content types
export function DestinationImage({
  src,
  name,
  alt,
  ...props
}: Omit<OptimizedImageProps, "fallbackType" | "alt"> & {
  name: string;
  alt?: string;
}) {
  return (
    <OptimizedImage
      {...props}
      src={src}
      fallbackType="destination"
      fallbackName={name}
      alt={alt || `${name}, Japan`}
    />
  );
}

export function ExperienceImage({
  src,
  name,
  category,
  alt,
  ...props
}: Omit<OptimizedImageProps, "fallbackType" | "alt"> & {
  name: string;
  category?: string;
  alt?: string;
}) {
  return (
    <OptimizedImage
      {...props}
      src={src}
      fallbackType="experience"
      fallbackName={category || name}
      alt={alt || `${name} experience`}
    />
  );
}

export function RestaurantImage({
  src,
  name,
  alt,
  ...props
}: Omit<OptimizedImageProps, "fallbackType" | "alt"> & {
  name: string;
  alt?: string;
}) {
  return (
    <OptimizedImage
      {...props}
      src={src}
      fallbackType="restaurant"
      fallbackName={name}
      alt={alt || `${name} restaurant`}
    />
  );
}

export function HotelImage({
  src,
  name,
  alt,
  ...props
}: Omit<OptimizedImageProps, "fallbackType" | "alt"> & {
  name: string;
  alt?: string;
}) {
  return (
    <OptimizedImage
      {...props}
      src={src}
      fallbackType="hotel"
      fallbackName={name}
      alt={alt || `${name} hotel`}
    />
  );
}
