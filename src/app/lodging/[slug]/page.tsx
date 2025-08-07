import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLodgingBySlug, getLodging } from "@/lib/sanity-queries";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import AdBanner from "@/components/AdBanner";
import SidebarAd from "@/components/SidebarAd";
import PortableText from "@/components/PortableText";
import ContentMetadata, {
  ContentStatusPills,
  LastUpdatedText,
} from "@/components/ContentMetadata";
import Image from "next/image";
import {
  HomeIcon,
  MapPinIcon,
  CurrencyYenIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";

interface LodgingPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: LodgingPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lodging = await getLodgingBySlug(resolvedParams.slug);

  if (!lodging) {
    return {
      title: "Lodging Guide Not Found",
      description: "The requested lodging guide could not be found.",
    };
  }

  return {
    title: `${lodging.name} - Visit Japan HQ`,
    description: lodging.seoDescription || lodging.description,
    keywords: lodging.seoKeywords?.join(", ") || "",
  };
}

export async function generateStaticParams() {
  const lodgingItems = await getLodging();

  // Ensure lodgingItems is an array and filter out invalid items
  const safeLodgingItems = Array.isArray(lodgingItems) ? lodgingItems : [];

  return safeLodgingItems
    .filter((item: any) => item && item.slug)
    .map((item: any) => ({
      slug: typeof item.slug === "string" ? item.slug : item.slug.current,
    }));
}

export default async function LodgingPage({ params }: LodgingPageProps) {
  const resolvedParams = await params;
  const lodging = await getLodgingBySlug(resolvedParams.slug);

  if (!lodging) {
    notFound();
  }

  // Ensure all required properties exist
  const safeLodging = {
    name: lodging.name || "Lodging Guide",
    description: lodging.description || "",
    location: lodging.location || "",
    category: lodging.category || "",
    priceRange: lodging.priceRange || "",
    amenities: Array.isArray(lodging.amenities) ? lodging.amenities : [],
    image: lodging.image || "",
    longDescription: lodging.longDescription || null,
    content: lodging.content || null,
    seoDescription: lodging.seoDescription || lodging.description || "",
    seoKeywords: Array.isArray(lodging.seoKeywords) ? lodging.seoKeywords : [],
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "Lodging",
            href: "/lodging",
          },
          {
            label: safeLodging.name,
          },
        ]}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {safeLodging.name}
            </h1>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              {safeLodging.description}
            </p>
          </div>
        </div>
      </section>

      {/* Google AdSense Banner */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AdBanner adSlot="lodging-page-banner" adFormat="banner" />
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* About Section */}
            <section className="bg-white rounded-lg shadow-sm p-8 mb-8 relative">
              {/* Content Status Pills in upper right corner */}
              <div className="absolute top-4 right-4">
                <ContentStatusPills
                  lastUpdated={lodging._updatedAt || new Date()}
                  factChecked={true}
                />
              </div>

              <div className="prose prose-lg text-gray-600">
                {safeLodging.longDescription ? (
                  <PortableText content={safeLodging.longDescription} />
                ) : safeLodging.content ? (
                  <PortableText content={safeLodging.content} />
                ) : (
                  <p className="mb-4">{safeLodging.description}</p>
                )}
              </div>

              {/* Last Updated at bottom of article */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <LastUpdatedText
                  lastUpdated={lodging._updatedAt || new Date()}
                />
              </div>
            </section>

            {/* Featured Image */}
            {safeLodging.image && (
              <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Accommodation Gallery
                </h2>
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src={safeLodging.image}
                    alt={safeLodging.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Accommodation Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <HomeIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">{safeLodging.name}</span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">{safeLodging.location}</span>
                </div>
                <div className="flex items-center">
                  <CurrencyYenIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">
                    {safeLodging.priceRange || "Contact for pricing"}
                  </span>
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Category
              </h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {safeLodging.category}
              </span>
            </div>

            {/* Amenities */}
            {safeLodging.amenities && safeLodging.amenities.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Amenities
                </h3>
                <div className="space-y-2">
                  {safeLodging.amenities.map(
                    (amenity: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <CheckIcon className="h-4 w-4 text-green-500 mr-3" />
                        <span className="text-gray-700 text-sm">{amenity}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
              <p className="text-blue-100 text-sm mb-4">
                Explore our other lodging guides to find more accommodation
                options across Japan.
              </p>
              <a
                href="/lodging"
                className="w-full bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors inline-block text-center"
              >
                View All Lodging
              </a>
            </div>

            {/* Sidebar Ad */}
            <SidebarAd adSlot="lodging-sidebar-ad" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
