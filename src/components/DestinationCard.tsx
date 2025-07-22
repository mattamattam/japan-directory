'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { StarIcon, MapPinIcon, CurrencyYenIcon } from "@heroicons/react/24/solid";
import { formatPrice } from "@/lib/utils";

interface DestinationCardProps {
  destination: {
    _id: string;
    name: string;
    region: string;
    description: string;
    image: string;
    rating: number;
    reviewCount: number;
    price: number;
    highlights?: string[];
    bestTime?: string;
    slug?: {
      current: string;
    } | string;
  };
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  const handleExplore = () => {
    const slug = typeof destination.slug === 'string' ? destination.slug : destination.slug?.current;
    window.open(`/destinations/${slug}`, '_blank');
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={destination.image}
          alt={destination.name}
          className="aspect-[16/9] w-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold text-gray-900">
          {formatPrice(destination.price)}
        </div>
        <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
          {destination.region}
        </div>
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{destination.name}</CardTitle>
          <div className="flex items-center gap-x-1">
            <StarIcon className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium">{destination.rating}</span>
          </div>
        </div>
        <CardDescription className="text-sm leading-relaxed">
          {destination.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-x-2 text-sm text-gray-600">
          <MapPinIcon className="h-4 w-4" />
          <span>{destination.region} Region</span>
        </div>
        <div className="flex items-center gap-x-2 text-sm text-gray-600">
          <CurrencyYenIcon className="h-4 w-4" />
          <span>From {formatPrice(destination.price)} per day</span>
        </div>
        {destination.bestTime && (
          <div className="text-sm text-gray-600">
            <strong>Best Time:</strong> {destination.bestTime}
          </div>
        )}
        {destination.highlights && (
          <div className="text-sm text-gray-600">
            <strong>Highlights:</strong>
            <ul className="mt-1 list-disc list-inside">
              {destination.highlights.slice(0, 3).map((highlight: string, index: number) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex items-center justify-between pt-4">
          <span className="text-sm text-gray-500">({destination.reviewCount} reviews)</span>
          <Button size="sm" onClick={handleExplore}>
            Explore {destination.name}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 