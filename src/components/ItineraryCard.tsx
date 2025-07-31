import Link from "next/link";
import Image from "next/image";
import { MapIcon, ClockIcon, StarIcon } from "@heroicons/react/24/solid";

interface Itinerary {
  _id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  image: string;
  highlights: string[];
  price: string;
}

interface ItineraryCardProps {
  itinerary: Itinerary;
}

export default function ItineraryCard({ itinerary }: ItineraryCardProps) {
  return (
    <Link
      href={`/itineraries/${itinerary._id}`}
      className="group relative bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-200 overflow-hidden"
    >
      {/* Itinerary Image */}
      <div className="relative h-48 bg-gray-200">
        {itinerary.image ? (
          <Image
            src={itinerary.image}
            alt={itinerary.title}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
            <MapIcon className="h-12 w-12 text-white opacity-50" />
          </div>
        )}

        {/* Difficulty Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2 py-1 text-white text-xs font-medium rounded-full ${
              itinerary.difficulty === "Easy"
                ? "bg-green-600"
                : itinerary.difficulty === "Moderate"
                  ? "bg-yellow-600"
                  : "bg-red-600"
            }`}
          >
            {itinerary.difficulty}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
            {itinerary.price}
          </span>
        </div>
      </div>

      {/* Itinerary Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
            {itinerary.title}
          </h3>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {itinerary.description}
        </p>

        {/* Duration */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <ClockIcon className="h-4 w-4 mr-1" />
          <span>{itinerary.duration}</span>
        </div>

        {/* Highlights */}
        {itinerary.highlights && itinerary.highlights.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {itinerary.highlights
                .slice(0, 3)
                .map((highlight: string, index: number) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded-full"
                  >
                    {highlight}
                  </span>
                ))}
              {itinerary.highlights.length > 3 && (
                <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                  +{itinerary.highlights.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* View Details */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-teal-600 font-medium group-hover:text-teal-700">
            View Itinerary →
          </span>
        </div>
      </div>
    </Link>
  );
}
