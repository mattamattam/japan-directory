// Build-time Google Places data fetching for SSG
// This module fetches and caches Google Places data during the build process

import { buildApiClient } from './build-api-client';
import { fetchPlaceData, getPlaceQuery, GooglePlaceData } from './places-utils';

export interface BuildPlaceData extends GooglePlaceData {
  query: string;
  fetchedAt: number;
  fallback?: boolean;
}

// Cache to store places data during build
let buildPlacesCache: Map<string, BuildPlaceData> = new Map();

/**
 * Fetch Google Places data at build time
 * Uses the build API client with unlimited rate limits
 */
export async function fetchBuildPlaceData(query: string): Promise<BuildPlaceData | null> {
  try {
    // Check build cache first
    if (buildPlacesCache.has(query)) {
      return buildPlacesCache.get(query)!;
    }

    console.log(`🔍 Fetching places data for: ${query}`);
    
    const result = await buildApiClient.searchPlace(query);
    
    if (result.success && result.data) {
      const placeData: BuildPlaceData = {
        ...result.data,
        query,
        fetchedAt: Date.now(),
        fallback: result.data.fallback || false
      };
      
      // Cache for the build process
      buildPlacesCache.set(query, placeData);
      
      console.log(`✅ Places data fetched for ${query}: ${placeData.rating ? `${placeData.rating}⭐ (${placeData.user_ratings_total} reviews)` : 'No rating'}`);
      
      return placeData;
    } else {
      console.warn(`⚠️  No places data found for: ${query}`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error fetching places data for ${query}:`, error);
    return null;
  }
}

/**
 * Batch fetch places data for multiple queries
 * Optimized for build time with parallel requests
 */
export async function batchFetchBuildPlacesData(queries: string[]): Promise<BuildPlaceData[]> {
  console.log(`🚀 Batch fetching places data for ${queries.length} locations...`);
  
  const results = await Promise.allSettled(
    queries.map(query => fetchBuildPlaceData(query))
  );
  
  const placesData: BuildPlaceData[] = [];
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled' && result.value) {
      placesData.push(result.value);
    } else {
      console.warn(`Failed to fetch places data for: ${queries[index]}`);
    }
  });
  
  console.log(`✅ Batch fetch completed: ${placesData.length}/${queries.length} successful`);
  
  return placesData;
}

/**
 * Generate places queries for experiences and fetch data
 */
export async function fetchExperiencesPlacesData(experiences: any[]): Promise<Map<string, BuildPlaceData>> {
  const placesDataMap = new Map<string, BuildPlaceData>();
  
  if (!experiences.length) {
    return placesDataMap;
  }
  
  console.log(`📍 Generating places queries for ${experiences.length} experiences...`);
  
  // Generate queries for experiences
  const queries = experiences.map(experience => {
    const query = getPlaceQuery(experience, 'experience', experience.location);
    return { experienceId: experience._id, query };
  });
  
  // Batch fetch all places data
  const allQueries = queries.map(q => q.query);
  const placesDataResults = await batchFetchBuildPlacesData(allQueries);
  
  // Map results back to experience IDs
  queries.forEach((queryInfo, index) => {
    const placeData = placesDataResults.find(pd => pd && pd.query === queryInfo.query);
    if (placeData) {
      placesDataMap.set(queryInfo.experienceId, placeData);
    }
  });
  
  return placesDataMap;
}

/**
 * Get cached places data for runtime use
 */
export function getCachedPlaceData(query: string): BuildPlaceData | null {
  return buildPlacesCache.get(query) || null;
}

/**
 * Export all cached data (useful for debugging)
 */
export function getAllCachedPlacesData(): BuildPlaceData[] {
  return Array.from(buildPlacesCache.values());
}

/**
 * Clear the build cache (useful for testing)
 */
export function clearBuildPlacesCache(): void {
  buildPlacesCache.clear();
}

/**
 * Serialize places data for static props
 */
export function serializePlacesData(placesDataMap: Map<string, BuildPlaceData>): Record<string, BuildPlaceData> {
  const serialized: Record<string, BuildPlaceData> = {};
  
  for (const [key, value] of placesDataMap.entries()) {
    serialized[key] = value;
  }
  
  return serialized;
}

/**
 * Deserialize places data from static props
 */
export function deserializePlacesData(serialized: Record<string, BuildPlaceData>): Map<string, BuildPlaceData> {
  const map = new Map<string, BuildPlaceData>();
  
  for (const [key, value] of Object.entries(serialized)) {
    map.set(key, value);
  }
  
  return map;
}