import { Metadata } from "next";
import { getExperiences } from "@/lib/sanity-queries";
import Layout from "@/components/Layout";
import ExperienceCard from "@/components/ExperienceCard";
import Breadcrumb from "@/components/Breadcrumb";
import AdBanner from "@/components/AdBanner";
import {
  CalendarIcon,
  MapPinIcon,
  CurrencyYenIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import { fetchExperiencesPlacesData, serializePlacesData, deserializePlacesData } from "@/lib/build-places-data";

export const metadata: Metadata = {
  title: "Japan Experiences - Unique Activities & Cultural Tours",
  description:
    "Discover authentic Japanese experiences and activities. From tea ceremonies and sushi-making classes to hiking sacred mountains and hot spring baths.",
  keywords:
    "Japan experiences, Japanese activities, tea ceremony, sushi making, hot springs, cultural tours, Japan tours",
  alternates: {
    canonical: "https://visitjapanhq.com/experiences",
  },
};

export const revalidate = 3600; // Revalidate every hour

export default async function ExperiencesPage() {
  // Fetch experiences from Sanity
  const experiences = await getExperiences();

  // Fetch Google Places data at build time
  const placesDataMap = await fetchExperiencesPlacesData(experiences);
  
  // Add places data to experiences
  const experiencesWithPlaceData = experiences.map((experience: any) => ({
    ...experience,
    googleRating: placesDataMap.get(experience._id)?.rating,
    googleReviewCount: placesDataMap.get(experience._id)?.user_ratings_total,
    placeName: placesDataMap.get(experience._id)?.name,
    placeAddress: placesDataMap.get(experience._id)?.formatted_address,
  }));

  return (
    <Layout>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "Experiences",
          },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Authentic Japanese Experiences
            </h1>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Go beyond typical tourism and dive deep into authentic Japanese
              experiences that will make your trip truly unforgettable.
            </p>
          </div>
        </div>
      </section>

      {/* Google AdSense Banner */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AdBanner adSlot="experiences-page-banner" adFormat="banner" />
        </div>
      </section>

      {/* Long Description Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="prose prose-lg mx-auto text-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Immerse Yourself in Japanese Culture
            </h2>
            <p className="mb-6 leading-relaxed">
              Japan offers countless opportunities to experience its rich
              culture and traditions firsthand. From ancient tea ceremonies that
              have been practiced for centuries to modern culinary experiences
              that showcase the country&apos;s world-renowned cuisine,
              there&apos;s something for every type of traveler.
            </p>
            <p className="mb-6 leading-relaxed">
              Whether you&apos;re interested in learning the art of sushi-making
              from master chefs, experiencing the tranquility of a traditional
              tea ceremony, or exploring the natural beauty of Japan&apos;s
              sacred mountains and hot springs, our curated experiences will
              help you create memories that last a lifetime.
            </p>
            <p className="mb-6 leading-relaxed">
              Each experience is carefully selected to provide authentic
              insights into Japanese culture while ensuring accessibility for
              international visitors. Our local partners are experts in their
              fields and passionate about sharing their knowledge and traditions
              with visitors from around the world.
            </p>
            <p className="leading-relaxed">
              Browse our collection of experiences below to find the perfect
              activities for your Japan adventure. From short workshops to
              full-day excursions, each experience is designed to give you a
              deeper understanding and appreciation of Japanese culture.
            </p>
          </div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {experiencesWithPlaceData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {experiencesWithPlaceData.map((experience: any) => (
                <ExperienceCard key={experience._id} experience={experience} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                No experiences found
              </h2>
              <p className="text-gray-600">
                No experiences have been added to Sanity yet. Add some
                experiences to see them here!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Google AdSense Banner */}
      <section className="bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AdBanner adSlot="experiences-page-footer" adFormat="banner" />
        </div>
      </section>

      {/* Experience Tips Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Making the Most of Your Experiences
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Tips and advice for getting the most out of your Japanese cultural
              experiences
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
                <CalendarIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                Book Early
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Popular experiences often sell out quickly, especially during
                peak seasons.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
                <ClockIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                Plan Your Time
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Allow extra time for travel and preparation before your
                experience.
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
                Consider the location and transportation when choosing your
                experiences.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
                <CurrencyYenIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                Value for Money
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Many experiences include materials, guides, and take-home
                souvenirs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
