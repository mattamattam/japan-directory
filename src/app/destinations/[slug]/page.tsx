import { notFound } from "next/navigation";
import {
  getDestinationBySlug,
  getDestinations,
  getDistrictsByDestination,
} from "@/lib/sanity-queries";
import DestinationPageClient from "@/components/DestinationPageClient";
import Layout from "@/components/Layout";
import SidebarAd from "@/components/SidebarAd";

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
    title: `${destination.name} - Visit Japan HQ`,
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

  // Fetch districts for this destination
  const districts = await getDistrictsByDestination(resolvedParams.slug);

  // Transform districts data for the component
  const districtsWithProps = districts.map((district: any) => ({
    name: district.name,
    description: district.description,
    image: district.image,
    rating: 4.5, // Default rating since it's not in the schema yet
    reviewCount: 100, // Default review count
    highlights: district.highlights || [],
    href: `/destinations/${resolvedParams.slug}/districts/${typeof district.slug === "string" ? district.slug : district.slug.current}`,
  }));

  return (
    <Layout>
      <DestinationPageClient
        destination={destination}
        districts={districtsWithProps}
        params={resolvedParams}
      />
    </Layout>
  );
}
