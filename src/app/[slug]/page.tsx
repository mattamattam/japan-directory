import { Metadata } from "next";
import { getSectionPageBySlug, getSectionPages } from "@/lib/sanity-queries";
import Layout from "@/components/Layout";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sectionPage = await getSectionPageBySlug(slug);

  if (!sectionPage) {
    return {
      title: "Page Not Found - Visit Japan",
    };
  }

  return {
    title: sectionPage.seoTitle || `${sectionPage.title} - Visit Japan`,
    description: sectionPage.seoDescription || sectionPage.description,
    keywords: sectionPage.seoKeywords?.join(", "),
  };
}

export async function generateStaticParams() {
  const sectionPages = await getSectionPages();

  // Filter out destinations since they have their own pages
  const validSlugs = sectionPages
    .filter((page: any) => page.slug.current !== "destinations")
    .map((page: any) => ({
      slug: page.slug.current,
    }));

  return validSlugs;
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;

  // Don't allow destinations to be handled by this dynamic route
  if (slug === "destinations") {
    notFound();
  }

  const sectionPage = await getSectionPageBySlug(slug);

  if (!sectionPage) {
    notFound();
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          {sectionPage?.image && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${sectionPage.image})`,
              }}
            />
          )}
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {sectionPage?.heroTitle || sectionPage?.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                {sectionPage?.heroSubtitle || sectionPage?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Google AdSense Banner */}
        <section className="bg-white py-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="bg-gray-100 h-20 flex items-center justify-center rounded-lg">
              <p className="text-gray-500 text-sm">Google AdSense Banner</p>
            </div>
          </div>
        </section>

        {/* Long Description Section */}
        {sectionPage?.longDescription && (
          <section className="py-16 bg-gray-50">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
              <div className="prose prose-lg mx-auto text-gray-700">
                <div
                  dangerouslySetInnerHTML={{
                    __html: sectionPage.longDescription as string,
                  }}
                />
              </div>
            </div>
          </section>
        )}

        {/* Content Section */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {sectionPage?.title}
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                {sectionPage?.description}
              </p>
            </div>

            {/* Placeholder for future content */}
            <div className="text-center py-12">
              <p className="text-gray-500">Content coming soon!</p>
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
      </div>
    </Layout>
  );
}
