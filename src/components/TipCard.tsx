import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/Card";

interface Tip {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  description: string;
  image?: string;
  featured?: boolean;
}

interface TipCardProps {
  tip: Tip;
}

const categoryColors = {
  travel: "bg-blue-100 text-blue-800",
  shopping: "bg-purple-100 text-purple-800",
  money: "bg-green-100 text-green-800",
  budget: "bg-yellow-100 text-yellow-800",
  language: "bg-red-100 text-red-800",
};

const categoryIcons = {
  travel: "✈️",
  shopping: "🛍️",
  money: "💰",
  budget: "💸",
  language: "🗣️",
};

export default function TipCard({ tip }: TipCardProps) {
  const categoryColor =
    categoryColors[tip.category as keyof typeof categoryColors] ||
    "bg-gray-100 text-gray-800";
  const categoryIcon =
    categoryIcons[tip.category as keyof typeof categoryIcons] || "💡";

  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <Link href={`/tips/${tip.category}/${tip.slug.current}`}>
        <div className="relative overflow-hidden rounded-t-lg">
          {tip.image ? (
            <Image
              src={tip.image}
              alt={tip.title}
              width={400}
              height={250}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
              <span className="text-4xl">{categoryIcon}</span>
            </div>
          )}
          {tip.featured && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
              Featured
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColor}`}
            >
              {categoryIcon}{" "}
              {tip.category.charAt(0).toUpperCase() + tip.category.slice(1)}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
            {tip.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {tip.description}
          </p>
          <div className="mt-4 flex items-center text-red-600 text-sm font-medium group-hover:text-red-700 transition-colors">
            Read more
            <svg
              className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </Link>
    </Card>
  );
}
