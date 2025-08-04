import { Metadata } from "next";
import { getFood } from "@/lib/sanity-queries";
import Layout from "@/components/Layout";
import FoodGuideCard from "@/components/FoodGuideCard";
import Breadcrumb from "@/components/Breadcrumb";
import AdBanner from "@/components/AdBanner";
import {
  CakeIcon,
  FireIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";

export const metadata: Metadata = {
  title: "Japan Food Guides - Culinary Adventures & Dining Tips",
  description:
    "Discover the best of Japanese cuisine with our comprehensive food guides. From traditional dishes and street food to fine dining and cooking tips.",
  keywords:
    "Japan food guides, Japanese cuisine, Japanese food, sushi guide, ramen guide, street food Japan, Japanese dining",
};

export const revalidate = 3600; // Revalidate every hour

export default async function FoodPage() {
  // Fetch food guides from Sanity
  const foodGuides = await getFood();

  return (
    <Layout>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "Food",
          },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Japanese Food Guides
            </h1>
            <p className="mt-6 text-lg leading-8 text-orange-100">
              Embark on a culinary journey through Japan&apos;s diverse and
              delicious food culture. From street food to fine dining, discover
              the flavors that make Japanese cuisine world-renowned.
            </p>
          </div>
        </div>
      </section>

      {/* Google AdSense Banner */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AdBanner adSlot="food-page-banner" adFormat="banner" />
        </div>
      </section>

      {/* Long Description Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="prose prose-lg mx-auto text-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Explore the Rich World of Japanese Cuisine
            </h2>
            <p className="mb-6 leading-relaxed">
              Japanese cuisine is a celebration of flavors, textures, and
              traditions that have been perfected over centuries. From the
              delicate art of sushi-making to the comforting warmth of a bowl of
              ramen, each dish tells a story of culture, craftsmanship, and
              culinary excellence.
            </p>
            <p className="mb-6 leading-relaxed">
              Our comprehensive food guides will help you navigate Japan&apos;s
              diverse culinary landscape, whether you&apos;re seeking the best
              street food in Tokyo&apos;s bustling markets, traditional kaiseki
              dining in Kyoto, or the freshest seafood in coastal regions. Each
              guide is crafted by food enthusiasts who have explored
              Japan&apos;s gastronomic wonders firsthand.
            </p>
            <p className="mb-6 leading-relaxed">
              From practical tips on dining etiquette and ordering in Japanese
              to recommendations for must-try dishes and hidden gems, our guides
              provide everything you need to make the most of your culinary
              adventures in Japan. Whether you&apos;re a seasoned foodie or new
              to Japanese cuisine, there&apos;s something for every palate and
              preference.
            </p>
            <p className="leading-relaxed">
              Browse our collection of food guides below to start planning your
              delicious journey through Japan&apos;s incredible food culture.
              From quick bites to elaborate feasts, prepare to discover flavors
              that will leave lasting memories.
            </p>
          </div>
        </div>
      </section>

      {/* Food Guides Grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {foodGuides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {foodGuides.map((guide: any) => (
                <FoodGuideCard key={guide._id} guide={guide} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                No food guides found
              </h2>
              <p className="text-gray-600">
                No food guides have been added to Sanity yet. Add some culinary
                guides to see them here!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Google AdSense Banner */}
      <section className="bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AdBanner adSlot="food-page-footer" adFormat="banner" />
        </div>
      </section>

      {/* Food Tips Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Tips for Food Adventures in Japan
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Essential advice for making the most of your culinary experiences
              in Japan
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-orange-100">
                <CakeIcon className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                Try Everything
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Don&apos;t be afraid to try new dishes and flavors. Some of the
                best discoveries come from stepping outside your comfort zone.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-orange-100">
                <ClockIcon className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                Timing Matters
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Visit restaurants during off-peak hours to avoid crowds and
                enjoy a more relaxed dining experience.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-orange-100">
                <MapPinIcon className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                Explore Local Areas
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Venture beyond tourist areas to discover authentic local
                restaurants and hidden culinary gems.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-orange-100">
                <FireIcon className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                Seasonal Specialties
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Look for seasonal dishes and ingredients that showcase the best
                of what&apos;s available during your visit.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
