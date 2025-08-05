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

// Static pages
const staticPages = [
  "",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/affiliate-disclosure",
  "/destinations",
  "/experiences",
  "/lodging",
  "/food",
  "/essentials",
  "/itineraries",
  "/blog",
];

// Fetch destinations from Sanity
async function getDestinations(): Promise<SitemapEntry[]> {
  try {
    const query = `*[_type == "destination" && published == true] | order(sortOrder asc) {
      slug,
      _updatedAt
    }`;

    const destinations = await sanity.fetch<SanityDocument[]>(query);
    return destinations.map((dest) => ({
      url: `/destinations/${dest.slug.current}`,
      lastModified: dest._updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error fetching destinations for sitemap:", error);
    return [];
  }
}

// Fetch blog posts from Sanity
async function getBlogPosts(): Promise<SitemapEntry[]> {
  try {
    const query = `*[_type == "post" && published == true] | order(publishedAt desc) {
      slug,
      publishedAt,
      _updatedAt
    }`;

    const posts = await sanity.fetch<SanityDocument[]>(query);
    return posts.map((post) => ({
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
    const query = `*[_type == "experience" && published == true] | order(sortOrder asc) {
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
    const query = `*[_type == "lodging" && published == true] | order(sortOrder asc) {
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
    const query = `*[_type == "foodGuide" && published == true] | order(sortOrder asc) {
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
    const query = `*[_type == "essential" && published == true] | order(sortOrder asc) {
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
    const query = `*[_type == "itinerary" && published == true] | order(sortOrder asc) {
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
  // Static pages with default priorities
  const staticSitemap: SitemapEntry[] = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: page === "" ? 1.0 : 0.8, // Homepage gets highest priority
  }));

  // Fetch dynamic content
  const [
    destinations,
    blogPosts,
    experiences,
    lodging,
    foodGuides,
    essentials,
    itineraries,
  ] = await Promise.all([
    getDestinations(),
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
    ...destinations.map((item) => ({
      ...item,
      url: `${baseUrl}${item.url}`,
    })),
    ...blogPosts.map((item) => ({
      ...item,
      url: `${baseUrl}${item.url}`,
    })),
    ...experiences.map((item) => ({
      ...item,
      url: `${baseUrl}${item.url}`,
    })),
    ...lodging.map((item) => ({
      ...item,
      url: `${baseUrl}${item.url}`,
    })),
    ...foodGuides.map((item) => ({
      ...item,
      url: `${baseUrl}${item.url}`,
    })),
    ...essentials.map((item) => ({
      ...item,
      url: `${baseUrl}${item.url}`,
    })),
    ...itineraries.map((item) => ({
      ...item,
      url: `${baseUrl}${item.url}`,
    })),
  ];

  return allEntries;
}
