import { Metadata } from "next";
import { getEssentials } from "@/lib/sanity-queries";
import Layout from "@/components/Layout";
import PlanningGuideCard from "@/components/PlanningGuideCard";

export const metadata: Metadata = {
  title: "Travel Essentials - Japan Directory",
  description:
    "Comprehensive planning guides for your Japan trip. Get expert advice on itineraries, budgets, seasons, and travel tips.",
  keywords:
    "Japan planning guide, Japan itinerary, Japan travel planning, Japan budget, Japan seasons, Japan travel tips",
};

export const revalidate = 3600; // Revalidate every hour

export default async function EssentialsPage() {
  const guides = await getEssentials();

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Travel Essentials
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Expert advice and comprehensive guides to help you plan the
                perfect Japan trip
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center">
                  <span>Itineraries</span>
                </div>
                <div className="flex items-center">
                  <span>Budget Planning</span>
                </div>
                <div className="flex items-center">
                  <span>Seasonal Tips</span>
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
                Travel Planning Resources
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                From first-time visitors to seasoned travelers, our guides cover
                everything you need to know
              </p>
            </div>

            {guides.length > 0 ? (
              <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {guides.map((guide: any) => (
                  <PlanningGuideCard key={guide._id} guide={guide} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No planning guides found. Check back soon!
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
