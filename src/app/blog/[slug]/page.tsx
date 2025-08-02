import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/sanity-queries";
import Layout from "@/components/Layout";
import AdBanner from "@/components/AdBanner";
import { CalendarIcon, UserIcon, TagIcon } from "@heroicons/react/24/outline";
import React from "react"; // Added missing import for React

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.description,
    keywords: post.seoKeywords?.join(", "),
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post: any) => ({
    slug: post.slug.current,
  }));
}

export const revalidate = 3600; // Revalidate every hour

interface SanityBlock {
  _type: "block";
  style: string;
  children: Array<{
    _type: "span";
    text: string;
    marks?: string[];
  }>;
}

function renderBlock(block: SanityBlock) {
  const renderText = (children: any[]) => {
    return children.map((child, index) => {
      if (child._type === "span") {
        let text = child.text;

        // Apply marks (bold, italic, etc.)
        if (child.marks && child.marks.length > 0) {
          child.marks.forEach((mark: string) => {
            switch (mark) {
              case "strong":
                text = <strong key={index}>{text}</strong>;
                break;
              case "em":
                text = <em key={index}>{text}</em>;
                break;
              case "code":
                text = (
                  <code
                    key={index}
                    className="bg-gray-100 px-1 py-0.5 rounded text-sm"
                  >
                    {text}
                  </code>
                );
                break;
              case "underline":
                text = <u key={index}>{text}</u>;
                break;
              default:
                break;
            }
          });
        }

        return text;
      }
      return child.text;
    });
  };

  const content = renderText(block.children);

  switch (block.style) {
    case "h1":
      return (
        <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8">
          {content}
        </h1>
      );
    case "h2":
      return (
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">
          {content}
        </h2>
      );
    case "h3":
      return (
        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">
          {content}
        </h3>
      );
    case "h4":
      return (
        <h4 className="text-lg font-semibold text-gray-900 mb-3 mt-6">
          {content}
        </h4>
      );
    case "blockquote":
      return (
        <blockquote className="border-l-4 border-red-500 pl-4 italic text-gray-700 mb-4">
          {content}
        </blockquote>
      );
    case "normal":
    default:
      return <p className="text-gray-700 mb-4 leading-relaxed">{content}</p>;
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Layout>
      <article className="bg-white">
        {/* Hero Section */}
        {post.image && (
          <div className="relative h-96 w-full">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
        )}

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center text-sm text-gray-500 mb-4">
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

            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {post.description && (
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {post.description}
              </p>
            )}
          </header>

          {/* Ad Banner 1: After Header */}
          <div className="mb-8">
            <AdBanner
              adSlot="blog-post-header"
              adFormat="banner"
              className="w-full"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {post.body && Array.isArray(post.body) ? (
              post.body.map((block: SanityBlock, index: number) => (
                <div key={index}>{renderBlock(block)}</div>
              ))
            ) : (
              <p className="text-gray-700 leading-relaxed">
                Content is being loaded...
              </p>
            )}
          </div>

          {/* Tags Section - Moved below content */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center mb-4">
                <TagIcon className="h-5 w-5 text-gray-400 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 hover:bg-red-200 transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Ad Banner 2: Before Footer */}
          <div className="mt-8 mb-8">
            <AdBanner
              adSlot="blog-post-footer"
              adFormat="banner"
              className="w-full"
            />
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <UserIcon className="h-4 w-4 mr-1" />
                <span>By {post.author}</span>
              </div>
              <a
                href="/blog"
                className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
              >
                ← Back to Blog
              </a>
            </div>
          </footer>
        </div>
      </article>
    </Layout>
  );
}
