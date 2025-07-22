import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CalendarIcon, ClockIcon, UserIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Japan Travel Blog - Tips, Guides & Travel Stories",
  description: "Read the latest Japan travel tips, guides, and stories. Get insider knowledge about Japanese culture, food, attractions, and travel planning advice.",
  keywords: "Japan travel blog, Japan travel tips, Japan travel guide, Japan culture, Japan food, Japan attractions, travel planning Japan",
};

const blogPosts = [
  {
    id: 1,
    title: "10 Must-Visit Temples in Kyoto: A Complete Guide",
    excerpt: "Discover the most beautiful and historically significant temples in Kyoto, from the iconic Fushimi Inari to the serene Kinkaku-ji Golden Pavilion.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
    author: "Japan Travel Expert",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Culture & Temples",
    slug: "10-must-visit-temples-kyoto"
  },
  {
    id: 2,
    title: "Tokyo Food Guide: Where to Eat Like a Local",
    excerpt: "From hidden ramen shops to Michelin-starred sushi restaurants, discover the best places to eat in Tokyo that locals love.",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&h=600&fit=crop",
    author: "Food Traveler",
    date: "2024-01-12",
    readTime: "12 min read",
    category: "Food & Dining",
    slug: "tokyo-food-guide-local-restaurants"
  },
  {
    id: 3,
    title: "Cherry Blossom Season in Japan: Best Viewing Spots",
    excerpt: "Plan your perfect cherry blossom viewing experience with our guide to the best hanami spots across Japan, from Tokyo to Kyoto.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
    author: "Seasonal Traveler",
    date: "2024-01-10",
    readTime: "10 min read",
    category: "Seasonal Travel",
    slug: "cherry-blossom-season-japan-viewing-spots"
  },
  {
    id: 4,
    title: "Japan Rail Pass: Is It Worth It? Complete Guide",
    excerpt: "Everything you need to know about the Japan Rail Pass, including costs, coverage, and whether it's the right choice for your trip.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    author: "Transport Expert",
    date: "2024-01-08",
    readTime: "6 min read",
    category: "Transportation",
    slug: "japan-rail-pass-worth-it-guide"
  },
  {
    id: 5,
    title: "Budget Travel in Japan: How to Save Money",
    excerpt: "Travel Japan on a budget with these money-saving tips for accommodation, food, transportation, and attractions.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    author: "Budget Traveler",
    date: "2024-01-05",
    readTime: "9 min read",
    category: "Budget Travel",
    slug: "budget-travel-japan-save-money"
  },
  {
    id: 6,
    title: "Onsen Etiquette: A Beginner's Guide to Japanese Hot Springs",
    excerpt: "Learn the proper etiquette for visiting Japanese onsen, from bathing procedures to what to bring and cultural customs.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    author: "Culture Expert",
    date: "2024-01-03",
    readTime: "7 min read",
    category: "Culture & Traditions",
    slug: "onsen-etiquette-japanese-hot-springs-guide"
  }
];

const categories = ["All", "Culture & Temples", "Food & Dining", "Seasonal Travel", "Transportation", "Budget Travel", "Culture & Traditions"];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Japan Travel Blog
            </h1>
            <p className="mt-6 text-lg leading-8 text-red-100">
              Expert tips, travel guides, and insider knowledge to help you plan the perfect Japanese adventure.
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

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "primary" : "outline"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Latest Articles
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Stay updated with the latest Japan travel insights and tips
            </p>
          </div>
          
          {/* Featured Post */}
          <div className="mb-16">
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative">
                  <img
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className="aspect-[16/9] w-full object-cover lg:aspect-[4/3]"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-x-4 text-xs mb-4">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                      {blogPosts[0].category}
                    </span>
                    <div className="flex items-center gap-x-1 text-gray-500">
                      <CalendarIcon className="h-4 w-4" />
                      {new Date(blogPosts[0].date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-x-1 text-gray-500">
                      <ClockIcon className="h-4 w-4" />
                      {blogPosts[0].readTime}
                    </div>
                  </div>
                  <CardTitle className="text-2xl mb-4">{blogPosts[0].title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed mb-6">
                    {blogPosts[0].excerpt}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2 text-sm text-gray-600">
                      <UserIcon className="h-4 w-4" />
                      {blogPosts[0].author}
                    </div>
                    <Button size="sm">
                      Read More
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="aspect-[16/9] w-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-x-4 text-xs mb-4">
                    <div className="flex items-center gap-x-1 text-gray-500">
                      <CalendarIcon className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-x-1 text-gray-500">
                      <ClockIcon className="h-4 w-4" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm leading-relaxed">
                    {post.excerpt}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2 text-sm text-gray-600">
                      <UserIcon className="h-4 w-4" />
                      {post.author}
                    </div>
                    <Button size="sm" variant="outline">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
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

      {/* Newsletter Signup */}
      <section className="py-16 bg-red-600">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Get Travel Tips Delivered
            </h2>
            <p className="mt-4 text-lg leading-8 text-red-100">
              Subscribe to our newsletter for the latest Japan travel tips, guides, and exclusive deals.
            </p>
            <div className="mt-8 flex max-w-md mx-auto gap-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
              />
              <Button className="bg-white text-red-600 hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
