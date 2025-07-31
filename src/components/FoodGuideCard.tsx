import Link from "next/link";
import Image from "next/image";
import { CakeIcon } from "@heroicons/react/24/solid";

interface FoodGuide {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  image: string;
  category: string;
}

interface FoodGuideCardProps {
  guide: FoodGuide;
}

export default function FoodGuideCard({ guide }: FoodGuideCardProps) {
  return (
    <Link
      href={`/food-guides/${guide.slug.current}`}
      className="group relative bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-200 overflow-hidden"
    >
      {/* Guide Image */}
      <div className="relative h-48 bg-gray-200">
        {guide.image ? (
          <Image
            src={guide.image}
            alt={guide.title}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
            <CakeIcon className="h-12 w-12 text-white opacity-50" />
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-orange-600 text-white text-xs font-medium rounded-full">
            {guide.category}
          </span>
        </div>
      </div>

      {/* Guide Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
            {guide.title}
          </h3>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {guide.description}
        </p>

        {/* Read More */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-orange-600 font-medium group-hover:text-orange-700">
            Read Guide →
          </span>
        </div>
      </div>
    </Link>
  );
}
