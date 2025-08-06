import React from "react";

// Structured Data utilities for SEO optimization
import type { Destination, Experience } from "@/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://visitjapanhq.com";
const ORGANIZATION_NAME = "Visit Japan HQ";
const ORGANIZATION_LOGO = `${SITE_URL}/images/logo.png`;

// Organization structured data
export function getOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORGANIZATION_NAME,
    url: SITE_URL,
    logo: ORGANIZATION_LOGO,
    description: "Your ultimate guide to Japan tourism. Find the best hotels, attractions, restaurants, and travel tips for an unforgettable Japanese adventure.",
    sameAs: [
      // Add social media URLs when available
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      url: `${SITE_URL}/contact`
    }
  };
}

// Website structured data
export function getWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: ORGANIZATION_NAME,
    url: SITE_URL,
    description: "Discover the best of Japan with our comprehensive travel guide. From Tokyo to Kyoto, get insider tips, cultural insights, and practical advice for your Japan adventure.",
    publisher: {
      "@type": "Organization",
      name: ORGANIZATION_NAME,
      logo: ORGANIZATION_LOGO
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

// Destination structured data
export function getDestinationStructuredData(destination: Destination, slug: string) {
  const baseData = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "@id": `${SITE_URL}/destinations/${slug}`,
    name: destination.name,
    description: destination.description,
    url: `${SITE_URL}/destinations/${slug}`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "JP",
      addressRegion: destination.region || "Japan"
    },
    geo: destination.coordinates ? {
      "@type": "GeoCoordinates",
      latitude: destination.coordinates.lat,
      longitude: destination.coordinates.lng
    } : undefined,
    image: destination.image ? {
      "@type": "ImageObject",
      url: destination.image,
      description: `${destination.name}, Japan`
    } : undefined,
    touristType: ["Cultural Tourism", "Urban Tourism", "Food Tourism"],
    isAccessibleForFree: false
  };

  // Add rating if available
  if (destination.rating && destination.reviewCount) {
    (baseData as any).aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: destination.rating,
      reviewCount: destination.reviewCount,
      bestRating: 5,
      worstRating: 1
    };
  }

  return baseData;
}

// Experience structured data
export function getExperienceStructuredData(experience: any, slug: string) {
  const baseData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "@id": `${SITE_URL}/experiences/${slug}`,
    name: experience.name,
    description: experience.description,
    url: `${SITE_URL}/experiences/${slug}`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "JP"
    },
    image: experience.image ? {
      "@type": "ImageObject", 
      url: experience.image,
      description: `${experience.name} experience`
    } : undefined,
    category: experience.category,
    isAccessibleForFree: !experience.price
  };

  // Add rating if available
  if (experience.rating && experience.reviewCount) {
    (baseData as any).aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: experience.rating,
      reviewCount: experience.reviewCount,
      bestRating: 5,
      worstRating: 1
    };
  }

  // Add price if available
  if (experience.price) {
    (baseData as any).offers = {
      "@type": "Offer",
      price: experience.price,
      priceCurrency: "JPY",
      availability: "https://schema.org/InStock"
    };
  }

  return baseData;
}

// Breadcrumb structured data
export function getBreadcrumbStructuredData(items: Array<{name: string, url?: string}>) {
  const listItems = items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url ? `${SITE_URL}${item.url}` : undefined
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: listItems
  };
}

// Food guide structured data
export function getFoodGuideStructuredData(food: any, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/food/${slug}`,
    headline: food.title,
    description: food.description,
    url: `${SITE_URL}/food/${slug}`,
    image: food.image ? {
      "@type": "ImageObject",
      url: food.image,
      description: `${food.title} - Japanese food guide`
    } : undefined,
    author: {
      "@type": "Organization",
      name: ORGANIZATION_NAME,
      url: SITE_URL
    },
    publisher: {
      "@type": "Organization",
      name: ORGANIZATION_NAME,
      logo: ORGANIZATION_LOGO
    },
    datePublished: food.publishedAt || new Date().toISOString(),
    dateModified: food._updatedAt || new Date().toISOString(),
    articleSection: "Food & Dining",
    keywords: food.seoKeywords?.join(", ") || "Japanese food, Japan dining, Japanese cuisine",
    about: {
      "@type": "Thing",
      name: "Japanese Cuisine",
      description: "Traditional and modern Japanese food and dining experiences"
    }
  };
}

// Essential guide structured data  
export function getEssentialStructuredData(essential: any, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/essentials/${slug}`,
    headline: essential.title,
    description: essential.description,
    url: `${SITE_URL}/essentials/${slug}`,
    image: essential.image ? {
      "@type": "ImageObject",
      url: essential.image,
      description: `${essential.title} - Japan travel guide`
    } : undefined,
    author: {
      "@type": "Organization", 
      name: ORGANIZATION_NAME,
      url: SITE_URL
    },
    publisher: {
      "@type": "Organization",
      name: ORGANIZATION_NAME,
      logo: ORGANIZATION_LOGO
    },
    datePublished: essential.publishedAt || new Date().toISOString(),
    dateModified: essential._updatedAt || new Date().toISOString(),
    articleSection: "Travel Guide",
    keywords: essential.seoKeywords?.join(", ") || "Japan travel, Japan guide, Japan tips",
    about: {
      "@type": "Place",
      name: "Japan",
      description: "Travel information and guides for Japan"
    }
  };
}

// Generate JSON-LD script tag
export function generateStructuredDataScript(data: object | object[]) {
  const jsonData = Array.isArray(data) ? data : [data];
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonData, null, 2)
      }}
    />
  );
}