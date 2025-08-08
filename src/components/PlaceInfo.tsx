import { GooglePlaceData } from "@/lib/places-utils";
import StarRating from "@/components/StarRating";
import GoogleReviews from "@/components/GoogleReviews";

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
  if (!placeData) {
    return null;
  }

  const { rating, user_ratings_total, reviews = [] } = placeData;

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
