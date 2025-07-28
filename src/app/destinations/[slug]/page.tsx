import { notFound } from "next/navigation";
import {
  getDestinationBySlug,
  getHotelsByDestination,
  getDestinations,
} from "@/lib/sanity-queries";
import DestinationPageClient from "@/components/DestinationPageClient";
import type { Hotel } from "@/types";

// Define the district data structure for this page
interface DistrictData {
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  highlights: string[];
  href: string;
  id?: string;
  transit?: string;
}

interface DestinationPageProps {
  params: Promise<{ slug: string }>;
}

// District data for each destination
const districtData = {
  tokyo: [
    {
      name: "Shibuya",
      description: "Tokyo's vibrant youth culture and fashion district",
      image:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=600&fit=crop",
      rating: 4.7,
      reviewCount: 2341,
      highlights: [
        "Shibuya Crossing",
        "Fashion boutiques",
        "Nightlife",
        "Youth culture",
      ],
      href: "/destinations/tokyo/districts/shibuya",
    },
    {
      name: "Shinjuku",
      description: "Tokyo's major business and entertainment district",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
      rating: 4.6,
      reviewCount: 1987,
      highlights: [
        "Tokyo Metropolitan Government Building",
        "Golden Gai",
        "Business district",
        "Entertainment",
      ],
      href: "/destinations/tokyo/districts/shinjuku",
    },
    {
      name: "Harajuku",
      description: "Tokyo's fashion and youth culture mecca",
      image:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=600&fit=crop",
      rating: 4.5,
      reviewCount: 1654,
      highlights: [
        "Takeshita Street",
        "Meiji Shrine",
        "Fashion boutiques",
        "Youth culture",
      ],
      href: "/destinations/tokyo/districts/harajuku",
    },
    {
      name: "Akihabara",
      description: "Tokyo's electronics and anime district",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
      rating: 4.4,
      reviewCount: 1432,
      highlights: [
        "Electronics stores",
        "Anime and manga",
        "Gaming culture",
        "Tech shopping",
      ],
      href: "/destinations/tokyo/districts/akihabara",
    },
    {
      name: "Asakusa",
      description: "Tokyo's traditional culture and history district",
      image:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=600&fit=crop",
      rating: 4.8,
      reviewCount: 2156,
      highlights: [
        "Senso-ji Temple",
        "Traditional crafts",
        "Street food",
        "Cultural heritage",
      ],
      href: "/destinations/tokyo/districts/asakusa",
    },
  ],
  kyoto: [
    {
      name: "Gion",
      description: "Kyoto's traditional geisha district",
      image:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
      rating: 4.9,
      reviewCount: 1876,
      highlights: [
        "Geisha culture",
        "Traditional architecture",
        "Tea houses",
        "Cultural heritage",
      ],
      href: "/destinations/kyoto/districts/gion",
    },
    {
      name: "Arashiyama",
      description: "Kyoto's scenic bamboo grove and temple district",
      image:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
      rating: 4.7,
      reviewCount: 1654,
      highlights: [
        "Bamboo Grove",
        "Temples and shrines",
        "Natural beauty",
        "Seasonal scenery",
      ],
      href: "/destinations/kyoto/districts/arashiyama",
    },
    {
      name: "Higashiyama",
      description: "Kyoto's historic temple and shrine district",
      image:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
      rating: 4.8,
      reviewCount: 1987,
      highlights: [
        "Kiyomizu-dera Temple",
        "Traditional streets",
        "Cultural heritage",
        "Historic atmosphere",
      ],
      href: "/destinations/kyoto/districts/higashiyama",
    },
  ],
  osaka: [
    {
      name: "Dotonbori",
      description: "Osaka's famous entertainment and food district",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      rating: 4.6,
      reviewCount: 2341,
      highlights: ["Neon signs", "Street food", "Entertainment", "Nightlife"],
      href: "/destinations/osaka/districts/dotonbori",
    },
    {
      name: "Namba",
      description: "Osaka's major shopping and entertainment district",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      rating: 4.5,
      reviewCount: 1876,
      highlights: [
        "Shopping centers",
        "Entertainment",
        "Dining",
        "Transportation hub",
      ],
      href: "/destinations/osaka/districts/namba",
    },
    {
      name: "Shinsaibashi",
      description: "Osaka's premier shopping and fashion district",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      rating: 4.4,
      reviewCount: 1654,
      highlights: [
        "Shopping street",
        "Fashion boutiques",
        "Department stores",
        "Youth culture",
      ],
      href: "/destinations/osaka/districts/shinsaibashi",
    },
  ],
  hiroshima: [
    {
      name: "Miyajima",
      description:
        "Hiroshima's sacred island with the famous floating torii gate",
      image:
        "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?w=800&h=600&fit=crop",
      rating: 4.9,
      reviewCount: 2156,
      highlights: [
        "Itsukushima Shrine",
        "Floating torii gate",
        "Deer",
        "Natural beauty",
      ],
      href: "/destinations/hiroshima/districts/miyajima",
    },
  ],
};

export async function generateMetadata({ params }: DestinationPageProps) {
  const resolvedParams = await params;
  const destination = await getDestinationBySlug(resolvedParams.slug);

  if (!destination) {
    return {
      title: "Destination Not Found",
      description: "The requested destination could not be found.",
    };
  }

  return {
    title: `${destination.name} - Japan Directory`,
    description: `Explore ${destination.name}, Japan. Discover hotels, restaurants, tours, and shopping in this amazing destination.`,
    keywords: `${destination.name}, Japan, ${destination.name} hotels, ${destination.name} restaurants, ${destination.name} tours, ${destination.name} shopping`,
  };
}

export async function generateStaticParams() {
  const destinations = await getDestinations();
  if (destinations.length === 0) {
    return [
      { slug: "tokyo" },
      { slug: "kyoto" },
      { slug: "osaka" },
      { slug: "hiroshima" },
    ];
  }
  return destinations.map(
    (destination: { slug: string | { current: string } }) => ({
      slug:
        typeof destination.slug === "string"
          ? destination.slug
          : destination.slug.current,
    })
  );
}

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  const resolvedParams = await params;
  const destination = await getDestinationBySlug(resolvedParams.slug);
  if (!destination) {
    notFound();
  }
  const hotels = await getHotelsByDestination(destination.name);
  const districts =
    districtData[resolvedParams.slug as keyof typeof districtData] || [];
  const fallbackHotels: Hotel[] = [
    {
      _id: "1",
      name: "Luxury Hotel in " + destination.name,
      location: destination.name,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      rating: 4.8,
      reviewCount: 1247,
      price: 250,
      priceRange: "Luxury",
      category: "Hotel",
      description: "Premium accommodation in the heart of " + destination.name,
      amenities: ["Free WiFi", "Spa", "Restaurant", "Gym"],
      slug: { current: "luxury-hotel-" + destination.name.toLowerCase() },
    },
    {
      _id: "2",
      name: "Mid-Range Hotel in " + destination.name,
      location: destination.name,
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
      rating: 4.2,
      reviewCount: 856,
      price: 150,
      priceRange: "Mid-Range",
      category: "Hotel",
      description: "Comfortable accommodation with great value",
      amenities: ["Free WiFi", "Restaurant", "Parking"],
      slug: { current: "mid-range-hotel-" + destination.name.toLowerCase() },
    },
  ];
  const displayHotels = hotels.length > 0 ? hotels : fallbackHotels;
  const districtsWithProps = districts.map((district: DistrictData) => ({
    ...district,
    id: district.name.toLowerCase(),
    transit: "Varies",
  }));
  return (
    <DestinationPageClient
      destination={destination}
      districts={districtsWithProps}
      params={resolvedParams}
      displayHotels={displayHotels}
    />
  );
}
