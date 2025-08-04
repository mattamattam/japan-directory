import { Metadata } from "next";
import { getItineraries } from "@/lib/sanity-queries";
import Layout from "@/components/Layout";
import ItineraryCard from "@/components/ItineraryCard";
import Breadcrumb from "@/components/Breadcrumb";
import AdBanner from "@/components/AdBanner";
import {
  MapIcon,
  CalendarIcon,
  ClockIcon,
  CurrencyYenIcon,
} from "@heroicons/react/24/solid";

export const metadata: Metadata = {
  title: "Japan Itineraries - Complete Travel Plans & Routes",
  description:
    "Discover expertly crafted Japan itineraries for every traveler. From quick city breaks to comprehensive multi-week adventures across Japan.",
  keywords:
    "Japan itineraries, Japan travel plans, Japan routes, Tokyo itinerary, Kyoto itinerary, Japan travel guide, Japan trip planning",
};

export const revalidate = 3600; // Revalidate every hour

export default async function ItinerariesPage() {
  const itineraryItems = await getItineraries();

  // Ensure itineraryItems is always an array
  const safeItineraryItems = Array.isArray(itineraryItems)
    ? itineraryItems
    : [];

  return (
    <Layout>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "Itineraries",
          },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Japan Itineraries
            </h1>
            <p className="mt-6 text-lg leading-8 text-green-100">
              Expertly crafted travel plans for every type of Japan adventure.
              From quick city breaks to comprehensive multi-week journeys.
            </p>
          </div>
        </div>
      </section>

      {/* Google AdSense Banner */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AdBanner adSlot="itineraries-page-banner" adFormat="banner" />
        </div>
      </section>

      {/* Long Description Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="prose prose-lg mx-auto text-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Your Perfect Japan Journey
            </h2>
            <p className="mb-6 leading-relaxed">
              Planning a trip to Japan can be overwhelming with so many
              incredible destinations to choose from. Our carefully crafted
              itineraries take the guesswork out of your planning, providing you
              with proven routes that maximize your time and experience in this
              fascinating country.
            </p>
            <p className="mb-6 leading-relaxed">
              Whether you&apos;re a first-time visitor looking for the classic
              Japan experience, a food lover seeking culinary adventures, or an
              experienced traveler wanting to explore off-the-beaten-path
              destinations, we have itineraries designed for every type of
              traveler and every length of stay.
            </p>
            <p className="mb-6 leading-relaxed">
              Each itinerary includes detailed day-by-day plans, transportation
              tips, accommodation recommendations, and insider knowledge to help
              you experience Japan like a local. We&apos;ve tested these routes
              and refined them based on real travel experiences to ensure you
              get the most out of your Japanese adventure.
            </p>
            <p className="leading-relaxed">
              Browse our collection of itineraries below to find the perfect
              travel plan for your Japan journey. From quick weekend getaways to
              comprehensive multi-week adventures, we&apos;ll help you create
              memories that will last a lifetime.
            </p>
          </div>
        </div>
      </section>

      {/* Itineraries Grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {safeItineraryItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {safeItineraryItems.map((item: any) => (
                <ItineraryCard key={item._id} itinerary={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                No itineraries found
              </h2>
              <p className="text-gray-600">
                No itineraries have been added to Sanity yet. Add some travel
                plans to see them here!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Google AdSense Banner */}
      <section className="bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AdBanner adSlot="itineraries-page-footer" adFormat="banner" />
        </div>
      </section>

      {/* Itinerary Tips Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Tips for Planning Your Japan Itinerary
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Essential advice for creating the perfect Japan travel plan
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
                <MapIcon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                Plan Your Route
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Consider the logical flow of destinations to minimize travel
                time and maximize your experience.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
                <CalendarIcon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                Check Seasons
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Research the best times to visit each destination for optimal
                weather and seasonal attractions.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
                <ClockIcon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                Allow Flexibility
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Build in some free time to discover unexpected gems and adapt to
                weather or local events.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
                <CurrencyYenIcon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                Budget Wisely
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Factor in transportation costs, accommodation, and daily
                expenses when planning your route.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
