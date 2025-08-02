import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSectionPageBySlug, getSectionPages } from "@/lib/sanity-queries";
import Layout from "@/components/Layout";
import OptimizedImage from "@/components/OptimizedImage";
import PortableText from "@/components/PortableText";
import type { SectionPage } from "@/types";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all section pages
export async function generateStaticParams() {
  const sectionPages = await getSectionPages();

  // Filter out reserved routes
  const reservedRoutes = ["destinations", "blog"];

  return sectionPages
    .filter((page: any) => {
      const slug =
        typeof page.slug === "string" ? page.slug : page.slug.current;
      return !reservedRoutes.includes(slug);
    })
    .map((page: any) => ({
      slug: typeof page.slug === "string" ? page.slug : page.slug.current,
    }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sectionPage = await getSectionPageBySlug(slug);

  if (!sectionPage) {
    return {
      title: "Page Not Found",
      description: "The page you're looking for doesn't exist.",
    };
  }

  return {
    title: sectionPage.seoTitle || sectionPage.title,
    description: sectionPage.seoDescription || sectionPage.description,
    keywords: sectionPage.seoKeywords,
  };
}

export default async function SectionPage({ params }: PageProps) {
  const { slug } = await params;

  // Check for reserved routes that should not be handled by this dynamic route
  const reservedRoutes = ["destinations", "blog"];
  if (reservedRoutes.includes(slug)) {
    notFound();
  }

  const sectionPage = await getSectionPageBySlug(slug);

  if (!sectionPage) {
    notFound();
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gray-900 py-24 sm:py-32">
        {sectionPage.image && (
          <div className="absolute inset-0 overflow-hidden">
            <OptimizedImage
              src={sectionPage.image}
              alt={sectionPage.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gray-900/60" />
          </div>
        )}
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {sectionPage.heroTitle || sectionPage.title}
            </h1>
            {sectionPage.heroSubtitle && (
              <p className="mt-6 text-lg leading-8 text-gray-300">
                {sectionPage.heroSubtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {/* Description */}
            <div className="prose prose-lg max-w-none">
              <p className="text-xl leading-8 text-gray-600 mb-8">
                {sectionPage.description}
              </p>

              {/* Long Description if available */}
              {sectionPage.longDescription && (
                <div className="mt-8">
                  <PortableText content={sectionPage.longDescription} />
                </div>
              )}

              {/* Content if available */}
              {sectionPage.content && (
                <div className="mt-8">
                  <PortableText content={sectionPage.content} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
