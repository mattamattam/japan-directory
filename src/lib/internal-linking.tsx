import React from "react";

// Internal linking strategy for SEO optimization
interface InternalLink {
  text: string;
  href: string;
  title?: string;
}

// Related destinations for cross-linking
export const RELATED_DESTINATIONS = {
  tokyo: [
    {
      text: "Osaka's Food Scene",
      href: "/food/regional-japanese-foods",
      title: "Discover Osaka's incredible culinary experiences",
    },
    {
      text: "Tokyo's Airports",
      href: "/essentials/choosing-airport-tokyo-kyoto-osaka",
      title: "How to choose the best airport for your trip to Tokyo",
    },
    {
      text: "Explore Shibuya Crossing",
      href: "/destinations/tokyo/districts/shibuya",
      title: "Visit the world-famous Shibuya Crossing",
    },
    {
      text: "Harajuku Fashion District",
      href: "/destinations/tokyo/districts/harajuku",
      title: "Trendy shopping and youth culture in Harajuku",
    },
    {
      text: "Shinjuku Nightlife",
      href: "/destinations/tokyo/districts/shinjuku",
      title: "Experience vibrant nightlife in Shinjuku",
    },
  ],
  kyoto: [
    {
      text: "Kyoto's Monkey Park",
      href: "/experiences/visiting-monkeys-kyoto",
      title: "Visit the monkeys of Kyoto's Monkey Park",
    },
    {
      text: "Nara's Deer Park",
      href: "/experiences/nara-bowing-deer",
      title: "Visit friendly deer in Nara Park",
    },
    {
      text: "Take Shinkansen From Kyoto to Tokyo",
      href: "/experiences/shinkansen-kyoto-tokyo",
      title: "The fastest way to travel between Kyoto and Tokyo",
    },
  ],
  osaka: [
    {
      text: "Tokyo's dining districts",
      href: "/destinations/tokyo",
      title: "Tokyo's best food neighborhoods",
    },
    {
      text: "Kyoto for culture",
      href: "/destinations/kyoto",
      title: "Cultural experiences in ancient Kyoto",
    },
    {
      text: "Osaka's Street Food",
      href: "/food/osaka-soul-food",
      title: "Ultimate Osaka street food guide",
    },
  ],
  hiroshima: [
    {
      text: "Peace Memorial experiences",
      href: "/experiences/hiroshima-peace-park-experience",
      title: "Peace Memorial Park and Museum",
    },
    {
      text: "Miyajima Island",
      href: "/experiences/miyajima-floating-torii",
      title: "Famous floating torii gate",
    },
    {
      text: "historical sites in Japan",
      href: "/itineraries/historic-golden-route",
      title: "Japan's most important historical sites",
    },
  ],
} as const;

// Food-related internal links
export const FOOD_INTERNAL_LINKS = {
  sushi: [
    {
      text: "Tokyo's Tsukiji Fish Market",
      href: "/destinations/tokyo",
      title: "Fresh sushi at Tsukiji Market",
    },
    {
      text: "sushi etiquette guide",
      href: "/essentials/sushi-etiquette",
      title: "How to eat sushi properly in Japan",
    },
  ],
  ramen: [
    {
      text: "Tokyo's ramen districts",
      href: "/destinations/tokyo/food/ramen",
      title: "Best ramen neighborhoods in Tokyo",
    },
    {
      text: "Osaka's unique ramen styles",
      href: "/destinations/osaka",
      title: "Osaka's distinctive ramen variations",
    },
  ],
  sake: [
    {
      text: "sake tasting experiences",
      href: "/experiences/sake-tasting",
      title: "Traditional sake tasting tours",
    },
    {
      text: "Kyoto's sake breweries",
      href: "/destinations/kyoto",
      title: "Historic sake breweries in Kyoto",
    },
  ],
} as const;

// Experience-related internal links
export const EXPERIENCE_INTERNAL_LINKS = {
  temples: [
    {
      text: "Kyoto's temple district",
      href: "/destinations/kyoto",
      title: "Explore Kyoto's historic temples",
    },
  ],
  onsen: [
    {
      text: "Onsen Retreat",
      href: "/itineraries/tohoku-onsen-retreat",
      title: "A relaxing retreat in the mountains",
    },
    {
      text: "Onsen Etiquette",
      href: "/essentials/onsen-etiquette",
      title: "Hot spring bathing etiquette in Japan",
    },
  ],
  festivals: [
    {
      text: "Osaka World Expo 2025",
      href: "/experiences/world-expo-2025-osaka",
      title: "The World Expo 2025 in Osaka",
    },
    {
      text: "Sapporo Fireworks Festival",
      href: "/experiences/sapporo-fireworks-festival",
      title: "Ancient festivals and celebrations in Kyoto",
    },
  ],
} as const;

// Get contextual internal links based on page content
export function getContextualLinks(
  pageType: string,
  slug: string,
  content?: string
): InternalLink[] {
  const links: InternalLink[] = [];

  // Add destination-based links
  if (
    pageType === "destination" &&
    RELATED_DESTINATIONS[slug as keyof typeof RELATED_DESTINATIONS]
  ) {
    links.push(
      ...RELATED_DESTINATIONS[slug as keyof typeof RELATED_DESTINATIONS]
    );
  }

  // Add food-based links if content mentions food keywords
  if (content) {
    const lowerContent = content.toLowerCase();

    if (lowerContent.includes("sushi")) {
      links.push(...FOOD_INTERNAL_LINKS.sushi);
    }
    if (lowerContent.includes("ramen")) {
      links.push(...FOOD_INTERNAL_LINKS.ramen);
    }
    if (lowerContent.includes("sake")) {
      links.push(...FOOD_INTERNAL_LINKS.sake);
    }
    if (lowerContent.includes("temple") || lowerContent.includes("shrine")) {
      links.push(...EXPERIENCE_INTERNAL_LINKS.temples);
    }
    if (lowerContent.includes("onsen") || lowerContent.includes("hot spring")) {
      links.push(...EXPERIENCE_INTERNAL_LINKS.onsen);
    }
    if (lowerContent.includes("festival") || lowerContent.includes("matsuri")) {
      links.push(...EXPERIENCE_INTERNAL_LINKS.festivals);
    }
  }

  // Remove duplicates and limit to reasonable number
  const uniqueLinks = links.filter(
    (link, index, self) => index === self.findIndex((l) => l.href === link.href)
  );

  return uniqueLinks.slice(0, 5); // Limit to 5 contextual links
}

// Generate internal link component
export function InternalLinkSuggestions({ links }: { links: InternalLink[] }) {
  if (links.length === 0) return null;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Related Content
      </h3>
      <div className="space-y-2">
        {links.map((link, index) => (
          <div key={index}>
            <a
              href={link.href}
              className="text-red-600 hover:text-red-700 hover:underline font-medium"
              title={link.title}
            >
              {link.text}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
