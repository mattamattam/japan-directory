// Pre-commit hook script to fetch Google Places data and store it as JSON
// This runs locally to populate data that will be committed to the repo

import { createClient } from "@sanity/client";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

// Sanity client configuration
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "y5onebmh",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2023-05-03",
  useCdn: false,
});

class PlacesDataFetcher {
  constructor() {
    this.apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3002";
    this.buildApiKey = process.env.BUILD_API_KEY;
    this.placesData = {};
    this.stats = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
    };
  }

  async fetchPlaceData(query) {
    try {
      const url = new URL(`${this.apiBaseUrl}/api/places`);
      url.searchParams.append('query', query);

      this.stats.totalRequests++;

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": this.buildApiKey,
        },
        timeout: 10000,
      });

      if (response.ok) {
        const data = await response.json();
        this.stats.successfulRequests++;
        console.log(`✅ ${query}: ${data.rating ? `${data.rating}⭐ (${data.user_ratings_total || 0} reviews)` : 'No rating'}`);
        return data;
      } else {
        this.stats.failedRequests++;
        console.warn(`❌ ${query}: HTTP ${response.status}`);
        return null;
      }
    } catch (error) {
      this.stats.failedRequests++;
      console.warn(`❌ ${query}: ${error.message}`);
      return null;
    }
  }

  generatePlaceQuery(item, type, parentLocation) {
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
        } else if (name.toLowerCase().includes('monkey')) {
          return 'Arashiyama Monkey Park Iwatayama, Kyoto, Japan';
        } else if (name.toLowerCase().includes('snow festival')) {
          return 'Sapporo Snow Festival, Odori Park, Japan';
        } else if (name.toLowerCase().includes('fireworks')) {
          return parentLocation ? `${name} ${parentLocation} Japan` : `Fireworks Festival Japan`;
        } else if (name.toLowerCase().includes('shopping')) {
          return parentLocation ? `Shopping district ${parentLocation} Japan` : 'Tokyo shopping district Japan';
        } else if (name.toLowerCase().includes('shinkansen')) {
          return 'Shinkansen bullet train Japan';
        } else if (name.toLowerCase().includes('expo')) {
          return 'World Expo 2025 Osaka Japan';
        } else if (name.toLowerCase().includes('miyajima') || name.toLowerCase().includes('torii')) {
          return 'Itsukushima Shrine Miyajima Japan';
        }
        return parentLocation ? `${name} ${parentLocation} Japan` : `${name} Japan`;
        
      default:
        return `${name} Japan`;
    }
  }

  async fetchExperiencesData() {
    console.log('🎌 Fetching experiences places data...');
    
    try {
      // Get all experiences from Sanity
      const experiences = await sanityClient.fetch(
        '*[_type == "experience" && !(_id in path("drafts.**"))] { _id, name, location, category }'
      );

      console.log(`   Found ${experiences.length} experiences to fetch`);

      if (experiences.length === 0) {
        console.log('   ⚠️  No experiences found');
        return;
      }

      // Generate place queries for experiences
      const experienceQueries = experiences.map((experience) => ({
        experienceId: experience._id,
        query: this.generatePlaceQuery(experience, 'experience', experience.location)
      }));

      console.log(`   Fetching ${experienceQueries.length} experience place queries`);

      // Fetch data for each experience
      for (const { experienceId, query } of experienceQueries) {
        const placeData = await this.fetchPlaceData(query);
        if (placeData) {
          this.placesData[experienceId] = {
            ...placeData,
            query,
            fetchedAt: Date.now(),
            type: 'experience'
          };
        }
        
        // Small delay to be nice to the API
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      console.log(`   ✅ Completed fetching experiences places data`);
    } catch (error) {
      console.error(`   ❌ Error fetching experiences data:`, error);
    }
  }

  async fetchDestinationsData() {
    console.log('🏢 Fetching destinations places data...');

    try {
      // Get all destinations from Sanity
      const destinations = await sanityClient.fetch(
        '*[_type == "destination" && !(_id in path("drafts.**"))] { _id, name, slug }'
      );

      console.log(`   Found ${destinations.length} destinations to fetch`);

      // Popular landmarks for each destination
      const destinationQueries = [];

      destinations.forEach((destination) => {
        const destName = destination.name.toLowerCase();

        // Add destination-specific landmark queries
        if (destName.includes("tokyo")) {
          destinationQueries.push({ 
            destinationId: destination._id, 
            query: "Tokyo Tower", 
            type: 'destination' 
          });
        } else if (destName.includes("osaka")) {
          destinationQueries.push({ 
            destinationId: destination._id, 
            query: "Osaka Castle", 
            type: 'destination' 
          });
        } else if (destName.includes("kyoto")) {
          destinationQueries.push({ 
            destinationId: destination._id, 
            query: "Fushimi Inari Shrine", 
            type: 'destination' 
          });
        } else if (destName.includes("hiroshima")) {
          destinationQueries.push({ 
            destinationId: destination._id, 
            query: "Hiroshima Peace Memorial Park", 
            type: 'destination' 
          });
        } else {
          // Generic query for other destinations
          destinationQueries.push({ 
            destinationId: destination._id, 
            query: destination.name + " Japan", 
            type: 'destination' 
          });
        }
      });

      console.log(`   Fetching ${destinationQueries.length} destination place queries`);

      // Fetch data for each destination
      for (const { destinationId, query, type } of destinationQueries) {
        const placeData = await this.fetchPlaceData(query);
        if (placeData) {
          this.placesData[destinationId] = {
            ...placeData,
            query,
            fetchedAt: Date.now(),
            type
          };
        }
        
        // Small delay to be nice to the API
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      console.log(`   ✅ Completed fetching destinations places data`);
    } catch (error) {
      console.error(`   ❌ Error fetching destinations data:`, error);
    }
  }

  async savePlacesDataToFile() {
    try {
      const dataDir = path.resolve('./src/data');
      await fs.mkdir(dataDir, { recursive: true });
      
      const filePath = path.join(dataDir, 'places-data.json');
      
      const dataToSave = {
        lastUpdated: new Date().toISOString(),
        stats: this.stats,
        placesData: this.placesData
      };
      
      await fs.writeFile(filePath, JSON.stringify(dataToSave, null, 2), 'utf-8');
      
      console.log(`💾 Places data saved to ${filePath}`);
      console.log(`📊 Saved ${Object.keys(this.placesData).length} place records`);
    } catch (error) {
      console.error('❌ Error saving places data:', error);
      throw error;
    }
  }

  printStats() {
    console.log("\n📊 Fetch Statistics:");
    console.log(`   Total API Requests: ${this.stats.totalRequests}`);
    console.log(`   Successful: ${this.stats.successfulRequests}`);
    console.log(`   Failed: ${this.stats.failedRequests}`);
    if (this.stats.totalRequests > 0) {
      console.log(`   Success Rate: ${((this.stats.successfulRequests / this.stats.totalRequests) * 100).toFixed(1)}%`);
    }
  }

  async run() {
    console.log('🚀 Starting places data fetching...\n');

    if (!this.buildApiKey) {
      console.log('❌ BUILD_API_KEY not found in environment variables');
      console.log('💡 Please set BUILD_API_KEY in your .env.local file');
      process.exit(1);
    }

    console.log(`📡 API Base URL: ${this.apiBaseUrl}`);
    console.log(`🔑 Using Build API Key: ${this.buildApiKey.slice(0, 20)}...`);
    console.log("");

    const startTime = Date.now();

    try {
      // Fetch all data
      await this.fetchExperiencesData();
      await this.fetchDestinationsData();
      
      // Save to file
      await this.savePlacesDataToFile();
      
      const duration = Date.now() - startTime;
      
      console.log(`\n⏱️  Total fetch time: ${duration}ms`);
      this.printStats();
      
      console.log("\n✅ Places data fetching completed!");
      console.log("💡 Data saved to src/data/places-data.json and ready for commit");
      
      if (this.stats.failedRequests > this.stats.successfulRequests) {
        console.warn("⚠️  More requests failed than succeeded - check your API configuration");
        process.exit(1);
      }
      
    } catch (error) {
      console.error('❌ Places data fetching failed:', error);
      process.exit(1);
    }
  }
}

// Run the fetcher if this script is called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const fetcher = new PlacesDataFetcher();
  fetcher.run().catch(console.error);
}

export { PlacesDataFetcher };