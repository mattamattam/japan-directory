import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getItineraryBySlug, getItineraries } from "@/lib/sanity-queries";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import AdBanner from "@/components/AdBanner";
import SidebarAd from "@/components/SidebarAd";
import PortableText from "@/components/PortableText";
import Image from "next/image";
import Link from "next/link";
import {
  MapIcon,
  CalendarIcon,
  ClockIcon,
  CurrencyYenIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import ContentMetadata, {
  ContentStatusPills,
  LastUpdatedText,
} from "@/components/ContentMetadata";

interface ItineraryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ItineraryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const itinerary = await getItineraryBySlug(resolvedParams.slug);

  if (!itinerary) {
    return {
      title: "Itinerary Not Found",
      description: "The requested itinerary could not be found.",
    };
  }

  return {
    title: `${itinerary.title} - Visit Japan HQ`,
    description: itinerary.seoDescription || itinerary.description,
    keywords: itinerary.seoKeywords?.join(", ") || "",
    alternates: {
      canonical: `https://visitjapanhq.com/itineraries/${resolvedParams.slug}`,
    },
    openGraph: {
      type: "article",
      siteName: "Visit Japan HQ",
      title: `${itinerary.title} - Visit Japan HQ`,
      description: itinerary.seoDescription || itinerary.description,
      url: `https://visitjapanhq.com/itineraries/${resolvedParams.slug}`,
      images: [
        {
          url:
            itinerary.image ||
            `https://visitjapanhq.com/images/og-itinerary-${resolvedParams.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: `${itinerary.title} - Japan Travel Itinerary`,
        },
      ],
      locale: "en_US",
      section: "Travel Itineraries",
      tags: itinerary.seoKeywords || [
        "Japan Itinerary",
        "Japan Travel",
        "Travel Planning",
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${itinerary.title} - Visit Japan HQ`,
      description: itinerary.seoDescription || itinerary.description,
      images: [
        itinerary.image ||
          `https://visitjapanhq.com/images/twitter-itinerary-${resolvedParams.slug}.jpg`,
      ],
      creator: "@visitjapanhq",
      site: "@visitjapanhq",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export async function generateStaticParams() {
  const itineraryItems = await getItineraries();

  // Ensure itineraryItems is an array and filter out invalid items
  const safeItineraryItems = Array.isArray(itineraryItems)
    ? itineraryItems
    : [];

  return safeItineraryItems
    .filter((item: any) => item && item.slug)
    .map((item: any) => ({
      slug: typeof item.slug === "string" ? item.slug : item.slug.current,
    }));
}

export default async function ItineraryPage({ params }: ItineraryPageProps) {
  const resolvedParams = await params;
  const itinerary = await getItineraryBySlug(resolvedParams.slug);

  if (!itinerary) {
    notFound();
  }

  // Ensure all required properties exist
  const safeItinerary = {
    name: itinerary.title || "Itinerary Guide",
    description: itinerary.description || "",
    duration: itinerary.duration || "",
    difficulty: itinerary.difficulty || "",
    destinations: Array.isArray(itinerary.destinations)
      ? itinerary.destinations
      : [],
    priceRange: itinerary.priceRange || "",
    image: itinerary.image || "",
    longDescription: itinerary.longDescription || null,
    content: itinerary.content || null,
    dayByDay: itinerary.dayByDay || null,
    transportation: itinerary.transportation || null,
    accommodation: itinerary.accommodation || null,
    tips: itinerary.tips || null,
    seoDescription: itinerary.seoDescription || itinerary.description || "",
    seoKeywords: Array.isArray(itinerary.seoKeywords)
      ? itinerary.seoKeywords
      : [],
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "Itineraries",
            href: "/itineraries",
          },
          {
            label: safeItinerary.name,
          },
        ]}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {safeItinerary.name}
            </h1>
            <p className="mt-6 text-lg leading-8 text-green-100">
              {safeItinerary.description}
            </p>
          </div>
        </div>
      </section>

      {/* Google AdSense Banner */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AdBanner adSlot="itinerary-page-banner" adFormat="banner" />
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
                  lastUpdated={itinerary._updatedAt || new Date()}
                  factChecked={true}
                />
              </div>

              <div className="prose prose-lg text-gray-600">
                {safeItinerary.longDescription &&
                Array.isArray(safeItinerary.longDescription) ? (
                  <PortableText content={safeItinerary.longDescription} />
                ) : safeItinerary.content &&
                  Array.isArray(safeItinerary.content) ? (
                  <PortableText content={safeItinerary.content} />
                ) : (
                  <p className="mb-4">{safeItinerary.description}</p>
                )}
              </div>

              {/* Last Updated at bottom of article */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <LastUpdatedText
                  lastUpdated={itinerary._updatedAt || new Date()}
                />
              </div>
            </section>

            {/* Day by Day Itinerary */}
            {safeItinerary.dayByDay &&
              Array.isArray(safeItinerary.dayByDay) && (
                <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Day by Day Itinerary
                  </h2>
                  <div className="prose prose-lg text-gray-600">
                    <PortableText content={safeItinerary.dayByDay} />
                  </div>
                </section>
              )}

            {/* Transportation */}
            {safeItinerary.transportation &&
              Array.isArray(safeItinerary.transportation) && (
                <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Transportation Guide
                  </h2>
                  <div className="prose prose-lg text-gray-600">
                    <PortableText content={safeItinerary.transportation} />
                  </div>
                </section>
              )}

            {/* Accommodation */}
            {safeItinerary.accommodation &&
              Array.isArray(safeItinerary.accommodation) && (
                <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Where to Stay
                  </h2>
                  <div className="prose prose-lg text-gray-600">
                    <PortableText content={safeItinerary.accommodation} />
                  </div>
                </section>
              )}

            {/* Travel Tips */}
            {safeItinerary.tips && Array.isArray(safeItinerary.tips) && (
              <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Travel Tips
                </h2>
                <div className="prose prose-lg text-gray-600">
                  <PortableText content={safeItinerary.tips} />
                </div>
              </section>
            )}

            {/* Featured Image */}
            {safeItinerary.image && typeof safeItinerary.image === "string" && (
              <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Itinerary Highlights
                </h2>
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src={safeItinerary.image}
                    alt={safeItinerary.name}
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
                Itinerary Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">
                    {typeof safeItinerary.name === "string"
                      ? safeItinerary.name
                      : String(safeItinerary.name || "")}
                  </span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">
                    {typeof safeItinerary.duration === "string"
                      ? safeItinerary.duration
                      : String(safeItinerary.duration || "")}
                  </span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">
                    {typeof safeItinerary.difficulty === "string"
                      ? safeItinerary.difficulty
                      : String(safeItinerary.difficulty || "")}
                  </span>
                </div>
                {safeItinerary.priceRange && (
                  <div className="flex items-center">
                    <CurrencyYenIcon className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-700">
                      {typeof safeItinerary.priceRange === "string"
                        ? safeItinerary.priceRange
                        : String(safeItinerary.priceRange)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Destinations */}
            {safeItinerary.destinations &&
              safeItinerary.destinations.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Destinations
                  </h3>
                  <div className="space-y-2">
                    {safeItinerary.destinations.map(
                      (destination: any, index: number) => (
                        <div
                          key={destination._id || index}
                          className="flex items-center"
                        >
                          <CheckIcon className="h-4 w-4 text-green-500 mr-3" />
                          <Link
                            href={`/destinations/${destination.slug.current}`}
                            className="text-gray-700 text-sm hover:text-blue-600 hover:underline transition-colors"
                          >
                            {destination.name}
                          </Link>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

            {/* CTA */}
            <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Ready to Plan?</h3>
              <p className="text-green-100 text-sm mb-4">
                Explore our other itineraries to find more travel plans across
                Japan.
              </p>
              <a
                href="/itineraries"
                className="w-full bg-white text-green-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors inline-block text-center"
              >
                View All Itineraries
              </a>
            </div>

            {/* Sidebar Ad */}
            <SidebarAd adSlot="itinerary-sidebar-ad" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
