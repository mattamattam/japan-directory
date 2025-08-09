"use client";

import Link from "next/link";

import type { Destination } from "@/types";
import { DestinationImage } from "./OptimizedImage";

export default function DestinationCard({
  destination,
}: {
  destination: Destination;
}) {
  return (
    <Link
      href={`/destinations/${typeof destination.slug === "string" ? destination.slug : destination.slug.current}`}
      className="group relative bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-200 overflow-hidden"
    >
      {/* Destination Image */}
      <div className="relative h-48 bg-gray-200">
        <DestinationImage
          src={destination.image}
          name={destination.name}
          width={400}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />

        {/* Region Badge */}
        {destination.region && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-red-600 text-white text-xs font-medium rounded-full">
              {destination.region}
            </span>
          </div>
        )}
      </div>

      {/* Destination Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
            {destination.name}
          </h3>
        </div>

        <p className="text-gray-600 text-sm mb-4">{destination.description}</p>

        {/* Action Link */}
        <div className="flex justify-end">
          <span className="text-sm text-red-600 font-medium group-hover:text-red-700">
            Explore →
          </span>
        </div>
      </div>
    </Link>
  );
}
