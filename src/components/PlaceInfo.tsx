"use client";

import { GooglePlaceData } from "@/lib/places-utils";
import StarRating from "@/components/StarRating";
import GoogleReviews from "@/components/GoogleReviews";
import { useState, useEffect } from "react";

interface PlaceInfoProps {
  placeData: GooglePlaceData | null;
  placeName: string;
  className?: string;
  showReviews?: boolean;
}

export default function PlaceInfo({
  placeData,
  placeName,
  className = "",
  showReviews = true,
}: PlaceInfoProps) {
  const [runtimePlaceData, setRuntimePlaceData] =
    useState<GooglePlaceData | null>(placeData);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch real place data at runtime to get reviews
  useEffect(() => {
    async function fetchRuntimePlaceData() {
      if (!placeName || !showReviews) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/places?query=${encodeURIComponent(placeName)}`
        );
        if (response.ok) {
          const data = await response.json();
          setRuntimePlaceData(data);
        }
      } catch (error) {
        console.warn("Failed to fetch runtime place data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    // Only fetch if we don't have reviews or if placeData is fallback data
    if (!placeData?.reviews?.length || placeData?.fallback) {
      fetchRuntimePlaceData();
    }
  }, [placeName, showReviews, placeData]);

  const displayData = runtimePlaceData || placeData;

  if (!displayData) {
    return null;
  }

  const { rating, user_ratings_total, reviews = [] } = displayData;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Rating Section */}
      {rating && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Google Rating
          </h3>
          <div className="flex flex-col gap-2">
            <StarRating
              rating={rating}
              size="lg"
              showNumber={true}
              className="justify-start"
            />
            {user_ratings_total && (
              <p className="text-sm text-gray-600">
                Based on {user_ratings_total.toLocaleString()} reviews
              </p>
            )}
          </div>
        </div>
      )}

      {/* Reviews Section */}
      {showReviews && reviews.length > 0 && (
        <GoogleReviews reviews={reviews} placeName={placeName} />
      )}
    </div>
  );
}
