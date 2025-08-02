"use client";

import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/Card";
import { StarIcon } from "@heroicons/react/24/solid";
import type { Destination } from "@/types";

export default function DestinationCard({
  destination,
}: {
  destination: Destination;
}) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        {destination.image ? (
          <Image
            src={destination.image}
            alt={destination.name}
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
          {destination.price}
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
    </Card>
  );
}
