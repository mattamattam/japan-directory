import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDestinationBySlug } from "@/lib/sanity-queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

interface RestaurantsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: "tokyo" },
    { slug: "kyoto" },
    { slug: "osaka" },
    { slug: "hiroshima" },
  ];
}

export async function generateMetadata({
  params,
}: RestaurantsPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const destination = await getDestinationBySlug(resolvedParams.slug);

  if (!destination) {
    return {
      title: "Destination Not Found",
      description: "The requested destination could not be found.",
    };
  }

  return {
    title: `Restaurants in ${destination.name} - Japan Directory`,
    description: `Find the best restaurants in ${destination.name}. Discover local cuisine, fine dining, and authentic Japanese food experiences.`,
    keywords: `${destination.name} restaurants, ${destination.name} food, ${destination.name} dining, ${destination.name} cuisine`,
  };
}

export default async function RestaurantsPage({
  params,
}: RestaurantsPageProps) {
  const resolvedParams = await params;
  const destination = await getDestinationBySlug(resolvedParams.slug);

  if (!destination) {
    notFound();
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <Link
              href="/destinations"
              className="text-gray-600 hover:text-gray-900"
            >
              Destinations
            </Link>{" "}
            /{" "}
            <Link
              href={`/destinations/${resolvedParams.slug}`}
              className="text-gray-600 hover:text-gray-900"
            >
              {destination.name}
            </Link>{" "}
            / <span className="text-gray-900 font-medium">Restaurants</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-600 to-red-800 text-white">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Restaurants in {destination.name}
              </h1>
              <p className="mt-6 text-lg leading-8 text-red-100">
                Discover the best dining experiences in {destination.name}
              </p>
            </div>
          </div>
        </section>

        {/* Restaurants Content */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Top Restaurants & Dining
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Experience {destination.name}&apos;s culinary scene
              </p>
            </div>

            {/* Restaurants Grid */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Placeholder for restaurants */}
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Restaurants Coming Soon
                </h3>
                <p className="text-gray-600">
                  We&apos;re working on adding restaurants for{" "}
                  {destination.name}. Check back soon!
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
