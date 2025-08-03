import { Metadata } from "next";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Terms of Service - Visit Japan HQ",
  description:
    "Our terms of service outline the rules and guidelines for using our Japan travel website and services.",
};

export default function TermsOfService() {
  return (
    <Layout>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "Terms of Service",
          },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-600 to-gray-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Terms of Service
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-100">
              Rules and guidelines for using our website
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
                  Acceptance of Terms
                </h2>
                <p>
                  By accessing and using Visit Japan HQ (&quot;the
                  Website&quot;), you accept and agree to be bound by the terms
                  and provision of this agreement.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    2
                  </span>
                  Use License
                </h2>
                <p>
                  Permission is granted to temporarily download one copy of the
                  materials (information or software) on Visit Japan HQ for
                  personal, non-commercial transitory viewing only. This is the
                  grant of a license, not a transfer of title, and under this
                  license you may not:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 mt-3">
                  <li>Modify or copy the materials</li>
                  <li>
                    Use the materials for any commercial purpose or for any
                    public display
                  </li>
                  <li>
                    Attempt to reverse engineer any software contained on the
                    Website
                  </li>
                  <li>
                    Remove any copyright or other proprietary notations from the
                    materials
                  </li>
                  <li>
                    Transfer the materials to another person or
                    &quot;mirror&quot; the materials on any other server
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    3
                  </span>
                  Disclaimer
                </h2>
                <p>
                  The materials on Visit Japan HQ are provided on an &apos;as
                  is&apos; basis. Visit Japan HQ makes no warranties, expressed
                  or implied, and hereby disclaims and negates all other
                  warranties including without limitation, implied warranties or
                  conditions of merchantability, fitness for a particular
                  purpose, or non-infringement of intellectual property or other
                  violation of rights.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    4
                  </span>
                  Limitations
                </h2>
                <p>
                  In no event shall Visit Japan HQ or its suppliers be liable
                  for any damages (including, without limitation, damages for
                  loss of data or profit, or due to business interruption)
                  arising out of the use or inability to use the materials on
                  Visit Japan HQ, even if Visit Japan HQ or a Visit Japan HQ
                  authorized representative has been notified orally or in
                  writing of the possibility of such damage.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    5
                  </span>
                  Accuracy of Materials
                </h2>
                <p>
                  The materials appearing on Visit Japan HQ could include
                  technical, typographical, or photographic errors. Visit Japan
                  HQ does not warrant that any of the materials on its website
                  are accurate, complete, or current. Visit Japan HQ may make
                  changes to the materials contained on its website at any time
                  without notice.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    6
                  </span>
                  Links
                </h2>
                <p>
                  Visit Japan HQ has not reviewed all of the sites linked to its
                  website and is not responsible for the contents of any such
                  linked site. The inclusion of any link does not imply
                  endorsement by Visit Japan HQ of the site. Use of any such
                  linked website is at the user&apos;s own risk.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    7
                  </span>
                  Modifications
                </h2>
                <p>
                  Visit Japan HQ may revise these terms of service for its
                  website at any time without notice. By using this website you
                  are agreeing to be bound by the then current version of these
                  Terms of Service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    8
                  </span>
                  Governing Law
                </h2>
                <p>
                  These terms and conditions are governed by and construed in
                  accordance with the laws and you irrevocably submit to the
                  exclusive jurisdiction of the courts in that location.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    9
                  </span>
                  User Conduct
                </h2>
                <p>You agree not to use the Website to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700 mt-3">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon the rights of others</li>
                  <li>Transmit harmful, offensive, or inappropriate content</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with the proper functioning of the Website</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    10
                  </span>
                  Intellectual Property
                </h2>
                <p>
                  The Website and its original content, features, and
                  functionality are and will remain the exclusive property of
                  Visit Japan HQ and its licensors. The Website is protected by
                  copyright, trademark, and other laws.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    11
                  </span>
                  Privacy Policy
                </h2>
                <p>
                  Your privacy is important to us. Please review our Privacy
                  Policy, which also governs your use of the Website, to
                  understand our practices.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    12
                  </span>
                  Termination
                </h2>
                <p>
                  We may terminate or suspend your access immediately, without
                  prior notice or liability, for any reason whatsoever,
                  including without limitation if you breach the Terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    13
                  </span>
                  Limitation of Liability
                </h2>
                <p>
                  In no event shall Visit Japan HQ, nor its directors,
                  employees, partners, agents, suppliers, or affiliates, be
                  liable for any indirect, incidental, special, consequential,
                  or punitive damages, including without limitation, loss of
                  profits, data, use, goodwill, or other intangible losses,
                  resulting from your use of the Website.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    14
                  </span>
                  Indemnification
                </h2>
                <p>
                  You agree to defend, indemnify, and hold harmless Visit Japan
                  HQ and its licensees and service providers from and against
                  any claims, liabilities, damages, judgments, awards, losses,
                  costs, expenses, or fees arising out of or relating to your
                  violation of these Terms of Service or your use of the
                  Website.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    15
                  </span>
                  Severability
                </h2>
                <p>
                  If any provision of these Terms of Service is held to be
                  unenforceable or invalid, such provision will be changed and
                  interpreted to accomplish the objectives of such provision to
                  the greatest extent possible under applicable law and the
                  remaining provisions will continue in full force and effect.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                    16
                  </span>
                  Contact Information
                </h2>
                <p>
                  If you have any questions about these Terms of Service, please
                  contact us at:
                </p>
                <p>Email: legal@visitjapanhq.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
