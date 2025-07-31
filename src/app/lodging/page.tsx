import { Metadata } from "next";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "Lodging - Japan Directory",
  description:
    "Find the best hotels and accommodation in Japan. From luxury hotels to budget-friendly options, discover perfect places to stay.",
  keywords:
    "Japan hotels, Japan accommodation, luxury hotels Japan, budget hotels Japan, ryokan, capsule hotels",
};

export const revalidate = 3600; // Revalidate every hour

export default async function LodgingPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Lodging in Japan
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Discover the perfect place to stay during your Japan adventure
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center">
                  <span>Luxury Hotels</span>
                </div>
                <div className="flex items-center">
                  <span>Ryokan</span>
                </div>
                <div className="flex items-center">
                  <span>Budget Options</span>
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

        {/* Hotels Grid */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Featured Accommodations
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                From traditional ryokan to modern luxury hotels, find your
                perfect stay in Japan
              </p>
            </div>

            <div className="text-center py-12">
              <p className="text-gray-500">Lodging content coming soon!</p>
            </div>
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
