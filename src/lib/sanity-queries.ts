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

interface SanityTip {
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

// Fetch all tips
export async function getTips() {
  const query = `*[_type == "tip"] | order(featured desc, title asc) {
    _id,
    title,
    slug,
    category,
    description,
    image,
    featured
  }`;

  try {
    const tips = await sanity.fetch(query);
    return tips.map((tip: SanityTip) => ({
      ...tip,
      image: imageUrlBuilder(tip.image, 800, 600),
    }));
  } catch (error) {
    console.error("Error fetching tips:", error);
    return [];
  }
}

// Fetch tips by category
export async function getTipsByCategory(category: string) {
  const query = `*[_type == "tip" && category == $category] | order(featured desc, title asc) {
    _id,
    title,
    slug,
    category,
    description,
    image,
    featured
  }`;

  try {
    const tips = await sanity.fetch(query, { category });
    return tips.map((tip: SanityTip) => ({
      ...tip,
      image: imageUrlBuilder(tip.image, 800, 600),
    }));
  } catch (error) {
    console.error("Error fetching tips by category:", error);
    return [];
  }
}

// Fetch single tip by slug
export async function getTipBySlug(slug: string) {
  const query = `*[_type == "tip" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    description,
    content,
    image,
    seoTitle,
    seoDescription,
    seoKeywords
  }`;

  try {
    const tip = await sanity.fetch(query, { slug });
    if (!tip) return null;

    return {
      ...tip,
      image: imageUrlBuilder(tip.image, 1200, 800),
    };
  } catch (error) {
    console.error("Error fetching tip:", error);
    return null;
  }
}

// Fetch featured tips
export async function getFeaturedTips(limit: number = 3) {
  const query = `*[_type == "tip" && featured == true] | order(title asc)[0...${limit}] {
    _id,
    title,
    slug,
    category,
    description,
    image
  }`;

  try {
    const tips = await sanity.fetch(query);
    return tips.map((tip: SanityTip) => ({
      ...tip,
      image: imageUrlBuilder(tip.image, 800, 600),
    }));
  } catch (error) {
    console.error("Error fetching featured tips:", error);
    return [];
  }
}

// Fetch navigation data for header
export async function getNavigationData() {
  try {
    // Get destinations
    const destinationsQuery = `*[_type == "destination"] | order(name asc) {
      _id,
      name,
      slug,
      region
    }`;

    const destinations = await sanity.fetch(destinationsQuery);

    // Get districts with a simpler query
    const districtsQuery = `*[_type == "district" && featured == true] {
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
