// Google Places API utility functions
// This file handles fetching place data from Google Places API with caching

interface PlaceResult {
  rating?: number;
  user_ratings_total?: number;
  name?: string;
  formatted_address?: string;
}

// Cache for place data (24 hour expiry)
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Get cached place data
const getCachedPlace = (placeId: string): PlaceResult | null => {
  if (typeof window === "undefined") return null;

  try {
    const cached = localStorage.getItem(`place_${placeId}`);
    if (cached) {
      const data = JSON.parse(cached);
      if (Date.now() - data.timestamp < CACHE_DURATION) {
        return data.result;
      }
    }
  } catch (error) {
    console.warn("Error reading from cache:", error);
  }
  return null;
};

// Set cached place data
const setCachedPlace = (placeId: string, result: PlaceResult) => {
  if (typeof window === "undefined") return;

  try {
    const cacheData = {
      result,
      timestamp: Date.now(),
    };
    localStorage.setItem(`place_${placeId}`, JSON.stringify(cacheData));
  } catch (error) {
    console.warn("Error writing to cache:", error);
  }
};

// Get popular landmarks/attractions for each destination
const getDestinationLandmarks = (destination: string): string[] => {
  const landmarks: Record<string, string[]> = {
    tokyo: [
      "Tokyo Tower",
      "Senso-ji Temple Tokyo",
      "Shibuya Crossing Tokyo",
      "Tokyo Skytree",
      "Meiji Shrine Tokyo",
    ],
    osaka: [
      "Osaka Castle",
      "Dotonbori Osaka",
      "Universal Studios Japan Osaka",
      "Osaka Aquarium Kaiyukan",
      "Tempozan Ferris Wheel Osaka",
    ],
    kyoto: [
      "Fushimi Inari Shrine Kyoto",
      "Kinkaku-ji Golden Pavilion Kyoto",
      "Arashiyama Bamboo Grove Kyoto",
      "Kiyomizu-dera Temple Kyoto",
      "Gion District Kyoto",
    ],
    hiroshima: [
      "Hiroshima Peace Memorial Park",
      "Itsukushima Shrine Miyajima",
      "Hiroshima Castle",
      "Atomic Bomb Dome Hiroshima",
      "Miyajima Island Hiroshima",
    ],
  };

  return landmarks[destination.toLowerCase()] || [];
};

export const searchPlace = async (
  query: string,
  location?: string
): Promise<PlaceResult | null> => {
  try {
    // For destinations, search for popular landmarks instead of just the city name
    const destinationLandmarks = getDestinationLandmarks(query);

    if (destinationLandmarks.length > 0) {
      // Try each landmark until we find one with ratings
      for (const landmark of destinationLandmarks) {
        const searchQuery = location ? `${landmark} ${location}` : landmark;

        // Check cache first
        const placeId = btoa(searchQuery).replace(/[^a-zA-Z0-9]/g, "");
        const cached = getCachedPlace(placeId);
        if (cached) {
          return cached;
        }

        // Now calling our server-side proxy
        const response = await fetch(
          `/api/places?query=${encodeURIComponent(searchQuery)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Check for the presence of rating to confirm success from proxy
        if (data.rating !== undefined) {
          // Cache the result using a hash of the query as place_id
          setCachedPlace(placeId, data);
          return data;
        }
      }

      // If no landmarks returned ratings, fall back to the original query
    }

    // Fallback to original search logic
    const searchQuery = location ? `${query} ${location}` : query;

    // Check cache first
    const placeId = btoa(searchQuery).replace(/[^a-zA-Z0-9]/g, "");
    const cached = getCachedPlace(placeId);
    if (cached) {
      return cached;
    }

    // Now calling our server-side proxy
    const response = await fetch(
      `/api/places?query=${encodeURIComponent(searchQuery)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Check for the presence of rating to confirm success from proxy
    if (data.rating !== undefined) {
      // Cache the result using a hash of the query as place_id
      setCachedPlace(placeId, data);
      return data;
    } else {
      console.warn("Place search not found");
      return null;
    }
  } catch (error) {
    console.error("Error searching place:", error);
    return null;
  }
};

export const getPlaceDetails = async (
  placeId: string
): Promise<PlaceResult | null> => {
  try {
    // Check cache first
    const cached = getCachedPlace(placeId);
    if (cached) {
      return cached;
    }

    // Now calling our server-side proxy
    const response = await fetch(
      `/api/places?query=${encodeURIComponent(placeId)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Check for the presence of rating to confirm success from proxy
    if (data.rating !== undefined) {
      // Cache the result
      setCachedPlace(placeId, data);
      return data;
    } else {
      console.warn("Place details not found");
      return null;
    }
  } catch (error) {
    console.error("Error getting place details:", error);
    return null;
  }
};

// Fallback ratings for when API is unavailable
export const getFallbackRating = (
  name: string
): { rating: number; reviewCount: number } => {
  // Generate consistent but varied ratings based on name
  const hash = name.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

  const rating = 4.0 + (Math.abs(hash) % 10) / 10; // 4.0 to 4.9
  const reviewCount = 100 + (Math.abs(hash) % 900); // 100 to 999

  return { rating, reviewCount };
};
