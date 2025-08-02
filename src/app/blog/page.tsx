import { Metadata } from "next";
import { getBlogPosts } from "@/lib/sanity-queries";
import Layout from "@/components/Layout";
import AdBanner from "@/components/AdBanner";
import { CalendarIcon, UserIcon, TagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - Japan Travel Guide",
  description:
    "Discover travel tips, cultural insights, and practical advice for your Japan adventure.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <Layout>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Japan Travel Blog</h1>
              <p className="text-xl opacity-90">
                Discover insider tips, cultural insights, and practical advice
                for your Japan adventure
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          {/* Ad Banner 1: After Hero */}
          <div className="mb-12">
            <AdBanner
              adSlot="blog-listing-header"
              adFormat="leaderboard"
              className="w-full"
            />
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <article
                key={post._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {post.image && (
                  <div className="relative h-48">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <UserIcon className="h-4 w-4 ml-4 mr-1" />
                    <span>{post.author}</span>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="hover:text-red-600 transition-colors duration-200"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  {post.description && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.description}
                    </p>
                  )}

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex items-center mb-4">
                      <TagIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="inline-flex items-center text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Ad Banner 2: Before Footer */}
          <div className="mt-12">
            <AdBanner
              adSlot="blog-listing-footer"
              adFormat="banner"
              className="w-full"
            />
          </div>

          {/* Empty State */}
          {posts.length === 0 && (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                No blog posts yet
              </h2>
              <p className="text-gray-600">
                Check back soon for travel tips and insights about Japan!
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
