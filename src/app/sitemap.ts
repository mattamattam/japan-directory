import { MetadataRoute } from "next";
import { client } from "@/lib/sanity";

// Base URL for your site
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://visitjapanhq.com";

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
async function getDestinations() {
  try {
    const query = `*[_type == "destination" && published == true] | order(sortOrder asc) {
      slug,
      _updatedAt
    }`;

    const destinations = await client.fetch(query);
    return destinations.map((dest: any) => ({
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
async function getBlogPosts() {
  try {
    const query = `*[_type == "post" && published == true] | order(publishedAt desc) {
      slug,
      publishedAt,
      _updatedAt
    }`;

    const posts = await client.fetch(query);
    return posts.map((post: any) => ({
      url: `/blog/${post.slug.current}`,
      lastModified: post._updatedAt || post.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Error fetching blog posts for sitemap:", error);
    return [];
  }
}

// Fetch experiences from Sanity
async function getExperiences() {
  try {
    const query = `*[_type == "experience" && published == true] | order(sortOrder asc) {
      slug,
      _updatedAt
    }`;

    const experiences = await client.fetch(query);
    return experiences.map((exp: any) => ({
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
async function getLodging() {
  try {
    const query = `*[_type == "lodging" && published == true] | order(sortOrder asc) {
      slug,
      _updatedAt
    }`;

    const lodging = await client.fetch(query);
    return lodging.map((item: any) => ({
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
async function getFoodGuides() {
  try {
    const query = `*[_type == "foodGuide" && published == true] | order(sortOrder asc) {
      slug,
      _updatedAt
    }`;

    const foodGuides = await client.fetch(query);
    return foodGuides.map((guide: any) => ({
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
async function getEssentials() {
  try {
    const query = `*[_type == "essential" && published == true] | order(sortOrder asc) {
      slug,
      _updatedAt
    }`;

    const essentials = await client.fetch(query);
    return essentials.map((essential: any) => ({
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
async function getItineraries() {
  try {
    const query = `*[_type == "itinerary" && published == true] | order(sortOrder asc) {
      slug,
      _updatedAt
    }`;

    const itineraries = await client.fetch(query);
    return itineraries.map((itinerary: any) => ({
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
  const staticSitemap = staticPages.map((page) => ({
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
  const allEntries = [
    ...staticSitemap,
    ...destinations.map((item) => ({ ...item, url: `${baseUrl}${item.url}` })),
    ...blogPosts.map((item) => ({ ...item, url: `${baseUrl}${item.url}` })),
    ...experiences.map((item) => ({ ...item, url: `${baseUrl}${item.url}` })),
    ...lodging.map((item) => ({ ...item, url: `${baseUrl}${item.url}` })),
    ...foodGuides.map((item) => ({ ...item, url: `${baseUrl}${item.url}` })),
    ...essentials.map((item) => ({ ...item, url: `${baseUrl}${item.url}` })),
    ...itineraries.map((item) => ({ ...item, url: `${baseUrl}${item.url}` })),
  ];

  return allEntries;
}
