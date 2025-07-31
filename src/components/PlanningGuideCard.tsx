import Link from "next/link";
import Image from "next/image";
import { BookOpenIcon } from "@heroicons/react/24/solid";

interface PlanningGuide {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  image: string;
  category: string;
}

interface PlanningGuideCardProps {
  guide: PlanningGuide;
}

export default function PlanningGuideCard({ guide }: PlanningGuideCardProps) {
  return (
    <Link
      href={`/planning-guides/${guide.slug.current}`}
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
          <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
            <BookOpenIcon className="h-12 w-12 text-white opacity-50" />
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
            {guide.category}
          </span>
        </div>
      </div>

      {/* Guide Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
            {guide.title}
          </h3>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {guide.description}
        </p>

        {/* Read More */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-green-600 font-medium group-hover:text-green-700">
            Read Guide →
          </span>
        </div>
      </div>
    </Link>
  );
}
