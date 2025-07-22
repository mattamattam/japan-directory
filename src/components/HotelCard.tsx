'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StarIcon, MapPinIcon, CurrencyYenIcon } from "@heroicons/react/24/solid";
import { getAffiliateLink, formatPrice } from "@/lib/utils";

interface HotelCardProps {
  hotel: {
    _id: string;
    name: string;
    location: string;
    image: string;
    rating: number;
    reviewCount: number;
    price: number;
    priceRange?: string;
    category?: string;
    description?: string;
    amenities?: string[];
    affiliateLinks?: {
      bookingCom?: string;
    };
  };
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const handleBookNow = () => {
    window.open(getAffiliateLink('hotel', hotel.affiliateLinks?.bookingCom || hotel._id), '_blank');
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="aspect-[16/9] w-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold text-gray-900">
          {formatPrice(hotel.price)}
        </div>
        <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
          {hotel.priceRange || hotel.category}
        </div>
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{hotel.name}</CardTitle>
          <div className="flex items-center gap-x-1">
            <StarIcon className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium">{hotel.rating}</span>
          </div>
        </div>
        <CardDescription className="flex items-center gap-x-1">
          <MapPinIcon className="h-4 w-4" />
          {hotel.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {hotel.description && (
          <p className="text-sm text-gray-600 leading-relaxed">
            {hotel.description}
          </p>
        )}
        <div className="flex items-center gap-x-2 text-sm text-gray-600">
          <CurrencyYenIcon className="h-4 w-4" />
          <span>From {formatPrice(hotel.price)} per night</span>
        </div>
        {hotel.amenities && (
          <div className="text-sm text-gray-600">
            <strong>Amenities:</strong>
            <div className="mt-2 flex flex-wrap gap-2">
              {hotel.amenities.slice(0, 3).map((amenity: string, index: number) => (
                <span key={index} className="bg-gray-100 px-2 py-1 rounded text-xs">
                  {amenity}
                </span>
              ))}
              {hotel.amenities.length > 3 && (
                <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                  +{hotel.amenities.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        <div className="flex items-center justify-between pt-4">
          <span className="text-sm text-gray-500">({hotel.reviewCount} reviews)</span>
          <Button size="sm" onClick={handleBookNow}>
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 