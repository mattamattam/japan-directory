import { Metadata } from "next";
import { getTipsByCategory } from "@/lib/sanity-queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TipCard from "@/components/TipCard";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

const categoryInfo = {
  travel: {
    title: "Travel Tips",
    description: "Transportation, navigation, and getting around Japan",
    icon: "✈️",
    color: "bg-blue-100 text-blue-800",
  },
  shopping: {
    title: "Shopping Tips",
    description: "Where to shop, what to buy, and shopping etiquette",
    icon: "🛍️",
    color: "bg-purple-100 text-purple-800",
  },
  money: {
    title: "Money Tips",
    description: "Currency, ATMs, credit cards, and payment methods",
    icon: "💰",
    color: "bg-green-100 text-green-800",
  },
  budget: {
    title: "Budget Tips",
    description: "How to save money and travel Japan on a budget",
    icon: "💸",
    color: "bg-yellow-100 text-yellow-800",
  },
  language: {
    title: "Language Tips",
    description: "Essential Japanese phrases and communication tips",
    icon: "🗣️",
    color: "bg-red-100 text-red-800",
  },
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const info = categoryInfo[category as keyof typeof categoryInfo];

  if (!info) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${info.title} - Japan Travel Tips`,
    description: info.description,
    keywords: `Japan ${category} tips, Japan travel advice, ${category} Japan`,
  };
}

export const revalidate = 3600; // Revalidate every hour

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const info = categoryInfo[category as keyof typeof categoryInfo];

  if (!info) {
    notFound();
  }

  // Fetch tips by category from Sanity
  const tips = await getTipsByCategory(category);

  // Fallback data if Sanity is not configured
  const fallbackTips = [
    {
      _id: "1",
      title: `Getting Started with ${info.title}`,
      slug: { current: `getting-started-${category}` },
      category: category,
      description: `Essential tips and advice for ${category} in Japan. Learn the basics and make the most of your experience.`,
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
      featured: true,
    },
    {
      _id: "2",
      title: `Advanced ${info.title}`,
      slug: { current: `advanced-${category}` },
      category: category,
      description: `Take your ${category} knowledge to the next level with these advanced tips and tricks.`,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      featured: false,
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
            <div className="flex items-center justify-center mb-4">
              <span className="text-4xl mr-3">{info.icon}</span>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {info.title}
              </h1>
            </div>
            <p className="mt-6 text-lg leading-8 text-red-100">
              {info.description}
            </p>
            <div className="mt-8">
              <Link
                href="/tips"
                className="inline-flex items-center text-red-100 hover:text-white transition-colors"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to All Tips
              </Link>
            </div>
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

      {/* Tips Grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {displayTips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayTips.map((tip: any) => (
                <TipCard key={tip._id} tip={tip} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${info.color} mb-4`}
              >
                <span className="text-2xl">{info.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No tips available yet
              </h3>
              <p className="text-gray-600">
                We&apos;re working on adding tips for this category. Check back
                soon!
              </p>
            </div>
          )}
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

      {/* Related Categories */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Explore Other Categories
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Discover more travel tips and advice
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(categoryInfo)
              .filter(([key]) => key !== category)
              .slice(0, 3)
              .map(([key, info]) => (
                <Link key={key} href={`/tips/${key}`} className="group block">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">{info.icon}</span>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                        {info.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">{info.description}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
