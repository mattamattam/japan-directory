import { Metadata } from "next";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Affiliate Disclosure - Visit Japan HQ",
  description:
    "Learn about our affiliate relationships and how we may earn commissions from links on our Japan travel website.",
};

export default function AffiliateDisclosure() {
  return (
    <Layout>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "Affiliate Disclosure",
          },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-600 to-gray-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Affiliate Disclosure
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-100">
              Transparency about our affiliate relationships
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
                  What Are Affiliate Links?
                </h2>
                <p>
                  Affiliate links are special URLs that allow us to earn a small
                  commission when you make a purchase through our links. This
                  comes at no additional cost to you and helps support our
                  website and content creation.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    2
                  </span>
                  How Affiliate Links Work
                </h2>
                <p>When you click on an affiliate link on our website:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 mt-3">
                  <li>You are redirected to the merchant&apos;s website</li>
                  <li>
                    A small tracking code is added to identify our referral
                  </li>
                  <li>If you make a purchase, we may earn a commission</li>
                  <li>The price you pay remains exactly the same</li>
                  <li>You can still use any available discounts or coupons</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    3
                  </span>
                  Our Affiliate Partners
                </h2>
                <p>
                  We may partner with various travel and lifestyle companies,
                  including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 mt-3">
                  <li>Hotel booking platforms (Booking.com, Hotels.com)</li>
                  <li>Flight booking services (Expedia, Skyscanner)</li>
                  <li>Travel insurance providers</li>
                  <li>Tour and activity booking platforms</li>
                  <li>Travel gear and product retailers</li>
                  <li>Travel guide and book publishers</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    4
                  </span>
                  Our Commitment to Honesty
                </h2>
                <p>
                  We are committed to providing honest, unbiased
                  recommendations:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 mt-3">
                  <li>
                    We only recommend products and services we genuinely believe
                    in
                  </li>
                  <li>
                    Our reviews and recommendations are based on research and
                    experience
                  </li>
                  <li>We disclose affiliate relationships when relevant</li>
                  <li>
                    We maintain editorial independence regardless of affiliate
                    status
                  </li>
                  <li>
                    We prioritize your best interests over earning commissions
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    5
                  </span>
                  How We Use Affiliate Commissions
                </h2>
                <p>Any commissions we earn help support:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 mt-3">
                  <li>Website hosting and maintenance costs</li>
                  <li>Content creation and research</li>
                  <li>Travel expenses for firsthand research</li>
                  <li>Photography and design resources</li>
                  <li>Continued improvement of our services</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    6
                  </span>
                  Identifying Affiliate Links
                </h2>
                <p>We strive to be transparent about affiliate links:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 mt-3">
                  <li>
                    Affiliate links may be marked with an asterisk (*) or note
                  </li>
                  <li>Some links may contain affiliate tracking parameters</li>
                  <li>
                    We may mention when a link is an affiliate link in our
                    content
                  </li>
                  <li>
                    You can always search for products directly on merchant
                    websites
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    7
                  </span>
                  Your Privacy and Affiliate Links
                </h2>
                <p>
                  When you click on affiliate links, some information may be
                  shared with our affiliate partners. This typically includes:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 mt-3">
                  <li>That you came from our website</li>
                  <li>Basic information about your visit</li>
                  <li>Purchase information (if you make a purchase)</li>
                </ul>
                <p className="mt-4">
                  For more details about how we handle your information, please
                  review our{" "}
                  <a
                    href="/privacy"
                    className="text-red-600 hover:text-red-800 underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    8
                  </span>
                  Questions About Affiliate Links
                </h2>
                <p>
                  If you have any questions about our affiliate relationships or
                  how affiliate links work, please contact us at:
                </p>
                <p>Email: affiliate@visitjapanhq.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
