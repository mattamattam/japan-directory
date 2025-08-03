import { Metadata } from "next";
import { getDestinations } from "@/lib/sanity-queries";
import Layout from "@/components/Layout";
import DestinationCard from "@/components/DestinationCard";
import Breadcrumb from "@/components/Breadcrumb";
import AdBanner from "@/components/AdBanner";
import {
  CalendarIcon,
  MapPinIcon,
  CurrencyYenIcon,
} from "@heroicons/react/24/solid";
import type { Destination } from "@/types";

export const metadata: Metadata = {
  title: "Japan Destinations - Explore Cities, Regions & Attractions",
  description:
    "Discover the best destinations in Japan. From Tokyo's modern metropolis to Kyoto's ancient temples, explore cities, regions, and attractions across Japan.",
  keywords:
    "Japan destinations, Tokyo, Kyoto, Osaka, Hiroshima, Nara, Sapporo, Japan cities, Japan regions, Japan attractions",
};

export const revalidate = 3600; // Revalidate every hour

export default async function DestinationsPage() {
  // Fetch destinations from Sanity
  const destinations = await getDestinations();

  // Only show destinations that exist in Sanity
  const displayDestinations = destinations;

  return (
    <Layout>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "Destinations",
          },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Explore Japan&apos;s Best Destinations
            </h1>
            <p className="mt-6 text-lg leading-8 text-red-100">
              From bustling cities to peaceful temples, discover the diverse
              beauty of Japan across its most popular destinations.
            </p>
          </div>
        </div>
      </section>

      {/* Google AdSense Banner */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AdBanner adSlot="destinations-page-banner" adFormat="banner" />
        </div>
      </section>

      {/* Long Description Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="prose prose-lg mx-auto text-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Discover the Magic of Japan
            </h2>
            <p className="mb-6 leading-relaxed">
              Japan is a country of contrasts, where ancient traditions
              seamlessly blend with cutting-edge technology. From the neon-lit
              streets of Tokyo to the serene temples of Kyoto, each destination
              offers a unique glimpse into Japanese culture and history.
            </p>
            <p className="mb-6 leading-relaxed">
              Whether you&apos;re drawn to the bustling energy of modern cities
              or the peaceful tranquility of historic sites, Japan has something
              to offer every type of traveler. Experience the world-famous
              hospitality, sample incredible cuisine, and immerse yourself in a
              culture that has been refined over thousands of years.
            </p>
            <p className="mb-6 leading-relaxed">
              Our comprehensive guides help you explore the best destinations
              across Japan, from the iconic landmarks of Tokyo and the cultural
              treasures of Kyoto to the culinary delights of Osaka and the
              historical significance of Hiroshima. Each city tells its own
              story and contributes to the rich tapestry that makes Japan such a
              fascinating country to visit.
            </p>
            <p className="leading-relaxed">
              Start your journey by exploring our destination guides below,
              where you&apos;ll find detailed information about attractions,
              accommodations, dining options, and local experiences that will
              make your Japan trip truly unforgettable.
            </p>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {displayDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayDestinations.map((destination: Destination) => (
                <DestinationCard
                  key={destination._id}
                  destination={destination}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                No destinations found
              </h2>
              <p className="text-gray-600">
                No destinations have been added to Sanity yet. Add some
                destinations to see them here!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Google AdSense Banner */}
      <section className="bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AdBanner adSlot="destinations-page-footer" adFormat="banner" />
        </div>
      </section>

      {/* Travel Tips Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Planning Your Japan Trip?
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Get expert tips and advice for planning the perfect Japanese
              adventure
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
                <CalendarIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                Best Time to Visit
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Spring (cherry blossoms) and autumn (fall colors) are the most
                popular seasons for visiting Japan.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
                <MapPinIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                Getting Around
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Japan&apos;s efficient rail system makes it easy to travel
                between cities. Consider getting a Japan Rail Pass.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
                <CurrencyYenIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                Budget Tips
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Stay in business hotels, eat at local restaurants, and use
                public transportation to save money.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
