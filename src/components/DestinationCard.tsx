"use client";

import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import type { Destination } from "@/types";

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link
      href={`/destinations/${typeof destination.slug === "string" ? destination.slug : destination.slug.current}`}
      className="group relative bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-200 overflow-hidden"
    >
      {/* Destination Image */}
      <div className="relative h-48 bg-gray-200">
        {destination.image ? (
          <Image
            src={destination.image}
            alt={destination.name}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
            <span className="text-white text-lg font-medium">Japan</span>
          </div>
        )}

        {/* Region Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-red-600 text-white text-xs font-medium rounded-full">
            {destination.region}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-white text-gray-900 text-xs font-medium rounded-full shadow-sm">
            {destination.price}
          </span>
        </div>
      </div>

      {/* Destination Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
            {destination.name}
          </h3>
          <div className="flex items-center gap-x-1">
            <StarIcon className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium text-gray-600">
              {destination.rating}
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {destination.description}
        </p>

        {/* Read More */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-red-600 font-medium group-hover:text-red-700">
            Explore Destination →
          </span>
        </div>
      </div>
    </Link>
  );
}
