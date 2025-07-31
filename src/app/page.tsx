// app/page.tsx
import { Metadata } from "next";
import { getFeaturedDestinations } from "@/lib/sanity-queries";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/Button";
import DestinationCard from "@/components/DestinationCard";
import TourCard from "@/components/TourCard";
import HeroMontage from "./components/HeroMontage";
import ExchangeRate from "./components/ExchangeRate";
import type { Destination } from "@/types";

export const metadata: Metadata = {
  title: "Japan Directory - Your Complete Guide to Japan Travel",
  description:
    "Discover the best destinations, hotels, and experiences in Japan. Plan your perfect trip with our comprehensive travel guide.",
  keywords:
    "Japan travel, Japan tourism, Tokyo, Kyoto, Osaka, Japan hotels, Japan tours, Japan destinations",
};

export const revalidate = 3600; // Revalidate every hour

const featuredTours = [
  {
    _id: "tour-1",
    name: "Tokyo Food & Culture Tour",
    duration: "4 hours",
    image:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&h=600&fit=crop",
    rating: 4.8,
    reviewCount: 567,
    price: 89,
    slug: { current: "tokyo-food-tour" },
    category: "Food & Culture",
    location: "Tokyo",
    description:
      "Explore Tokyo's culinary scene with local guides and authentic experiences",
  },
  {
    _id: "tour-2",
    name: "Kyoto Temple & Garden Tour",
    duration: "8 hours",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
    rating: 4.9,
    reviewCount: 423,
    price: 125,
    slug: { current: "kyoto-temple-tour" },
    category: "Cultural",
    location: "Kyoto",
    description:
      "Visit Kyoto's most beautiful temples and gardens with expert guides",
  },
  {
    _id: "tour-3",
    name: "Osaka Street Food Adventure",
    duration: "3 hours",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    rating: 4.7,
    reviewCount: 298,
    price: 65,
    slug: { current: "osaka-food-adventure" },
    category: "Food & Culture",
    location: "Osaka",
    description: "Discover Osaka's famous street food scene in Dotonbori",
  },
];

export default async function Home() {
  // Fetch data from Sanity
  const featuredDestinations = await getFeaturedDestinations(3);

  // Fallback data if Sanity is not configured
  const destinations =
    featuredDestinations.length > 0
      ? featuredDestinations
      : [
          {
            _id: 1,
            name: "Tokyo",
            description:
              "Japan's bustling capital city with modern skyscrapers and traditional temples",
            image:
              "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
            rating: 4.8,
            reviewCount: 1247,
            price: 120,
            slug: { current: "tokyo" },
          },
          {
            _id: 2,
            name: "Kyoto",
            description:
              "Ancient capital with over 1,600 Buddhist temples and 400 Shinto shrines",
            image:
              "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
            rating: 4.9,
            reviewCount: 892,
            price: 95,
            slug: { current: "kyoto" },
          },
          {
            _id: 3,
            name: "Osaka",
            description:
              "Food lover's paradise with vibrant nightlife and historic castles",
            image:
              "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
            rating: 4.7,
            reviewCount: 756,
            price: 85,
            slug: { current: "osaka" },
          },
        ];

  return (
    <Layout>
      {/* Hero Section */}
      <HeroMontage>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Discover the Magic of Japan
        </h1>
        <p className="mt-6 text-lg leading-8 text-red-100">
          Your ultimate guide to Japan tourism. Find the best hotels,
          attractions, restaurants, and travel tips for an unforgettable
          Japanese adventure.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
            Start Planning
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-red-600"
          >
            View Destinations
          </Button>
        </div>
      </HeroMontage>

      {/* Exchange Rate Widget */}
      <ExchangeRate />

      {/* Google AdSense Banner */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="bg-gray-100 h-20 flex items-center justify-center rounded-lg">
            <p className="text-gray-500 text-sm">Google AdSense Banner</p>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Popular Destinations
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Explore Japan&apos;s most beloved cities and discover their unique
              charm
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {destinations.map((destination: Destination) => (
              <DestinationCard
                key={destination._id}
                destination={destination}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Google AdSense Banner */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="bg-gray-100 h-20 flex items-center justify-center rounded-lg">
            <p className="text-gray-500 text-sm">Google AdSense Banner</p>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Popular Tours & Experiences
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Immerse yourself in Japanese culture with our curated tours
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {featuredTours.map((tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-red-600 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Get Japan Travel Updates
            </h2>
            <p className="mt-4 text-lg leading-8 text-red-100">
              Subscribe to our newsletter for the latest travel tips, deals, and
              Japan insights
            </p>
            <div className="mt-8 flex max-w-md mx-auto gap-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
              />
              <Button className="bg-white text-red-600 hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
