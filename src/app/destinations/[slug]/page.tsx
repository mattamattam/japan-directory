import { notFound } from "next/navigation";
import {
  getDestinationBySlug,
  getHotelsByDestination,
  getDestinations,
  getDistrictsByDestination,
} from "@/lib/sanity-queries";
import DestinationPageClient from "@/components/DestinationPageClient";
import Layout from "@/components/Layout";
import type { Hotel } from "@/types";

interface DestinationPageProps {
  params: Promise<{ slug: string }>;
}

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

  // Fetch districts and hotels for this destination
  const [districts, hotels] = await Promise.all([
    getDistrictsByDestination(resolvedParams.slug),
    getHotelsByDestination(destination.name),
  ]);

  // Transform districts data for the component
  const districtsWithProps = districts.map((district: any) => ({
    name: district.name,
    description: district.description,
    image: district.image,
    rating: 4.5, // Default rating since it's not in the schema yet
    reviewCount: 100, // Default review count
    highlights: district.highlights || [],
    href: `/destinations/${resolvedParams.slug}/districts/${district.slug.current}`,
  }));

  // Fallback hotels if none found
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

  return (
    <Layout>
      <DestinationPageClient
        destination={destination}
        districts={districtsWithProps}
        params={resolvedParams}
        displayHotels={displayHotels}
      />
    </Layout>
  );
}
