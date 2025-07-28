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

interface SanityHotel {
  _id: string;
  name: string;
  slug: { current: string } | string;
  location: string;
  city?: string;
  region: string;
  description: string;
  longDescription?: unknown;
  image: SanityImage;
  gallery?: SanityImage[];
  rating: number;
  reviewCount: number;
  price: number;
  priceRange?: string;
  amenities?: string[];
  category?: string;
  starRating?: number;
  featured?: boolean;
  affiliateLinks?: {
    bookingCom?: string;
    hotelsCom?: string;
    expedia?: string;
    agoda?: string;
  };
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
  };
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

// Fetch all destinations
export async function getDestinations() {
  const query = `*[_type == "destination"] | order(featured desc, name asc) {
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
  const query = `*[_type == "destination" && featured == true] | order(name asc)[0...${limit}] {
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

// Fetch all hotels
export async function getHotels() {
  const query = `*[_type == "hotel"] | order(featured desc, name asc) {
    _id,
    name,
    slug,
    location,
    city,
    region,
    description,
    image,
    rating,
    reviewCount,
    price,
    priceRange,
    amenities,
    category,
    starRating,
    featured,
    affiliateLinks,
    contactInfo
  }`;

  try {
    const hotels = await sanity.fetch(query);
    return hotels.map((hotel: SanityHotel) => ({
      ...hotel,
      image: imageUrlBuilder(hotel.image, 800, 600),
    }));
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return [];
  }
}

// Fetch featured hotels
export async function getFeaturedHotels(limit: number = 6) {
  const query = `*[_type == "hotel" && featured == true] | order(name asc)[0...${limit}] {
    _id,
    name,
    slug,
    location,
    city,
    region,
    description,
    image,
    rating,
    reviewCount,
    price,
    priceRange,
    amenities,
    category,
    starRating,
    affiliateLinks
  }`;

  try {
    const hotels = await sanity.fetch(query);
    return hotels.map((hotel: SanityHotel) => ({
      ...hotel,
      image: imageUrlBuilder(hotel.image, 800, 600),
    }));
  } catch (error) {
    console.error("Error fetching featured hotels:", error);
    return [];
  }
}

// Fetch hotels by category
export async function getHotelsByCategory(category: string) {
  const query = `*[_type == "hotel" && priceRange == $category] | order(name asc) {
    _id,
    name,
    slug,
    location,
    city,
    region,
    description,
    image,
    rating,
    reviewCount,
    price,
    priceRange,
    amenities,
    category,
    starRating,
    affiliateLinks
  }`;

  try {
    const hotels = await sanity.fetch(query, { category });
    return hotels.map((hotel: SanityHotel) => ({
      ...hotel,
      image: imageUrlBuilder(hotel.image, 800, 600),
    }));
  } catch (error) {
    console.error("Error fetching hotels by category:", error);
    return [];
  }
}

// Fetch hotels by destination
export async function getHotelsByDestination(destinationSlug: string) {
  const query = `*[_type == "hotel" && destination->slug.current == $destinationSlug] {
    _id,
    name,
    slug,
    location,
    city,
    region,
    description,
    image,
    rating,
    reviewCount,
    price,
    priceRange,
    amenities,
    category,
    starRating,
    affiliateLinks
  }`;

  try {
    const hotels = await sanity.fetch(query, { destinationSlug });
    return hotels.map((hotel: SanityHotel) => ({
      ...hotel,
      image: imageUrlBuilder(hotel.image, 800, 600),
    }));
  } catch (error) {
    console.error("Error fetching hotels by destination:", error);
    return [];
  }
}

// Fetch single hotel by slug
export async function getHotelBySlug(slug: string) {
  const query = `*[_type == "hotel" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    location,
    city,
    region,
    description,
    longDescription,
    image,
    gallery,
    rating,
    reviewCount,
    price,
    priceRange,
    amenities,
    category,
    starRating,
    affiliateLinks,
    contactInfo,
    seoTitle,
    seoDescription,
    seoKeywords
  }`;

  try {
    const hotel = await sanity.fetch(query, { slug });
    if (!hotel) return null;

    return {
      ...hotel,
      image: imageUrlBuilder(hotel.image, 1200, 800),
      gallery:
        hotel.gallery?.map((img: SanityImage) => ({
          ...img,
          url: imageUrlBuilder(img, 800, 600),
        })) || [],
    };
  } catch (error) {
    console.error("Error fetching hotel:", error);
    return null;
  }
}
