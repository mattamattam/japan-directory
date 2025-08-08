import Link from "next/link";
import Image from "next/image";
import { MapPinIcon, ClockIcon } from "@heroicons/react/24/solid";
import { ExperienceImage } from "./OptimizedImage";

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
  googleRating?: number;
  googleReviewCount?: number;
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
        <ExperienceImage
          src={experience.image}
          name={experience.name}
          category={experience.category}
          width={400}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />

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

        {/* Experience Details */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <MapPinIcon className="h-4 w-4 mr-1" />
            <span>{experience.location || "Japan"}</span>
          </div>
          <span className="text-red-600 font-medium group-hover:text-red-700">
            Explore →
          </span>
        </div>
      </div>
    </Link>
  );
}
