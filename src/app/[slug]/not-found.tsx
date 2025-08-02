import Link from "next/link";
import Layout from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Page Not Found
              </h2>
              <p className="text-gray-600 mb-8">
                The page you&apos;re looking for doesn&apos;t exist or has been
                moved.
              </p>
              <div className="space-y-4">
                <Link
                  href="/"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Go Home
                </Link>
                <Link
                  href="/destinations"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Explore Destinations
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
