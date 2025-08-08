// Build-time data prefetching script
// Pre-fetches data from the secure API during SSG build to populate caches
import { createClient } from "@sanity/client";
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

class BuildPrefetcher {
  constructor() {
    this.apiBaseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3002";
    this.buildApiKey = process.env.BUILD_API_KEY;
    this.stats = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      cacheMisses: 0,
    };
  }

  async fetchWithBuildKey(endpoint, params = {}) {
    try {
      const url = new URL(`${this.apiBaseUrl}${endpoint}`);
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });

      this.stats.totalRequests++;

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": this.buildApiKey,
        },
      });

      if (response.ok) {
        this.stats.successfulRequests++;
        return await response.json();
      } else {
        this.stats.failedRequests++;
        console.warn(
          `API request failed: ${response.status} ${response.statusText}`
        );
        return null;
      }
    } catch (error) {
      this.stats.failedRequests++;
      console.warn(`API request error: ${error.message}`);
      return null;
    }
  }

  async prefetchDestinationPlaces() {
    console.log("🏢 Prefetching destination place data...");

    try {
      // Get all destinations from Sanity
      const destinations = await sanityClient.fetch(
        '*[_type == "destination" && !(_id in path("drafts.**"))] { name, slug }'
      );

      console.log(`   Found ${destinations.length} destinations to prefetch`);

      // Popular landmarks for each destination
      const landmarkQueries = [];

      destinations.forEach((destination) => {
        const destName = destination.name.toLowerCase();

        // Add destination-specific landmark queries
        if (destName.includes("tokyo")) {
          landmarkQueries.push(
            "Tokyo Tower",
            "Senso-ji Temple",
            "Tokyo Skytree",
            "Shibuya Crossing",
            "Meiji Shrine"
          );
        } else if (destName.includes("osaka")) {
          landmarkQueries.push(
            "Osaka Castle",
            "Dotonbori",
            "Universal Studios Japan",
            "Osaka Aquarium"
          );
        } else if (destName.includes("kyoto")) {
          landmarkQueries.push(
            "Fushimi Inari Shrine",
            "Kinkaku-ji Golden Pavilion",
            "Arashiyama Bamboo Grove"
          );
        } else if (destName.includes("hiroshima")) {
          landmarkQueries.push(
            "Hiroshima Peace Memorial Park",
            "Itsukushima Shrine",
            "Hiroshima Castle"
          );
        } else {
          // Generic query for other destinations
          landmarkQueries.push(destination.name);
        }
      });

      // Remove duplicates
      const uniqueQueries = [...new Set(landmarkQueries)];
      console.log(`   Prefetching ${uniqueQueries.length} place queries`);

      // Batch prefetch with build key (no rate limits)
      const batchSize = 10; // Process in batches to avoid overwhelming the API
      for (let i = 0; i < uniqueQueries.length; i += batchSize) {
        const batch = uniqueQueries.slice(i, i + batchSize);

        const promises = batch.map((query) =>
          this.fetchWithBuildKey("/api/places", { query })
        );

        await Promise.all(promises);

        // Brief pause between batches
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      console.log(`   ✅ Completed prefetching places data`);
    } catch (error) {
      console.error(`   ❌ Error prefetching places:`, error);
    }
  }

  async prefetchWeatherData() {
    console.log("🌤️  Prefetching weather data...");

    const locations = [
      "Tokyo",
      "Osaka",
      "Kyoto",
      "Hiroshima",
      "Sapporo",
      "Fukuoka",
    ];

    try {
      for (const location of locations) {
        await this.fetchWithBuildKey("/api/weather", { location });
      }

      console.log(
        `   ✅ Completed prefetching weather for ${locations.length} cities`
      );
    } catch (error) {
      console.error(`   ❌ Error prefetching weather:`, error);
    }
  }

  async prefetchExchangeRates() {
    console.log("💱 Prefetching exchange rates...");

    const currencies = ["USD", "EUR", "GBP", "AUD", "CAD", "CHF", "KRW", "CNY"];

    try {
      for (const currency of currencies) {
        await this.fetchWithBuildKey("/api/exchange-rate", { currency });
      }

      console.log(
        `   ✅ Completed prefetching rates for ${currencies.length} currencies`
      );
    } catch (error) {
      console.error(`   ❌ Error prefetching exchange rates:`, error);
    }
  }

  printStats() {
    console.log("\n📊 Prefetch Statistics:");
    console.log(`   Total API Requests: ${this.stats.totalRequests}`);
    console.log(`   Successful: ${this.stats.successfulRequests}`);
    console.log(`   Failed: ${this.stats.failedRequests}`);
    console.log(
      `   Success Rate: ${((this.stats.successfulRequests / this.stats.totalRequests) * 100).toFixed(1)}%`
    );
  }

  async run() {
    console.log("🚀 Starting build-time data prefetching...\n");

    if (!this.buildApiKey) {
      console.log(
        "⏭️  BUILD_API_KEY not found. Skipping prefetch (this is normal for CI/CD builds)."
      );
      console.log(
        "💡 For local development: Set BUILD_API_KEY=japan-dir-build-key-no-limits in .env.local"
      );
      console.log("✅ Build prefetching skipped successfully!");
      process.exit(0);
    }

    // Check if we're in a CI environment or if the API server is likely unavailable
    const isCI =
      process.env.CI || process.env.GITHUB_ACTIONS || process.env.VERCEL;
    if (isCI) {
      console.log(
        "⏭️  CI/CD environment detected. Skipping prefetch for production build."
      );
      console.log("💡 Prefetch is only needed for local development builds.");
      console.log("✅ Build prefetching skipped successfully!");
      process.exit(0);
    }

    console.log(`📡 API Base URL: ${this.apiBaseUrl}`);
    console.log(`🔑 Using Build API Key: ${this.buildApiKey.slice(0, 20)}...`);
    console.log("");

    const startTime = Date.now();

    // Run all prefetch operations
    await this.prefetchDestinationPlaces();
    await this.prefetchWeatherData();
    await this.prefetchExchangeRates();

    const duration = Date.now() - startTime;

    console.log(`\n⏱️  Total prefetch time: ${duration}ms`);
    this.printStats();

    console.log("\n✅ Build prefetching completed!");
    console.log("💡 Data is now cached and ready for SSG build");
  }
}

// Run the prefetcher if this script is called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const prefetcher = new BuildPrefetcher();
  prefetcher.run().catch(console.error);
}

export { BuildPrefetcher };
