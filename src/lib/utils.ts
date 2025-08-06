import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to determine if newsletter signup should show on a page
export function shouldShowNewsletterSignup(slug: string): boolean {
  // Create a consistent hash from the slug
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    const char = slug.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Use the hash to determine if this page should show newsletter signup
  // This will be consistent for the same slug but random across different slugs
  const randomValue = Math.abs(hash) % 100;

  // Show on approximately 20% of pages
  return randomValue < 20;
}

export function formatPrice(price: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price);
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getAffiliateLink(
  type: "hotel" | "tour" | "flight",
  id: string
) {
  const baseUrls = {
    hotel: "https://www.booking.com/hotel/jp/",
    tour: "https://www.viator.com/tours/",
    flight: "https://www.skyscanner.com/flights/",
  };

  // Add your affiliate tracking parameters here
  const affiliateParams =
    "?affiliate=your-affiliate-id&utm_source=japan-directory";

  return `${baseUrls[type]}${id}${affiliateParams}`;
}
