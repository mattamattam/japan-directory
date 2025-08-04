import Link from "next/link";
import Image from "next/image";
import { MapIcon, CalendarIcon, ClockIcon } from "@heroicons/react/24/solid";

interface Itinerary {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  image: string;
  duration: string;
  difficulty: string;
  destinations: Array<{
    _id: string;
    name: string;
    slug: { current: string };
  }>;
  priceRange?: string;
  featured?: boolean;
}

interface ItineraryCardProps {
  itinerary: Itinerary;
}

export default function ItineraryCard({ itinerary }: ItineraryCardProps) {
  // Add null checks to prevent undefined errors
  if (!itinerary || !itinerary.slug) {
    return null;
  }

  // Debug logging
  console.log("Itinerary data:", itinerary);

  const slug =
    typeof itinerary.slug === "string"
      ? itinerary.slug
      : itinerary.slug.current;

  return (
    <Link
      href={`/itineraries/${slug}`}
      className="group relative bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-200 overflow-hidden"
    >
      {/* Itinerary Image */}
      <div className="relative h-48 bg-gray-200">
        {itinerary.image && typeof itinerary.image === "string" ? (
          <Image
            src={itinerary.image}
            alt={itinerary.title}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center">
            <MapIcon className="h-12 w-12 text-white opacity-50" />
          </div>
        )}

        {/* Featured Badge */}
        {itinerary.featured && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
              Featured
            </span>
          </div>
        )}

        {/* Difficulty Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-white bg-opacity-90 text-gray-700 text-xs font-medium rounded-full">
            {typeof itinerary.difficulty === "string"
              ? itinerary.difficulty
              : String(itinerary.difficulty || "")}
          </span>
        </div>
      </div>

      {/* Itinerary Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
            {itinerary.title}
          </h3>
        </div>

        {/* Duration and Price */}
        <div className="flex items-center space-x-4 mb-3">
          <div className="flex items-center text-sm text-gray-500">
            <ClockIcon className="h-4 w-4 mr-1" />
            {typeof itinerary.duration === "string"
              ? itinerary.duration
              : String(itinerary.duration || "")}
          </div>
          {itinerary.priceRange && (
            <div className="flex items-center text-sm text-gray-500">
              <span>
                {typeof itinerary.priceRange === "string"
                  ? itinerary.priceRange
                  : String(itinerary.priceRange)}
              </span>
            </div>
          )}
        </div>

        {/* Destinations */}
        {itinerary.destinations &&
          Array.isArray(itinerary.destinations) &&
          itinerary.destinations.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <MapIcon className="h-4 w-4 mr-1" />
                Destinations:
              </div>
              <div className="flex flex-wrap gap-1">
                {itinerary.destinations
                  .slice(0, 3)
                  .map((destination, index) => (
                    <Link
                      key={destination._id || index}
                      href={`/destinations/${destination.slug.current}`}
                      className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full hover:bg-green-200 transition-colors"
                    >
                      {destination.name}
                    </Link>
                  ))}
                {itinerary.destinations.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{itinerary.destinations.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {typeof itinerary.description === "string"
            ? itinerary.description
            : String(itinerary.description || "")}
        </p>

        {/* Read More */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-green-600 font-medium group-hover:text-green-700">
            View Itinerary →
          </span>
        </div>
      </div>
    </Link>
  );
}
