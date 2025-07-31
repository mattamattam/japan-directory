import { Metadata } from "next";
import { getExperiences } from "@/lib/sanity-queries";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/Button";
import ExperienceCard from "@/components/ExperienceCard";

export const metadata: Metadata = {
  title: "Experiences - Japan Directory",
  description:
    "Discover unique experiences and activities in Japan. From cultural tours to adventure activities, find the perfect experience for your trip.",
  keywords:
    "Japan experiences, Japan activities, Japan tours, cultural experiences, adventure activities, Japan travel experiences",
};

export const revalidate = 3600; // Revalidate every hour

export default async function ExperiencesPage() {
  const experiences = await getExperiences();

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Japan Experiences
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Discover unique experiences and activities that will make your
                Japan trip unforgettable
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center">
                  <span>Cultural Tours</span>
                </div>
                <div className="flex items-center">
                  <span>Adventure Activities</span>
                </div>
                <div className="flex items-center">
                  <span>Food Experiences</span>
                </div>
              </div>
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

        {/* Experiences Grid */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Featured Experiences
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                From traditional tea ceremonies to modern city adventures,
                discover experiences that showcase the best of Japan
              </p>
            </div>

            {experiences.length > 0 ? (
              <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {experiences.map((experience: any) => (
                  <ExperienceCard
                    key={experience._id}
                    experience={experience}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No experiences found. Check back soon!
                </p>
              </div>
            )}
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
