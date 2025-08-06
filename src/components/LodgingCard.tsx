import Link from "next/link";
import Image from "next/image";
import { HomeIcon } from "@heroicons/react/24/solid";

interface Lodging {
  _id: string;
  name: string;
  slug: { current: string };
  description: string;
  image: string;
  category: string;
  location: string;
  priceRange?: string;
  rating?: number;
  reviewCount?: number;
}

interface LodgingCardProps {
  lodging: Lodging;
}

export default function LodgingCard({ lodging }: LodgingCardProps) {
  // Add null checks to prevent undefined errors
  if (!lodging || !lodging.slug) {
    return null;
  }

  const slug =
    typeof lodging.slug === "string" ? lodging.slug : lodging.slug.current;

  return (
    <Link
      href={`/lodging/${slug}`}
      className="group relative bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-200 overflow-hidden"
    >
      {/* Lodging Image */}
      <div className="relative h-48 bg-gray-200">
        {lodging.image ? (
          <Image
            src={lodging.image}
            alt={`${lodging.name} - Japan accommodation guide`}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <HomeIcon className="h-12 w-12 text-white opacity-50" />
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
            {lodging.category}
          </span>
        </div>
      </div>

      {/* Lodging Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {lodging.name}
          </h3>
        </div>

        {/* Location */}
        <p className="text-sm text-gray-500 mb-2">{lodging.location}</p>

        {/* Price Range */}
        {lodging.priceRange && (
          <p className="text-sm text-gray-600 mb-3">{lodging.priceRange}</p>
        )}

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {lodging.description}
        </p>

        {/* Read More */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-blue-600 font-medium group-hover:text-blue-700">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
