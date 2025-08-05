"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [csrfToken, setCsrfToken] = useState("");

  // Generate CSRF token on component mount
  useEffect(() => {
    const token =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    setCsrfToken(token);
  }, []);

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Sanitize email input
  const sanitizeEmail = (email: string): string => {
    return email.trim().toLowerCase();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset messages
    setMessage("");
    setError("");

    // Validate email
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Sanitize email
    const sanitizedEmail = sanitizeEmail(email);

    setIsLoading(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({
          email: sanitizedEmail,
          csrfToken: csrfToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(
          "Thank you for subscribing! Please check your email to verify your subscription."
        );
        setEmail("");
      } else {
        if (response.status === 429) {
          setError(
            "Too many attempts. Please wait a moment before trying again."
          );
        } else {
          setError(data.error || "Failed to subscribe. Please try again.");
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
      <p className="text-blue-100 mb-6">
        Get the latest Japan travel tips, destination guides, and exclusive
        content delivered to your inbox.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="csrfToken" value={csrfToken} />
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-4 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            disabled={isLoading}
            maxLength={254} // RFC 5321 limit
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Please enter a valid email address"
            autoComplete="email"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-white text-blue-600 hover:bg-blue-50 disabled:opacity-50"
        >
          {isLoading ? "Subscribing..." : "Subscribe to Newsletter"}
        </Button>
      </form>

      {message && (
        <div className="mt-4 p-3 bg-green-500 bg-opacity-20 rounded-md">
          <p className="text-green-100">{message}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-500 bg-opacity-20 rounded-md">
          <p className="text-red-100">{error}</p>
        </div>
      )}

      <p className="text-xs text-blue-200 mt-4">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
}
