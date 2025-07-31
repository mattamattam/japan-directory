import { Metadata } from "next";
import Layout from "@/components/Layout";
import ItineraryCard from "@/components/ItineraryCard";

export const metadata: Metadata = {
  title: "Itineraries - Japan Directory",
  description:
    "Discover curated travel itineraries for Japan. From 3-day city breaks to 2-week adventures, find the perfect trip plan.",
  keywords:
    "Japan itineraries, Japan trip planning, Japan travel routes, Japan vacation plans, Japan travel guide",
};

export const revalidate = 3600; // Revalidate every hour

// Sample itineraries data (you can replace this with Sanity queries later)
const sampleItineraries = [
  {
    _id: "1",
    title: "Tokyo 3-Day Adventure",
    description:
      "Experience the best of Tokyo in just 3 days. From Shibuya Crossing to Tsukiji Market, this itinerary covers all the highlights.",
    duration: "3 days",
    difficulty: "Easy",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
    highlights: [
      "Shibuya Crossing",
      "Tsukiji Market",
      "Senso-ji Temple",
      "Tokyo Skytree",
    ],
    price: "Budget-friendly",
  },
  {
    _id: "2",
    title: "Kyoto Cultural Immersion",
    description:
      "Dive deep into Japan's cultural heart with this 5-day Kyoto itinerary featuring temples, gardens, and traditional experiences.",
    duration: "5 days",
    difficulty: "Moderate",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
    highlights: [
      "Fushimi Inari",
      "Arashiyama Bamboo Grove",
      "Gion District",
      "Kinkaku-ji",
    ],
    price: "Mid-range",
  },
  {
    _id: "3",
    title: "Japan Grand Tour",
    description:
      "The ultimate 2-week Japan adventure covering Tokyo, Kyoto, Osaka, and Hiroshima with bullet train experiences.",
    duration: "14 days",
    difficulty: "Advanced",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    highlights: ["Tokyo", "Kyoto", "Osaka", "Hiroshima", "Bullet Train"],
    price: "Luxury",
  },
];

export default async function ItinerariesPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-teal-600 to-blue-600 text-white">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Travel Itineraries
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Curated trip plans to help you make the most of your Japan
                adventure
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center">
                  <span>3-Day Trips</span>
                </div>
                <div className="flex items-center">
                  <span>Week Adventures</span>
                </div>
                <div className="flex items-center">
                  <span>Grand Tours</span>
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

        {/* Itineraries Grid */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Featured Itineraries
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                From quick city breaks to comprehensive tours, find the perfect
                itinerary for your travel style
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {sampleItineraries.map((itinerary: any) => (
                <ItineraryCard key={itinerary._id} itinerary={itinerary} />
              ))}
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
