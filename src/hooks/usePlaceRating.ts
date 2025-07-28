"use client";

import { useState, useEffect } from "react";
import {
  getPlaceDetails,
  searchPlace,
  getFallbackRating,
} from "@/lib/google-places";

interface UsePlaceRatingProps {
  placeName: string;
  location?: string;
  placeId?: string;
}

interface PlaceRating {
  rating: number;
  reviewCount: number;
  isLoading: boolean;
  error: string | null;
}

export const usePlaceRating = ({
  placeName,
  location,
  placeId,
}: UsePlaceRatingProps): PlaceRating => {
  const [rating, setRating] = useState<number>(0);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchRating = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let placeData = null;

        // Try to get place details if we have a place_id
        if (placeId) {
          placeData = await getPlaceDetails(placeId);
        }

        // If no place_id or no results, try searching by name
        if (!placeData) {
          placeData = await searchPlace(placeName, location);
        }

        // If we got data from API, use it
        if (placeData && placeData.rating && placeData.user_ratings_total) {
          if (isMounted) {
            setRating(placeData.rating);
            setReviewCount(placeData.user_ratings_total);
          }
        } else {
          // Use fallback rating
          const fallback = getFallbackRating(placeName);
          if (isMounted) {
            setRating(fallback.rating);
            setReviewCount(fallback.reviewCount);
          }
        }
      } catch (error) {
        console.error("Error fetching place rating:", error);
        return null;
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchRating();

    return () => {
      isMounted = false;
    };
  }, [placeName, location, placeId]);

  return {
    rating,
    reviewCount,
    isLoading,
    error,
  };
};
