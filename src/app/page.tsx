// app/page.tsx
import { Metadata } from "next";
import {
  getFeaturedDestinations,
  getDestinations,
  getFeaturedExperiences,
  getExperiences,
  getEssentials,
  getFood,
  getLodging,
  getItineraries,
} from "@/lib/sanity-queries";
import {
  fetchPlaceData,
  getPlaceQuery,
  getFallbackPlaceData,
} from "@/lib/places-utils";
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
import HorizontalCarousel from "@/components/HorizontalCarousel";
import Link from "next/link";
import {
  getOrganizationStructuredData,
  getWebsiteStructuredData,
  getHomepageStructuredData,
  generateStructuredDataScript,
} from "@/lib/structured-data";
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
  title:
    "Visit Japan HQ - Ultimate Japan Travel Guide 2025 | Hotels, Tours & Cultural Experiences",
  description:
    "Plan your perfect Japan trip with our expert travel guide. Discover Tokyo, Kyoto, Osaka attractions, authentic experiences, best hotels & restaurants. Cherry blossom 2025 guide included!",
  keywords: [
    "Japan travel guide 2025",
    "best time to visit Japan",
    "Tokyo travel guide",
    "Kyoto temples",
    "Japan itinerary",
    "JR Pass guide",
    "cherry blossom season 2025",
    "Japanese cultural experiences",
    "Japan hotels booking",
    "traditional Japanese food tours",
    "Tokyo attractions",
    "Kyoto shrines",
    "Osaka food guide",
  ].join(", "),
  alternates: {
    canonical: "https://visitjapanhq.com",
  },
  openGraph: {
    type: "website",
    siteName: "Visit Japan HQ",
    title: "Visit Japan HQ - Your Complete Guide to Japan Travel",
    description:
      "Discover the best destinations, hotels, and experiences in Japan. Plan your perfect trip with our comprehensive travel guide.",
    url: "https://visitjapanhq.com",
    images: [
      {
        url: "https://visitjapanhq.com/images/og-homepage.jpg",
        width: 1200,
        height: 630,
        alt: "Visit Japan HQ - Japan Travel Guide",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visit Japan HQ - Your Complete Guide to Japan Travel",
    description:
      "Discover the best destinations, hotels, and experiences in Japan. Plan your perfect trip with our comprehensive travel guide.",
    images: ["https://visitjapanhq.com/images/twitter-homepage.jpg"],
    creator: "@visitjapanhq",
    site: "@visitjapanhq",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  // Fetch data from Sanity - get all items for carousel display
  const allDestinations = await getDestinations();
  const rawExperiences = await getExperiences();
  const essentials = await getEssentials();

  // Fetch Google Places data for experiences (skip in CI/CD environments)
  const isCI =
    process.env.CI || process.env.GITHUB_ACTIONS || process.env.VERCEL;

  const allExperiences = await Promise.all(
    rawExperiences.map(async (experience: any) => {
      let placeData = null;

      // Only fetch place data in local development (when API server might be available)
      if (!isCI) {
        const placeQuery = getPlaceQuery(
          experience,
          "experience",
          experience.location
        );

        try {
          placeData = await fetchPlaceData(placeQuery);
        } catch (error) {
          console.warn(
            `Failed to fetch place data for ${experience.name}:`,
            error
          );
        }
      }

      if (!placeData) {
        placeData = getFallbackPlaceData(experience.name);
      }

      return {
        ...experience,
        googleRating: placeData?.rating,
        googleReviewCount: placeData?.user_ratings_total,
      };
    })
  );
  const foodGuides = await getFood();
  const lodging = await getLodging();
  const itineraries = await getItineraries();

  // Use all items for carousel display instead of limiting to top 3
  const displayEssentials = Array.isArray(essentials) ? essentials : [];
  const displayFoodGuides = Array.isArray(foodGuides) ? foodGuides : [];
  const displayLodging = Array.isArray(lodging) ? lodging : [];
  const displayItineraries = Array.isArray(itineraries) ? itineraries : [];

  // Fallback data if Sanity is not configured
  const destinations =
    allDestinations.length > 0
      ? allDestinations
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

  // Generate structured data for homepage
  const organizationData = getOrganizationStructuredData();
  const websiteData = getWebsiteStructuredData();
  const homepageData = getHomepageStructuredData();

  return (
    <Layout>
      {/* Structured Data */}
      {generateStructuredDataScript([
        organizationData,
        websiteData,
        homepageData,
      ])}
      {/* Hero Section */}
      <HeroMontage>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Ultimate Japan Travel Guide 2025
        </h1>
        <p className="mt-6 text-lg leading-8 text-red-100">
          Plan your perfect Japan trip with expert guides to Tokyo, Kyoto, and
          Osaka. Discover authentic experiences, best hotels, traditional food
          tours, and cherry blossom season 2025 insights for an unforgettable
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
          <HorizontalCarousel>
            {destinations.map((destination: Destination) => (
              <DestinationCard
                key={destination._id}
                destination={destination}
              />
            ))}
          </HorizontalCarousel>
        </div>
      </section>

      {/* Google AdSense Banner */}
      <AdBanner adSlot="homepage-middle" adFormat="banner" />

      {/* Featured Experiences */}
      {allExperiences.length > 0 && (
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
            <HorizontalCarousel>
              {allExperiences.map((experience: any) => (
                <ExperienceCard key={experience._id} experience={experience} />
              ))}
            </HorizontalCarousel>
          </div>
        </section>
      )}

      {/* Travel Essentials */}
      {displayEssentials.length > 0 && (
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
            <HorizontalCarousel>
              {displayEssentials.map((essential) => (
                <EssentialCard key={essential._id} essential={essential} />
              ))}
            </HorizontalCarousel>
          </div>
        </section>
      )}

      {/* Food Guides */}
      {displayFoodGuides.length > 0 && (
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
            <HorizontalCarousel>
              {displayFoodGuides.map((food) => (
                <FoodGuideCard key={food._id} guide={food} />
              ))}
            </HorizontalCarousel>
          </div>
        </section>
      )}

      {/* Lodging */}
      {displayLodging.length > 0 && (
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
            <HorizontalCarousel>
              {displayLodging.map((lodging) => (
                <LodgingCard key={lodging._id} lodging={lodging} />
              ))}
            </HorizontalCarousel>
          </div>
        </section>
      )}

      {/* Itineraries */}
      {displayItineraries.length > 0 && (
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
            <HorizontalCarousel>
              {displayItineraries.map((itinerary) => (
                <ItineraryCard key={itinerary._id} itinerary={itinerary} />
              ))}
            </HorizontalCarousel>
          </div>
        </section>
      )}

      {/* Newsletter Signup */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Get Japan Travel Updates
            </h2>
            <p className="mt-3 text-base leading-6 text-gray-600">
              Subscribe for the latest travel tips and Japan insights
            </p>
            <div className="mt-6">
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
