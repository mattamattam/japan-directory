"use client";

import Image from "next/image";
import type { Restaurant } from "@/types";

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  return (
    <div className="rounded-lg shadow-md bg-white overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        {restaurant.image ? (
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            width={400}
            height={225}
            className="aspect-[16/9] w-full object-cover"
          />
        ) : (
          <div className="aspect-[16/9] w-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{restaurant.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{restaurant.location}</p>
        <p className="text-gray-800 font-bold mb-2">${restaurant.price}</p>
        <p className="text-gray-500 text-xs mb-2">{restaurant.category}</p>
        <p className="text-gray-500 text-xs mb-2">{restaurant.cuisine}</p>
        <p className="text-gray-500 text-xs">{restaurant.description}</p>
      </div>
    </div>
  );
}
