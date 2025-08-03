import { Metadata } from "next";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us - Visit Japan HQ",
  description:
    "Get in touch with us for questions, feedback, or support about our Japan travel website.",
};

export default function Contact() {
  return (
    <Layout>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "Contact Us",
          },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-600 to-gray-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Contact Us
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-100">
              Get in touch with us for questions, feedback, or support
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="space-y-8">
              {/* Email Contact */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    1
                  </span>
                  Email Us Directly
                </h2>
                <p className="text-gray-700 mb-4">
                  For the fastest response, you can email us directly at:
                </p>
                <a
                  href="mailto:contact@visitjapanhq.com"
                  className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  contact@visitjapanhq.com
                </a>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    2
                  </span>
                  Send Us a Message
                </h2>
                <p className="text-gray-700 mb-6">
                  Fill out the form below and we&apos;ll get back to you as soon
                  as possible.
                </p>

                <ContactForm />
              </div>

              {/* Additional Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    3
                  </span>
                  What We Can Help With
                </h2>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 mt-3">
                  <li>Questions about Japan travel destinations</li>
                  <li>Website feedback and suggestions</li>
                  <li>Content requests or corrections</li>
                  <li>Technical issues with the website</li>
                  <li>Partnership and collaboration opportunities</li>
                  <li>General travel advice and recommendations</li>
                </ul>
              </div>

              {/* Response Time */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    4
                  </span>
                  Response Time
                </h2>
                <p className="text-gray-700">
                  We typically respond to all inquiries within 24-48 hours
                  during business days. For urgent matters, please use the
                  direct email link above.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
