"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import {
  CheckCircleIcon,
  HeartIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

export default function UnsubscribeClient() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isAutoUnsubscribing, setIsAutoUnsubscribing] = useState(false);

  // Check for email and token parameters on component mount
  useEffect(() => {
    const emailParam = searchParams.get("email");
    const tokenParam = searchParams.get("token");

    if (emailParam && tokenParam) {
      setIsAutoUnsubscribing(true);
      handleAutoUnsubscribe(emailParam, tokenParam);
    } else {
      // No valid parameters, show error
      setError(
        "Invalid unsubscribe link. Please use the unsubscribe link from your email."
      );
    }
  }, [searchParams]);

  const handleAutoUnsubscribe = async (emailAddress: string, token: string) => {
    setIsLoading(true);
    setError("");

    try {
      // Build URL with query parameters
      const url = new URL("/api/newsletter", window.location.origin);
      url.searchParams.set("email", emailAddress);
      url.searchParams.set("token", token);
      url.searchParams.set("action", "unsubscribe");

      const response = await fetch(url.toString(), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
      } else {
        setError(data.error || "Failed to unsubscribe. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      setIsAutoUnsubscribing(false);
    }
  };

  // Show loading state when auto-unsubscribing
  if (isAutoUnsubscribing) {
    return (
      <>
        <Breadcrumb
          items={[
            {
              label: "Unsubscribe",
            },
          ]}
        />
        <section className="bg-gradient-to-r from-gray-600 to-gray-800 text-white py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="flex justify-center mb-6">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Processing Unsubscribe
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-100">
                Please wait while we remove you from our newsletter list...
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Breadcrumb
        items={[
          {
            label: "Unsubscribe",
          },
        ]}
      />

      {/* Success Message */}
      {isSuccess && (
        <>
          <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <div className="flex justify-center mb-6">
                  <CheckCircleIcon className="h-16 w-16 text-green-300" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                  Successfully Unsubscribed
                </h1>
                <p className="text-lg leading-8 text-green-100 mb-8">
                  You&apos;ve been removed from our newsletter mailing list.
                </p>
              </div>
            </div>
          </section>

          <section className="py-16 bg-gray-50">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="flex justify-center mb-6">
                  <HeartIcon className="h-12 w-12 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Thank You for Being Part of Our Journey!
                </h2>
                <div className="prose prose-lg mx-auto text-gray-700">
                  <p className="mb-6">
                    We&apos;re truly grateful for the time you&apos;ve spent
                    with us exploring the wonders of Japan. Your interest in our
                    travel guides and insights has meant the world to us.
                  </p>
                  <p className="mb-6">
                    While we&apos;re sad to see you go, we completely understand
                    that inboxes can get crowded. We hope our Japan travel
                    content has helped you plan amazing adventures and discover
                    the beauty of the Land of the Rising Sun.
                  </p>
                  <p className="mb-8">
                    If you ever find yourself planning another trip to Japan or
                    just want to stay updated with our latest travel tips and
                    destination guides, you&apos;re always welcome back.
                    We&apos;ll be here, ready to help you create more
                    unforgettable memories in Japan.
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
        </>
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
                Invalid Unsubscribe Link
              </h2>
              <div className="prose prose-lg mx-auto text-gray-700">
                <p className="mb-6">
                  This unsubscribe link is invalid or has expired. Please use
                  the unsubscribe link from your email newsletter.
                </p>
                <p className="mb-8">
                  If you need to unsubscribe but don&apos;t have the email,
                  please contact us and we&apos;ll help you unsubscribe.
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
    </>
  );
}
