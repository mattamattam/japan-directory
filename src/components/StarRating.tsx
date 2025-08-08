import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  className?: string;
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showNumber = true,
  className = "",
}: StarRatingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const starSize = sizeClasses[size];
  const textSize = textSizeClasses[size];

  // Calculate full stars, partial stars, and empty stars
  const fullStars = Math.floor(rating);
  const hasPartialStar = rating % 1 !== 0;
  const emptyStars = maxRating - fullStars - (hasPartialStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, index) => (
          <StarIcon
            key={`full-${index}`}
            className={`${starSize} text-yellow-400`}
          />
        ))}

        {/* Partial star */}
        {hasPartialStar && (
          <div className="relative">
            <StarOutlineIcon className={`${starSize} text-gray-300`} />
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${(rating % 1) * 100}%` }}
            >
              <StarIcon className={`${starSize} text-yellow-400`} />
            </div>
          </div>
        )}

        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <StarOutlineIcon
            key={`empty-${index}`}
            className={`${starSize} text-gray-300`}
          />
        ))}
      </div>

      {/* Rating number */}
      {showNumber && (
        <span className={`${textSize} font-medium text-gray-700 ml-1`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}