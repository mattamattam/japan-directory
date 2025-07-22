"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StarIcon, CalendarIcon } from "@heroicons/react/24/solid";
import { getAffiliateLink, formatPrice } from "@/lib/utils";
import Image from "next/image";

interface TourCardProps {
  tour: {
    id: string;
    name: string;
    duration: string;
    image: string;
    rating: number;
    reviewCount: number;
    price: number;
    affiliateId: string;
  };
}

export default function TourCard({ tour }: TourCardProps) {
  const handleBookTour = () => {
    window.open(getAffiliateLink("tour", tour.affiliateId), "_blank");
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        {tour.image ? (
          <Image
            src={tour.image}
            alt={tour.name}
            width={800}
            height={600}
            className="aspect-[16/9] w-full object-cover"
          />
        ) : (
          <div className="aspect-[16/9] w-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold text-gray-900">
          {formatPrice(tour.price)}
        </div>
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{tour.name}</CardTitle>
          <div className="flex items-center gap-x-1">
            <StarIcon className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium">{tour.rating}</span>
          </div>
        </div>
        <CardDescription className="flex items-center gap-x-1">
          <CalendarIcon className="h-4 w-4" />
          {tour.duration}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            ({tour.reviewCount} reviews)
          </span>
          <Button size="sm" onClick={handleBookTour}>
            Book Tour
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
