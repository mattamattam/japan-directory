import { Metadata } from "next";
import { getFood } from "@/lib/sanity-queries";
import Layout from "@/components/Layout";
import FoodGuideCard from "@/components/FoodGuideCard";

export const metadata: Metadata = {
  title: "Food Guides - Japan Directory",
  description:
    "Discover Japan's incredible food culture with our comprehensive food guides. From ramen to sushi, street food to fine dining.",
  keywords:
    "Japan food guide, Japanese cuisine, ramen, sushi, street food, Japanese restaurants, food culture",
};

export const revalidate = 3600; // Revalidate every hour

export default async function FoodPage() {
  const guides = await getFood();

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Food Guides
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Discover Japan&apos;s incredible food culture with our
                comprehensive guides
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center">
                  <span>Ramen</span>
                </div>
                <div className="flex items-center">
                  <span>Sushi</span>
                </div>
                <div className="flex items-center">
                  <span>Street Food</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Google AdSense Banner */}
        <section className="bg-white py-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="bg-gray-100 h-20 flex items-center justify-center rounded-lg">
              <p className="text-gray-500 text-sm">Google AdSense Banner</p>
            </div>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Japanese Cuisine Guides
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                From traditional dishes to modern fusion, explore the diverse
                world of Japanese food
              </p>
            </div>

            {guides.length > 0 ? (
              <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {guides.map((guide: any) => (
                  <FoodGuideCard key={guide._id} guide={guide} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No food guides found. Check back soon!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Google AdSense Banner */}
        <section className="bg-gray-50 py-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="bg-gray-100 h-20 flex items-center justify-center rounded-lg">
              <p className="text-gray-500 text-sm">Google AdSense Banner</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
