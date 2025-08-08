import { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "Privacy Policy - Visit Japan HQ",
  description:
    "Our privacy policy explains how we collect, use, and protect your information when you visit our Japan travel website.",
};

export default function PrivacyPolicy() {
  return (
    <Layout>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "Privacy Policy",
          },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-600 to-gray-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-100">
              How we collect, use, and protect your information
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <p className="text-sm text-gray-500 mb-8 border-b border-gray-200 pb-4">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    1
                  </span>
                  Data Controller
                </h2>
                <p>
                  Visit Japan HQ is the data controller for the information
                  collected on this site. We are responsible for determining how
                  and why your personal information is processed.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    2
                  </span>
                  Information We Collect
                </h2>
                <p>
                  We collect information you provide directly to us, such as
                  when you:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 mt-3">
                  <li>Contact us through our website</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Leave comments or feedback</li>
                  <li>Sign up for our services</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    3
                  </span>
                  Automatically Collected Information
                </h2>
                <p>
                  When you visit our website, we automatically collect certain
                  information about your device, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 mt-3">
                  <li>IP address and location data</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent</li>
                  <li>Referring website</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    4
                  </span>
                  Cookies and Tracking Technologies
                </h2>
                <p>We use cookies and similar tracking technologies to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 mt-3">
                  <li>Remember your preferences</li>
                  <li>Analyze website traffic</li>
                  <li>Improve our services</li>
                  <li>Provide personalized content</li>
                </ul>
                <p className="mt-3 text-gray-700">
                  <strong>Managing Cookie Preferences:</strong> You can manage
                  your cookie preferences through your browser settings. Most
                  browsers allow you to block or delete cookies. You can also
                  opt out of Google Analytics tracking by installing the Google
                  Analytics Opt-out Browser Add-on. For more information about
                  managing cookies, please visit
                  <a
                    href="https://www.allaboutcookies.org"
                    className="text-red-600 hover:text-red-700 underline ml-1"
                  >
                    allaboutcookies.org
                  </a>
                  .
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    5
                  </span>
                  How We Use Your Information
                </h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 mt-3">
                  <li>Provide and maintain our services</li>
                  <li>Improve our website and user experience</li>
                  <li>Send you updates and newsletters (with your consent)</li>
                  <li>Respond to your inquiries and support requests</li>
                  <li>Analyze usage patterns and trends</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    6
                  </span>
                  Information Sharing
                </h2>
                <p>
                  We do not sell, trade, or otherwise transfer your personal
                  information to third parties, except:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 mt-3">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and safety</li>
                  <li>
                    With trusted service providers who assist in operating our
                    website
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    7
                  </span>
                  Data Security
                </h2>
                <p>
                  We implement appropriate security measures to protect your
                  personal information against unauthorized access, alteration,
                  disclosure, or destruction.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    8
                  </span>
                  Data Retention Policy
                </h2>
                <p>
                  We retain your personal information for the following periods:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 mt-3">
                  <li>
                    <strong>Newsletter subscriptions:</strong> Until you
                    unsubscribe or request deletion
                  </li>
                  <li>
                    <strong>Contact form submissions:</strong> 2 years from the
                    date of submission
                  </li>
                  <li>
                    <strong>Website analytics data:</strong> 26 months (Google
                    Analytics standard)
                  </li>
                  <li>
                    <strong>Server logs:</strong> 90 days for security and
                    debugging purposes
                  </li>
                </ul>
                <p className="mt-3 text-gray-700">
                  We will delete your personal information when it is no longer
                  needed for the purposes for which it was collected, or when
                  you request deletion. You can request deletion of your data at
                  any time by contacting us.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    9
                  </span>
                  Third-Party Services
                </h2>
                <p>
                  Our website may contain links to third-party websites and
                  services. We are not responsible for the privacy practices of
                  these external sites.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    10
                  </span>
                  Google Analytics and Advertising
                </h2>
                <p>
                  We use Google Analytics to understand how visitors use our
                  website. Google may use the data collected to personalize ads.
                  You can opt out of Google Analytics tracking.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    11
                  </span>
                  Your Rights
                </h2>
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 mt-3">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    12
                  </span>
                  Children&apos;s Privacy
                </h2>
                <p>
                  Our website is not intended for children under 13. We do not
                  knowingly collect personal information from children under 13.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    13
                  </span>
                  International Data Transfers
                </h2>
                <p>
                  Your information may be transferred to and processed in
                  countries other than your own. We ensure appropriate
                  safeguards are in place.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    14
                  </span>
                  Changes to This Policy
                </h2>
                <p>
                  We may update this privacy policy from time to time. We will
                  notify you of any changes by posting the new policy on this
                  page.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    15
                  </span>
                  Contact Us
                </h2>
                <p>
                  If you have any questions about this privacy policy or would
                  like to exercise your data rights, please contact us using one
                  of the following methods:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 mt-3">
                  <li>
                    <strong>Email:</strong> privacy@visitjapanhq.com
                  </li>
                  <li>
                    <strong>Contact Form:</strong>{" "}
                    <Link
                      href="/contact"
                      className="text-red-600 hover:text-red-700 underline"
                    >
                      Visit our contact page
                    </Link>
                  </li>
                  <li>
                    <strong>Data Request Form:</strong> For specific data
                    access, correction, or deletion requests, please use our{" "}
                    <Link
                      href="/contact"
                      className="text-red-600 hover:text-red-700 underline"
                    >
                      contact form
                    </Link>{" "}
                    and specify your request type.
                  </li>
                </ul>
                <p className="mt-3 text-gray-700">
                  We will respond to your privacy-related inquiries within 30
                  days of receiving your request.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
