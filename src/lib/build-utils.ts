// Build utilities for SSG generation with unlimited API access
// These utilities are designed to be used in generateStaticParams and build scripts

interface BuildDataResult<T> {
  data: T | null;
  fromCache: boolean;
  error?: string;
}

// Cache for build-time data (in memory during build)
const buildCache = new Map<string, { data: any; timestamp: number }>();

export async function fetchBuildData<T = any>(
  endpoint: string, 
  params: Record<string, string> = {}
): Promise<BuildDataResult<T>> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3002";
  const buildApiKey = process.env.BUILD_API_KEY || process.env.API_KEY;
  
  // Create cache key
  const cacheKey = `${endpoint}?${new URLSearchParams(params).toString()}`;
  
  // Check cache first (build cache is valid for entire build process)
  const cached = buildCache.get(cacheKey);
  if (cached) {
    return {
      data: cached.data,
      fromCache: true,
    };
  }

  if (!buildApiKey) {
    console.warn("No build API key available for", endpoint);
    return { data: null, fromCache: false, error: "No API key" };
  }

  try {
    const url = new URL(`${apiBaseUrl}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": buildApiKey,
      },
      // Longer timeout for build requests
      signal: AbortSignal.timeout(30000), // 30 seconds
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Cache the result
    buildCache.set(cacheKey, { data, timestamp: Date.now() });
    
    return {
      data,
      fromCache: false,
    };

  } catch (error) {
    console.error(`Build API request failed for ${endpoint}:`, error);
    return {
      data: null,
      fromCache: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Specific functions for common build-time operations

export async function fetchPlaceDataForBuild(query: string) {
  return fetchBuildData("/api/places", { query });
}

export async function fetchWeatherDataForBuild(location: string) {
  return fetchBuildData("/api/weather", { location });
}

export async function fetchExchangeRateForBuild(currency: string) {
  return fetchBuildData("/api/exchange-rate", { currency });
}

// Batch operations for efficient build-time data fetching
export async function batchFetchPlaces(queries: string[]) {
  console.log(`🏢 Batch fetching ${queries.length} places for build...`);
  
  const results = await Promise.allSettled(
    queries.map(query => fetchPlaceDataForBuild(query))
  );

  const successful = results.filter(r => r.status === 'fulfilled').length;
  console.log(`   ✅ Successfully fetched ${successful}/${queries.length} places`);

  return results.map((result, index) => ({
    query: queries[index],
    result: result.status === 'fulfilled' ? result.value : null,
  }));
}

// Helper to determine if we're in a build context
export function isBuildTime(): boolean {
  return process.env.NODE_ENV === "production" && 
         process.env.NEXT_PHASE === "phase-production-build";
}

// Get build cache stats
export function getBuildCacheStats() {
  return {
    size: buildCache.size,
    keys: Array.from(buildCache.keys()),
  };
}

// Clear build cache (useful for testing)
export function clearBuildCache() {
  buildCache.clear();
}