import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDestinationBySlug } from "@/lib/sanity-queries";
import {
  MapPinIcon,
  CurrencyYenIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import TourCard from "@/components/TourCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import type { Tour } from "@/types";

interface ToursPageProps {
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
}: ToursPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const destination = await getDestinationBySlug(resolvedParams.slug);

  if (!destination) {
    return {
      title: "Destination Not Found",
      description: "The requested destination could not be found.",
    };
  }

  return {
    title: `Tours in ${destination.name} - Japan Directory`,
    description: `Find the best tours and experiences in ${destination.name}. Book guided tours, cultural experiences, and adventure activities.`,
    keywords: `${destination.name} tours, ${destination.name} experiences, guided tours ${destination.name}, ${destination.name} activities`,
  };
}

export default async function ToursPage({ params }: ToursPageProps) {
  const resolvedParams = await params;
  const destination = await getDestinationBySlug(resolvedParams.slug);

  if (!destination) {
    notFound();
  }

  // Fetch tours for this destination
  // const tours = await getToursByDestination(destination.name); // This line was removed as per the edit hint

  // Fallback data for demonstration
  const fallbackTours = [
    {
      _id: "1",
      name: "Cultural Tour of " + destination.name,
      location: destination.name,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      rating: 4.7,
      reviewCount: 234,
      price: 85,
      duration: "3 hours",
      category: "Cultural",
      description: "Explore the rich cultural heritage of " + destination.name,
      slug: { current: "cultural-tour-" + destination.name.toLowerCase() },
    },
    {
      _id: "2",
      name: "Food Tour of " + destination.name,
      location: destination.name,
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
      rating: 4.5,
      reviewCount: 187,
      price: 75,
      duration: "4 hours",
      category: "Food",
      description: "Taste the best local cuisine and street food",
      slug: { current: "food-tour-" + destination.name.toLowerCase() },
    },
    {
      _id: "3",
      name: "Historical Walking Tour of " + destination.name,
      location: destination.name,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      rating: 4.6,
      reviewCount: 156,
      price: 65,
      duration: "2.5 hours",
      category: "Historical",
      description: "Discover the fascinating history of " + destination.name,
      slug: { current: "historical-tour-" + destination.name.toLowerCase() },
    },
    {
      _id: "4",
      name: "Nature Adventure in " + destination.name,
      location: destination.name,
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
      rating: 4.3,
      reviewCount: 98,
      price: 95,
      duration: "6 hours",
      category: "Adventure",
      description: "Explore the natural beauty surrounding " + destination.name,
      slug: { current: "nature-tour-" + destination.name.toLowerCase() },
    },
  ];

  const displayTours = fallbackTours; // Changed to use fallbackTours as tours is no longer fetched

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
                  label: "Tours",
                  href: `/destinations/${resolvedParams.slug}/tours`,
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
                Tours in {destination.name}
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the best tours and experiences in {destination.name}.
                From cultural tours to adventure activities, find your perfect
                guided experience.
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
                  <span>Top Rated Tours</span>
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder={`Search tours in ${destination.name}...`}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Tour Types</option>
                  <option value="cultural">Cultural</option>
                  <option value="food">Food & Dining</option>
                  <option value="adventure">Adventure</option>
                  <option value="historical">Historical</option>
                </select>
              </div>
            </div>

            {/* Tours Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayTours.map((tour: Tour) => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>

            {/* No Tours Message */}
            {displayTours.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No tours found in {destination.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  We&apos;re working on adding more tours to this destination.
                  Check back soon for new listings!
                </p>
                <Link
                  href="/tours"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  View all tours →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="prose prose-lg max-w-none">
              <h2>Exploring {destination.name} Through Guided Tours</h2>
              <p>
                {destination.name} offers an incredible array of guided tour
                experiences that allow visitors to dive deep into the
                city&apos;s rich culture, history, and traditions. Whether
                you&apos;re a first-time visitor or a returning traveler, guided
                tours provide unique insights and access to experiences that
                might be difficult to discover on your own.
              </p>

              <h3>Cultural Tours in {destination.name}</h3>
              <p>
                Cultural tours in {destination.name} offer visitors the
                opportunity to experience the city&apos;s traditional arts,
                customs, and way of life. These tours often include visits to
                historic temples and shrines, traditional craft workshops, and
                interactions with local artisans who are keeping centuries-old
                traditions alive. Many cultural tours also provide insights into
                Japanese etiquette and customs, helping visitors better
                understand and appreciate the local culture.
              </p>

              <h3>Food and Culinary Tours</h3>
              <p>
                {destination.name} is a paradise for food lovers, and culinary
                tours provide the perfect way to explore the city&apos;s diverse
                dining scene. From traditional Japanese cuisine to modern fusion
                dishes, food tours offer tastings at local restaurants, street
                food vendors, and specialty shops. Expert guides share the
                stories behind the dishes and explain the cultural significance
                of different foods and dining customs.
              </p>

              <h3>Historical and Heritage Tours</h3>
              <p>
                History comes alive in {destination.name} through guided
                historical tours that explore the city&apos;s fascinating past.
                These tours often include visits to ancient temples, historic
                districts, and museums that showcase the area&apos;s rich
                heritage. Knowledgeable guides provide context and stories that
                bring the city&apos;s history to life, from ancient times
                through the modern era.
              </p>

              <h3>Adventure and Nature Tours</h3>
              <p>
                Beyond the urban areas, {destination.name} offers beautiful
                natural landscapes that are perfect for adventure and nature
                tours. These experiences might include hiking through scenic
                mountains, exploring nearby islands, or visiting natural hot
                springs. Adventure tours provide a different perspective on the
                region and offer opportunities for outdoor activities and nature
                photography.
              </p>

              <h3>Choosing the Right Tour for Your Visit</h3>
              <p>
                When selecting a tour in {destination.name}, consider your
                interests, physical abilities, and the amount of time you have
                available. Many tours offer different levels of activity and can
                be customized to suit your preferences. It&apos;s also worth
                considering the group size, as smaller groups often provide more
                personalized experiences and better opportunities to ask
                questions and interact with your guide.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
