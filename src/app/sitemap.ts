import { MetadataRoute } from "next";
import { sanity } from "@/lib/sanity";

// Base URL for your site
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://visitjapanhq.com";

// TypeScript interfaces for better type safety
interface SitemapEntry {
  url: string;
  lastModified: string | Date;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
}

interface SanityDocument {
  slug: { current: string };
  _updatedAt: string;
  publishedAt?: string;
}

interface DistrictDocument extends SanityDocument {
  destination?: { slug: { current: string } };
}

interface HotelDocument extends SanityDocument {
  destination?: { slug: { current: string } };
  district?: { slug: { current: string } };
}

interface RestaurantDocument extends SanityDocument {
  destination?: { slug: { current: string } };
  district?: { slug: { current: string } };
}

interface ShoppingDocument extends SanityDocument {
  destination?: { slug: { current: string } };
  district?: { slug: { current: string } };
}

interface TourDocument extends SanityDocument {
  destination?: { slug: { current: string } };
  district?: { slug: { current: string } };
}

// Static pages with priorities
const staticPages = [
  { path: "", priority: 1.0, changeFreq: "daily" as const }, // Homepage
  { path: "/destinations", priority: 0.9, changeFreq: "daily" as const },
  { path: "/experiences", priority: 0.9, changeFreq: "daily" as const },
  { path: "/food", priority: 0.8, changeFreq: "weekly" as const },
  { path: "/essentials", priority: 0.8, changeFreq: "weekly" as const },
  { path: "/lodging", priority: 0.8, changeFreq: "weekly" as const },
  { path: "/itineraries", priority: 0.7, changeFreq: "monthly" as const },
  { path: "/blog", priority: 0.7, changeFreq: "daily" as const },
  { path: "/about", priority: 0.5, changeFreq: "monthly" as const },
  { path: "/contact", priority: 0.5, changeFreq: "monthly" as const },
  { path: "/privacy", priority: 0.3, changeFreq: "yearly" as const },
  { path: "/terms", priority: 0.3, changeFreq: "yearly" as const },
  { path: "/affiliate-disclosure", priority: 0.3, changeFreq: "yearly" as const },
];

// Fetch destinations from Sanity
async function getDestinations(): Promise<SitemapEntry[]> {
  try {
    const query = `*[_type == "destination" && (published == true || published == null)] | order(sortOrder asc) {
      slug,
      _updatedAt
    }`;

    const destinations = await sanity.fetch<SanityDocument[]>(query);
    return destinations.map((dest) => {
      // Higher priority for major destinations
      const slug = dest.slug.current;
      let priority = 0.8;
      if (["tokyo", "kyoto", "osaka"].includes(slug)) {
        priority = 0.9;
      } else if (["hiroshima", "nara", "hakone", "nikko"].includes(slug)) {
        priority = 0.85;
      }
      
      return {
        url: `/destinations/${slug}`,
        lastModified: dest._updatedAt,
        changeFrequency: "weekly" as const,
        priority,
      };
    });
  } catch (error) {
    console.error("Error fetching destinations for sitemap:", error);
    return [];
  }
}

// Fetch districts from Sanity
async function getDistricts(): Promise<SitemapEntry[]> {
  try {
    const query = `*[_type == "district" && (published == true || published == null)] {
      slug,
      _updatedAt,
      destination->{ slug }
    }`;

    const districts = await sanity.fetch<DistrictDocument[]>(query);

    return districts.map((district) => {
      const destinationSlug = district.destination?.slug?.current || "unknown";
      return {
        url: `/destinations/${destinationSlug}/districts/${district.slug.current}`,
        lastModified: district._updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      };
    });
  } catch (error) {
    console.error("Error fetching districts for sitemap:", error);
    return [];
  }
}

// Fetch hotels from Sanity
async function getHotels(): Promise<SitemapEntry[]> {
  try {
    const query = `*[_type == "hotel" && (published == true || published == null)] {
      slug,
      _updatedAt,
      destination->{ slug },
      district->{ slug }
    }`;

    const hotels = await sanity.fetch<HotelDocument[]>(query);

    return hotels.map((hotel) => {
      const destinationSlug = hotel.destination?.slug?.current || "unknown";
      const districtSlug = hotel.district?.slug?.current;

      if (districtSlug) {
        return {
          url: `/destinations/${destinationSlug}/districts/${districtSlug}/hotels/${hotel.slug.current}`,
          lastModified: hotel._updatedAt,
          changeFrequency: "weekly" as const,
          priority: 0.6,
        };
      } else {
        return {
          url: `/destinations/${destinationSlug}/hotels/${hotel.slug.current}`,
          lastModified: hotel._updatedAt,
          changeFrequency: "weekly" as const,
          priority: 0.6,
        };
      }
    });
  } catch (error) {
    console.error("Error fetching hotels for sitemap:", error);
    return [];
  }
}

// Fetch restaurants from Sanity
async function getRestaurants(): Promise<SitemapEntry[]> {
  try {
    const query = `*[_type == "restaurant" && (published == true || published == null)] {
      slug,
      _updatedAt,
      destination->{ slug },
      district->{ slug }
    }`;

    const restaurants = await sanity.fetch<RestaurantDocument[]>(query);

    return restaurants.map((restaurant) => {
      const destinationSlug =
        restaurant.destination?.slug?.current || "unknown";
      const districtSlug = restaurant.district?.slug?.current;

      if (districtSlug) {
        return {
          url: `/destinations/${destinationSlug}/districts/${districtSlug}/restaurants/${restaurant.slug.current}`,
          lastModified: restaurant._updatedAt,
          changeFrequency: "weekly" as const,
          priority: 0.6,
        };
      } else {
        return {
          url: `/destinations/${destinationSlug}/restaurants/${restaurant.slug.current}`,
          lastModified: restaurant._updatedAt,
          changeFrequency: "weekly" as const,
          priority: 0.6,
        };
      }
    });
  } catch (error) {
    console.error("Error fetching restaurants for sitemap:", error);
    return [];
  }
}

// Fetch shopping from Sanity
async function getShopping(): Promise<SitemapEntry[]> {
  try {
    const query = `*[_type == "shopping" && (published == true || published == null)] {
      slug,
      _updatedAt,
      destination->{ slug },
      district->{ slug }
    }`;

    const shopping = await sanity.fetch<ShoppingDocument[]>(query);

    return shopping.map((item) => {
      const destinationSlug = item.destination?.slug?.current || "unknown";
      const districtSlug = item.district?.slug?.current;

      if (districtSlug) {
        return {
          url: `/destinations/${destinationSlug}/districts/${districtSlug}/shopping/${item.slug.current}`,
          lastModified: item._updatedAt,
          changeFrequency: "weekly" as const,
          priority: 0.6,
        };
      } else {
        return {
          url: `/destinations/${destinationSlug}/shopping/${item.slug.current}`,
          lastModified: item._updatedAt,
          changeFrequency: "weekly" as const,
          priority: 0.6,
        };
      }
    });
  } catch (error) {
    console.error("Error fetching shopping for sitemap:", error);
    return [];
  }
}

// Fetch tours from Sanity
async function getTours(): Promise<SitemapEntry[]> {
  try {
    const query = `*[_type == "tour" && (published == true || published == null)] {
      slug,
      _updatedAt,
      destination->{ slug },
      district->{ slug }
    }`;

    const tours = await sanity.fetch<TourDocument[]>(query);

    return tours.map((tour) => {
      const destinationSlug = tour.destination?.slug?.current || "unknown";
      const districtSlug = tour.district?.slug?.current;

      if (districtSlug) {
        return {
          url: `/destinations/${destinationSlug}/districts/${districtSlug}/tours/${tour.slug.current}`,
          lastModified: tour._updatedAt,
          changeFrequency: "weekly" as const,
          priority: 0.6,
        };
      } else {
        return {
          url: `/destinations/${destinationSlug}/tours/${tour.slug.current}`,
          lastModified: tour._updatedAt,
          changeFrequency: "weekly" as const,
          priority: 0.6,
        };
      }
    });
  } catch (error) {
    console.error("Error fetching tours for sitemap:", error);
    return [];
  }
}

// Fetch blog posts from Sanity
async function getBlogPosts(): Promise<SitemapEntry[]> {
  try {
    const query = `*[_type == "blogPost" && (published == true || published == null)] | order(publishedAt desc) {
      slug,
      publishedAt,
      _updatedAt
    }`;

    const posts = await sanity.fetch<SanityDocument[]>(query);

    return posts
      .filter((post) => post.slug && post.slug.current) // Filter out posts with null slugs
      .map((post) => ({
        url: `/blog/${post.slug.current}`,
        lastModified: post._updatedAt || post.publishedAt || new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
  } catch (error) {
    console.error("Error fetching blog posts for sitemap:", error);
    return [];
  }
}

// Fetch experiences from Sanity
async function getExperiences(): Promise<SitemapEntry[]> {
  try {
    const query = `*[_type == "experience" && (published == true || published == null)] | order(sortOrder asc) {
      slug,
      _updatedAt
    }`;

    const experiences = await sanity.fetch<SanityDocument[]>(query);
    return experiences.map((exp) => ({
      url: `/experiences/${exp.slug.current}`,
      lastModified: exp._updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error fetching experiences for sitemap:", error);
    return [];
  }
}

// Fetch lodging from Sanity
async function getLodging(): Promise<SitemapEntry[]> {
  try {
    const query = `*[_type == "lodging" && (published == true || published == null)] | order(sortOrder asc) {
      slug,
      _updatedAt
    }`;

    const lodging = await sanity.fetch<SanityDocument[]>(query);

    return lodging.map((item) => ({
      url: `/lodging/${item.slug.current}`,
      lastModified: item._updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error fetching lodging for sitemap:", error);
    return [];
  }
}

// Fetch food guides from Sanity
async function getFoodGuides(): Promise<SitemapEntry[]> {
  try {
    const query = `*[_type == "food" && (published == true || published == null)] | order(sortOrder asc) {
      slug,
      _updatedAt
    }`;

    const foodGuides = await sanity.fetch<SanityDocument[]>(query);

    return foodGuides.map((guide) => ({
      url: `/food/${guide.slug.current}`,
      lastModified: guide._updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error fetching food guides for sitemap:", error);
    return [];
  }
}

// Fetch essentials from Sanity
async function getEssentials(): Promise<SitemapEntry[]> {
  try {
    const query = `*[_type == "essentials" && (published == true || published == null)] | order(sortOrder asc) {
      slug,
      _updatedAt
    }`;

    const essentials = await sanity.fetch<SanityDocument[]>(query);

    return essentials.map((essential) => ({
      url: `/essentials/${essential.slug.current}`,
      lastModified: essential._updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error fetching essentials for sitemap:", error);
    return [];
  }
}

// Fetch itineraries from Sanity
async function getItineraries(): Promise<SitemapEntry[]> {
  try {
    const query = `*[_type == "itinerary" && (published == true || published == null)] | order(sortOrder asc) {
      slug,
      _updatedAt
    }`;

    const itineraries = await sanity.fetch<SanityDocument[]>(query);
    return itineraries.map((itinerary) => ({
      url: `/itineraries/${itinerary.slug.current}`,
      lastModified: itinerary._updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error fetching itineraries for sitemap:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages with optimized priorities
  const staticSitemap: SitemapEntry[] = staticPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }));

  // Fetch dynamic content
  const [
    destinations,
    districts,
    hotels,
    restaurants,
    shopping,
    tours,
    blogPosts,
    experiences,
    lodging,
    foodGuides,
    essentials,
    itineraries,
  ] = await Promise.all([
    getDestinations(),
    getDistricts(),
    getHotels(),
    getRestaurants(),
    getShopping(),
    getTours(),
    getBlogPosts(),
    getExperiences(),
    getLodging(),
    getFoodGuides(),
    getEssentials(),
    getItineraries(),
  ]);

  // Combine all sitemap entries
  const allEntries: SitemapEntry[] = [
    ...staticSitemap,
    ...destinations.map((item: SitemapEntry) => ({
      ...item,
      url: `${baseUrl}${item.url}`,
    })),
    ...districts.map((item: SitemapEntry) => ({
      ...item,
      url: `${baseUrl}${item.url}`,
    })),
    ...hotels.map((item: SitemapEntry) => ({
      ...item,
      url: `${baseUrl}${item.url}`,
    })),
    ...restaurants.map((item: SitemapEntry) => ({
      ...item,
      url: `${baseUrl}${item.url}`,
    })),
    ...shopping.map((item: SitemapEntry) => ({
      ...item,
      url: `${baseUrl}${item.url}`,
    })),
    ...tours.map((item: SitemapEntry) => ({
      ...item,
      url: `${baseUrl}${item.url}`,
    })),
    ...blogPosts.map((item: SitemapEntry) => ({
      ...item,
      url: `${baseUrl}${item.url}`,
    })),
    ...experiences.map((item: SitemapEntry) => ({
      ...item,
      url: `${baseUrl}${item.url}`,
    })),
    ...lodging.map((item: SitemapEntry) => ({
      ...item,
      url: `${baseUrl}${item.url}`,
    })),
    ...foodGuides.map((item: SitemapEntry) => ({
      ...item,
      url: `${baseUrl}${item.url}`,
    })),
    ...essentials.map((item: SitemapEntry) => ({
      ...item,
      url: `${baseUrl}${item.url}`,
    })),
    ...itineraries.map((item: SitemapEntry) => ({
      ...item,
      url: `${baseUrl}${item.url}`,
    })),
  ];

  return allEntries;
}
