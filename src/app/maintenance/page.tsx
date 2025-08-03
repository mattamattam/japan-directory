import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Under Construction - Japan Directory",
  description:
    "We&apos;re working hard to bring you the best Japan travel guide. Check back soon!",
};

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center text-white">
        {/* Construction Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white bg-opacity-20 rounded-full mb-6">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          🚧 Under Construction
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-blue-100">
          We&apos;re building something amazing for your Japan adventure!
        </p>

        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            What&apos;s Coming Soon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold">Complete Japan Travel Guide</h3>
                <p className="text-sm text-blue-100">
                  Destinations, tips, and insider knowledge
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold">Interactive Maps</h3>
                <p className="text-sm text-blue-100">
                  Explore Japan&apos;s best locations
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold">Travel Planning Tools</h3>
                <p className="text-sm text-blue-100">
                  Itineraries and recommendations
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="font-semibold">Local Insights</h3>
                <p className="text-sm text-blue-100">
                  Authentic experiences and hidden gems
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
          <p className="text-blue-100 mb-4">
            Want to know when we launch? Drop us a line!
          </p>
          <a
            href="mailto:contact@visitjapanhq.com"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Contact Us
          </a>
        </div>

        {/* Footer */}
        <div className="mt-8 text-blue-100 text-sm">
          <p>© 2024 Japan Directory. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
