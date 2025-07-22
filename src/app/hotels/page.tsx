import { Metadata } from "next";
import { getHotels } from "@/lib/sanity-queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import HotelCard from "@/components/HotelCard";
import { WifiIcon, CalendarIcon, MapPinIcon } from "@heroicons/react/24/solid";

interface Hotel {
  _id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  priceRange?: string;
  category?: string;
  description?: string;
  amenities?: string[];
  affiliateLinks?: {
    bookingCom?: string;
  };
}

export const metadata: Metadata = {
  title: "Japan Hotels - Best Accommodations & Luxury Stays",
  description:
    "Find the best hotels in Japan. From luxury ryokans to budget-friendly accommodations, discover top-rated hotels in Tokyo, Kyoto, Osaka, and across Japan.",
  keywords:
    "Japan hotels, Tokyo hotels, Kyoto hotels, Osaka hotels, Japan accommodation, luxury hotels Japan, budget hotels Japan, ryokan Japan",
};

export const revalidate = 3600; // Revalidate every hour

const categories = ["All", "Luxury", "Ultra Luxury", "Mid-Range", "Budget"];

export default async function HotelsPage() {
  // Fetch hotels from Sanity
  const hotels = await getHotels();

  // Fallback data if Sanity is not configured
  const fallbackHotels = [
    {
      _id: "hotel-1",
      name: "Park Hyatt Tokyo",
      location: "Shinjuku, Tokyo",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      rating: 4.9,
      reviewCount: 2341,
      price: 450,
      priceRange: "Luxury",
      affiliateLinks: { bookingCom: "park-hyatt-tokyo" },
      amenities: ["Free WiFi", "Spa", "Restaurant", "Gym", "Pool"],
      category: "Hotel",
      description:
        "Iconic luxury hotel featured in 'Lost in Translation' with stunning city views and world-class service.",
    },
    {
      _id: "hotel-2",
      name: "Aman Tokyo",
      location: "Otemachi, Tokyo",
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
      rating: 4.8,
      reviewCount: 1892,
      price: 1200,
      priceRange: "Ultra Luxury",
      affiliateLinks: { bookingCom: "aman-tokyo" },
      amenities: [
        "Free WiFi",
        "Spa",
        "Restaurant",
        "Gym",
        "Pool",
        "Butler Service",
      ],
      category: "Hotel",
      description:
        "Ultra-luxurious urban resort with minimalist design and exceptional attention to detail.",
    },
    {
      _id: "hotel-3",
      name: "Ritz-Carlton Kyoto",
      location: "Kamogawa, Kyoto",
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
      rating: 4.9,
      reviewCount: 1456,
      price: 800,
      priceRange: "Luxury",
      affiliateLinks: { bookingCom: "ritz-carlton-kyoto" },
      amenities: [
        "Free WiFi",
        "Spa",
        "Restaurant",
        "Gym",
        "Pool",
        "River View",
      ],
      category: "Hotel",
      description:
        "Elegant luxury hotel overlooking the Kamogawa River with traditional Japanese aesthetics.",
    },
    {
      _id: "hotel-4",
      name: "Hotel Gracery Shinjuku",
      location: "Shinjuku, Tokyo",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      rating: 4.3,
      reviewCount: 892,
      price: 180,
      priceRange: "Mid-Range",
      affiliateLinks: { bookingCom: "hotel-gracery-shinjuku" },
      amenities: ["Free WiFi", "Restaurant", "Convenience Store"],
      category: "Hotel",
      description:
        "Modern hotel in the heart of Shinjuku with easy access to shopping and entertainment.",
    },
    {
      _id: "hotel-5",
      name: "Hoshinoya Kyoto",
      location: "Arashiyama, Kyoto",
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
      rating: 4.9,
      reviewCount: 678,
      price: 1500,
      priceRange: "Ultra Luxury",
      affiliateLinks: { bookingCom: "hoshinoya-kyoto" },
      amenities: [
        "Free WiFi",
        "Spa",
        "Restaurant",
        "River View",
        "Traditional Bath",
      ],
      category: "Ryokan",
      description:
        "Exclusive ryokan-style luxury hotel on the banks of the Oi River in Arashiyama.",
    },
    {
      _id: "hotel-6",
      name: "Osaka Marriott Miyako Hotel",
      location: "Abeno, Osaka",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      rating: 4.6,
      reviewCount: 1234,
      price: 280,
      priceRange: "Luxury",
      affiliateLinks: { bookingCom: "osaka-marriott-miyako" },
      amenities: ["Free WiFi", "Spa", "Restaurant", "Gym", "Pool", "City View"],
      category: "Hotel",
      description:
        "High-rise luxury hotel with spectacular city views and direct access to Tennoji Station.",
    },
  ];

  const displayHotels = hotels.length > 0 ? hotels : fallbackHotels;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Best Hotels in Japan
            </h1>
            <p className="mt-6 text-lg leading-8 text-red-100">
              From luxury ryokans to modern city hotels, find the perfect
              accommodation for your Japanese adventure.
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

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "primary" : "outline"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Hotels Grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayHotels.map((hotel: Hotel) => (
              <HotelCard key={hotel._id} hotel={hotel} />
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

      {/* Hotel Booking Tips */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Hotel Booking Tips for Japan
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Make the most of your stay with these expert tips
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
                <CalendarIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                Book Early
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Popular hotels, especially during cherry blossom and autumn
                seasons, book up months in advance.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
                <WifiIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                Check Amenities
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Many Japanese hotels offer unique amenities like onsen baths,
                traditional ryokan experiences, and city views.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
                <MapPinIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                Location Matters
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Choose hotels near train stations for easy access to attractions
                and efficient travel around Japan.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
