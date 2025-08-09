"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default function VerifyEmailClient() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isAutoVerifying, setIsAutoVerifying] = useState(false);

  // Check for verification token on component mount
  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (token) {
      setIsAutoVerifying(true);
      handleEmailVerification(token, email);
    }
  }, [searchParams]);

  const handleEmailVerification = async (
    token: string,
    email?: string | null
  ) => {
    setIsLoading(true);
    setError("");

    try {
      const requestBody = email
        ? {
            token,
            email: decodeURIComponent(email),
            action: "verify",
          }
        : {
            token,
            action: "verify",
          };

      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
      } else {
        setError(data.error || "Failed to verify email. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      setIsAutoVerifying(false);
    }
  };

  // Show loading state when auto-verifying
  if (isAutoVerifying) {
    return (
      <>
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            {
              label: "Verify Email",
            },
          ]}
        />

        {/* Loading Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="flex justify-center mb-6">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Verifying Your Email
              </h1>
              <p className="mt-6 text-lg leading-8 text-green-100">
                Please wait while we verify your email address...
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "Verify Email",
          },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Email Verification
            </h1>
            <p className="mt-6 text-lg leading-8 text-green-100">
              Verify your email address to complete your newsletter subscription
            </p>
          </div>
        </div>
      </section>

      {/* Success Message */}
      {isSuccess && (
        <section className="py-16 bg-green-50">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="flex justify-center mb-6">
                <CheckCircleIcon className="h-16 w-16 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Email Verified Successfully!
              </h2>
              <div className="prose prose-lg mx-auto text-gray-700">
                <p className="mb-6">
                  Thank you for verifying your email address! Your newsletter
                  subscription is now active and you&apos;ll start receiving our
                  Japan travel updates, destination guides, and insider tips.
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">
                    What You&apos;ll Receive:
                  </h3>
                  <ul className="text-left space-y-2 text-blue-800">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Weekly Japan travel tips and hidden gems</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>
                        Destination guides for Tokyo, Kyoto, Osaka, and more
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>
                        Seasonal travel recommendations and best times to visit
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Cultural insights and local customs to know</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>
                        Hotel and restaurant recommendations from our travels
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Exclusive deals and travel planning resources</span>
                    </li>
                  </ul>
                </div>

                <p className="mb-6">
                  We&apos;re excited to share the wonders of Japan with you,
                  from hidden gems in Tokyo to traditional ryokans in Kyoto, and
                  everything in between.
                </p>
                <p className="mb-8">
                  Look out for our first email in your inbox soon. If you
                  don&apos;t see it, please check your spam folder and add us to
                  your contacts.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link href="/">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Explore Japan
                  </Button>
                </Link>
                <Link href="/destinations">
                  <Button
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50"
                  >
                    Discover Destinations
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Error Message */}
      {error && (
        <section className="py-16 bg-red-50">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="flex justify-center mb-6">
                <XCircleIcon className="h-16 w-16 text-red-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Verification Failed
              </h2>
              <div className="prose prose-lg mx-auto text-gray-700">
                <p className="mb-6">
                  We couldn&apos;t verify your email address. This could be
                  because:
                </p>
                <ul className="text-left mb-6">
                  <li>The verification link has expired</li>
                  <li>The link has already been used</li>
                  <li>There was a technical issue</li>
                </ul>
                <p className="mb-8">
                  Please try subscribing to our newsletter again, or contact us
                  if you continue to have issues.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link href="/">
                  <Button className="bg-red-600 hover:bg-red-700">
                    Return Home
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-red-600 text-red-600 hover:bg-red-50"
                  >
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Manual Verification Form (if no token provided) */}
      {!isSuccess && !error && (
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Manual Verification
                </h2>
                <p className="text-gray-600 mb-8 text-center">
                  If you have a verification token, you can enter it below to
                  verify your email address.
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-8">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Most verification links work
                    automatically. If you&apos;re seeing this page, please check
                    your email for the verification link or try subscribing
                    again.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const tokenInput = (e.target as HTMLFormElement)
                      .token as HTMLInputElement;
                    const emailInput = (e.target as HTMLFormElement)
                      .email as HTMLInputElement;

                    if (tokenInput.value.trim()) {
                      const email = emailInput.value.trim() || null;
                      handleEmailVerification(tokenInput.value.trim(), email);
                    }
                  }}
                  className="space-y-6"
                >
                  <div>
                    <label
                      htmlFor="token"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Verification Token
                    </label>
                    <input
                      type="text"
                      id="token"
                      name="token"
                      required
                      disabled={isLoading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 disabled:opacity-50"
                      placeholder="Enter your verification token"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      This is the token from your verification email
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      disabled={isLoading}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 disabled:opacity-50"
                      placeholder="Enter your email address"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Include if your verification requires both token and email
                    </p>
                  </div>

                  <div
                    className={`bg-red-50 border border-red-200 rounded-md p-4 ${error ? "" : "hidden"}`}
                  >
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-green-600 hover:bg-green-700 disabled:opacity-50"
                    >
                      {isLoading ? "Verifying..." : "Verify Email"}
                    </Button>
                    <Link href="/">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        Return Home
                      </Button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
