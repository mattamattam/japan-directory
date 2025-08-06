// Image utilities for Visit Japan HQ

export interface ImageConfig {
  width: number;
  height: number;
  quality?: number;
  format?: "webp" | "jpg" | "png";
  fit?: "crop" | "clip" | "fill" | "fillmax" | "max" | "scale" | "min";
}

// Default image configurations for different use cases
export const IMAGE_CONFIGS = {
  hero: { width: 1200, height: 800, quality: 85, format: "webp" as const },
  card: { width: 400, height: 300, quality: 80, format: "webp" as const },
  thumbnail: { width: 200, height: 150, quality: 75, format: "webp" as const },
  gallery: { width: 800, height: 600, quality: 85, format: "webp" as const },
  avatar: { width: 100, height: 100, quality: 80, format: "webp" as const },
} as const;

// Placeholder images for different content types
export const PLACEHOLDER_IMAGES = {
  destination: {
    tokyo:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
    kyoto:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
    osaka:
      "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&h=600&fit=crop",
    hiroshima:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=600&fit=crop",
    default:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
  },
  experience: {
    cultural:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
    food: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    adventure:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
    default:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
  },
  restaurant: {
    default:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
  },
  hotel: {
    default:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
  },
} as const;

// Generate a placeholder image URL based on content type and name
export function getPlaceholderImage(
  type: keyof typeof PLACEHOLDER_IMAGES,
  name?: string
): string {
  const typeImages = PLACEHOLDER_IMAGES[type];

  if (name) {
    const lowerName = name.toLowerCase();
    if (type === "destination") {
      // Check for specific destinations
      if (lowerName.includes("tokyo")) return (typeImages as any).tokyo;
      if (lowerName.includes("kyoto")) return (typeImages as any).kyoto;
      if (lowerName.includes("osaka")) return (typeImages as any).osaka;
      if (lowerName.includes("hiroshima")) return (typeImages as any).hiroshima;
    }
    if (type === "experience") {
      // Check for experience categories
      if (lowerName.includes("cultural") || lowerName.includes("temple"))
        return (typeImages as any).cultural;
      if (lowerName.includes("food") || lowerName.includes("cooking"))
        return (typeImages as any).food;
      if (lowerName.includes("adventure") || lowerName.includes("hiking"))
        return (typeImages as any).adventure;
    }
  }

  return typeImages.default;
}

// Optimize image URL with Sanity parameters
export function optimizeImageUrl(url: string, config: ImageConfig): string {
  if (!url) return "";

  // If it's already a Sanity URL, add optimization parameters
  if (url.includes("cdn.sanity.io")) {
    const params = new URLSearchParams();
    params.set("w", config.width.toString());
    params.set("h", config.height.toString());
    if (config.quality) params.set("q", config.quality.toString());
    if (config.format) params.set("fm", config.format);
    if (config.fit) params.set("fit", config.fit);

    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}${params.toString()}`;
  }

  // For external URLs (like Unsplash), try to optimize
  if (url.includes("unsplash.com")) {
    const params = new URLSearchParams();
    params.set("w", config.width.toString());
    params.set("h", config.height.toString());
    params.set("fit", "crop");
    if (config.quality) params.set("q", config.quality.toString());

    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}${params.toString()}`;
  }

  return url;
}

// Generate a gradient placeholder for missing images
export function generateGradientPlaceholder(
  width: number,
  height: number,
  colors: string[] = ["#3B82F6", "#8B5CF6"]
): string {
  const gradient = colors.join(",");
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors[0]};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colors[1]};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
    </svg>
  `)}`;
}

// Check if an image URL is valid
export function isValidImageUrl(url: string): boolean {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Get image dimensions from URL (for Sanity images)
export function getImageDimensions(
  url: string
): { width: number; height: number } | null {
  if (!url || !url.includes("cdn.sanity.io")) return null;

  try {
    const urlObj = new URL(url);
    const width = urlObj.searchParams.get("w");
    const height = urlObj.searchParams.get("h");

    if (width && height) {
      return {
        width: parseInt(width),
        height: parseInt(height),
      };
    }
  } catch {
    // Invalid URL
  }

  return null;
}
