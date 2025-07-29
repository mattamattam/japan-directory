import { Metadata } from "next";
import { getTips } from "@/lib/sanity-queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TipCard from "@/components/TipCard";
import Link from "next/link";
import {
  GlobeAltIcon,
  ShoppingBagIcon,
  CurrencyYenIcon,
  BanknotesIcon,
  LanguageIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Japan Travel Tips - Expert Advice for Your Trip",
  description:
    "Get expert travel tips for Japan. Learn about transportation, shopping, money, budgeting, and language tips to make your Japan trip unforgettable.",
  keywords:
    "Japan travel tips, Japan transportation, Japan shopping, Japan money, Japan budget, Japanese language, Japan travel advice",
};

export const revalidate = 3600; // Revalidate every hour

const tipCategories = [
  {
    name: "Travel",
    slug: "travel",
    description: "Transportation, navigation, and getting around Japan",
    icon: GlobeAltIcon,
    color: "bg-blue-100 text-blue-800",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    name: "Shopping",
    slug: "shopping",
    description: "Where to shop, what to buy, and shopping etiquette",
    icon: ShoppingBagIcon,
    color: "bg-purple-100 text-purple-800",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    name: "Money",
    slug: "money",
    description: "Currency, ATMs, credit cards, and payment methods",
    icon: CurrencyYenIcon,
    color: "bg-green-100 text-green-800",
    gradient: "from-green-500 to-green-600",
  },
  {
    name: "Budget",
    slug: "budget",
    description: "How to save money and travel Japan on a budget",
    icon: BanknotesIcon,
    color: "bg-yellow-100 text-yellow-800",
    gradient: "from-yellow-500 to-yellow-600",
  },
  {
    name: "Language",
    slug: "language",
    description: "Essential Japanese phrases and communication tips",
    icon: LanguageIcon,
    color: "bg-red-100 text-red-800",
    gradient: "from-red-500 to-red-600",
  },
];

export default async function TipsPage() {
  // Fetch tips from Sanity
  const tips = await getTips();

  // Fallback data if Sanity is not configured
  const fallbackTips = [
    {
      _id: "1",
      title: "Getting Around Tokyo",
      slug: { current: "getting-around-tokyo" },
      category: "travel",
      description:
        "Master Tokyo's efficient public transportation system including trains, subways, and buses.",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
      featured: true,
    },
    {
      _id: "2",
      title: "Shopping in Akihabara",
      slug: { current: "shopping-in-akihabara" },
      category: "shopping",
      description:
        "Discover the best electronics, anime, and gaming stores in Tokyo's famous district.",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      featured: true,
    },
    {
      _id: "3",
      title: "Using ATMs in Japan",
      slug: { current: "using-atms-in-japan" },
      category: "money",
      description:
        "Everything you need to know about accessing your money while traveling in Japan.",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      featured: true,
    },
    {
      _id: "4",
      title: "Budget Accommodation",
      slug: { current: "budget-accommodation" },
      category: "budget",
      description:
        "Find affordable places to stay including hostels, business hotels, and capsule hotels.",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      featured: true,
    },
    {
      _id: "5",
      title: "Essential Japanese Phrases",
      slug: { current: "essential-japanese-phrases" },
      category: "language",
      description:
        "Learn the most important Japanese phrases for travelers to communicate effectively.",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      featured: true,
    },
  ];

  const displayTips = tips.length > 0 ? tips : fallbackTips;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Japan Travel Tips & Advice
            </h1>
            <p className="mt-6 text-lg leading-8 text-red-100">
              Expert advice to help you navigate Japan like a local. From
              transportation to shopping, money to language - we&apos;ve got you
              covered.
            </p>
          </div>
        </div>
      </section>

      {/* Google AdSense Banner */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="bg-gray-100 h-20 flex items-center justify-center rounded-lg">
            <p className="text-gray-500 text-sm">Google AdSense Banner</p>
          </div>
        </div>
      </section>

      {/* Tip Categories */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Choose Your Category
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Browse our comprehensive travel tips organized by category
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tipCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.slug}
                  href={`/tips/${category.slug}`}
                  className="group block"
                >
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-200 group-hover:border-red-300">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${category.color} mb-4`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {category.description}
                    </p>
                    <div className="mt-4 flex items-center text-red-600 text-sm font-medium group-hover:text-red-700 transition-colors">
                      Explore tips
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
              );
            })}
          </div>
        </div>
      </section>

      {/* Google AdSense Banner */}
      <section className="bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="bg-gray-100 h-20 flex items-center justify-center rounded-lg">
            <p className="text-gray-500 text-sm">Google AdSense Banner</p>
          </div>
        </div>
      </section>

      {/* Featured Tips */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Featured Tips
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Our most popular and essential travel advice
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayTips.slice(0, 6).map((tip: any) => (
              <TipCard key={tip._id} tip={tip} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
