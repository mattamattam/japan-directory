"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OverridePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const override = searchParams.get("maintenance_override");

    if (override) {
      // Store the override in a cookie (expires in 24 hours)
      document.cookie = `maintenance_override=${override}; max-age=${60 * 60 * 24}; path=/; SameSite=Strict`;

      // Redirect to home page
      router.push("/");
    } else {
      // If no override provided, redirect to maintenance page
      router.push("/maintenance");
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center text-white">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-4">Setting up access...</h1>
        <p className="text-blue-100">
          Please wait while we configure your access.
        </p>
      </div>
    </div>
  );
}
