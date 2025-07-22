import { Metadata } from "next";
import { getDestinations } from "@/lib/sanity-queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DestinationCard from "@/components/DestinationCard";
import {
  CalendarIcon,
  MapPinIcon,
  CurrencyYenIcon,
} from "@heroicons/react/24/solid";

interface Destination {
  _id: string;
  name: string;
  region: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  highlights?: string[];
  bestTime?: string;
  slug?: { current: string } | string;
}

export const metadata: Metadata = {
  title: "Japan Destinations - Explore Cities, Regions & Attractions",
  description:
    "Discover the best destinations in Japan. From Tokyo's modern metropolis to Kyoto's ancient temples, explore cities, regions, and attractions across Japan.",
  keywords:
    "Japan destinations, Tokyo, Kyoto, Osaka, Hiroshima, Nara, Sapporo, Japan cities, Japan regions, Japan attractions",
};

export const revalidate = 3600; // Revalidate every hour

export default async function DestinationsPage() {
  // Fetch destinations from Sanity
  const destinations = await getDestinations();

  // Fallback data if Sanity is not configured
  const fallbackDestinations = [
    {
      _id: 1,
      name: "Tokyo",
      region: "Kanto",
      description:
        "Japan's bustling capital city with modern skyscrapers, traditional temples, and endless entertainment options.",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
      rating: 4.8,
      reviewCount: 1247,
      price: 120,
      slug: { current: "tokyo" },
      highlights: [
        "Shibuya Crossing",
        "Tokyo Skytree",
        "Senso-ji Temple",
        "Tsukiji Market",
      ],
      bestTime: "March-May, September-November",
    },
    {
      _id: 2,
      name: "Kyoto",
      region: "Kansai",
      description:
        "Ancient capital with over 1,600 Buddhist temples, 400 Shinto shrines, and traditional Japanese culture.",
      image:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
      rating: 4.9,
      reviewCount: 892,
      price: 95,
      slug: { current: "kyoto" },
      highlights: [
        "Fushimi Inari Shrine",
        "Kinkaku-ji",
        "Arashiyama Bamboo Grove",
        "Gion District",
      ],
      bestTime: "March-May, October-November",
    },
    {
      _id: 3,
      name: "Osaka",
      region: "Kansai",
      description:
        "Food lover's paradise with vibrant nightlife, historic castles, and the famous Osaka Castle.",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      rating: 4.7,
      reviewCount: 756,
      price: 85,
      slug: { current: "osaka" },
      highlights: [
        "Osaka Castle",
        "Dotonbori",
        "Universal Studios Japan",
        "Osaka Aquarium",
      ],
      bestTime: "March-May, September-November",
    },
    {
      _id: 4,
      name: "Hiroshima",
      region: "Chugoku",
      description:
        "Peaceful city known for its history, the Peace Memorial Park, and nearby Miyajima Island.",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      rating: 4.6,
      reviewCount: 543,
      price: 75,
      slug: { current: "hiroshima" },
      highlights: [
        "Peace Memorial Park",
        "Miyajima Island",
        "Hiroshima Castle",
        "Atomic Bomb Dome",
      ],
      bestTime: "March-May, October-November",
    },
    {
      _id: 5,
      name: "Nara",
      region: "Kansai",
      description:
        "First permanent capital of Japan, home to friendly deer and ancient temples.",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      rating: 4.8,
      reviewCount: 432,
      price: 65,
      slug: { current: "nara" },
      highlights: [
        "Todai-ji Temple",
        "Nara Park Deer",
        "Kasuga Taisha",
        "Kofuku-ji",
      ],
      bestTime: "March-May, October-November",
    },
    {
      _id: 6,
      name: "Sapporo",
      region: "Hokkaido",
      description:
        "Northern city famous for its beer, snow festival, and beautiful natural surroundings.",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      rating: 4.5,
      reviewCount: 321,
      price: 90,
      slug: { current: "sapporo" },
      highlights: [
        "Sapporo Beer Museum",
        "Sapporo Snow Festival",
        "Odori Park",
        "Mount Moiwa",
      ],
      bestTime: "December-March, June-August",
    },
  ];

  const displayDestinations =
    destinations.length > 0 ? destinations : fallbackDestinations;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Explore Japan&apos;s Best Destinations
            </h1>
            <p className="mt-6 text-lg leading-8 text-red-100">
              From bustling cities to peaceful temples, discover the diverse
              beauty of Japan across its most popular destinations.
            </p>
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

      {/* Destinations Grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayDestinations.map((destination: Destination) => (
              <DestinationCard
                key={destination._id}
                destination={destination}
              />
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

      {/* Travel Tips Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Planning Your Japan Trip?
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Get expert tips and advice for planning the perfect Japanese
              adventure
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
                <CalendarIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                Best Time to Visit
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Spring (cherry blossoms) and autumn (fall colors) are the most
                popular seasons for visiting Japan.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
                <MapPinIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                Getting Around
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Japan&apos;s efficient rail system makes it easy to travel
                between cities. Consider getting a Japan Rail Pass.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
                <CurrencyYenIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                Budget Tips
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Stay in business hotels, eat at local restaurants, and use
                public transportation to save money.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
