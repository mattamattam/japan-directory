// Secure API client for communicating with the local API server on port 3002
// This client handles authentication and error handling for all API requests

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  fallback?: boolean;
}

class SecureApiClient {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3002";
    this.apiKey = process.env.API_KEY || "";
  }

  private getHeaders(): HeadersInit {
    return {
      "Content-Type": "application/json",
      "x-api-key": this.apiKey,
    };
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    try {
      const url = new URL(`${this.baseUrl}${endpoint}`);
      
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, value);
        });
      }

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: this.getHeaders(),
      });

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
      console.error(`API GET request failed for ${endpoint}:`, error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        data,
      };

    } catch (error) {
      console.error(`API POST request failed for ${endpoint}:`, error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  // Specific method for places API
  async searchPlace(query: string): Promise<ApiResponse<{
    rating?: number;
    user_ratings_total?: number;
    name?: string;
    formatted_address?: string;
    fallback?: boolean;
  }>> {
    return this.get("/api/places", { query });
  }

  // Check API health
  async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    return this.get("/api/health");
  }
}

// Export a singleton instance
export const secureApiClient = new SecureApiClient();

// Export types for use in other files
export type { ApiResponse };