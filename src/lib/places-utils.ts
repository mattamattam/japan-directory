// Utility for fetching Google Places data at build time
// This module handles fetching place data including ratings and reviews

export interface GooglePlaceReview {
  author_name?: string;
  author_url?: string;
  language?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description?: string;
  text: string | { text: string; languageCode?: string };
  time?: number;
}

export interface GooglePlaceData {
  rating?: number;
  user_ratings_total?: number;
  name?: string;
  formatted_address?: string;
  reviews?: GooglePlaceReview[];
  error?: string;
}

/**
 * Fetch Google Places data at build time for a specific query
 * This function is meant to be used during SSG to pre-populate place data
 */
export async function fetchPlaceData(query: string): Promise<GooglePlaceData | null> {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3002";
    const API_KEY = process.env.BUILD_API_KEY || process.env.API_KEY;

    if (!API_KEY) {
      console.warn("No API key available for places request");
      return null;
    }

    const response = await fetch(
      `${API_BASE_URL}/api/places?query=${encodeURIComponent(query)}`,
      {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
        // Longer timeout for build-time requests
        signal: AbortSignal.timeout(30000),
      }
    );

    if (!response.ok) {
      console.warn(`Places API request failed: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching place data:", error);
    return null;
  }
}

/**
 * Generate search queries for destinations, districts, and experiences
 */
export function getPlaceQuery(item: { name: string }, type: 'destination' | 'district' | 'experience', parentLocation?: string): string {
  const name = item.name;
  
  switch (type) {
    case 'destination':
      // For destinations, try to be more specific with landmarks
      if (name.toLowerCase().includes('tokyo')) {
        return 'Tokyo Tower, Tokyo, Japan';
      } else if (name.toLowerCase().includes('kyoto')) {
        return 'Kiyomizu-dera Temple, Kyoto, Japan';
      } else if (name.toLowerCase().includes('osaka')) {
        return 'Osaka Castle, Osaka, Japan';
      }
      return `${name} Japan`;
      
    case 'district':
      return parentLocation ? `${name} district, ${parentLocation}, Japan` : `${name} district, Japan`;
      
    case 'experience':
      // For experiences, try to make them more specific
      if (name.toLowerCase().includes('temple') || name.toLowerCase().includes('shrine')) {
        return parentLocation ? `${name}, ${parentLocation}, Japan` : `${name}, Japan`;
      } else if (name.toLowerCase().includes('cherry blossom') || name.toLowerCase().includes('hanami')) {
        return parentLocation ? `Cherry Blossom ${parentLocation} Japan` : 'Cherry Blossom viewing Japan';
      } else if (name.toLowerCase().includes('deer')) {
        return 'Nara Park deer, Nara, Japan';
      } else if (name.toLowerCase().includes('castle')) {
        return parentLocation ? `${name}, ${parentLocation}, Japan` : `${name}, Japan`;
      }
      return parentLocation ? `${name} ${parentLocation} Japan` : `${name} Japan`;
      
    default:
      return `${name} Japan`;
  }
}

