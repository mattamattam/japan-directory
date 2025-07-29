import { Metadata } from "next";
import { getTipBySlug, getTipsByCategory } from "@/lib/sanity-queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TipCard from "@/components/TipCard";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

interface TipPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

const categoryInfo = {
  travel: {
    title: "Travel Tips",
    icon: "✈️",
    color: "bg-blue-100 text-blue-800",
  },
  shopping: {
    title: "Shopping Tips",
    icon: "🛍️",
    color: "bg-purple-100 text-purple-800",
  },
  money: {
    title: "Money Tips",
    icon: "💰",
    color: "bg-green-100 text-green-800",
  },
  budget: {
    title: "Budget Tips",
    icon: "💸",
    color: "bg-yellow-100 text-yellow-800",
  },
  language: {
    title: "Language Tips",
    icon: "🗣️",
    color: "bg-red-100 text-red-800",
  },
};

export async function generateMetadata({
  params,
}: TipPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tip = await getTipBySlug(slug);

  if (!tip) {
    return {
      title: "Tip Not Found",
    };
  }

  return {
    title: tip.seoTitle || tip.title,
    description: tip.seoDescription || tip.description,
    keywords:
      tip.seoKeywords?.join(", ") || `Japan travel tips, ${tip.category} Japan`,
  };
}

export const revalidate = 3600; // Revalidate every hour

export default async function TipPage({ params }: TipPageProps) {
  const { category, slug } = await params;
  const info = categoryInfo[category as keyof typeof categoryInfo];

  if (!info) {
    notFound();
  }

  // Fetch tip from Sanity
  const tip = await getTipBySlug(slug);

  if (!tip) {
    notFound();
  }

  // Fetch related tips from the same category
  const relatedTips = await getTipsByCategory(category);
  const filteredRelatedTips = relatedTips
    .filter((t: any) => t.slug.current !== slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">{info.icon}</span>
              <Link
                href={`/tips/${category}`}
                className="text-red-100 hover:text-white transition-colors"
              >
                {info.title}
              </Link>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              {tip.title}
            </h1>
            <p className="text-lg leading-8 text-red-100">{tip.description}</p>
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

      {/* Tip Content */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <article className="prose prose-lg max-w-none">
            {tip.image && (
              <div className="mb-8">
                <Image
                  src={tip.image}
                  alt={tip.title}
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}

            {tip.content ? (
              <PortableText value={tip.content} />
            ) : (
              <div className="text-gray-600">
                <p className="mb-4">
                  This tip is currently being written. Check back soon for the
                  full content!
                </p>
                <p>
                  In the meantime, you can explore other tips in the{" "}
                  {info.title} category.
                </p>
              </div>
            )}
          </article>
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

      {/* Related Tips */}
      {filteredRelatedTips.length > 0 && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                More {info.title}
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Explore other tips in this category
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRelatedTips.map((relatedTip: any) => (
                <TipCard key={relatedTip._id} tip={relatedTip} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
