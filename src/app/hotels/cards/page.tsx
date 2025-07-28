import { getFeaturedHotels } from "@/lib/sanity-queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HotelCard from "@/components/HotelCard";
import { Button } from "@/components/ui/Button";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";
import type { Hotel } from "@/types";

const allHotels = [
  {
    _id: "park-hyatt-tokyo",
    name: "Park Hyatt Tokyo",
    location: "Shinjuku, Tokyo",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    rating: 4.9,
    reviewCount: 2341,
    price: 450,
    priceRange: "Luxury",
    category: "Hotel",
    description:
      "Luxury hotel with stunning city views and world-class amenities",
    amenities: ["Spa", "Pool", "Fine Dining", "Concierge"],
    affiliateLinks: { bookingCom: "park-hyatt-tokyo" },
    slug: { current: "park-hyatt-tokyo" },
  },
  {
    _id: "aman-tokyo",
    name: "Aman Tokyo",
    location: "Otemachi, Tokyo",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
    rating: 4.8,
    reviewCount: 1892,
    price: 1200,
    priceRange: "Ultra Luxury",
    category: "Hotel",
    description:
      "Ultra-luxury urban resort with minimalist design and exceptional service",
    amenities: ["Spa", "Pool", "Michelin-starred Dining", "Butler Service"],
    affiliateLinks: { bookingCom: "aman-tokyo" },
    slug: { current: "aman-tokyo" },
  },
  {
    _id: "ritz-carlton-kyoto",
    name: "Ritz-Carlton Kyoto",
    location: "Kamogawa, Kyoto",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    rating: 4.9,
    reviewCount: 1456,
    price: 800,
    priceRange: "Luxury",
    category: "Hotel",
    description:
      "Luxury hotel overlooking the Kamogawa River with traditional Japanese aesthetics",
    amenities: ["Spa", "Hot Springs", "Traditional Dining", "Garden Views"],
    affiliateLinks: { bookingCom: "ritz-carlton-kyoto" },
    slug: { current: "ritz-carlton-kyoto" },
  },
  {
    _id: "conrad-osaka",
    name: "Conrad Osaka",
    location: "Nakanoshima, Osaka",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    rating: 4.7,
    reviewCount: 987,
    price: 350,
    priceRange: "Luxury",
    category: "Hotel",
    description:
      "Modern luxury hotel with spectacular city views and rooftop bar",
    amenities: ["Infinity Pool", "Rooftop Bar", "Spa", "Business Center"],
    affiliateLinks: { bookingCom: "conrad-osaka" },
    slug: { current: "conrad-osaka" },
  },
  {
    _id: "ryokan-yachiyo",
    name: "Ryokan Yachiyo",
    location: "Arashiyama, Kyoto",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    rating: 4.6,
    reviewCount: 654,
    price: 200,
    priceRange: "Mid-Range",
    category: "Ryokan",
    description: "Traditional Japanese inn with hot springs and kaiseki dining",
    amenities: ["Hot Springs", "Traditional Dining", "Garden", "Kimono Rental"],
    affiliateLinks: { bookingCom: "ryokan-yachiyo" },
    slug: { current: "ryokan-yachiyo" },
  },
  {
    _id: "nine-hours-capsule",
    name: "Nine Hours Capsule Hotel",
    location: "Shibuya, Tokyo",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
    rating: 4.2,
    reviewCount: 1234,
    price: 30,
    priceRange: "Budget",
    category: "Capsule Hotel",
    description: "Modern capsule hotel with clean, efficient accommodations",
    amenities: ["Free WiFi", "Locker", "Shower", "Lounge"],
    affiliateLinks: { bookingCom: "nine-hours-capsule" },
    slug: { current: "nine-hours-capsule" },
  },
];

const categories = [
  "All",
  "Hotel",
  "Ryokan",
  "Capsule Hotel",
  "Business Hotel",
  "Resort",
];
const priceRanges = ["All", "Budget", "Mid-Range", "Luxury", "Ultra Luxury"];

interface HotelsCardsPageProps {
  params: Promise<Record<string, never>>;
}

export default async function HotelsCardsPage({
  params,
}: HotelsCardsPageProps) {
  await params; // Await but don't use the result
  // Try to get data from Sanity, fallback to static data
  const featuredHotels = await getFeaturedHotels(10);
  const hotels = featuredHotels.length > 0 ? featuredHotels : allHotels;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Best Hotels in Japan
            </h1>
            <p className="text-gray-600 mb-4">
              Find the perfect accommodation for your Japan adventure. From
              luxury hotels to traditional ryokans, we&apos;ve curated the best
              options for every budget and preference.
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
                placeholder="Search hotels..."
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
                {priceRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Hotels Grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Top Hotels in Japan
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Experience luxury and comfort at Japan&apros;s finest
              accommodations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel: Hotel) => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))}
          </div>

          {/* Load More Button */}
          <div className="mt-12 text-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              Load More Hotels
            </Button>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="prose prose-lg mx-auto">
            <h2>Find the Perfect Accommodation in Japan</h2>
            <p>
              Japan offers a wide variety of accommodation options, from
              traditional ryokans to modern luxury hotels. Each type provides a
              unique experience that reflects Japanese culture and hospitality.
            </p>

            <h3>Types of Accommodation in Japan</h3>
            <ul>
              <li>
                <strong>Hotels:</strong> Modern accommodations with Western
                amenities, ranging from budget to luxury
              </li>
              <li>
                <strong>Ryokans:</strong> Traditional Japanese inns with tatami
                rooms, hot springs, and kaiseki dining
              </li>
              <li>
                <strong>Capsule Hotels:</strong> Compact sleeping pods perfect
                for budget travelers and late-night arrivals
              </li>
              <li>
                <strong>Business Hotels:</strong> Practical accommodations
                designed for business travelers
              </li>
              <li>
                <strong>Resorts:</strong> Luxury properties often located in
                scenic areas with extensive amenities
              </li>
            </ul>

            <h3>Best Areas to Stay in Japan</h3>
            <p>
              <strong>Tokyo:</strong> Shinjuku for shopping and nightlife,
              Shibuya for youth culture, Ginza for luxury shopping, and Asakusa
              for traditional atmosphere.
              <br />
              <strong>Kyoto:</strong> Gion for traditional culture, Arashiyama
              for nature, and downtown for convenience.
              <br />
              <strong>Osaka:</strong> Namba for food and entertainment, Umeda
              for shopping and business, and Nakanoshima for luxury.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
