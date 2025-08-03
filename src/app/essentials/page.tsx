import { Metadata } from "next";
import { getEssentials } from "@/lib/sanity-queries";
import Layout from "@/components/Layout";
import EssentialCard from "@/components/EssentialCard";
import Breadcrumb from "@/components/Breadcrumb";
import AdBanner from "@/components/AdBanner";
import {
  BookOpenIcon,
  TagIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

export const metadata: Metadata = {
  title: "Japan Travel Essentials - Planning Guides & Tips",
  description:
    "Essential planning guides and tips for your Japan trip. From visa requirements and transportation to cultural etiquette and packing lists.",
  keywords:
    "Japan travel essentials, Japan planning guide, Japan visa, Japan transportation, Japan etiquette, Japan packing list",
};

export const revalidate = 3600; // Revalidate every hour

export default async function EssentialsPage() {
  // Fetch essentials from Sanity
  const essentials = await getEssentials();

  return (
    <Layout>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "Essentials",
          },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Japan Travel Essentials
            </h1>
            <p className="mt-6 text-lg leading-8 text-green-100">
              Everything you need to know to plan the perfect trip to Japan.
              From practical tips to cultural insights, we&apos;ve got you
              covered.
            </p>
          </div>
        </div>
      </section>

      {/* Google AdSense Banner */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AdBanner adSlot="essentials-page-banner" adFormat="banner" />
        </div>
      </section>

      {/* Long Description Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="prose prose-lg mx-auto text-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Plan Your Perfect Japan Adventure
            </h2>
            <p className="mb-6 leading-relaxed">
              Planning a trip to Japan can be both exciting and overwhelming.
              With our comprehensive collection of essential guides, you&apos;ll
              have all the information you need to create an unforgettable
              experience in the Land of the Rising Sun.
            </p>
            <p className="mb-6 leading-relaxed">
              From practical matters like visa requirements and transportation
              to cultural insights and etiquette tips, our guides cover every
              aspect of planning your Japan journey. Whether you&apos;re a
              first-time visitor or a seasoned traveler, these resources will
              help you navigate Japan with confidence and ease.
            </p>
            <p className="mb-6 leading-relaxed">
              Our essential guides are written by travel experts who understand
              the unique challenges and opportunities of visiting Japan. Each
              guide is designed to provide practical, actionable advice that
              will enhance your travel experience and help you make the most of
              your time in this fascinating country.
            </p>
            <p className="leading-relaxed">
              Browse our collection of essential guides below to start planning
              your perfect Japan adventure. From pre-trip preparation to
              on-the-ground tips, we&apos;ve got everything you need to know.
            </p>
          </div>
        </div>
      </section>

      {/* Essentials Grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {essentials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {essentials.map((essential: any) => (
                <EssentialCard key={essential._id} essential={essential} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                No essentials found
              </h2>
              <p className="text-gray-600">
                No essential guides have been added to Sanity yet. Add some
                planning guides to see them here!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Google AdSense Banner */}
      <section className="bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AdBanner adSlot="essentials-page-footer" adFormat="banner" />
        </div>
      </section>

      {/* Planning Tips Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Essential Planning Tips
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Key insights to help you plan the perfect Japan trip
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
                <BookOpenIcon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                Research Early
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Start planning at least 3-6 months in advance for the best
                options and prices.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                Check Requirements
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Verify visa requirements, travel insurance, and health
                documentation well in advance.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
                <ClockIcon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                Plan Your Route
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Research transportation options and consider getting a Japan
                Rail Pass for convenience.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
                <TagIcon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                Learn the Basics
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Familiarize yourself with basic Japanese phrases and cultural
                etiquette before you go.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
