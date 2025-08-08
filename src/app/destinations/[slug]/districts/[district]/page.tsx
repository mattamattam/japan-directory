import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getDistrictBySlug,
  getDestinationBySlug,
  getDestinations,
  getDistrictsByDestination,
} from "@/lib/sanity-queries";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/Button";
import PortableText from "@/components/PortableText";
import Breadcrumb from "@/components/Breadcrumb";
import AdBanner from "@/components/AdBanner";
import SidebarAd from "@/components/SidebarAd";
import {
  MapPinIcon,
  StarIcon,
  CurrencyYenIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";
import {
  fetchPlaceData,
  getPlaceQuery,
  getFallbackPlaceData,
  GooglePlaceData,
} from "@/lib/places-utils";
import PlaceInfo from "@/components/PlaceInfo";

interface DistrictPageProps {
  params: Promise<{
    slug: string;
    district: string;
  }>;
}

export async function generateMetadata({
  params,
}: DistrictPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const district = await getDistrictBySlug(resolvedParams.district);

  if (!district) {
    return {
      title: "District Not Found",
    };
  }

  return {
    title: `${district.name}, ${district.destination.name} - Japan Travel Guide`,
    description: district.seoDescription || district.description,
    keywords: district.seoKeywords?.join(", ") || "",
  };
}

export async function generateStaticParams() {
  const destinations = await getDestinations();
  const params: Array<{ slug: string; district: string }> = [];

  for (const destination of destinations) {
    const destinationSlug =
      typeof destination.slug === "string"
        ? destination.slug
        : destination.slug.current;
    const districts = await getDistrictsByDestination(destinationSlug);

    for (const district of districts) {
      const districtSlug =
        typeof district.slug === "string"
          ? district.slug
          : district.slug.current;
      params.push({
        slug: destinationSlug,
        district: districtSlug,
      });
    }
  }

  return params;
}

export default async function DistrictPage({ params }: DistrictPageProps) {
  const resolvedParams = await params;
  const [district, destination] = await Promise.all([
    getDistrictBySlug(resolvedParams.district),
    getDestinationBySlug(resolvedParams.slug),
  ]);

  if (!district || !destination) {
    notFound();
  }

  // Fetch place data for the district (skip in CI/CD environments)
  const isCI =
    process.env.CI || process.env.GITHUB_ACTIONS || process.env.VERCEL;
  let placeData: GooglePlaceData | null = null;

  if (!isCI) {
    const placeQuery = getPlaceQuery(district, "district", destination.name);

    try {
      placeData = await fetchPlaceData(placeQuery);
    } catch (error) {
      console.warn("Failed to fetch district place data:", error);
    }
  }

  if (!placeData) {
    placeData = getFallbackPlaceData(district.name);
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "Destinations",
            href: "/destinations",
          },
          {
            label: destination.name,
            href: `/destinations/${typeof destination.slug === "string" ? destination.slug : destination.slug.current}`,
          },
          {
            label: district.name,
          },
        ]}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {district.name}
            </h1>
            <p className="mt-6 text-lg leading-8 text-red-100">
              {district.description}
            </p>
          </div>
        </div>
      </section>

      {/* Google AdSense Banner */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AdBanner adSlot="district-page-banner" adFormat="banner" />
        </div>
      </section>

      {/* District Content */}
      <section className="py-8 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                {district.longDescription ? (
                  <PortableText content={district.longDescription} />
                ) : (
                  <>
                    <p>{district.description}</p>

                    <div className="mt-8">
                      <h3>Getting There</h3>
                      <p>
                        {district.name} is easily accessible from{" "}
                        {destination.name} via public transportation. Consider
                        using the Japan Rail Pass for convenient travel.
                      </p>
                    </div>

                    <div className="mt-8">
                      <h3>Best Time to Visit</h3>
                      <p>
                        The best time to visit {district.name} depends on your
                        interests. Spring and autumn offer pleasant weather and
                        beautiful scenery.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Quick Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPinIcon className="h-5 w-5 text-gray-400 mr-3" />
                    <span>Part of {destination.name}</span>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 text-yellow-400 mr-3" />
                    <span>Popular district</span>
                  </div>
                  <div className="flex items-center">
                    <CurrencyYenIcon className="h-5 w-5 text-gray-400 mr-3" />
                    <span>Budget-friendly</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 text-gray-400 mr-3" />
                    <span>Year-round destination</span>
                  </div>
                </div>
              </div>

              {/* Highlights Section */}
              {district.highlights && district.highlights.length > 0 && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Highlights</h3>
                  <div className="space-y-2">
                    {district.highlights.map(
                      (highlight: string, index: number) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Google Places Rating and Reviews */}
              <PlaceInfo
                placeData={placeData}
                placeName={district.name}
                showReviews={true}
              />

              {/* Related Links */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Explore More</h3>
                <div className="space-y-3">
                  <Link
                    href={`/destinations/${destination.slug.current}/hotels`}
                    className="block text-red-600 hover:text-red-800"
                  >
                    Hotels in {destination.name}
                  </Link>
                  <Link
                    href={`/destinations/${destination.slug.current}/restaurants`}
                    className="block text-red-600 hover:text-red-800"
                  >
                    Restaurants in {destination.name}
                  </Link>
                  <Link
                    href={`/destinations/${destination.slug.current}/tours`}
                    className="block text-red-600 hover:text-red-800"
                  >
                    Tours in {destination.name}
                  </Link>
                  <Link
                    href={`/destinations/${destination.slug.current}/shopping`}
                    className="block text-red-600 hover:text-red-800"
                  >
                    Shopping in {destination.name}
                  </Link>
                </div>
              </div>

              {/* Sidebar Ad */}
              <SidebarAd adSlot="district-sidebar-ad" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
