import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDestinationBySlug } from "@/lib/sanity-queries";
import {
  MapPinIcon,
  CurrencyYenIcon,
  StarIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";
import HotelCard from "@/components/HotelCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import type { Hotel } from "@/types";

interface DistrictHotelsPageProps {
  params: Promise<{ slug: string; district: string }>;
}

export async function generateStaticParams() {
  const params: Array<{ slug: string; district: string }> = [];

  // Tokyo districts
  ["shibuya", "shinjuku", "harajuku", "akihabara", "asakusa"].forEach(
    (district) => {
      params.push({ slug: "tokyo", district });
    }
  );

  // Kyoto districts
  ["gion", "arashiyama", "higashiyama"].forEach((district) => {
    params.push({ slug: "kyoto", district });
  });

  // Osaka districts
  ["dotonbori", "namba", "umeda"].forEach((district) => {
    params.push({ slug: "osaka", district });
  });

  // Hiroshima districts
  ["miyajima", "peace-memorial-park"].forEach((district) => {
    params.push({ slug: "hiroshima", district });
  });

  return params;
}

// District data (same as in district page)
const districtData: Record<
  string,
  Record<string, { name: string; description: string }>
> = {
  tokyo: {
    shibuya: {
      name: "Shibuya",
      description: "Tokyo's vibrant youth culture and fashion district",
    },
    shinjuku: {
      name: "Shinjuku",
      description: "Tokyo's major business and entertainment district",
    },
    harajuku: {
      name: "Harajuku",
      description: "Tokyo's fashion and youth culture mecca",
    },
    akihabara: {
      name: "Akihabara",
      description: "Tokyo's electronics and anime district",
    },
    asakusa: {
      name: "Asakusa",
      description: "Tokyo's traditional culture and history district",
    },
  },
  kyoto: {
    gion: {
      name: "Gion",
      description: "Kyoto's traditional geisha district",
    },
    arashiyama: {
      name: "Arashiyama",
      description: "Kyoto's scenic bamboo grove and temple district",
    },
    higashiyama: {
      name: "Higashiyama",
      description: "Kyoto's historic temple and shrine district",
    },
  },
  osaka: {
    dotonbori: {
      name: "Dotonbori",
      description: "Osaka's famous entertainment and food district",
    },
    namba: {
      name: "Namba",
      description: "Osaka's major shopping and entertainment district",
    },
    shinsaibashi: {
      name: "Shinsaibashi",
      description: "Osaka's premier shopping and fashion district",
    },
  },
  hiroshima: {
    miyajima: {
      name: "Miyajima",
      description:
        "Hiroshima's sacred island with the famous floating torii gate",
    },
  },
};

export async function generateMetadata({
  params,
}: DistrictHotelsPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const destination = await getDestinationBySlug(resolvedParams.slug);
  const district = districtData[resolvedParams.slug]?.[resolvedParams.district];
  if (!destination || !district) {
    return {
      title: "District Not Found",
      description: "The requested district could not be found.",
    };
  }
  return {
    title: `Hotels in ${district.name}, ${destination.name} - Visit Japan HQ`,
    description: `Find the best hotels in ${district.name}, ${destination.name}. Compare prices, read reviews, and book your stay in this vibrant district.`,
    keywords: `${district.name} hotels, ${destination.name} accommodation, hotels in ${district.name}, ${district.name} lodging`,
  };
}

export default async function DistrictHotelsPage({
  params,
}: DistrictHotelsPageProps) {
  const resolvedParams = await params;
  const destination = await getDestinationBySlug(resolvedParams.slug);
  const district = districtData[resolvedParams.slug]?.[resolvedParams.district];
  if (!destination || !district) {
    notFound();
  }

  const districtName = district.name;
  const destinationName = destination.name;

  // Fallback data for demonstration
  const fallbackHotels = [
    {
      _id: "1",
      name: "Luxury Hotel in " + districtName,
      location: districtName + ", " + destinationName,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      rating: 4.8,
      reviewCount: 1247,
      price: 250,
      priceRange: "Luxury",
      category: "Hotel",
      description: "Premium accommodation in the heart of " + districtName,
      amenities: ["Free WiFi", "Spa", "Restaurant", "Gym"],
      slug: { current: "luxury-hotel-" + districtName.toLowerCase() },
    },
    {
      _id: "2",
      name: "Mid-Range Hotel in " + districtName,
      location: districtName + ", " + destinationName,
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
      rating: 4.2,
      reviewCount: 856,
      price: 150,
      priceRange: "Mid-Range",
      category: "Hotel",
      description: "Comfortable accommodation with great value",
      amenities: ["Free WiFi", "Restaurant", "Parking"],
      slug: { current: "mid-range-hotel-" + districtName.toLowerCase() },
    },
    {
      _id: "3",
      name: "Budget Hotel in " + districtName,
      location: districtName + ", " + destinationName,
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
      rating: 3.8,
      reviewCount: 543,
      price: 80,
      priceRange: "Budget",
      category: "Hotel",
      description: "Affordable accommodation in a convenient location",
      amenities: ["Free WiFi", "Parking"],
      slug: { current: "budget-hotel-" + districtName.toLowerCase() },
    },
    {
      _id: "4",
      name: "Boutique Hotel in " + districtName,
      location: districtName + ", " + destinationName,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      rating: 4.5,
      reviewCount: 789,
      price: 180,
      priceRange: "Mid-Range",
      category: "Hotel",
      description: "Unique boutique experience in " + districtName,
      amenities: ["Free WiFi", "Restaurant", "Garden"],
      slug: { current: "boutique-hotel-" + districtName.toLowerCase() },
    },
  ];

  const hotels = fallbackHotels;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <Breadcrumb
              items={[
                { label: "Destinations", href: "/destinations" },
                {
                  label: destination.name,
                  href: `/destinations/${resolvedParams.slug}`,
                },
                {
                  label: district.name,
                  href: `/destinations/${resolvedParams.slug}/districts/${resolvedParams.district}`,
                },
                {
                  label: "Hotels",
                  href: `/destinations/${resolvedParams.slug}/districts/${resolvedParams.district}/hotels`,
                },
              ]}
            />
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Hotels in {districtName}
              </h1>
              <p className="text-gray-600 mb-4">
                Discover the best hotels in {districtName}, {destinationName}.
                From luxury accommodations to budget-friendly options, find your
                perfect stay in this vibrant district.
              </p>
              <p className="text-gray-600 mb-6">
                Whether you&apos;re looking for a luxury hotel with city views
                or a cozy boutique hotel in the heart of the action,{" "}
                {districtName} has accommodation options for every traveler and
                budget.
              </p>
              <div className="mt-8 flex items-center justify-center space-x-6 text-gray-600">
                <div className="flex items-center">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  <span>
                    {districtName}, {destinationName}
                  </span>
                </div>
                <div className="flex items-center">
                  <CurrencyYenIcon className="h-5 w-5 mr-2" />
                  <span>From $90/night</span>
                </div>
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-2" />
                  <span>4.4/5 average rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder={`Search hotels in ${districtName}...`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Price Ranges</option>
                  <option value="budget">Budget</option>
                  <option value="mid-range">Mid-Range</option>
                  <option value="luxury">Luxury</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Hotel Type</option>
                  <option value="hotel">Hotel</option>
                  <option value="ryokan">Ryokan</option>
                  <option value="boutique">Boutique</option>
                </select>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel: Hotel) => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Load More Hotels
            </button>
          </div>
        </div>

        {/* SEO Content */}
        <div className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="prose prose-lg max-w-none">
              <h2>Finding the Perfect Hotel in {districtName}</h2>
              <p>
                {districtName} offers a diverse range of accommodation options
                that cater to different preferences and budgets. Whether
                you&apos;re looking for luxury amenities, traditional Japanese
                hospitality, or budget-friendly comfort, you&apos;ll find
                excellent choices throughout this vibrant district.
              </p>

              <h3>Types of Accommodation in {districtName}</h3>
              <p>
                From international hotel chains to locally-owned boutique
                properties, {districtName} provides accommodation options that
                reflect the district&apos;s unique character. Traditional
                ryokans offer authentic Japanese experiences with tatami rooms
                and onsen baths, while modern hotels provide familiar comforts
                and conveniences.
              </p>

              <h3>Best Areas to Stay in {districtName}</h3>
              <p>
                The ideal location for your hotel in {districtName} depends on
                your interests and itinerary. Popular areas include those near
                major attractions, transportation hubs, and dining districts.
                Consider proximity to public transportation and major
                attractions when choosing your accommodation.
              </p>

              <h3>Booking Tips for {districtName} Hotels</h3>
              <p>
                Book your accommodation well in advance, especially during peak
                seasons and local festivals. Many hotels offer better rates for
                longer stays, and some provide special packages that include
                meals or local experiences. Don&apos;t forget to check for any
                special requirements or amenities that might enhance your stay
                in {districtName}.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
