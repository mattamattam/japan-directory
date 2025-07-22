// app/page.tsx
import { supabase } from "@/lib/supabase";
import { getFeaturedDestinations, getFeaturedHotels } from "@/lib/sanity-queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import HotelCard from "@/components/HotelCard";
import DestinationCard from "@/components/DestinationCard";
import TourCard from "@/components/TourCard";
import { StarIcon, MapPinIcon, CalendarIcon, CurrencyYenIcon } from "@heroicons/react/24/solid";
import { formatPrice } from "@/lib/utils";

export const revalidate = 3600; // Revalidate every hour

const featuredTours = [
  {
    id: "tour-1",
    name: "Tokyo Food & Culture Tour",
    duration: "4 hours",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&h=600&fit=crop",
    rating: 4.8,
    reviewCount: 567,
    price: 89,
    affiliateId: "tokyo-food-tour"
  },
  {
    id: "tour-2",
    name: "Kyoto Temple & Garden Tour",
    duration: "8 hours",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
    rating: 4.9,
    reviewCount: 423,
    price: 125,
    affiliateId: "kyoto-temple-tour"
  },
  {
    id: "tour-3",
    name: "Osaka Street Food Adventure",
    duration: "3 hours",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    rating: 4.7,
    reviewCount: 298,
    price: 65,
    affiliateId: "osaka-food-adventure"
  }
];

export default async function Home() {
  // Fetch data from Sanity
  const [featuredDestinations, featuredHotels] = await Promise.all([
    getFeaturedDestinations(3),
    getFeaturedHotels(3)
  ]);

  // Fallback data if Sanity is not configured
  const destinations = featuredDestinations.length > 0 ? featuredDestinations : [
    {
      _id: 1,
      name: "Tokyo",
      description: "Japan's bustling capital city with modern skyscrapers and traditional temples",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
      rating: 4.8,
      reviewCount: 1247,
      price: 120,
      slug: { current: "tokyo" }
    },
    {
      _id: 2,
      name: "Kyoto",
      description: "Ancient capital with over 1,600 Buddhist temples and 400 Shinto shrines",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
      rating: 4.9,
      reviewCount: 892,
      price: 95,
      slug: { current: "kyoto" }
    },
    {
      _id: 3,
      name: "Osaka",
      description: "Food lover's paradise with vibrant nightlife and historic castles",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      rating: 4.7,
      reviewCount: 756,
      price: 85,
      slug: { current: "osaka" }
    }
  ];

  const hotels = featuredHotels.length > 0 ? featuredHotels : [
    {
      _id: "hotel-1",
      name: "Park Hyatt Tokyo",
      location: "Shinjuku, Tokyo",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      rating: 4.9,
      reviewCount: 2341,
      price: 450,
      affiliateLinks: { bookingCom: "park-hyatt-tokyo" }
    },
    {
      _id: "hotel-2",
      name: "Aman Tokyo",
      location: "Otemachi, Tokyo",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
      rating: 4.8,
      reviewCount: 1892,
      price: 1200,
      affiliateLinks: { bookingCom: "aman-tokyo" }
    },
    {
      _id: "hotel-3",
      name: "Ritz-Carlton Kyoto",
      location: "Kamogawa, Kyoto",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
      rating: 4.9,
      reviewCount: 1456,
      price: 800,
      affiliateLinks: { bookingCom: "ritz-carlton-kyoto" }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Discover the Magic of Japan
            </h1>
            <p className="mt-6 text-lg leading-8 text-red-100">
              Your ultimate guide to Japan tourism. Find the best hotels, attractions, restaurants, and travel tips for an unforgettable Japanese adventure.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                Start Planning
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-red-600">
                View Destinations
              </Button>
            </div>
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

      {/* Featured Destinations */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Popular Destinations
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Explore Japan's most beloved cities and discover their unique charm
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {destinations.map((destination) => (
              <DestinationCard key={destination._id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Top Hotels in Japan
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Experience luxury and comfort at Japan's finest accommodations
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {hotels.map((hotel) => (
              <HotelCard key={hotel._id} hotel={hotel} />
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
              <TourCard key={tour.id} tour={tour} />
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
              Subscribe to our newsletter for the latest travel tips, deals, and Japan insights
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

      <Footer />
    </div>
  );
}
