// Main shared types for Japan Directory

export interface Destination {
  _id: string;
  name: string;
  region: string;
  description: string;
  longDescription?: any; // Portable Text content
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  highlights?: string[];
  bestTime?: string;
  slug: { current: string } | string;
}

export interface Hotel {
  _id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  priceRange?: string;
  category?: string;
  description?: string;
  amenities?: string[];
  slug: { current: string } | string;
}

export interface District {
  name: string;
  description: string;
  longDescription?: any; // Portable Text content
  image: string;
  rating: number;
  reviewCount: number;
  highlights: string[];
  bestTime?: string;
  content: string;
  id?: string;
  href?: string;
  transit?: string;
}

export interface Restaurant {
  _id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  category: string;
  description: string;
  cuisine: string;
  slug: { current: string } | string;
}

export interface Tour {
  _id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  duration: string;
  category: string;
  description: string;
  slug: { current: string } | string;
}

export interface Shopping {
  _id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  description: string;
  slug: { current: string } | string;
}

export interface SectionPage {
  _id: string;
  title: string;
  slug: { current: string } | string;
  description: string;
  longDescription?: any; // Portable Text content
  image?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  content?: any; // Portable Text content
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}
