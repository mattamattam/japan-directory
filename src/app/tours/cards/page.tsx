import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TourCard from "@/components/TourCard";
import { Button } from "@/components/ui/Button";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";
import type { Tour } from "@/types";

interface ToursCardsPageProps {
  params: Promise<Record<string, never>>;
}

const allTours = [
  {
    _id: "tokyo-food-tour",
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
    highlights: [
      "Tsukiji Outer Market",
      "Traditional Sushi",
      "Local Izakaya",
      "Cultural Insights",
    ],
  },
  {
    _id: "kyoto-temple-tour",
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
    highlights: [
      "Kinkaku-ji",
      "Ryoan-ji",
      "Arashiyama",
      "Traditional Tea Ceremony",
    ],
  },
  {
    _id: "osaka-food-adventure",
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
    highlights: ["Dotonbori", "Takoyaki", "Okonomiyaki", "Local Markets"],
  },
  {
    _id: "mt-fuji-day-trip",
    name: "Mount Fuji Day Trip",
    duration: "10 hours",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
    rating: 4.6,
    reviewCount: 345,
    price: 150,
    slug: { current: "mt-fuji-day-trip" },
    category: "Nature & Adventure",
    location: "Mount Fuji",
    description:
      "Experience the iconic Mount Fuji with scenic views and cultural stops",
    highlights: ["Fuji Five Lakes", "Hakone", "Cable Car Ride", "Hot Springs"],
  },
  {
    _id: "hiroshima-peace-tour",
    name: "Hiroshima Peace Memorial Tour",
    duration: "6 hours",
    image:
      "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?w=800&h=600&fit=crop",
    rating: 4.8,
    reviewCount: 234,
    price: 95,
    slug: { current: "hiroshima-peace-tour" },
    category: "Historical",
    location: "Hiroshima",
    description:
      "Learn about Hiroshima's history and visit the Peace Memorial Park",
    highlights: [
      "Peace Memorial Park",
      "Atomic Bomb Dome",
      "Peace Museum",
      "Miyajima Island",
    ],
  },
  {
    _id: "nara-deer-park",
    name: "Nara Deer Park & Temples",
    duration: "5 hours",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&h=600&fit=crop",
    rating: 4.5,
    reviewCount: 187,
    price: 75,
    slug: { current: "nara-deer-park" },
    category: "Cultural",
    location: "Nara",
    description: "Interact with friendly deer and explore ancient temples",
    highlights: [
      "Nara Park",
      "Todai-ji Temple",
      "Kasuga Taisha",
      "Deer Feeding",
    ],
  },
  {
    _id: "tokyo-night-photography",
    name: "Tokyo Night Photography Tour",
    duration: "3 hours",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
    rating: 4.7,
    reviewCount: 156,
    price: 85,
    slug: { current: "tokyo-night-photography" },
    category: "Photography",
    location: "Tokyo",
    description:
      "Capture Tokyo's stunning nightscapes with professional guidance",
    highlights: [
      "Shibuya Crossing",
      "Tokyo Tower",
      "Rainbow Bridge",
      "Photography Tips",
    ],
  },
  {
    _id: "kyoto-zen-meditation",
    name: "Kyoto Zen Meditation Experience",
    duration: "2 hours",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
    rating: 4.9,
    reviewCount: 98,
    price: 120,
    slug: { current: "kyoto-zen-meditation" },
    category: "Wellness",
    location: "Kyoto",
    description: "Experience traditional Zen meditation in a historic temple",
    highlights: [
      "Zen Temple",
      "Meditation Session",
      "Tea Ceremony",
      "Garden Walk",
    ],
  },
];

const categories = [
  "All",
  "Food & Culture",
  "Cultural",
  "Nature & Adventure",
  "Historical",
  "Photography",
  "Wellness",
];
const locations = [
  "All",
  "Tokyo",
  "Kyoto",
  "Osaka",
  "Hiroshima",
  "Nara",
  "Mount Fuji",
];

export default async function ToursCardsPage({ params }: ToursCardsPageProps) {
  await params; // Await but don't use the result
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Best Tours in Japan
            </h1>
            <p className="text-gray-600 mb-4">
              Discover Japan&apos;s most popular tours and experiences. From
              cultural tours to food adventures, find the perfect guided
              experience for your trip.
            </p>
            <p className="text-gray-600 mb-6">
              Whether you&apos;re interested in traditional culture, modern
              attractions, or outdoor adventures, Japan&apos;s diverse tours
              offer something for every traveler.
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
                placeholder="Search tours..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <FunnelIcon className="h-5 w-5 text-gray-500" />
              <select className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500">
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500">
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Top Tours in Japan
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Experience Japan&apos;s culture and beauty through guided tours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allTours.map((tour: Tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>

          {/* Load More Button */}
          <div className="mt-12 text-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              Load More Tours
            </Button>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="prose prose-lg mx-auto">
            <h2>Discover Japan Through Guided Tours</h2>
            <p>
              Japan offers incredible opportunities for guided tours and
              cultural experiences. From food tours in Tokyo to temple visits in
              Kyoto, there&apos;s something for every type of traveler.
            </p>

            <h3>Popular Tour Categories</h3>
            <ul>
              <li>
                <strong>Cultural Tours:</strong> Visit temples, shrines, and
                traditional gardens with expert guides
              </li>
              <li>
                <strong>Food Tours:</strong> Explore Japan&apos;s culinary scene
                with local food experts
              </li>
              <li>
                <strong>Historical Tours:</strong> Learn about Japan&apos;s rich
                history and significant sites
              </li>
              <li>
                <strong>Nature Tours:</strong> Experience Japan&apos;s natural
                beauty and outdoor activities
              </li>
            </ul>

            <h3>Top Tour Destinations</h3>
            <p>
              <strong>Tokyo:</strong> Food tours, photography tours, and
              cultural experiences in Japan&apos;s capital.
              <br />
              <strong>Kyoto:</strong> Temple tours, Zen experiences, and
              traditional culture tours.
              <br />
              <strong>Osaka:</strong> Street food tours and cultural
              experiences.
              <br />
              <strong>Mount Fuji:</strong> Day trips and hiking tours.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
