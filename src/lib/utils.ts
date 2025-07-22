import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price);
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getAffiliateLink(type: 'hotel' | 'tour' | 'flight', id: string) {
  const baseUrls = {
    hotel: 'https://www.booking.com/hotel/jp/',
    tour: 'https://www.viator.com/tours/',
    flight: 'https://www.skyscanner.com/flights/'
  };
  
  // Add your affiliate tracking parameters here
  const affiliateParams = '?affiliate=your-affiliate-id&utm_source=japan-directory';
  
  return `${baseUrls[type]}${id}${affiliateParams}`;
} 