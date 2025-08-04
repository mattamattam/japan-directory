// app/page.tsx
import { Metadata } from "next";
import {
  getFeaturedDestinations,
  getFeaturedExperiences,
  getEssentials,
  getFood,
  getLodging,
  getItineraries,
} from "@/lib/sanity-queries";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/Button";
import DestinationCard from "@/components/DestinationCard";
import ExperienceCard from "@/components/ExperienceCard";
import EssentialCard from "@/components/EssentialCard";
import FoodGuideCard from "@/components/FoodGuideCard";
import LodgingCard from "@/components/LodgingCard";
import ItineraryCard from "@/components/ItineraryCard";
import AdBanner from "@/components/AdBanner";
import HeroMontage from "./components/HeroMontage";
import NewsletterSignup from "@/components/NewsletterSignup";
import Link from "next/link";
import {
  MapIcon,
  StarIcon,
  BookOpenIcon,
  HomeIcon,
  CalendarIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import type { Destination } from "@/types";

export const metadata: Metadata = {
  title: "Visit Japan HQ - Your Complete Guide to Japan Travel",
  description:
    "Discover the best destinations, hotels, and experiences in Japan. Plan your perfect trip with our comprehensive travel guide.",
  keywords:
    "Japan travel, Japan tourism, Tokyo, Kyoto, Osaka, Japan hotels, Japan tours, Japan destinations",
};

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  // Fetch data from Sanity
  const featuredDestinations = await getFeaturedDestinations(3);
  const featuredExperiences = await getFeaturedExperiences(3);
  const essentials = await getEssentials();
  const foodGuides = await getFood();
  const lodging = await getLodging();
  const itineraries = await getItineraries();

  // Get top items from each section
  const topEssentials = Array.isArray(essentials) ? essentials.slice(0, 3) : [];
  const topFoodGuides = Array.isArray(foodGuides) ? foodGuides.slice(0, 3) : [];
  const topLodging = Array.isArray(lodging) ? lodging.slice(0, 3) : [];
  const topItineraries = Array.isArray(itineraries)
    ? itineraries.slice(0, 3)
    : [];

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
          <Link href="/destinations">
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100"
            >
              Start Planning
            </Button>
          </Link>
          <Link href="/destinations">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-red-600"
            >
              View Destinations
            </Button>
          </Link>
        </div>
      </HeroMontage>

      {/* Exchange Rate Widget - Removed */}

      {/* Google AdSense Banner */}
      <AdBanner adSlot="homepage-top" adFormat="banner" />

      {/* Quick Navigation */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Plan Your Perfect Japan Trip
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Everything you need to know about traveling in Japan
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link href="/destinations" className="group">
              <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <MapIcon className="h-8 w-8 text-red-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                  Destinations
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Explore cities & regions
                </p>
              </div>
            </Link>
            <Link href="/experiences" className="group">
              <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <StarIcon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Experiences
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Unique activities & tours
                </p>
              </div>
            </Link>
            <Link href="/essentials" className="group">
              <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <BookOpenIcon className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                  Essentials
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Travel guides & tips
                </p>
              </div>
            </Link>
            <Link href="/food" className="group">
              <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <StarIcon className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                  Food Guides
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Culinary adventures
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Popular Destinations
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Explore Japan&apos;s most beloved cities and discover their
                unique charm
              </p>
            </div>
            <Link
              href="/destinations"
              className="flex items-center text-red-600 hover:text-red-700 font-medium"
            >
              View All <ArrowRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <AdBanner adSlot="homepage-middle" adFormat="banner" />

      {/* Featured Experiences */}
      {featuredExperiences.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Featured Experiences
                </h2>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  Immerse yourself in Japanese culture with our curated
                  experiences
                </p>
              </div>
              <Link
                href="/experiences"
                className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                View All <ArrowRightIcon className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredExperiences.map((experience: any) => (
                <ExperienceCard key={experience._id} experience={experience} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Travel Essentials */}
      {topEssentials.length > 0 && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Travel Essentials
                </h2>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  Essential guides and tips for your Japan adventure
                </p>
              </div>
              <Link
                href="/essentials"
                className="flex items-center text-green-600 hover:text-green-700 font-medium"
              >
                View All <ArrowRightIcon className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topEssentials.map((essential) => (
                <EssentialCard key={essential._id} essential={essential} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Food Guides */}
      {topFoodGuides.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Food Guides
                </h2>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  Discover Japan&apos;s incredible culinary scene
                </p>
              </div>
              <Link
                href="/food"
                className="flex items-center text-orange-600 hover:text-orange-700 font-medium"
              >
                View All <ArrowRightIcon className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topFoodGuides.map((food) => (
                <FoodGuideCard key={food._id} guide={food} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lodging */}
      {topLodging.length > 0 && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Where to Stay
                </h2>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  Find the perfect accommodation for your Japan trip
                </p>
              </div>
              <Link
                href="/lodging"
                className="flex items-center text-purple-600 hover:text-purple-700 font-medium"
              >
                View All <ArrowRightIcon className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topLodging.map((lodging) => (
                <LodgingCard key={lodging._id} lodging={lodging} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Itineraries */}
      {topItineraries.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Curated Itineraries
                </h2>
                <p className="mt-4 text-lg leading-8 text-gray-600">
                  Pre-planned routes for the perfect Japan adventure
                </p>
              </div>
              <Link
                href="/itineraries"
                className="flex items-center text-teal-600 hover:text-teal-700 font-medium"
              >
                View All <ArrowRightIcon className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topItineraries.map((itinerary) => (
                <ItineraryCard key={itinerary._id} itinerary={itinerary} />
              ))}
            </div>
          </div>
        </section>
      )}

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
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </Layout>
  );
}
