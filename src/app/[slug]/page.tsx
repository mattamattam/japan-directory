import { notFound } from "next/navigation";
import { getSectionPageBySlug, getSectionPages } from "@/lib/sanity-queries";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import PortableText from "@/components/PortableText";
import AdBanner from "@/components/AdBanner";

interface SectionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: SectionPageProps) {
  const resolvedParams = await params;
  const sectionPage = await getSectionPageBySlug(resolvedParams.slug);

  if (!sectionPage) {
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  }

  return {
    title: `${sectionPage.title} - Visit Japan HQ`,
    description: sectionPage.seoDescription || sectionPage.description,
    keywords: sectionPage.seoKeywords?.join(", ") || "",
  };
}

export async function generateStaticParams() {
  const sectionPages = await getSectionPages();
  const reservedRoutes = ["destinations", "blog"]; // Routes that conflict with static pages

  return sectionPages
    .filter((page: any) => !reservedRoutes.includes(page.slug.current))
    .map((page: any) => ({
      slug: page.slug.current,
    }));
}

export default async function SectionPage({ params }: SectionPageProps) {
  const resolvedParams = await params;
  const sectionPage = await getSectionPageBySlug(resolvedParams.slug);

  if (!sectionPage) {
    notFound();
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: sectionPage.title,
          },
        ]}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {sectionPage.heroTitle || sectionPage.title}
            </h1>
            {sectionPage.heroSubtitle && (
              <p className="mt-6 text-lg leading-8 text-red-100">
                {sectionPage.heroSubtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Google AdSense Banner */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AdBanner adSlot="section-page-banner" adFormat="banner" />
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {sectionPage.longDescription ? (
              <PortableText content={sectionPage.longDescription} />
            ) : sectionPage.content ? (
              <PortableText content={sectionPage.content} />
            ) : (
              <p className="text-gray-600">{sectionPage.description}</p>
            )}
          </div>
        </div>
      </section>

      {/* Google AdSense Banner */}
      <section className="bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AdBanner adSlot="section-page-footer" adFormat="banner" />
        </div>
      </section>
    </Layout>
  );
}
