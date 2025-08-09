import placesData from "@/data/places-data.json";

export interface PlacesDataEntry {
  place_id: string;
  name: string;
  formatted_address: string;
  rating?: number | null;
  user_ratings_total?: number | null;
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
  query: string;
  fetchedAt: number;
  type: string;
}

export interface PlacesDataFile {
  lastUpdated: string;
  stats: {
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
  };
  placesData: Record<string, PlacesDataEntry>;
}

export function getPlaceDataById(id: string): PlacesDataEntry | null {
  const typedPlacesData = placesData as unknown as PlacesDataFile;
  return typedPlacesData.placesData[id] || null;
}

export function getAllPlacesData(): PlacesDataFile {
  return placesData as unknown as PlacesDataFile;
}

export function getPlaceDataByType(type: 'experience' | 'destination'): Record<string, PlacesDataEntry> {
  const typedPlacesData = placesData as unknown as PlacesDataFile;
  const filtered: Record<string, PlacesDataEntry> = {};
  
  for (const [id, data] of Object.entries(typedPlacesData.placesData)) {
    if (data.type === type) {
      filtered[id] = data;
    }
  }
  
  return filtered;
}

export function getDestinationPlacesData(): Record<string, PlacesDataEntry> {
  return getPlaceDataByType('destination');
}

export function getExperiencePlacesData(): Record<string, PlacesDataEntry> {
  return getPlaceDataByType('experience');
}

// Helper to get rating and review count for a destination/experience
export function getPlaceRating(id: string): { rating?: number; reviewCount?: number } {
  const placeData = getPlaceDataById(id);
  
  if (!placeData) {
    return {};
  }
  
  return {
    rating: placeData.rating || undefined,
    reviewCount: placeData.user_ratings_total || undefined
  };
}