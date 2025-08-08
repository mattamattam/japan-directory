"use client";

import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import { ExperienceImage } from "./OptimizedImage";
import { useState, useEffect } from "react";
import SimpleStarRating from "./SimpleStarRating";

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

interface HomepageExperienceCardProps {
  experience: Experience;
}

export default function HomepageExperienceCard({
  experience,
}: HomepageExperienceCardProps) {
  const [placeData, setPlaceData] = useState<{
    rating?: number;
    user_ratings_total?: number;
    isLoading: boolean;
  }>({ isLoading: true });

  // Fetch real Google Places data for this experience
  useEffect(() => {
    let isMounted = true;

    async function fetchPlaceRating() {
      if (!experience.name) return;

      // Add a small random delay to stagger API requests and avoid overwhelming the server
      const delay = Math.random() * 2000; // 0-2 seconds
      await new Promise((resolve) => setTimeout(resolve, delay));

      if (!isMounted) return;

      try {
        const response = await fetch(
          `/api/places?query=${encodeURIComponent(experience.name)}`,
          {
            headers: {
              "Cache-Control": "max-age=3600", // Cache for 1 hour
            },
          }
        );

        if (response.ok && isMounted) {
          const data = await response.json();
          if (data && !data.error && isMounted) {
            setPlaceData({
              rating: data.rating,
              user_ratings_total: data.user_ratings_total,
              isLoading: false,
            });
          } else if (isMounted) {
            setPlaceData({ isLoading: false });
          }
        } else if (isMounted) {
          setPlaceData({ isLoading: false });
        }
      } catch (error) {
        if (isMounted) {
          console.warn(`Failed to fetch rating for ${experience.name}:`, error);
          setPlaceData({ isLoading: false });
        }
      }
    }

    fetchPlaceRating();

    return () => {
      isMounted = false;
    };
  }, [experience.name]);

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

        {/* Rating Section */}
        <div className="space-y-2">
          {/* Google Rating */}
          {placeData.isLoading ? (
            <div className="flex items-center">
              <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-20 h-3 bg-gray-200 rounded animate-pulse ml-2"></div>
            </div>
          ) : placeData.rating ? (
            <div className="flex items-center">
              <SimpleStarRating
                rating={placeData.rating}
                size="sm"
                showNumber={true}
              />
              {placeData.user_ratings_total && (
                <span className="text-xs text-gray-500 ml-2">
                  ({placeData.user_ratings_total.toLocaleString()} reviews)
                </span>
              )}
            </div>
          ) : null}

          {/* Action Link */}
          <div className="flex justify-end">
            <span className="text-red-600 font-medium group-hover:text-red-700">
              Explore →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
