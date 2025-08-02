import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDistrictBySlug, getDestinationBySlug } from "@/lib/sanity-queries";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/Button";
import PortableText from "@/components/PortableText";
import {
  MapPinIcon,
  StarIcon,
  CurrencyYenIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";

interface DistrictPageProps {
  params: Promise<{
    slug: string;
    district: string;
  }>;
}

export async function generateMetadata({
  params,
}: DistrictPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const district = await getDistrictBySlug(resolvedParams.district);

  if (!district) {
    return {
      title: "District Not Found",
    };
  }

  return {
    title: `${district.name}, ${district.destination.name} - Japan Travel Guide`,
    description: district.seoDescription || district.description,
    keywords: district.seoKeywords?.join(", ") || "",
  };
}

export default async function DistrictPage({ params }: DistrictPageProps) {
  const resolvedParams = await params;
  const [district, destination] = await Promise.all([
    getDistrictBySlug(resolvedParams.district),
    getDestinationBySlug(resolvedParams.slug),
  ]);

  if (!district || !destination) {
    notFound();
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <nav className="mb-8 text-sm">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link href="/" className="hover:text-red-200">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link
                    href={`/destinations/${destination.slug.current}`}
                    className="hover:text-red-200"
                  >
                    {destination.name}
                  </Link>
                </li>
                <li>/</li>
                <li>{district.name}</li>
              </ol>
            </nav>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {district.name}
            </h1>
            <p className="mt-6 text-lg leading-8 text-red-100">
              {district.description}
            </p>
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

      {/* District Content */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <h2>About {district.name}</h2>

                {/* Long Description if available */}
                {district.longDescription && (
                  <div className="mt-6">
                    <PortableText content={district.longDescription} />
                  </div>
                )}

                {district.highlights && district.highlights.length > 0 && (
                  <div className="mt-8">
                    <h3>Highlights</h3>
                    <ul>
                      {district.highlights.map(
                        (highlight: string, index: number) => (
                          <li key={index}>{highlight}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {/* Fallback content if no long description */}
                {!district.longDescription && (
                  <>
                    <div className="mt-8">
                      <h3>Getting There</h3>
                      <p>
                        {district.name} is easily accessible from{" "}
                        {destination.name} via public transportation. Consider
                        using the Japan Rail Pass for convenient travel.
                      </p>
                    </div>

                    <div className="mt-8">
                      <h3>Best Time to Visit</h3>
                      <p>
                        The best time to visit {district.name} depends on your
                        interests. Spring and autumn offer pleasant weather and
                        beautiful scenery.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Quick Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPinIcon className="h-5 w-5 text-gray-400 mr-3" />
                    <span>Part of {destination.name}</span>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 text-yellow-400 mr-3" />
                    <span>Popular district</span>
                  </div>
                  <div className="flex items-center">
                    <CurrencyYenIcon className="h-5 w-5 text-gray-400 mr-3" />
                    <span>Budget-friendly</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 text-gray-400 mr-3" />
                    <span>Year-round destination</span>
                  </div>
                </div>
              </div>

              {/* Related Links */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Explore More</h3>
                <div className="space-y-3">
                  <Link
                    href={`/destinations/${destination.slug.current}/hotels`}
                    className="block text-red-600 hover:text-red-800"
                  >
                    Hotels in {destination.name}
                  </Link>
                  <Link
                    href={`/destinations/${destination.slug.current}/restaurants`}
                    className="block text-red-600 hover:text-red-800"
                  >
                    Restaurants in {destination.name}
                  </Link>
                  <Link
                    href={`/destinations/${destination.slug.current}/tours`}
                    className="block text-red-600 hover:text-red-800"
                  >
                    Tours in {destination.name}
                  </Link>
                  <Link
                    href={`/destinations/${destination.slug.current}/shopping`}
                    className="block text-red-600 hover:text-red-800"
                  >
                    Shopping in {destination.name}
                  </Link>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Plan Your Trip</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Ready to explore {district.name}? Start planning your perfect
                  Japanese adventure.
                </p>
                <Button className="w-full">Start Planning</Button>
              </div>
            </div>
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
    </Layout>
  );
}
