import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDestinationBySlug } from "@/lib/sanity-queries";
import {
  MapPinIcon,
  CurrencyYenIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import HotelCard from "@/components/HotelCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Hotel } from "@/types";

interface HotelsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: "tokyo" },
    { slug: "kyoto" },
    { slug: "osaka" },
    { slug: "hiroshima" },
  ];
}

export async function generateMetadata({
  params,
}: HotelsPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const destination = await getDestinationBySlug(resolvedParams.slug);
  if (!destination) {
    return {
      title: "Destination Not Found",
      description: "The requested destination could not be found.",
    };
  }
  return {
    title: `Hotels in ${destination.name} - Japan Directory`,
    description: `Find the best hotels in ${destination.name}. Compare prices, read reviews, and book your stay in this amazing destination.`,
    keywords: `${destination.name} hotels, ${destination.name} accommodation, hotels in ${destination.name}, ${destination.name} lodging`,
  };
}

export default async function HotelsPage({ params }: HotelsPageProps) {
  const resolvedParams = await params;
  const destination = await getDestinationBySlug(resolvedParams.slug);
  if (!destination) {
    notFound();
  }

  // Fallback data for demonstration
  const fallbackHotels: Hotel[] = [
    {
      _id: "1",
      name: "Luxury Hotel in " + destination.name,
      location: destination.name + ", Japan",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      rating: 4.8,
      reviewCount: 1247,
      price: 250,
      priceRange: "Luxury",
      category: "Hotel",
      description: "Premium accommodation in the heart of " + destination.name,
      amenities: ["Free WiFi", "Spa", "Restaurant", "Gym"],
      slug: { current: "luxury-hotel-" + destination.name.toLowerCase() },
    },
    {
      _id: "2",
      name: "Mid-Range Hotel in " + destination.name,
      location: destination.name + ", Japan",
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
      rating: 4.2,
      reviewCount: 856,
      price: 150,
      priceRange: "Mid-Range",
      category: "Hotel",
      description: "Comfortable accommodation with great value",
      amenities: ["Free WiFi", "Restaurant", "Parking"],
      slug: { current: "mid-range-hotel-" + destination.name.toLowerCase() },
    },
    {
      _id: "3",
      name: "Budget Hotel in " + destination.name,
      location: destination.name + ", Japan",
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
      rating: 3.8,
      reviewCount: 543,
      price: 80,
      priceRange: "Budget",
      category: "Hotel",
      description: "Affordable accommodation in a convenient location",
      amenities: ["Free WiFi", "Parking"],
      slug: { current: "budget-hotel-" + destination.name.toLowerCase() },
    },
  ];

  const hotels = fallbackHotels; // Using fallback for now

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <Link
              href="/destinations"
              className="text-gray-600 hover:text-gray-900"
            >
              Destinations
            </Link>{" "}
            /{" "}
            <span className="text-gray-900 font-medium">
              {destination.name} Hotels
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Hotels in {destination.name}
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                Find the perfect accommodation in {destination.name}. From
                luxury hotels to budget-friendly options, discover the best
                places to stay in this amazing destination.
              </p>
              <div className="mt-8 flex items-center justify-center space-x-6 text-gray-600">
                <div className="flex items-center">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  <span>{destination.name}, Japan</span>
                </div>
                <div className="flex items-center">
                  <CurrencyYenIcon className="h-5 w-5 mr-2" />
                  <span>Various Price Ranges</span>
                </div>
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 mr-2" />
                  <span>Top Rated Hotels</span>
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder={`Search hotels in ${destination.name}...`}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Price Ranges</option>
                  <option value="budget">Budget</option>
                  <option value="mid-range">Mid-Range</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
            </div>

            {/* Hotels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel: Hotel) => (
                <HotelCard key={hotel._id} hotel={hotel} />
              ))}
            </div>

            {/* No Hotels Message */}
            {hotels.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No hotels found in {destination.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  We&apos;re working on adding more hotels to this area. Check
                  back soon for new listings!
                </p>
                <Link
                  href="/hotels"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  View all hotels →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="prose prose-lg max-w-none">
              <h2>Finding the Perfect Hotel in {destination.name}</h2>
              <p>
                {destination.name} offers a diverse range of accommodation
                options to suit every traveler&apos;s needs and budget. Whether
                you&apos;re looking for a luxurious hotel with modern amenities,
                a traditional ryokan for an authentic Japanese experience, or a
                budget-friendly option that doesn&apos;t compromise on comfort,
                you&apos;ll find excellent choices throughout the city.
              </p>

              <h3>Types of Accommodation in {destination.name}</h3>
              <p>
                From international hotel chains to locally-owned boutique
                properties, {destination.name} provides accommodation options
                that cater to different preferences and budgets. Traditional
                ryokans offer a unique cultural experience with tatami rooms and
                onsen baths, while modern hotels provide familiar comforts and
                conveniences.
              </p>

              <h3>Best Areas to Stay in {destination.name}</h3>
              <p>
                The ideal location for your hotel depends on your interests and
                itinerary. Popular areas include the city center for shopping
                and dining, historic districts for cultural experiences, and
                quieter neighborhoods for a more relaxed atmosphere. Consider
                proximity to public transportation and major attractions when
                choosing your accommodation.
              </p>

              <h3>Booking Tips for {destination.name} Hotels</h3>
              <p>
                Book your accommodation well in advance, especially during peak
                seasons like cherry blossom season and autumn foliage. Many
                hotels offer better rates for longer stays, and some provide
                special packages that include meals or local experiences.
                Don&apos;t forget to check for any special requirements or
                amenities that might enhance your stay.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
