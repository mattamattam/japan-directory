import Link from "next/link";
import Image from "next/image";
import { StarIcon, MapPinIcon, ClockIcon } from "@heroicons/react/24/solid";

interface Experience {
  _id: string;
  name: string;
  slug: { current: string };
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  location: string;
  duration: string;
  category: string;
}

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Link
      href={`/experiences/${typeof experience.slug === "string" ? experience.slug : experience.slug.current}`}
      className="group relative bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-200 overflow-hidden"
    >
      {/* Experience Image */}
      <div className="relative h-48 bg-gray-200">
        {experience.image ? (
          <Image
            src={experience.image}
            alt={experience.name}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <MapPinIcon className="h-12 w-12 text-white opacity-50" />
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-red-600 text-white text-xs font-medium rounded-full">
            {experience.category}
          </span>
        </div>
      </div>

      {/* Experience Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
            {experience.name}
          </h3>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {experience.description}
        </p>

        {/* Location and Duration */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <MapPinIcon className="h-4 w-4 mr-1" />
            <span>{experience.location || "Location TBD"}</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-4 w-4 mr-1" />
            <span>{experience.duration || "Duration TBD"}</span>
          </div>
        </div>

        {/* Rating and Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-sm font-medium text-gray-900">
              {experience.rating || "N/A"}
            </span>
            <span className="text-sm text-gray-500 ml-1">
              ({experience.reviewCount || 0} reviews)
            </span>
          </div>
          <div className="text-lg font-semibold text-red-600">
            ¥
            {experience.price
              ? experience.price.toLocaleString()
              : "Contact for pricing"}
          </div>
        </div>
      </div>
    </Link>
  );
}
