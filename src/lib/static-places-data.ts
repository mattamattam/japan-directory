// Static places data loader - uses committed JSON file instead of API calls
// This ensures SSG builds work in CI/CD environments without API access

import fs from 'fs';
import path from 'path';
import { GooglePlaceData } from './places-utils';

export interface StaticPlaceData extends GooglePlaceData {
  query: string;
  fetchedAt: number;
  type: string;
  fallback?: boolean;
}

interface PlacesDataFile {
  lastUpdated: string;
  stats: {
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
  };
  placesData: Record<string, StaticPlaceData>;
}

let cachedPlacesData: PlacesDataFile | null = null;

/**
 * Load places data from the committed JSON file
 */
export function loadStaticPlacesData(): PlacesDataFile {
  if (cachedPlacesData) {
    return cachedPlacesData;
  }

  try {
    const dataPath = path.join(process.cwd(), 'src/data/places-data.json');
    
    if (!fs.existsSync(dataPath)) {
      console.warn('⚠️  Places data file not found. Run `npm run fetch-places-data` to generate it.');
      return {
        lastUpdated: new Date().toISOString(),
        stats: { totalRequests: 0, successfulRequests: 0, failedRequests: 0 },
        placesData: {}
      };
    }

    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    cachedPlacesData = JSON.parse(fileContent);
    
    console.log(`📁 Loaded static places data: ${Object.keys(cachedPlacesData!.placesData).length} records`);
    console.log(`📅 Last updated: ${cachedPlacesData!.lastUpdated}`);
    
    return cachedPlacesData!;
  } catch (error) {
    console.error('❌ Error loading static places data:', error);
    return {
      lastUpdated: new Date().toISOString(),
      stats: { totalRequests: 0, successfulRequests: 0, failedRequests: 0 },
      placesData: {}
    };
  }
}

/**
 * Get places data for a specific experience ID
 */
export function getStaticPlaceData(experienceId: string): StaticPlaceData | null {
  const data = loadStaticPlacesData();
  return data.placesData[experienceId] || null;
}

/**
 * Get all static places data
 */
export function getAllStaticPlacesData(): Record<string, StaticPlaceData> {
  const data = loadStaticPlacesData();
  return data.placesData;
}

/**
 * Get places data for multiple experience IDs
 */
export function getBatchStaticPlacesData(experienceIds: string[]): Map<string, StaticPlaceData> {
  const data = loadStaticPlacesData();
  const result = new Map<string, StaticPlaceData>();
  
  experienceIds.forEach(id => {
    const placeData = data.placesData[id];
    if (placeData) {
      result.set(id, placeData);
    }
  });
  
  return result;
}

/**
 * Check if places data is stale (older than 30 days)
 */
export function isPlacesDataStale(): boolean {
  const data = loadStaticPlacesData();
  const lastUpdated = new Date(data.lastUpdated);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  return lastUpdated < thirtyDaysAgo;
}

/**
 * Get stats about the static places data
 */
export function getPlacesDataStats() {
  const data = loadStaticPlacesData();
  return {
    ...data.stats,
    totalRecords: Object.keys(data.placesData).length,
    lastUpdated: data.lastUpdated,
    isStale: isPlacesDataStale()
  };
}