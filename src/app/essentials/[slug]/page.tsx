import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEssentialBySlug, getEssentials } from "@/lib/sanity-queries";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import AdBanner from "@/components/AdBanner";
import SidebarAd from "@/components/SidebarAd";
import PortableText from "@/components/PortableText";
import NewsletterSignup from "@/components/NewsletterSignup";
import { shouldShowNewsletterSignup } from "@/lib/utils";
import Image from "next/image";
import {
  BookOpenIcon,
  TagIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

interface EssentialPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: EssentialPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const essential = await getEssentialBySlug(resolvedParams.slug);

  if (!essential) {
    return {
      title: "Essential Not Found",
      description: "The requested essential guide could not be found.",
    };
  }

  return {
    title: `${essential.title} - Visit Japan HQ`,
    description: essential.seoDescription || essential.description,
    keywords: essential.seoKeywords?.join(", ") || "",
    alternates: {
      canonical: `https://visitjapanhq.com/essentials/${resolvedParams.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const essentials = await getEssentials();

  return essentials.map((essential: any) => ({
    slug:
      typeof essential.slug === "string"
        ? essential.slug
        : essential.slug.current,
  }));
}

export default async function EssentialPage({ params }: EssentialPageProps) {
  const resolvedParams = await params;
  const essential = await getEssentialBySlug(resolvedParams.slug);

  if (!essential) {
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
            label: "Essentials",
            href: "/essentials",
          },
          {
            label: essential.title,
          },
        ]}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {essential.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-green-100">
              {essential.description}
            </p>
          </div>
        </div>
      </section>

      {/* Google AdSense Banner */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AdBanner adSlot="essential-page-banner" adFormat="banner" />
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* About Section */}
            <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <div className="prose prose-lg text-gray-600">
                {essential.longDescription ? (
                  <PortableText content={essential.longDescription} />
                ) : essential.content ? (
                  <PortableText content={essential.content} />
                ) : (
                  <p className="mb-4">{essential.description}</p>
                )}
              </div>

              {/* Category */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-bold text-gray-900 mb-2">
                  Category
                </h3>
                <div className="flex items-center">
                  <TagIcon className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-gray-700">{essential.category}</span>
                </div>
              </div>
            </section>

            {/* Featured Image */}
            {essential.image && (
              <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src={essential.image}
                    alt={essential.title}
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
                  <BookOpenIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">{essential.title}</span>
                </div>
                <div className="flex items-center">
                  <TagIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">{essential.category}</span>
                </div>
                {essential.featured && (
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-400 mr-3" />
                    <span className="text-gray-700">Featured Guide</span>
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Need More Help?</h3>
              <p className="text-green-100 text-sm mb-4">
                Explore our other essential guides for comprehensive Japan
                travel planning.
              </p>
              <a
                href="/essentials"
                className="w-full bg-white text-green-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors inline-block text-center"
              >
                View All Essentials
              </a>
            </div>

            {/* Sidebar Ad */}
            <SidebarAd adSlot="essential-sidebar-ad" />

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
