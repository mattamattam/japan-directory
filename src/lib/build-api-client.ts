// Build-time API client for SSG generation
// Uses unlimited API key during build process to bypass rate limiting

interface BuildApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  fallback?: boolean;
}

class BuildApiClient {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3002";
    
    // Use build API key during SSG generation, fallback to regular key
    this.apiKey = process.env.BUILD_API_KEY || process.env.API_KEY || "";
  }

  private getHeaders(): HeadersInit {
    return {
      "Content-Type": "application/json",
      "x-api-key": this.apiKey,
    };
  }

  private isBuildTime(): boolean {
    // Check if we're in a build context
    return process.env.NODE_ENV === "production" && 
           process.env.NEXT_PHASE === "phase-production-build";
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<BuildApiResponse<T>> {
    try {
      const url = new URL(`${this.baseUrl}${endpoint}`);
      
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, value);
        });
      }

      // Longer timeout for build-time requests
      const timeout = this.isBuildTime() ? 30000 : 5000; // 30s for builds, 5s for runtime
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: this.getHeaders(),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        data,
        fallback: data.fallback || false,
      };

    } catch (error) {
      console.error(`Build API request failed for ${endpoint}:`, error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  // Specific method for places API with build optimizations
  async searchPlace(query: string): Promise<BuildApiResponse<{
    rating?: number;
    user_ratings_total?: number;
    name?: string;
    formatted_address?: string;
    fallback?: boolean;
  }>> {
    return this.get("/api/places", { query });
  }

  // Batch request for multiple places (build optimization)
  async searchPlaces(queries: string[]): Promise<BuildApiResponse<Array<{
    query: string;
    rating?: number;
    user_ratings_total?: number;
    name?: string;
    formatted_address?: string;
    fallback?: boolean;
  }>>> {
    try {
      // For build time, we can make parallel requests without rate limiting
      const promises = queries.map(async (query) => {
        const result = await this.searchPlace(query);
        return {
          query,
          ...(result.data || {}),
        };
      });

      const results = await Promise.all(promises);
      
      return {
        success: true,
        data: results,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Batch request failed",
      };
    }
  }
}

// Export singleton instance for build-time use
export const buildApiClient = new BuildApiClient();

// Helper function to get the appropriate API key for current context
export function getApiKeyForContext(): string {
  // In build context, use unlimited key
  if (process.env.NODE_ENV === "production" && process.env.NEXT_PHASE === "phase-production-build") {
    return process.env.BUILD_API_KEY || process.env.API_KEY || "";
  }
  
  // In runtime, use regular key
  return process.env.API_KEY || "";
}

// Export types
export type { BuildApiResponse };