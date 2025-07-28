"use client";

import Image from "next/image";
import type { Hotel } from "@/types";

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <div className="rounded-lg shadow-md bg-white overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        {hotel.image ? (
          <Image
            src={hotel.image}
            alt={hotel.name}
            width={800}
            height={600}
            className="aspect-[16/9] w-full object-cover"
          />
        ) : (
          <div className="aspect-[16/9] w-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{hotel.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{hotel.location}</p>
        <p className="text-gray-800 font-bold mb-2">${hotel.price}</p>
        <p className="text-gray-500 text-xs mb-2">{hotel.priceRange}</p>
        <p className="text-gray-500 text-xs mb-2">{hotel.category}</p>
        <p className="text-gray-500 text-xs mb-2">
          {hotel.amenities?.join(", ")}
        </p>
        <p className="text-gray-500 text-xs">{hotel.description}</p>
      </div>
    </div>
  );
}
