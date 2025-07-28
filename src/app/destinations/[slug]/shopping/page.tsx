import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDestinationBySlug } from "@/lib/sanity-queries";
import {
  MapPinIcon,
  CurrencyYenIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import ShoppingCard from "@/components/ShoppingCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import type { Shopping } from "@/types";

interface ShoppingPageProps {
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
}: ShoppingPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const destination = await getDestinationBySlug(resolvedParams.slug);

  if (!destination) {
    return {
      title: "Destination Not Found",
      description: "The requested destination could not be found.",
    };
  }

  return {
    title: `Shopping in ${destination.name} - Japan Directory`,
    description: `Discover the best shopping in ${destination.name}, Japan. From traditional markets to modern shopping centers, find unique souvenirs and local products.`,
    keywords: `${destination.name} shopping, ${destination.name} markets, shopping in ${destination.name}, ${destination.name} souvenirs`,
  };
}

export default async function ShoppingPage({ params }: ShoppingPageProps) {
  const resolvedParams = await params;
  const destination = await getDestinationBySlug(resolvedParams.slug);

  if (!destination) {
    notFound();
  }

  // Fallback data for demonstration
  const shoppingAreas: Shopping[] = [
    {
      _id: "1",
      name: "Traditional Market in " + destination.name,
      location: destination.name,
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      rating: 4.3,
      reviewCount: 156,
      category: "Market",
      description: "Local market with traditional crafts and souvenirs",
      slug: { current: "traditional-market-" + destination.name.toLowerCase() },
    },
    {
      _id: "2",
      name: "Modern Shopping Center in " + destination.name,
      location: destination.name,
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      rating: 4.1,
      reviewCount: 98,
      category: "Shopping Center",
      description: "Modern shopping complex with international brands",
      slug: { current: "shopping-center-" + destination.name.toLowerCase() },
    },
    {
      _id: "3",
      name: "Artisan District in " + destination.name,
      location: destination.name,
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      rating: 4.5,
      reviewCount: 234,
      category: "Artisan",
      description: "Handcrafted goods and traditional Japanese crafts",
      slug: { current: "artisan-district-" + destination.name.toLowerCase() },
    },
    {
      _id: "4",
      name: "Electronics District in " + destination.name,
      location: destination.name,
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      rating: 4.2,
      reviewCount: 187,
      category: "Electronics",
      description: "Latest gadgets and technology at competitive prices",
      slug: {
        current: "electronics-district-" + destination.name.toLowerCase(),
      },
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <Breadcrumb
              items={[
                { name: "Destinations", href: "/destinations" },
                {
                  name: destination.name,
                  href: `/destinations/${resolvedParams.slug}`,
                },
                {
                  name: "Shopping",
                  href: `/destinations/${resolvedParams.slug}/shopping`,
                },
              ]}
            />
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Shopping in {destination.name}
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the best shopping experiences in {destination.name}.
                From traditional markets to modern malls, find unique souvenirs
                and local treasures.
              </p>
              <div className="mt-8 flex items-center justify-center space-x-6 text-gray-600">
                <div className="flex items-center">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  <span>{destination.name}, Japan</span>
                </div>
                <div className="flex items-center">
                  <CurrencyYenIcon className="h-5 w-5 mr-2" />
                  <span>Various Price Ranges</span>
                </div>
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 mr-2" />
                  <span>Top Shopping Areas</span>
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder={`Search shopping areas in ${destination.name}...`}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">All Categories</option>
                  <option value="fashion">Fashion</option>
                  <option value="electronics">Electronics</option>
                  <option value="souvenirs">Souvenirs</option>
                  <option value="food">Food & Snacks</option>
                </select>
              </div>
            </div>

            {/* Shopping Areas Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shoppingAreas.map((area: Shopping) => (
                <ShoppingCard key={area._id} shop={area} />
              ))}
            </div>

            {/* No Shopping Areas Message */}
            {shoppingAreas.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No shopping areas found in {destination.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  We&apos;re working on adding more shopping areas to this
                  destination. Check back soon for new listings!
                </p>
                <Link
                  href="/shopping"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  View all shopping areas →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="prose prose-lg max-w-none">
              <h2>Shopping in {destination.name}: A Shopper&apos;s Paradise</h2>
              <p>
                {destination.name} offers an incredible variety of shopping
                experiences that cater to every taste and budget. From
                traditional markets selling local crafts and fresh produce to
                modern shopping centers with international brands, the city
                provides endless opportunities for retail therapy and souvenir
                hunting.
              </p>

              <h3>Traditional Markets in {destination.name}</h3>
              <p>
                Traditional markets in {destination.name} are vibrant hubs of
                local commerce where you can find fresh produce, traditional
                crafts, and authentic souvenirs. These markets often have a rich
                history and provide a glimpse into the daily life of locals.
                Many vendors are happy to share stories about their products and
                offer insights into local customs and traditions.
              </p>

              <h3>Modern Shopping Centers</h3>
              <p>
                {destination.name}&apos;s modern shopping centers offer a
                comfortable and convenient shopping experience with a mix of
                international and local brands. These air-conditioned spaces are
                perfect for escaping the weather and provide a wide range of
                options from fashion and beauty to electronics and home goods.
                Many shopping centers also feature food courts and entertainment
                options.
              </p>

              <h3>Artisan Districts and Craft Shops</h3>
              <p>
                For unique and high-quality souvenirs, explore{" "}
                {destination.name}&apos;s artisan districts where skilled
                craftspeople create traditional Japanese goods. These areas
                often feature pottery, textiles, woodwork, and other handmade
                items that make perfect gifts or keepsakes. Many artisans are
                happy to demonstrate their techniques and explain the cultural
                significance of their work.
              </p>

              <h3>Electronics and Technology Shopping</h3>
              <p>
                {destination.name} is renowned for its electronics districts,
                where you can find the latest gadgets and technology at
                competitive prices. These areas are particularly popular with
                international visitors looking for cameras, computers, and other
                electronic devices. Many shops offer tax-free shopping for
                foreign visitors, making it an even more attractive destination
                for tech enthusiasts.
              </p>

              <h3>Shopping Tips for {destination.name}</h3>
              <p>
                When shopping in {destination.name}, remember that many smaller
                shops and markets may not accept credit cards, so it&apos;s wise
                to carry cash. Don&apos;t hesitate to bargain at markets, but be
                respectful and reasonable. Many shops offer tax-free shopping
                for foreign visitors with a passport, so always carry
                identification. Consider the weight and size of items when
                shopping, especially if you&apos;re traveling light.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
