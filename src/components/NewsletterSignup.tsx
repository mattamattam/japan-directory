"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
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

    // Validate consent
    if (!consent) {
      setError("Please agree to receive our newsletter.");
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
          consent: consent,
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
    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
      <p className="text-emerald-100 mb-4 text-sm">
        Get Japan travel tips and guides delivered to your inbox.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="hidden" name="csrfToken" value={csrfToken} />
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-300 text-sm"
            disabled={isLoading}
            maxLength={254}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Please enter a valid email address"
            autoComplete="email"
          />
        </div>

        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            disabled={isLoading}
            className="mt-0.5 h-3 w-3 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            required
          />
          <label
            htmlFor="consent"
            className="text-xs text-emerald-100 leading-relaxed"
          >
            I agree to receive the newsletter and can unsubscribe anytime.
          </label>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-white text-emerald-600 hover:bg-emerald-50 disabled:opacity-50 text-sm py-2"
        >
          {isLoading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>

      {message && (
        <div className="mt-3 p-2 bg-green-500 bg-opacity-20 rounded-md">
          <p className="text-green-100 text-sm">{message}</p>
        </div>
      )}

      {error && (
        <div className="mt-3 p-2 bg-red-500 bg-opacity-20 rounded-md">
          <p className="text-red-100 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
