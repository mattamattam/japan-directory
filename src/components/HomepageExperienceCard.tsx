"use client";

import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import { ExperienceImage } from "./OptimizedImage";
import SimpleStarRating from "./SimpleStarRating";
import type { Experience } from "@/types";

interface HomepageExperienceCardProps {
  experience: Experience;
}

export default function HomepageExperienceCard({
  experience,
}: HomepageExperienceCardProps) {
  // Use Google Places rating if available, fall back to experience rating
  const displayRating = experience.googleRating ?? experience.rating;
  const displayReviewCount =
    experience.googleReviewCount ?? experience.reviewCount;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 h-full">
      <div className="relative h-48">
        <ExperienceImage
          src={experience.image || ""}
          name={experience.name}
          width={400}
          height={300}
          className="w-full h-full object-cover"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-red-600 text-white text-xs font-medium rounded-full">
            {experience.category}
          </span>
        </div>

        {/* Price Badge */}
        {experience.price && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 bg-white bg-opacity-90 text-gray-900 text-xs font-medium rounded-full">
              ¥{experience.price.toLocaleString()}
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {experience.name}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-1">
          {experience.description}
        </p>

        {/* Experience Details */}
        <div className="space-y-2 mb-2">
          {experience.location && (
            <div className="flex items-center text-sm text-gray-500">
              <span className="truncate">{experience.location}</span>
            </div>
          )}
          {experience.duration && (
            <div className="flex items-center text-sm text-gray-500">
              <span>{experience.duration}</span>
            </div>
          )}
        </div>

        {/* Rating and Review Count */}
        <div className="flex items-center justify-between mt-auto">
          {displayRating ? (
            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-1">
                <SimpleStarRating rating={displayRating} showNumber={false} />
                <span className="text-sm font-medium text-gray-900">
                  {displayRating.toFixed(1)}
                </span>
              </div>
              {displayReviewCount && displayReviewCount > 0 && (
                <span className="text-xs text-gray-500">
                  ({displayReviewCount.toLocaleString()} reviews)
                </span>
              )}
            </div>
          ) : (
            <div></div>
          )}

          <Link
            href={`/experiences/${typeof experience.slug === "string" ? experience.slug : experience.slug.current}`}
            className="text-sm text-red-600 font-medium hover:text-red-700"
          >
            Learn More →
          </Link>
        </div>
      </div>
    </div>
  );
}
