import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getExperienceBySlug, getExperiences } from "@/lib/sanity-queries";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import AdBanner from "@/components/AdBanner";
import PortableText from "@/components/PortableText";
import Image from "next/image";
import {
  StarIcon,
  MapPinIcon,
  ClockIcon,
  CurrencyYenIcon,
} from "@heroicons/react/24/solid";

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
    title: `${experience.name} - Japan Directory`,
    description: experience.seoDescription || experience.description,
    keywords: experience.seoKeywords?.join(", ") || "",
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

  return (
    <Layout>
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
            <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
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
                      <Image
                        src={image.url || image}
                        alt={`${experience.name} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Experience Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">
                    {experience.location || "Location TBD"}
                  </span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">
                    {experience.duration || "Duration TBD"}
                  </span>
                </div>
                <div className="flex items-center">
                  <CurrencyYenIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">
                    ¥
                    {experience.price
                      ? experience.price.toLocaleString()
                      : "Contact for pricing"}
                  </span>
                </div>
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-3" />
                  <span className="text-gray-700">
                    {experience.rating || "N/A"} ({experience.reviewCount || 0}{" "}
                    reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Category
              </h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {experience.category}
              </span>
            </div>

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

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Ready to Book?</h3>
              <p className="text-blue-100 text-sm mb-4">
                Contact us to reserve your spot for this amazing experience.
              </p>
              <button className="w-full bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
                Book This Experience
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Google AdSense Banner */}
      <section className="bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AdBanner adSlot="experience-page-footer" adFormat="banner" />
        </div>
      </section>
    </Layout>
  );
}
