"use client";

import { GooglePlaceData } from "@/lib/places-utils";
import SimpleStarRating from "@/components/SimpleStarRating";
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
    let isMounted = true;

    async function fetchRuntimePlaceData() {
      if (!placeName || !showReviews) return;
      if (!isMounted) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/places?query=${encodeURIComponent(placeName)}`,
          {
            headers: {
              "Cache-Control": "no-cache",
            },
          }
        );

        if (response.ok && isMounted) {
          const data = await response.json();
          // Only set data if it's real Google Places data (has rating and reviews)
          if (
            data &&
            !data.error &&
            (data.rating || data.reviews?.length) &&
            isMounted
          ) {
            setRuntimePlaceData(data);
          }
        }
      } catch (error) {
        // Silently handle errors
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    // Only fetch if we don't have real reviews yet
    const shouldFetch =
      !runtimePlaceData ||
      (!runtimePlaceData.reviews?.length && !runtimePlaceData.rating);

    if (shouldFetch) {
      fetchRuntimePlaceData();
    }

    return () => {
      isMounted = false;
    };
  }, [placeName, showReviews, placeData, runtimePlaceData]);

  // Only show if we have real runtime data
  const hasRealData = runtimePlaceData && !runtimePlaceData.error;

  if (!hasRealData && !isLoading) {
    return null; // Don't show anything if no real data available
  }

  const rating = hasRealData ? runtimePlaceData.rating : 0;
  const user_ratings_total = hasRealData
    ? runtimePlaceData.user_ratings_total
    : 0;
  const reviews =
    hasRealData && Array.isArray(runtimePlaceData.reviews)
      ? runtimePlaceData.reviews
      : [];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Loading State */}
      {isLoading && (
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Google Reviews
          </h3>
          <div className="text-center py-4">
            <p className="text-gray-600">Loading reviews...</p>
          </div>
        </div>
      )}

      {/* Rating Section - only show if we have real data */}
      {hasRealData && rating && rating > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Google Rating
          </h3>
          <div className="flex flex-col gap-2">
            <SimpleStarRating
              rating={rating}
              size="lg"
              showNumber={true}
              className="justify-start"
            />
            {user_ratings_total && user_ratings_total > 0 && (
              <p className="text-sm text-gray-600">
                Based on {user_ratings_total.toLocaleString()} reviews
              </p>
            )}
          </div>
        </div>
      )}

      {/* Reviews Section - only show if we have real reviews */}
      {hasRealData && showReviews && reviews.length > 0 && (
        <GoogleReviews reviews={reviews} placeName={placeName} />
      )}
    </div>
  );
}
