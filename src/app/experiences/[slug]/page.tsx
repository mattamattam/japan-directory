import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getExperienceBySlug, getExperiences } from "@/lib/sanity-queries";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import AdBanner from "@/components/AdBanner";
import SidebarAd from "@/components/SidebarAd";
import PortableText from "@/components/PortableText";
import NewsletterSignup from "@/components/NewsletterSignup";
import { shouldShowNewsletterSignup } from "@/lib/utils";
import {
  getExperienceStructuredData,
  getBreadcrumbStructuredData,
  generateStructuredDataScript,
} from "@/lib/structured-data";
import ContentMetadata, {
  ContentStatusPills,
  LastUpdatedText,
} from "@/components/ContentMetadata";
import {
  StarIcon,
  MapPinIcon,
  ClockIcon,
  CurrencyYenIcon,
} from "@heroicons/react/24/solid";
import { ExperienceImage } from "@/components/OptimizedImage";
import {
  fetchPlaceData,
  getPlaceQuery,
  getFallbackPlaceData,
  GooglePlaceData,
} from "@/lib/places-utils";
import PlaceInfo from "@/components/PlaceInfo";

interface ExperiencePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ExperiencePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const experience = await getExperienceBySlug(resolvedParams.slug);

  if (!experience) {
    return {
      title: "Experience Not Found",
      description: "The requested experience could not be found.",
    };
  }

  return {
    title: `${experience.name} - Visit Japan HQ`,
    description: experience.seoDescription || experience.description,
    keywords: experience.seoKeywords?.join(", ") || "",
    alternates: {
      canonical: `https://visitjapanhq.com/experiences/${resolvedParams.slug}`,
    },
    openGraph: {
      type: "article",
      siteName: "Visit Japan HQ",
      title: `${experience.name} - Visit Japan HQ`,
      description: experience.seoDescription || experience.description,
      url: `https://visitjapanhq.com/experiences/${resolvedParams.slug}`,
      images: [
        {
          url:
            experience.image ||
            `https://visitjapanhq.com/images/og-experience-${resolvedParams.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: `${experience.name} - Japan Experience`,
        },
      ],
      locale: "en_US",
      section: "Experiences",
      tags: [experience.category, "Japan", "Experience", "Tourism"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${experience.name} - Visit Japan HQ`,
      description: experience.seoDescription || experience.description,
      images: [
        experience.image ||
          `https://visitjapanhq.com/images/twitter-experience-${resolvedParams.slug}.jpg`,
      ],
      creator: "@visitjapanhq",
      site: "@visitjapanhq",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export async function generateStaticParams() {
  const experiences = await getExperiences();

  return experiences.map((experience: any) => ({
    slug:
      typeof experience.slug === "string"
        ? experience.slug
        : experience.slug.current,
  }));
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const resolvedParams = await params;
  const experience = await getExperienceBySlug(resolvedParams.slug);

  if (!experience) {
    notFound();
  }

  // Fetch place data for the experience (skip only during build in CI/CD environments)
  const isBuildTime = process.env.CI || process.env.GITHUB_ACTIONS;
  let placeData: GooglePlaceData | null = null;

  if (!isBuildTime) {
    const placeQuery = getPlaceQuery(
      experience,
      "experience",
      experience.location
    );

    try {
      placeData = await fetchPlaceData(placeQuery);
    } catch (error) {
      console.warn("Failed to fetch experience place data:", error);
    }
  }

  if (!placeData) {
    placeData = getFallbackPlaceData(experience.name);
  }

  // Check if newsletter signup should show on this page
  const showNewsletterSignup = shouldShowNewsletterSignup(resolvedParams.slug);

  // Generate structured data
  const experienceData = getExperienceStructuredData(
    experience,
    resolvedParams.slug
  );
  const breadcrumbData = getBreadcrumbStructuredData([
    { name: "Home", url: "/" },
    { name: "Experiences", url: "/experiences" },
    { name: experience.name },
  ]);

  return (
    <Layout>
      {/* Structured Data */}
      {generateStructuredDataScript([experienceData, breadcrumbData])}
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "Experiences",
            href: "/experiences",
          },
          {
            label: experience.name,
          },
        ]}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {experience.name}
            </h1>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              {experience.description}
            </p>
          </div>
        </div>
      </section>

      {/* Google AdSense Banner */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AdBanner adSlot="experience-page-banner" adFormat="banner" />
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* About Section */}
            <section className="bg-white rounded-lg shadow-sm p-8 mb-8 relative">
              {/* Content Status Pills in upper right corner */}
              <div className="absolute top-4 right-4">
                <ContentStatusPills
                  lastUpdated={experience._updatedAt || new Date()}
                  factChecked={true}
                />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                About This Experience
              </h2>
              <div className="prose prose-lg text-gray-600">
                {experience.longDescription ? (
                  <PortableText content={experience.longDescription} />
                ) : (
                  <p className="mb-4">{experience.description}</p>
                )}
              </div>

              {/* Last Updated at bottom of article */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
                <LastUpdatedText
                  lastUpdated={experience._updatedAt || new Date()}
                />
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {experience.category}
                </span>
              </div>
            </section>

            {/* Gallery Section */}
            {experience.gallery && experience.gallery.length > 0 && (
              <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Experience Gallery
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {experience.gallery.map((image: any, index: number) => (
                    <div
                      key={index}
                      className="relative h-64 rounded-lg overflow-hidden"
                    >
                      <ExperienceImage
                        src={image.url || image}
                        name={experience.name}
                        category={experience.category}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Highlights */}
            {experience.highlights && experience.highlights.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Highlights
                </h3>
                <div className="space-y-2">
                  {experience.highlights.map(
                    (highlight: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-gray-700 text-sm">
                          {highlight}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Google Places Rating and Reviews */}
            <PlaceInfo
              placeData={placeData}
              placeName={experience.name}
              showReviews={true}
            />

            {/* CTA - Hidden until affiliates are ready */}
            {/* <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Ready to Book?</h3>
              <p className="text-blue-100 text-sm mb-4">
                Contact us to reserve your spot for this amazing experience.
              </p>
              <button className="w-full bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
                Book This Experience
              </button>
            </div> */}

            {/* Sidebar Ad */}
            <SidebarAd adSlot="experience-sidebar-ad" />

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
