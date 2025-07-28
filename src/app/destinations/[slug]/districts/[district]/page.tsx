import { notFound } from "next/navigation";
import { getDestinationBySlug } from "@/lib/sanity-queries";
import { MapPinIcon, StarIcon, CalendarIcon } from "@heroicons/react/24/solid";
import HotelCard from "@/components/HotelCard";
import RestaurantCard from "@/components/RestaurantCard";
import ShoppingCard from "@/components/ShoppingCard";
import TourCard from "@/components/TourCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import type { Hotel, Restaurant, Tour, Shopping } from "@/types";

interface DistrictPageProps {
  params: Promise<{
    slug: string;
    district: string;
  }>;
}

// Define the district data structure
interface DistrictData {
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  highlights: string[];
  bestTime?: string;
  content: string;
  id?: string;
  href?: string;
  transit?: string;
}

// District data for each destination
const districtData = {
  tokyo: {
    shibuya: {
      name: "Shibuya",
      description: "Tokyo&apos;s vibrant youth culture and fashion district",
      image:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=600&fit=crop",
      rating: 4.7,
      reviewCount: 2341,
      highlights: [
        "Shibuya Crossing",
        "Fashion boutiques",
        "Nightlife",
        "Youth culture",
      ],
      bestTime: "Evening for nightlife, daytime for shopping",
      content: `
        Shibuya is the beating heart of Tokyo'apos;apos;s youth culture and fashion scene. This dynamic district is famous for its iconic pedestrian crossing, where thousands of people cross simultaneously in all directions, creating one of Tokyo'apos;apos;s most recognizable sights. The area is a paradise for fashion enthusiasts, with countless boutiques, department stores, and street fashion that sets global trends.

        The district'apos;apos;s energy is infectious, with neon-lit streets, trendy cafes, and a nightlife scene that attracts both locals and tourists. Shibuya'apos;apos;s fashion influence extends worldwide, with many international brands choosing this area for their flagship stores. The district is also home to several major train stations, making it a convenient hub for exploring other parts of Tokyo.

        Beyond shopping and nightlife, Shibuya offers cultural experiences through its shrines and parks, providing peaceful oases amid the urban excitement. The area'apos;apos;s restaurants range from casual street food to upscale dining, reflecting the district'apos;apos;s diverse appeal to different demographics and tastes.
      `,
    },
    shinjuku: {
      name: "Shinjuku",
      description:
        "Tokyo'apos;apos;s major business and entertainment district",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
      rating: 4.6,
      reviewCount: 1987,
      highlights: [
        "Tokyo Metropolitan Government Building",
        "Golden Gai",
        "Business district",
        "Entertainment",
      ],
      bestTime: "Evening for nightlife, daytime for business district",
      content: `
        Shinjuku is Tokyo'apos;apos;s major business and entertainment district, offering a fascinating contrast between its corporate skyscrapers and vibrant entertainment areas. The district is home to the Tokyo Metropolitan Government Building, which offers spectacular views of the city from its observation decks. Shinjuku'apos;apos;s business district features some of Tokyo'apos;apos;s tallest buildings and serves as a major transportation hub.

        The entertainment area, particularly around Kabukicho, is famous for its nightlife, restaurants, and entertainment venues. Golden Gai, a network of narrow alleys lined with tiny bars and restaurants, offers an authentic glimpse into Tokyo'apos;apos;s post-war entertainment culture. This area has preserved its unique character despite the surrounding urban development.

        Shinjuku'apos;apos;s diverse dining scene ranges from high-end restaurants in the business district to casual izakayas and ramen shops in the entertainment areas. The district'apos;apos;s shopping options include department stores, electronics shops, and specialty stores catering to various interests and budgets.
      `,
    },
    harajuku: {
      name: "Harajuku",
      description: "Tokyo'apos;apos;s fashion and youth culture mecca",
      image:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=600&fit=crop",
      rating: 4.5,
      reviewCount: 1654,
      highlights: [
        "Takeshita Street",
        "Meiji Shrine",
        "Fashion boutiques",
        "Youth culture",
      ],
      bestTime: "Weekends for street fashion, weekdays for shopping",
      content: `
        Harajuku is Tokyo'apos;apos;s fashion and youth culture mecca, famous for its unique street fashion and vibrant atmosphere. Takeshita Street, the district'apos;apos;s main shopping street, is lined with trendy boutiques, cafes, and street food vendors catering to young fashion enthusiasts. The area is known for its eclectic fashion styles, from kawaii (cute) to gothic and punk influences.

        Adjacent to the shopping district is the serene Meiji Shrine, one of Tokyo'apos;apos;s most important Shinto shrines, surrounded by a beautiful forest. This contrast between the modern fashion scene and traditional spirituality is characteristic of Tokyo'apos;apos;s ability to blend old and new seamlessly.

        Harajuku'apos;apos;s influence on global fashion is significant, with many international designers and brands drawing inspiration from the area'apos;apos;s unique styles. The district'apos;apos;s cafes and restaurants reflect its youthful energy, offering everything from trendy dessert cafes to traditional Japanese cuisine in modern settings.
      `,
    },
    akihabara: {
      name: "Akihabara",
      description: "Tokyo'apos;apos;s electronics and anime district",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
      rating: 4.4,
      reviewCount: 1432,
      highlights: [
        "Electronics stores",
        "Anime and manga",
        "Gaming culture",
        "Tech shopping",
      ],
      bestTime: "Weekends for crowds and events, weekdays for shopping",
      content: `
        Akihabara, also known as "Electric Town," is Tokyo'apos;apos;s premier destination for electronics, anime, manga, and gaming culture. The district is famous for its massive electronics stores selling everything from the latest gadgets to vintage equipment. Akihabara'apos;apos;s influence on global tech culture is immense, with many international visitors coming specifically to experience its unique atmosphere.

        The area is also a paradise for anime and manga enthusiasts, with countless stores selling merchandise, figurines, and collectibles. Maid cafes, where waitresses dress in anime-inspired costumes, are a unique cultural phenomenon that originated in Akihabara and have become popular tourist attractions.

        Akihabara'apos;apos;s gaming culture is equally impressive, with arcades, gaming stores, and gaming cafes offering both modern and retro gaming experiences. The district'apos;apos;s restaurants range from casual ramen shops to themed cafes, many catering to the area'apos;apos;s tech and anime culture.
      `,
    },
    asakusa: {
      name: "Asakusa",
      description: "Tokyo'apos;apos;s traditional culture and history district",
      image:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=600&fit=crop",
      rating: 4.8,
      reviewCount: 2156,
      highlights: [
        "Senso-ji Temple",
        "Traditional crafts",
        "Street food",
        "Cultural heritage",
      ],
      bestTime: "Morning for temple visits, evening for street food",
      content: `
        Asakusa is Tokyo'apos;apos;s traditional culture and history district, home to the famous Senso-ji Temple, Tokyo'apos;apos;s oldest temple. The district preserves much of Tokyo'apos;apos;s traditional atmosphere, with its narrow streets, traditional shops, and cultural heritage sites. Asakusa'apos;apos;s Nakamise shopping street, leading to Senso-ji, is lined with traditional shops selling souvenirs, snacks, and crafts.

        The area is famous for its traditional street food, including senbei (rice crackers), ningyo-yaki (sweet cakes), and other local specialties. Asakusa'apos;apos;s cultural significance extends beyond its temples, with traditional crafts, kimono shops, and cultural experiences that offer visitors a glimpse into Japan'apos;apos;s rich heritage.

        Despite its traditional character, Asakusa has embraced modern tourism while maintaining its authentic atmosphere. The district'apos;apos;s restaurants range from traditional Japanese cuisine to modern interpretations, and its shopping options include both traditional crafts and contemporary souvenirs.
      `,
    },
  },
  kyoto: {
    gion: {
      name: "Gion",
      description: "Kyoto'apos;apos;s traditional geisha district",
      image:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
      rating: 4.9,
      reviewCount: 1876,
      highlights: [
        "Geisha culture",
        "Traditional architecture",
        "Tea houses",
        "Cultural heritage",
      ],
      bestTime:
        "Evening for geisha sightings, daytime for cultural experiences",
      content: `
        Gion is Kyoto'apos;apos;s most famous traditional district, known for its geisha culture, traditional architecture, and preserved historical atmosphere. The district'apos;apos;s narrow streets, wooden machiya houses, and traditional tea houses create an authentic glimpse into Japan'apos;apos;s cultural heritage. Gion is particularly famous for its geiko (Kyoto'apos;apos;s term for geisha) and maiko (apprentice geisha) who can sometimes be seen walking between appointments.

        The district'apos;apos;s cultural significance extends beyond its geisha culture, with traditional crafts, tea ceremonies, and cultural experiences that showcase Kyoto'apos;apos;s refined traditions. Gion'apos;apos;s restaurants range from casual izakayas to exclusive kaiseki dining experiences, many housed in beautifully preserved traditional buildings.

        Despite its traditional character, Gion has adapted to modern tourism while maintaining its authentic atmosphere. The district'apos;apos;s shopping options include traditional crafts, kimono shops, and cultural souvenirs that reflect Kyoto'apos;apos;s artistic heritage.
      `,
    },
    arashiyama: {
      name: "Arashiyama",
      description: "Kyoto'apos;apos;s scenic bamboo grove and temple district",
      image:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
      rating: 4.7,
      reviewCount: 1654,
      highlights: [
        "Bamboo Grove",
        "Temples and shrines",
        "Natural beauty",
        "Seasonal scenery",
      ],
      bestTime: "Early morning for bamboo grove, all day for temples",
      content: `
        Arashiyama is one of Kyoto'apos;apos;s most picturesque districts, famous for its bamboo grove, temples, and natural beauty. The district'apos;apos;s bamboo grove creates a magical atmosphere, especially in the early morning when it'apos;apos;s less crowded and the light filters through the bamboo stalks. Arashiyama'apos;apos;s temples and shrines, including Tenryu-ji Temple and its beautiful garden, showcase Kyoto'apos;apos;s spiritual heritage.

        The area'apos;apos;s natural beauty changes with the seasons, from cherry blossoms in spring to colorful autumn foliage, making it a year-round destination. Arashiyama'apos;apos;s traditional crafts and cultural experiences reflect Kyoto'apos;apos;s artistic traditions, with opportunities to learn about traditional Japanese arts and crafts.

        The district'apos;apos;s restaurants range from casual cafes to traditional Japanese cuisine, many offering views of the surrounding natural beauty. Arashiyama'apos;apos;s shopping options include traditional crafts, local specialties, and cultural souvenirs that reflect the area'apos;apos;s artistic and natural heritage.
      `,
    },
    higashiyama: {
      name: "Higashiyama",
      description: "Kyoto'apos;apos;s historic temple and shrine district",
      image:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
      rating: 4.8,
      reviewCount: 1987,
      highlights: [
        "Kiyomizu-dera Temple",
        "Traditional streets",
        "Cultural heritage",
        "Historic atmosphere",
      ],
      bestTime: "Early morning for temples, afternoon for shopping",
      content: `
        Higashiyama is Kyoto'apos;apos;s historic temple and shrine district, home to some of the city'apos;apos;s most important cultural sites. The district'apos;apos;s most famous landmark is Kiyomizu-dera Temple, a UNESCO World Heritage site known for its wooden stage and spectacular views of Kyoto. The area'apos;apos;s traditional streets, lined with preserved machiya houses and traditional shops, create an authentic historical atmosphere.

        Higashiyama'apos;apos;s cultural significance extends beyond its temples, with traditional crafts, cultural experiences, and preserved historical architecture that showcase Kyoto'apos;apos;s rich heritage. The district'apos;apos;s restaurants range from casual street food to traditional Japanese cuisine, many housed in beautifully preserved traditional buildings.

        The area'apos;apos;s shopping options include traditional crafts, cultural souvenirs, and local specialties that reflect Higashiyama'apos;apos;s artistic and spiritual heritage. The district'apos;apos;s seasonal beauty, from cherry blossoms to autumn foliage, makes it a year-round destination for cultural exploration.
      `,
    },
  },
  osaka: {
    dotonbori: {
      name: "Dotonbori",
      description: "Osaka'apos;apos;s famous entertainment and food district",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      rating: 4.6,
      reviewCount: 2341,
      highlights: ["Neon signs", "Street food", "Entertainment", "Nightlife"],
      bestTime: "Evening for neon lights and nightlife, daytime for shopping",
      content: `
        Dotonbori is Osaka'apos;apos;s most famous entertainment and food district, known for its vibrant neon signs, street food, and energetic atmosphere. The district'apos;apos;s iconic neon billboards and signs create a spectacular display, especially at night, making it one of Japan'apos;apos;s most recognizable urban landscapes. Dotonbori'apos;apos;s street food scene is legendary, with countless vendors selling takoyaki, okonomiyaki, and other Osaka specialties.

        The area'apos;apos;s entertainment options range from theaters and cinemas to karaoke bars and arcades, creating a lively atmosphere that attracts both locals and tourists. Dotonbori'apos;apos;s restaurants range from casual street food stalls to upscale dining establishments, many specializing in Osaka'apos;apos;s famous cuisine.

        Despite its modern entertainment focus, Dotonbori has preserved some of its historical character, with traditional shops and cultural experiences that showcase Osaka'apos;apos;s rich heritage. The district'apos;apos;s shopping options include everything from trendy fashion boutiques to traditional crafts and souvenirs.
      `,
    },
    namba: {
      name: "Namba",
      description:
        "Osaka'apos;apos;s major shopping and entertainment district",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      rating: 4.5,
      reviewCount: 1876,
      highlights: [
        "Shopping centers",
        "Entertainment",
        "Dining",
        "Transportation hub",
      ],
      bestTime: "All day for shopping and dining",
      content: `
        Namba is Osaka'apos;apos;s major shopping and entertainment district, serving as a transportation hub and commercial center. The area is home to numerous shopping centers, department stores, and entertainment venues, making it a popular destination for both locals and tourists. Namba'apos;apos;s dining scene is diverse, ranging from casual street food to upscale restaurants serving Osaka'apos;apos;s famous cuisine.

        The district'apos;apos;s entertainment options include theaters, cinemas, and various entertainment venues that contribute to its lively atmosphere. Namba'apos;apos;s shopping options range from international brands to local specialties, with numerous department stores and shopping centers catering to different tastes and budgets.

        Despite its modern commercial character, Namba has preserved some of its traditional atmosphere, with traditional shops and cultural experiences that showcase Osaka'apos;apos;s rich heritage. The district'apos;apos;s convenient transportation connections make it an ideal base for exploring other parts of Osaka and the surrounding region.
      `,
    },
    shinsaibashi: {
      name: "Shinsaibashi",
      description: "Osaka'apos;apos;s premier shopping and fashion district",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      rating: 4.4,
      reviewCount: 1654,
      highlights: [
        "Shopping street",
        "Fashion boutiques",
        "Department stores",
        "Youth culture",
      ],
      bestTime: "Afternoon for shopping, evening for dining",
      content: `
        Shinsaibashi is Osaka'apos;apos;s premier shopping and fashion district, famous for its covered shopping street that stretches for over 600 meters. The area is home to numerous department stores, fashion boutiques, and specialty shops, making it a paradise for shoppers. Shinsaibashi'apos;apos;s fashion influence extends beyond Osaka, with many international brands choosing this area for their stores.

        The district'apos;apos;s dining scene ranges from casual cafes to upscale restaurants, many offering both Japanese and international cuisine. Shinsaibashi'apos;apos;s entertainment options include cinemas, arcades, and various entertainment venues that contribute to its lively atmosphere.

        Despite its modern commercial character, Shinsaibashi has preserved some of its traditional atmosphere, with traditional shops and cultural experiences that showcase Osaka'apos;apos;s rich heritage. The district'apos;apos;s convenient location and diverse shopping options make it a popular destination for both locals and tourists.
      `,
    },
  },
  hiroshima: {
    miyajima: {
      name: "Miyajima",
      description:
        "Hiroshima'apos;apos;s sacred island with the famous floating torii gate",
      image:
        "https://images.unsplash.com/photo-1506089676908-3592f7389d4d?w=800&h=600&fit=crop",
      rating: 4.9,
      reviewCount: 2156,
      highlights: [
        "Itsukushima Shrine",
        "Floating torii gate",
        "Deer",
        "Natural beauty",
      ],
      bestTime: "Early morning for fewer crowds, sunset for torii gate",
      content: `
        Miyajima is Hiroshima'apos;apos;s sacred island, famous for its iconic floating torii gate and Itsukushima Shrine, both UNESCO World Heritage sites. The island'apos;apos;s spiritual significance dates back centuries, and its natural beauty has inspired artists and poets throughout Japanese history. Miyajima'apos;apos;s free-roaming deer are considered sacred and add to the island'apos;apos;s unique atmosphere.

        The island'apos;apos;s cultural heritage extends beyond its famous shrine, with traditional crafts, cultural experiences, and preserved historical architecture that showcase Japan'apos;apos;s rich spiritual traditions. Miyajima'apos;apos;s restaurants range from casual cafes to traditional Japanese cuisine, many specializing in local seafood and island specialties.

        Despite its spiritual significance, Miyajima has adapted to modern tourism while maintaining its authentic atmosphere. The island'apos;apos;s shopping options include traditional crafts, local specialties, and cultural souvenirs that reflect Miyajima'apos;apos;s artistic and spiritual heritage. The island'apos;apos;s seasonal beauty, from cherry blossoms to autumn foliage, makes it a year-round destination for cultural and natural exploration.
      `,
    },
  },
};

export async function generateStaticParams() {
  // Generate all possible district combinations
  const params: Array<{ slug: string; district: string }> = [];

  // Tokyo districts
  params.push({ slug: "tokyo", district: "shibuya" });
  params.push({ slug: "tokyo", district: "shinjuku" });
  params.push({ slug: "tokyo", district: "harajuku" });
  params.push({ slug: "tokyo", district: "akihabara" });
  params.push({ slug: "tokyo", district: "asakusa" });

  // Kyoto districts
  params.push({ slug: "kyoto", district: "gion" });
  params.push({ slug: "kyoto", district: "arashiyama" });
  params.push({ slug: "kyoto", district: "higashiyama" });

  // Osaka districts
  params.push({ slug: "osaka", district: "dotonbori" });
  params.push({ slug: "osaka", district: "namba" });
  params.push({ slug: "osaka", district: "shinsaibashi" });

  // Hiroshima districts
  params.push({ slug: "hiroshima", district: "miyajima" });

  return params;
}

export default async function DistrictPage({ params }: DistrictPageProps) {
  const resolvedParams = await params;
  const destination = await getDestinationBySlug(resolvedParams.slug);
  const district = (
    districtData as Record<string, Record<string, DistrictData>>
  )[resolvedParams.slug]?.[resolvedParams.district];

  if (!destination || !district) {
    notFound();
  }

  // Destination name from Sanity data
  const destinationName = destination.name;

  // Fallback data for demonstration
  const fallbackHotels: Hotel[] = [
    {
      _id: "1",
      name: "Hotel in " + district.name,
      location: district.name + ", " + destinationName,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      rating: 4.5,
      reviewCount: 234,
      price: 150,
      priceRange: "Mid-Range",
      category: "Hotel",
      description: "Comfortable accommodation in the heart of " + district.name,
      amenities: ["Free WiFi", "Restaurant", "Parking"],
      slug: { current: "hotel-" + district.name.toLowerCase() },
    },
  ];

  const fallbackRestaurants: Restaurant[] = [
    {
      _id: "1",
      name: "Restaurant in " + district.name,
      location: district.name + ", " + destination.name,
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
      rating: 4.3,
      reviewCount: 156,
      price: 45,
      category: "Local",
      description: "Local cuisine in " + district.name,
      cuisine: "Japanese",
      slug: { current: "restaurant-" + district.name.toLowerCase() },
    },
  ];

  const fallbackTours: Tour[] = [
    {
      _id: "1",
      name: "Tour of " + district.name,
      location: district.name + ", " + destinationName,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      rating: 4.6,
      reviewCount: 98,
      price: 65,
      duration: "2 hours",
      category: "Cultural",
      description: "Explore the highlights of " + district.name,
      slug: { current: "tour-" + district.name.toLowerCase() },
    },
  ];

  const fallbackShopping: Shopping[] = [
    {
      _id: "1",
      name: "Shopping in " + district.name,
      location: district.name + ", " + destinationName,
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      rating: 4.2,
      reviewCount: 87,
      category: "Local",
      description: "Local shopping in " + district.name,
      slug: { current: "shopping-" + district.name.toLowerCase() },
    },
  ];

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
            <Link
              href={`/destinations/${resolvedParams.slug}`}
              className="text-gray-600 hover:text-gray-900"
            >
              {destinationName}
            </Link>{" "}
            / <span className="text-gray-900 font-medium">{district.name}</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative bg-gray-900">
          <div className="absolute inset-0">
            {district.image && (
              <Image
                src={district.image}
                alt={district.name}
                fill
                className="object-cover opacity-40"
              />
            )}
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                {district.name}
              </h1>
              <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
                {district.description}
              </p>
              <div className="mt-8 flex items-center justify-center space-x-6 text-white">
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-2" />
                  <span>
                    {district.rating.toFixed(1)} ({district.reviewCount}{" "}
                    reviews)
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  <span>
                    {destinationName}, {destination.region}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* About Section */}
              <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  About {district.name}
                </h2>

                {/* Long Description */}
                <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: district.content.replace(/\n/g, "<br><br>"),
                    }}
                  />
                </div>

                {/* Key Information */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {district.highlights && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Highlights
                      </h3>
                      <ul className="space-y-2">
                        {district.highlights.map(
                          (highlight: string, index: number) => (
                            <li
                              key={index}
                              className="flex items-center text-gray-700"
                            >
                              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                              {highlight}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Essential Info
                    </h3>
                    <div className="space-y-3">
                      {district.bestTime && (
                        <div className="flex items-center">
                          <CalendarIcon className="h-5 w-5 text-gray-400 mr-3" />
                          <span className="text-gray-700">
                            <strong>Best Time:</strong> {district.bestTime}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Hotels Section */}
              <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Hotels in {district.name}
                  </h2>
                  <Link
                    href={`/destinations/${resolvedParams.slug}/districts/${resolvedParams.district}/hotels`}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    View All Hotels →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {fallbackHotels.slice(0, 2).map((hotel: Hotel) => (
                    <HotelCard key={hotel._id} hotel={hotel} />
                  ))}
                </div>
              </section>

              {/* Restaurants Section */}
              <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Restaurants in {district.name}
                  </h2>
                  <Link
                    href={`/destinations/${resolvedParams.slug}/districts/${resolvedParams.district}/restaurants`}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    View All Restaurants →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {fallbackRestaurants
                    .slice(0, 2)
                    .map((restaurant: Restaurant) => (
                      <RestaurantCard
                        key={restaurant._id}
                        restaurant={restaurant}
                      />
                    ))}
                </div>
              </section>

              {/* Tours Section */}
              <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Tours in {district.name}
                  </h2>
                  <Link
                    href={`/destinations/${resolvedParams.slug}/districts/${resolvedParams.district}/tours`}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    View All Tours →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {fallbackTours.slice(0, 2).map((tour: Tour) => (
                    <TourCard key={tour._id} tour={tour} />
                  ))}
                </div>
              </section>

              {/* Shopping Section */}
              <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Shopping in {district.name}
                  </h2>
                  <Link
                    href={`/destinations/${resolvedParams.slug}/districts/${resolvedParams.district}/shopping`}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    View All Shopping →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {fallbackShopping.slice(0, 2).map((shop: Shopping) => (
                    <ShoppingCard key={shop._id} shop={shop} />
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Quick Facts */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Quick Facts
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">District:</span>
                      <span className="font-medium">{district.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">City:</span>
                      <span className="font-medium">{destinationName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating:</span>
                      <span className="font-medium">
                        {district.rating.toFixed(1)}/5
                      </span>
                    </div>
                    {district.bestTime && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Best Time:</span>
                        <span className="font-medium">{district.bestTime}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Weather Widget */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Current Weather
                  </h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">22°C</div>
                    <div className="text-gray-600">Partly Cloudy</div>
                    <div className="text-sm text-gray-500 mt-2">
                      Humidity: 65%
                    </div>
                  </div>
                </div>

                {/* Exchange Rate */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Exchange Rate
                  </h3>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      1 USD = 150 JPY
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      Updated daily
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
