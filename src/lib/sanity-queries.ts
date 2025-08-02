import { sanity } from "./sanity";

// TypeScript interfaces for Sanity data
interface SanityImage {
  asset?: { _ref: string };
}

interface SanityDestination {
  _id: string;
  name: string;
  slug: { current: string } | string;
  region: string;
  description: string;
  longDescription?: unknown;
  image: SanityImage;
  gallery?: SanityImage[];
  rating: number;
  reviewCount: number;
  price: number;
  highlights?: string[];
  bestTime?: string;
  weather?: string;
  transportation?: string;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

interface SanityDistrict {
  _id: string;
  name: string;
  slug: { current: string } | string;
  destination: {
    _id: string;
    name: string;
    slug: { current: string } | string;
  };
  description: string;
  image: SanityImage;
  highlights?: string[];
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

// New interfaces for additional content types
interface SanityRestaurant {
  _id: string;
  name: string;
  slug: { current: string } | string;
  location: string;
  city?: string;
  region: string;
  description: string;
  cuisine: string;
  priceRange?: string;
  rating: number;
  reviewCount: number;
  image: SanityImage;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

interface SanityTransportation {
  _id: string;
  name: string;
  slug: { current: string } | string;
  type: string; // train, bus, subway, etc.
  description: string;
  region: string;
  image: SanityImage;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

interface SanityInsurance {
  _id: string;
  name: string;
  slug: { current: string } | string;
  provider: string;
  description: string;
  coverage: string[];
  price: number;
  rating: number;
  reviewCount: number;
  image: SanityImage;
  featured?: boolean;
  affiliateLink?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

interface SanityGuide {
  _id: string;
  title: string;
  slug: { current: string } | string;
  category: string;
  description: string;
  content?: unknown;
  image: SanityImage;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

interface SanityEvent {
  _id: string;
  name: string;
  slug: { current: string } | string;
  location: string;
  description: string;
  startDate: string;
  endDate?: string;
  season: string;
  image: SanityImage;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

interface SanityLanguage {
  _id: string;
  title: string;
  slug: { current: string } | string;
  category: string;
  description: string;
  content?: unknown;
  image: SanityImage;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

interface SanitySectionPage {
  _id: string;
  title: string;
  slug: { current: string } | string;
  description: string;
  longDescription?: unknown;
  image: SanityImage;
  heroTitle?: string;
  heroSubtitle?: string;
  content?: unknown;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

// Helper function to build image URLs
function imageUrlBuilder(
  image: SanityImage | null,
  width: number = 800,
  height: number = 600
) {
  if (!image || !image.asset) return null;

  const assetRef = image.asset._ref;
  const [fileId, extension] = assetRef.replace("image-", "").split("-");
  const fileExtension =
    extension === "jpg" ? "jpg" : extension === "png" ? "png" : "webp";

  return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${fileId}.${fileExtension}?w=${width}&h=${height}&fit=crop`;
}

// Query to discover all available document types
export async function getAvailableDocumentTypes() {
  // First, let's try to get all document types
  const allTypesQuery = `*[_type in ["destination", "hotel", "tip", "district", "restaurant", "transportation", "insurance", "guide", "event", "language", "blog", "page", "author", "category", "tour", "article", "service", "faq", "testimonial", "partner", "sponsor"] && defined(publishedAt)] {
    _type,
    _id,
    name,
    title,
    slug
  }`;

  try {
    const results = await sanity.fetch(allTypesQuery);

    // Group by document type
    const groupedResults = results.reduce((acc: any, doc: any) => {
      if (!acc[doc._type]) {
        acc[doc._type] = [];
      }
      acc[doc._type].push(doc);
      return acc;
    }, {});

    console.log(
      "Available document types in Sanity:",
      Object.keys(groupedResults)
    );
    console.log(
      "Document counts:",
      Object.keys(groupedResults).map(
        (type) => `${type}: ${groupedResults[type].length}`
      )
    );

    return groupedResults;
  } catch (error) {
    console.error("Error fetching document types:", error);
    return {};
  }
}

// Query to get all document types (more comprehensive)
export async function getAllDocumentTypes() {
  const query = `*[_type in ["destination", "tip", "district", "experience", "planningGuide", "foodGuide", "blogPost"] && defined(publishedAt)] {
    _type,
    _id,
    name,
    title,
    slug,
    "hasContent": defined(content),
    "hasImage": defined(image),
    "hasDescription": defined(description)
  }`;

  try {
    const results = await sanity.fetch(query);

    // Group by document type and analyze structure
    const groupedResults = results.reduce((acc: any, doc: any) => {
      if (!acc[doc._type]) {
        acc[doc._type] = {
          count: 0,
          documents: [],
          hasContent: false,
          hasImage: false,
          hasDescription: false,
        };
      }
      acc[doc._type].count++;
      acc[doc._type].documents.push(doc);
      acc[doc._type].hasContent = acc[doc._type].hasContent || doc.hasContent;
      acc[doc._type].hasImage = acc[doc._type].hasImage || doc.hasImage;
      acc[doc._type].hasDescription =
        acc[doc._type].hasDescription || doc.hasDescription;
      return acc;
    }, {});

    console.log("Comprehensive document type analysis:", groupedResults);

    return groupedResults;
  } catch (error) {
    console.error("Error fetching all document types:", error);
    return {};
  }
}

// Fetch all destinations
export async function getDestinations(sortBy: string = "featured") {
  let orderClause = "";

  switch (sortBy) {
    case "name":
      orderClause = "| order(name asc)";
      break;
    case "rating":
      orderClause = "| order(rating desc, name asc)";
      break;
    case "price":
      orderClause = "| order(price asc, name asc)";
      break;
    case "region":
      orderClause = "| order(region asc, name asc)";
      break;
    case "featured":
    default:
      orderClause = "| order(featured desc, name asc)";
      break;
  }

  const query = `*[_type == "destination" && defined(publishedAt)] ${orderClause} {
    _id,
    name,
    slug,
    region,
    description,
    image,
    rating,
    reviewCount,
    price,
    highlights,
    bestTime,
    featured
  }`;

  try {
    const destinations = await sanity.fetch(query);
    return destinations.map((dest: SanityDestination) => ({
      ...dest,
      image: imageUrlBuilder(dest.image, 800, 600),
    }));
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return [];
  }
}

// Fetch featured destinations
export async function getFeaturedDestinations(limit: number = 3) {
  const query = `*[_type == "destination" && featured == true && defined(publishedAt)] | order(name asc)[0...${limit}] {
    _id,
    name,
    slug,
    region,
    description,
    image,
    rating,
    reviewCount,
    price,
    highlights,
    bestTime
  }`;

  try {
    const destinations = await sanity.fetch(query);
    return destinations.map((dest: SanityDestination) => ({
      ...dest,
      image: imageUrlBuilder(dest.image, 800, 600),
    }));
  } catch (error) {
    console.error("Error fetching featured destinations:", error);
    return [];
  }
}

// Fetch single destination by slug
export async function getDestinationBySlug(slug: string) {
  const query = `*[_type == "destination" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    region,
    description,
    longDescription,
    image,
    gallery,
    rating,
    reviewCount,
    price,
    highlights,
    bestTime,
    weather,
    transportation,
    seoTitle,
    seoDescription,
    seoKeywords
  }`;

  try {
    const destination = await sanity.fetch(query, { slug });
    if (!destination) return null;

    return {
      ...destination,
      image: imageUrlBuilder(destination.image, 1200, 800),
      gallery:
        destination.gallery?.map((img: SanityImage) => ({
          ...img,
          url: imageUrlBuilder(img, 800, 600),
        })) || [],
    };
  } catch (error) {
    console.error("Error fetching destination:", error);
    return null;
  }
}

// Fetch navigation data for header
export async function getNavigationData() {
  try {
    // Get destinations
    const destinationsQuery = `*[_type == "destination" && defined(publishedAt)] | order(name asc) {
      _id,
      name,
      slug,
      region
    }`;

    const destinations = await sanity.fetch(destinationsQuery);

    // Get districts with a simpler query
    const districtsQuery = `*[_type == "district" && featured == true && defined(publishedAt)] {
      _id,
      name,
      slug,
      destination->{
        _id
      }
    }`;

    const districts = await sanity.fetch(districtsQuery);

    // Group districts by destination
    const destinationsWithDistricts = destinations.map((destination: any) => ({
      ...destination,
      districts: districts
        .filter(
          (district: any) =>
            district.destination && district.destination._id === destination._id
        )
        .slice(0, 5),
    }));

    return { destinations: destinationsWithDistricts };
  } catch (error) {
    console.error("Error fetching navigation data:", error);
    return { destinations: [] };
  }
}

// Fetch districts by destination
export async function getDistrictsByDestination(destinationSlug: string) {
  // First, get the destination ID
  const destinationQuery = `*[_type == "destination" && slug.current == $destinationSlug][0] {
    _id
  }`;

  try {
    const destination = await sanity.fetch(destinationQuery, {
      destinationSlug,
    });

    if (!destination) {
      console.log(`No destination found for slug: ${destinationSlug}`);
      return [];
    }

    // Then get districts for this destination
    const districtsQuery = `*[_type == "district" && destination._ref == $destinationId] | order(name asc) {
      _id,
      name,
      slug,
      description,
      image,
      highlights,
      featured
    }`;

    const districts = await sanity.fetch(districtsQuery, {
      destinationId: destination._id,
    });

    return districts.map((district: SanityDistrict) => ({
      ...district,
      image: district.image ? imageUrlBuilder(district.image, 800, 600) : null,
    }));
  } catch (error) {
    console.error("Error fetching districts:", error);
    return [];
  }
}

// Fetch single district by slug
export async function getDistrictBySlug(slug: string) {
  const query = `*[_type == "district" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    image,
    highlights,
    destination->{
      _id,
      name,
      slug
    },
    seoTitle,
    seoDescription,
    seoKeywords
  }`;

  try {
    const district = await sanity.fetch(query, { slug });
    if (!district) return null;

    return {
      ...district,
      image: imageUrlBuilder(district.image, 1200, 800),
    };
  } catch (error) {
    console.error("Error fetching district:", error);
    return null;
  }
}

// Fetch all experiences
export async function getExperiences() {
  const query = `*[_type == "experience" && defined(publishedAt)] | order(featured desc, name asc) {
    _id,
    name,
    slug,
    description,
    image,
    rating,
    reviewCount,
    price,
    location,
    duration,
    category,
    featured,
    seoTitle,
    seoDescription,
    seoKeywords
  }`;

  try {
    const experiences = await sanity.fetch(query);
    return experiences.map((experience: any) => ({
      ...experience,
      image: imageUrlBuilder(experience.image, 800, 600),
    }));
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
}

// Fetch featured experiences
export async function getFeaturedExperiences(limit: number = 6) {
  const query = `*[_type == "experience" && featured == true && defined(publishedAt)] | order(name asc)[0...${limit}] {
    _id,
    name,
    slug,
    description,
    image,
    rating,
    reviewCount,
    price,
    location,
    duration,
    category,
    seoTitle,
    seoDescription,
    seoKeywords
  }`;

  try {
    const experiences = await sanity.fetch(query);
    return experiences.map((experience: any) => ({
      ...experience,
      image: imageUrlBuilder(experience.image, 800, 600),
    }));
  } catch (error) {
    console.error("Error fetching featured experiences:", error);
    return [];
  }
}

// Fetch single experience by slug
export async function getExperienceBySlug(slug: string) {
  const query = `*[_type == "experience" && slug.current == $slug && defined(publishedAt)][0] {
    _id,
    name,
    slug,
    description,
    longDescription,
    image,
    gallery,
    rating,
    reviewCount,
    price,
    location,
    duration,
    category,
    highlights,
    seoTitle,
    seoDescription,
    seoKeywords
  }`;

  try {
    const experience = await sanity.fetch(query, { slug });
    if (!experience) return null;

    return {
      ...experience,
      image: imageUrlBuilder(experience.image, 1200, 800),
      gallery:
        experience.gallery?.map((img: SanityImage) => ({
          ...img,
          url: imageUrlBuilder(img, 800, 600),
        })) || [],
    };
  } catch (error) {
    console.error("Error fetching experience:", error);
    return null;
  }
}

// Fetch all planning guides
export async function getEssentials() {
  const query = `*[_type == "planningGuide" && defined(publishedAt)] | order(featured desc, title asc) {
    _id,
    title,
    slug,
    description,
    image,
    category,
    featured,
    seoTitle,
    seoDescription,
    seoKeywords
  }`;

  try {
    const guides = await sanity.fetch(query);
    return guides.map((guide: any) => ({
      ...guide,
      image: imageUrlBuilder(guide.image, 800, 600),
    }));
  } catch (error) {
    console.error("Error fetching essentials:", error);
    return [];
  }
}

// Fetch single essential by slug
export async function getEssentialBySlug(slug: string) {
  const query = `*[_type == "planningGuide" && slug.current == $slug && defined(publishedAt)][0] {
    _id,
    title,
    slug,
    description,
    content,
    image,
    category,
    seoTitle,
    seoDescription,
    seoKeywords
  }`;

  try {
    const guide = await sanity.fetch(query, { slug });
    if (!guide) return null;

    return {
      ...guide,
      image: imageUrlBuilder(guide.image, 1200, 800),
    };
  } catch (error) {
    console.error("Error fetching essential:", error);
    return null;
  }
}

// Fetch food
export async function getFood() {
  const query = `*[_type == "foodGuide" && defined(publishedAt)] | order(featured desc, title asc) {
    _id,
    title,
    slug,
    description,
    image,
    category,
    featured,
    seoTitle,
    seoDescription,
    seoKeywords
  }`;

  try {
    const guides = await sanity.fetch(query);
    return guides.map((guide: any) => ({
      ...guide,
      image: imageUrlBuilder(guide.image, 800, 600),
    }));
  } catch (error) {
    console.error("Error fetching food:", error);
    return [];
  }
}

// Fetch single food item by slug
export async function getFoodBySlug(slug: string) {
  const query = `*[_type == "foodGuide" && slug.current == $slug && defined(publishedAt)][0] {
    _id,
    title,
    slug,
    description,
    content,
    image,
    category,
    seoTitle,
    seoDescription,
    seoKeywords
  }`;

  try {
    const guide = await sanity.fetch(query, { slug });
    if (!guide) return null;

    return {
      ...guide,
      image: imageUrlBuilder(guide.image, 1200, 800),
    };
  } catch (error) {
    console.error("Error fetching food item:", error);
    return null;
  }
}

// Fetch all blog posts
export async function getBlogPosts() {
  const query = `*[_type == "blogPost" && defined(publishedAt)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    image,
    publishedAt,
    author,
    tags,
    seoTitle,
    seoDescription,
    seoKeywords
  }`;

  try {
    const posts = await sanity.fetch(query);
    return posts.map((post: any) => ({
      ...post,
      image: imageUrlBuilder(post.image, 800, 600),
    }));
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

// Fetch single blog post by slug
export async function getBlogPostBySlug(slug: string) {
  const query = `*[_type == "blogPost" && slug.current == $slug && defined(publishedAt)][0] {
    _id,
    title,
    slug,
    description,
    body,
    image,
    publishedAt,
    author,
    tags,
    seoTitle,
    seoDescription,
    seoKeywords
  }`;

  try {
    const post = await sanity.fetch(query, { slug });
    if (!post) return null;

    return {
      ...post,
      image: imageUrlBuilder(post.image, 1200, 800),
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

// Fetch section page by slug
export async function getSectionPageBySlug(slug: string) {
  const query = `*[_type == "sectionPage" && slug.current == $slug && defined(publishedAt)][0] {
    _id,
    title,
    slug,
    description,
    longDescription,
    image,
    heroTitle,
    heroSubtitle,
    content,
    seoTitle,
    seoDescription,
    seoKeywords
  }`;

  try {
    const sectionPage = await sanity.fetch(query, { slug });
    if (!sectionPage) return null;

    return {
      ...sectionPage,
      image: imageUrlBuilder(sectionPage.image, 1200, 800),
    };
  } catch (error) {
    console.error("Error fetching section page:", error);
    return null;
  }
}

// Fetch all section pages
export async function getSectionPages() {
  const query = `*[_type == "sectionPage" && defined(publishedAt)] | order(title asc) {
    _id,
    title,
    slug,
    description,
    image,
    seoTitle,
    seoDescription,
    seoKeywords
  }`;

  try {
    const sectionPages = await sanity.fetch(query);
    return sectionPages.map((page: SanitySectionPage) => ({
      ...page,
      image: imageUrlBuilder(page.image, 800, 600),
    }));
  } catch (error) {
    console.error("Error fetching section pages:", error);
    return [];
  }
}

// Fetch section pages for navigation (excluding destinations)
export async function getSectionPagesForNavigation() {
  const query = `*[_type == "sectionPage" && slug.current != "destinations" && defined(publishedAt)] | order(sortOrder asc, title asc) {
    _id,
    title,
    slug,
    description,
    sortOrder
  }`;

  try {
    const sectionPages = await sanity.fetch(query);
    return sectionPages;
  } catch (error) {
    console.error("Error fetching section pages for navigation:", error);
    return [];
  }
}
