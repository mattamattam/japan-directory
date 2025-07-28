import { getFeaturedDestinations } from "@/lib/sanity-queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DestinationCard from "@/components/DestinationCard";
import { Button } from "@/components/ui/Button";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";
import type { Destination } from "@/types";

const allDestinations = [
  {
    _id: "tokyo",
    name: "Tokyo",
    region: "Kanto",
    description:
      "Japan&apos;s bustling capital city with modern skyscrapers and traditional temples",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
    rating: 4.8,
    reviewCount: 1247,
    price: 120,
    highlights: ["Shibuya Crossing", "Tokyo Skytree", "Senso-ji Temple"],
    bestTime: "March-May, October-November",
    slug: { current: "tokyo" },
  },
  {
    _id: "kyoto",
    name: "Kyoto",
    region: "Kansai",
    description:
      "Ancient capital with over 1,600 Buddhist temples and 400 Shinto shrines",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
    rating: 4.9,
    reviewCount: 892,
    price: 95,
    highlights: [
      "Fushimi Inari Shrine",
      "Kinkaku-ji",
      "Arashiyama Bamboo Grove",
    ],
    bestTime: "March-May, October-November",
    slug: { current: "kyoto" },
  },
  {
    _id: "osaka",
    name: "Osaka",
    region: "Kansai",
    description:
      "Food lover&apos;s paradise with vibrant nightlife and historic castles",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    rating: 4.7,
    reviewCount: 756,
    price: 85,
    highlights: ["Osaka Castle", "Dotonbori", "Universal Studios Japan"],
    bestTime: "March-May, September-November",
    slug: { current: "osaka" },
  },
  {
    _id: "hiroshima",
    name: "Hiroshima",
    region: "Chugoku",
    description:
      "Peaceful city with rich history and the iconic Miyajima Island",
    image:
      "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?w=800&h=600&fit=crop",
    rating: 4.6,
    reviewCount: 543,
    price: 75,
    highlights: ["Peace Memorial Park", "Miyajima Island", "Hiroshima Castle"],
    bestTime: "March-May, October-November",
    slug: { current: "hiroshima" },
  },
  {
    _id: "sapporo",
    name: "Sapporo",
    region: "Hokkaido",
    description:
      "Northern city famous for beer, snow festivals, and outdoor activities",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=600&fit=crop",
    rating: 4.5,
    reviewCount: 432,
    price: 90,
    highlights: ["Sapporo Beer Museum", "Odori Park", "Mount Moiwa"],
    bestTime: "December-March (skiing), June-August (mild weather)",
    slug: { current: "sapporo" },
  },
  {
    _id: "nara",
    name: "Nara",
    region: "Kansai",
    description: "Ancient capital with friendly deer and historic temples",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
    rating: 4.8,
    reviewCount: 678,
    price: 70,
    highlights: ["Todai-ji Temple", "Nara Park", "Kasuga Taisha"],
    bestTime: "March-May, October-November",
    slug: { current: "nara" },
  },
];

const regions = [
  "All",
  "Kanto",
  "Kansai",
  "Chugoku",
  "Hokkaido",
  "Tohoku",
  "Chubu",
  "Shikoku",
  "Kyushu",
];

interface DestinationsCardsPageProps {
  params: Promise<Record<string, never>>;
}

export default async function DestinationsCardsPage({
  params,
}: DestinationsCardsPageProps) {
  await params; // Await but don't use the result
  // Try to get data from Sanity, fallback to static data
  const featuredDestinations = await getFeaturedDestinations(10);
  const destinations =
    featuredDestinations.length > 0 ? featuredDestinations : allDestinations;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Explore Japan&apos;s Destinations
            </h1>
            <p className="mt-6 text-lg leading-8 text-red-100">
              Discover the best cities, regions, and attractions across Japan.
              From bustling Tokyo to peaceful Kyoto, find your perfect Japanese
              adventure.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white py-8 border-b">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search destinations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <FunnelIcon className="h-5 w-5 text-gray-500" />
              <select className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500">
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Popular Destinations
            </h2>
            <p className="text-gray-600 mb-4">
              Discover Japan&apos;s most beloved destinations and plan your
              perfect trip. From bustling cities to serene countryside, each
              destination offers unique experiences and attractions.
            </p>
            <p className="text-gray-600 mb-6">
              Whether you&apos;re looking for modern urban experiences,
              traditional cultural sites, or natural beauty, Japan&apos;s
              diverse destinations have something for every traveler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination: Destination) => (
              <DestinationCard
                key={destination._id}
                destination={destination}
              />
            ))}
          </div>

          {/* Load More Button */}
          <div className="mt-12 text-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              Load More Destinations
            </Button>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="prose prose-lg mx-auto">
            <h2>Discover Japan&apos;s Most Beautiful Destinations</h2>
            <p>
              Japan offers an incredible variety of destinations, from the
              neon-lit streets of Tokyo to the serene temples of Kyoto. Each
              region has its own unique culture, cuisine, and attractions that
              make it worth exploring.
            </p>

            <h3>Popular Regions in Japan</h3>
            <ul>
              <li>
                <strong>Kanto Region:</strong> Home to Tokyo, the bustling
                capital with modern attractions and traditional temples
              </li>
              <li>
                <strong>Kansai Region:</strong> Cultural heart of Japan with
                Kyoto, Osaka, and Nara
              </li>
              <li>
                <strong>Chugoku Region:</strong> Western Japan featuring
                Hiroshima and the beautiful Miyajima Island
              </li>
              <li>
                <strong>Hokkaido Region:</strong> Northern island known for
                skiing, hot springs, and outdoor activities
              </li>
            </ul>

            <h3>Best Time to Visit Japan</h3>
            <p>
              The best time to visit Japan depends on what you want to
              experience. Cherry blossom season (March-May) and autumn colors
              (October-November) are particularly popular. Summer can be hot and
              humid, while winter offers skiing opportunities in the north.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
