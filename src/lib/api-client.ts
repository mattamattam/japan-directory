const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://japan-directory-api.vercel.app";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

if (!API_KEY) {
  console.warn("API_KEY not configured. API calls will fail.");
}

export interface PlaceSearchResult {
  place_id: string;
  name: string;
  formatted_address: string;
  rating?: number;
  user_ratings_total?: number;
  reviews?: any[];
  opening_hours?: any;
  photos?: any[];
  website?: string;
  phone_number?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  viewport?: {
    northeast: { latitude: number; longitude: number };
    southwest: { latitude: number; longitude: number };
  };
  map_url?: string;
  id?: string;
  place_type?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PlaceDetails extends PlaceSearchResult {
  // Same interface as PlaceSearchResult for now
}

class ApiClient {
  private baseUrl: string;
  private apiKey: string | undefined;
  private requestQueue: Map<string, Promise<any>> = new Map();

  constructor() {
    this.baseUrl = API_BASE_URL;
    this.apiKey = API_KEY;
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    retryCount = 0
  ): Promise<T> {
    if (!this.apiKey) {
      throw new Error("API key not configured");
    }

    const url = `${this.baseUrl}${endpoint}`;
    const maxRetries = 3;
    const baseDelay = 1000; // 1 second

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": this.apiKey,
          ...options.headers,
        },
      });

      if (response.status === 429 && retryCount < maxRetries) {
        // Rate limited, wait and retry with exponential backoff
        const delay = baseDelay * Math.pow(2, retryCount) + Math.random() * 1000;
        await this.delay(delay);
        return this.makeRequest<T>(endpoint, options, retryCount + 1);
      }

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Unknown error" }));
        throw new Error(
          errorData.error || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      return response.json();
    } catch (error) {
      if (retryCount < maxRetries && (error as Error).message.includes('Rate limit exceeded')) {
        const delay = baseDelay * Math.pow(2, retryCount) + Math.random() * 1000;
        await this.delay(delay);
        return this.makeRequest<T>(endpoint, options, retryCount + 1);
      }
      throw error;
    }
  }

  private async makeRequestWithCache<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    // Use endpoint as cache key to deduplicate identical requests
    const cacheKey = `${endpoint}_${JSON.stringify(options)}`;
    
    if (this.requestQueue.has(cacheKey)) {
      return this.requestQueue.get(cacheKey);
    }

    const promise = this.makeRequest<T>(endpoint, options);
    this.requestQueue.set(cacheKey, promise);

    // Clean up cache after request completes
    promise.finally(() => {
      setTimeout(() => {
        this.requestQueue.delete(cacheKey);
      }, 5000); // Cache for 5 seconds to deduplicate rapid requests
    });

    return promise;
  }

  async searchPlace(query: string): Promise<PlaceSearchResult> {
    return this.makeRequestWithCache<PlaceSearchResult>(
      `/api/places?query=${encodeURIComponent(query)}`
    );
  }

  async getPlaceDetails(placeId: string): Promise<PlaceDetails> {
    return this.makeRequestWithCache<PlaceDetails>(
      `/api/places/details?place_id=${encodeURIComponent(placeId)}`
    );
  }

  // Add other API methods as needed
  async getWeather(location: string) {
    return this.makeRequestWithCache(
      `/api/weather?location=${encodeURIComponent(location)}`
    );
  }

  async getExchangeRate() {
    return this.makeRequestWithCache("/api/exchange-rate");
  }

  async subscribeNewsletter(email: string) {
    return this.makeRequest("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  async submitContact(data: any) {
    return this.makeRequest("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new ApiClient();
