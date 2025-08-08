"use client";

interface SimpleStarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  className?: string;
}

export default function SimpleStarRating({
  rating,
  maxRating = 5,
  size = "md",
  showNumber = true,
  className = "",
}: SimpleStarRatingProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const textSize = sizeClasses[size];
  const starSize = size === "sm" ? "12px" : size === "lg" ? "20px" : "16px";

  // Calculate stars
  const fullStars = Math.floor(rating);
  const hasPartialStar = rating % 1 !== 0;
  const emptyStars = maxRating - fullStars - (hasPartialStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, index) => (
          <span
            key={`full-${index}`}
            style={{ fontSize: starSize, color: "#fbbf24" }}
          >
            ★
          </span>
        ))}

        {/* Partial star */}
        {hasPartialStar && (
          <div className="relative inline-block" style={{ fontSize: starSize }}>
            {/* Empty star background */}
            <span style={{ color: "#d1d5db" }}>★</span>
            {/* Filled portion overlay */}
            <span
              className="absolute top-0 left-0 overflow-hidden"
              style={{
                color: "#fbbf24",
                width: `${(rating % 1) * 100}%`,
              }}
            >
              ★
            </span>
          </div>
        )}

        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <span
            key={`empty-${index}`}
            style={{ fontSize: starSize, color: "#d1d5db" }}
          >
            ☆
          </span>
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
