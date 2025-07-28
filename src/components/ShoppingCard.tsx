"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  StarIcon,
  MapPinIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { usePlaceRating } from "@/hooks/usePlaceRating";
import Image from "next/image";

interface ShoppingCardProps {
  shop: {
    _id: string;
    name: string;
    location: string;
    description: string;
    image: string;
    rating: number;
    reviewCount: number;
    category?: string;
    slug?:
      | {
          current: string;
        }
      | string;
  };
}

export default function ShoppingCard({ shop }: ShoppingCardProps) {
  // Use real ratings from Google Places API with fallback
  const { rating, reviewCount, isLoading } = usePlaceRating({
    placeName: shop.name,
    location: shop.location,
  });

  const handleExplore = () => {
    const slug = typeof shop.slug === "string" ? shop.slug : shop.slug?.current;
    window.open(`/shopping/${slug}`, "_blank");
  };

  // Use real rating if available, otherwise fall back to shop data
  const displayRating = rating > 0 ? rating : shop.rating;
  const displayReviewCount = reviewCount > 0 ? reviewCount : shop.reviewCount;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        {shop.image ? (
          <Image
            src={shop.image}
            alt={shop.name}
            width={800}
            height={600}
            className="aspect-[16/9] w-full object-cover"
          />
        ) : (
          <div className="aspect-[16/9] w-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
        {shop.category && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {shop.category}
          </div>
        )}
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{shop.name}</CardTitle>
          <div className="flex items-center gap-x-1">
            <StarIcon className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium">
              {isLoading ? "..." : displayRating.toFixed(1)}
            </span>
          </div>
        </div>
        <CardDescription className="text-sm leading-relaxed">
          {shop.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-x-2 text-sm text-gray-600">
          <MapPinIcon className="h-4 w-4" />
          <span>{shop.location}</span>
        </div>
        <div className="flex items-center gap-x-2 text-sm text-gray-600">
          <ShoppingBagIcon className="h-4 w-4" />
          <span>{displayReviewCount} reviews</span>
        </div>
        <Button onClick={handleExplore} className="w-full">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
