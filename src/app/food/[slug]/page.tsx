import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFoodBySlug, getFood } from "@/lib/sanity-queries";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import AdBanner from "@/components/AdBanner";
import SidebarAd from "@/components/SidebarAd";
import PortableText from "@/components/PortableText";
import NewsletterSignup from "@/components/NewsletterSignup";
import { shouldShowNewsletterSignup } from "@/lib/utils";
import ContentMetadata from "@/components/ContentMetadata";
import Image from "next/image";
import {
  CakeIcon,
  FireIcon,
  ClockIcon,
  MapPinIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

interface FoodPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: FoodPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const food = await getFoodBySlug(resolvedParams.slug);

  if (!food) {
    return {
      title: "Food Guide Not Found",
      description: "The requested food guide could not be found.",
    };
  }

  return {
    title: `${food.title} - Visit Japan HQ`,
    description: food.seoDescription || food.description,
    keywords: food.seoKeywords?.join(", ") || "",
    alternates: {
      canonical: `https://visitjapanhq.com/food/${resolvedParams.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const foodGuides = await getFood();

  return foodGuides.map((food: any) => ({
    slug: typeof food.slug === "string" ? food.slug : food.slug.current,
  }));
}

export default async function FoodPage({ params }: FoodPageProps) {
  const resolvedParams = await params;
  const food = await getFoodBySlug(resolvedParams.slug);

  if (!food) {
    notFound();
  }

  // Check if newsletter signup should show on this page
  const showNewsletterSignup = shouldShowNewsletterSignup(resolvedParams.slug);

  return (
    <Layout>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "Food",
            href: "/food",
          },
          {
            label: food.title,
          },
        ]}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {food.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-orange-100">
              {food.description}
            </p>
          </div>
        </div>
      </section>

      {/* Google AdSense Banner */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AdBanner adSlot="food-page-banner" adFormat="banner" />
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Content Metadata */}
            <ContentMetadata 
              lastUpdated={food._updatedAt || new Date()}
              publishedAt={food.publishedAt || food._createdAt}
              factChecked={true}
              sources={[
                "Local Restaurant Guides",
                "Food & Wine Publications", 
                "Culinary Expert Reviews",
                "Regional Tourism Boards"
              ]}
              className="mb-8"
            />

            {/* About Section */}
            <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <div className="prose prose-lg text-gray-600">
                {food.longDescription ? (
                  <PortableText content={food.longDescription} />
                ) : food.content ? (
                  <PortableText content={food.content} />
                ) : (
                  <p className="mb-4">{food.description}</p>
                )}
              </div>
            </section>

            {/* Featured Image */}
            {food.image && (
              <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Food Gallery
                </h2>
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src={food.image}
                    alt={food.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Guide Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CakeIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">{food.title}</span>
                </div>
                <div className="flex items-center">
                  <FireIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">{food.category}</span>
                </div>
                {food.featured && (
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 text-yellow-400 mr-3" />
                    <span className="text-gray-700">Featured Guide</span>
                  </div>
                )}
              </div>
            </div>

            {/* Category */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Category
              </h3>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">
                {food.category}
              </span>
            </div>

            {/* Tips Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Food Tips
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <ClockIcon className="h-4 w-4 text-orange-500 mr-2 mt-1" />
                  <span className="text-gray-700 text-sm">
                    Best enjoyed during peak dining hours
                  </span>
                </div>
                <div className="flex items-start">
                  <MapPinIcon className="h-4 w-4 text-orange-500 mr-2 mt-1" />
                  <span className="text-gray-700 text-sm">
                    Look for authentic local restaurants
                  </span>
                </div>
                <div className="flex items-start">
                  <CakeIcon className="h-4 w-4 text-orange-500 mr-2 mt-1" />
                  <span className="text-gray-700 text-sm">
                    Don&apos;t be afraid to try new flavors
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Hungry for More?</h3>
              <p className="text-orange-100 text-sm mb-4">
                Explore our other food guides to discover more Japanese culinary
                delights.
              </p>
              <a
                href="/food"
                className="w-full bg-white text-orange-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors inline-block text-center"
              >
                View All Food Guides
              </a>
            </div>

            {/* Sidebar Ad */}
            <SidebarAd adSlot="food-sidebar-ad" />

            {/* Newsletter Signup (randomly shown) */}
            {showNewsletterSignup && (
              <div className="mt-6">
                <NewsletterSignup />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
