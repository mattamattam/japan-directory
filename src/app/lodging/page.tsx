import { Metadata } from "next";
import { getLodging } from "@/lib/sanity-queries";
import Layout from "@/components/Layout";
import LodgingCard from "@/components/LodgingCard";
import Breadcrumb from "@/components/Breadcrumb";
import AdBanner from "@/components/AdBanner";
import {
  HomeIcon,
  MapPinIcon,
  StarIcon,
  CurrencyYenIcon,
} from "@heroicons/react/24/solid";

export const metadata: Metadata = {
  title: "Japan Lodging Guide - Hotels, Ryokans & Accommodations",
  description:
    "Discover the best places to stay in Japan. From luxury hotels and traditional ryokans to budget-friendly accommodations and unique lodging experiences.",
  keywords:
    "Japan lodging, Japanese hotels, ryokan Japan, Japan accommodation, Tokyo hotels, Kyoto ryokan, Japan travel accommodation",
};

export const revalidate = 3600; // Revalidate every hour

export default async function LodgingPage() {
  // Fetch lodging from Sanity
  const lodgingItems = await getLodging();

  // Ensure lodgingItems is always an array
  const safeLodgingItems = Array.isArray(lodgingItems) ? lodgingItems : [];

  return (
    <Layout>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "Lodging",
          },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Japan Lodging Guide
            </h1>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Find the perfect place to stay in Japan. From luxury hotels and
              traditional ryokans to unique accommodations that will make your
              trip unforgettable.
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

      {/* Long Description Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="prose prose-lg mx-auto text-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Where to Stay in Japan
            </h2>
            <p className="mb-6 leading-relaxed">
              Japan offers an incredible variety of accommodation options that
              cater to every traveler&apos;s needs and preferences. From the
              luxurious comfort of international hotel chains to the authentic
              experience of traditional ryokans, each type of lodging provides a
              unique window into Japanese culture and hospitality.
            </p>
            <p className="mb-6 leading-relaxed">
              Whether you&apos;re seeking the convenience of a modern hotel in
              the heart of Tokyo, the peaceful atmosphere of a ryokan in the
              countryside, or the unique charm of a capsule hotel for the
              budget-conscious traveler, our comprehensive lodging guides will
              help you find the perfect accommodation for your Japan adventure.
            </p>
            <p className="mb-6 leading-relaxed">
              Our lodging recommendations are carefully curated to include
              options for every budget and travel style. We feature
              establishments that not only provide comfortable accommodations
              but also offer authentic Japanese hospitality, known as
              &quot;omotenashi,&quot; ensuring your stay is memorable and
              culturally enriching.
            </p>
            <p className="leading-relaxed">
              Browse our collection of lodging guides below to discover the best
              places to stay across Japan. From booking tips to cultural
              insights, we&apos;ll help you make informed decisions about where
              to rest your head during your Japanese journey.
            </p>
          </div>
        </div>
      </section>

      {/* Lodging Grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {safeLodgingItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {safeLodgingItems.map((item: any) => (
                <LodgingCard key={item._id} lodging={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                No lodging guides found
              </h2>
              <p className="text-gray-600">
                No lodging guides have been added to Sanity yet. Add some
                accommodation guides to see them here!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Google AdSense Banner */}
      <section className="bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AdBanner adSlot="lodging-page-footer" adFormat="banner" />
        </div>
      </section>

      {/* Lodging Tips Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Tips for Booking Accommodation in Japan
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Essential advice for finding and booking the perfect place to stay
              in Japan
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
                <HomeIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                Book Early
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Popular accommodations, especially ryokans, book up quickly,
                especially during peak seasons.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
                <MapPinIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                Location Matters
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Consider proximity to public transportation and attractions when
                choosing your accommodation.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
                <StarIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                Read Reviews
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Check recent reviews for insights about cleanliness, service,
                and authentic experiences.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
                <CurrencyYenIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                Understand Pricing
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Be aware of seasonal pricing and what amenities are included in
                your rate.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
