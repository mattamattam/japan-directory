// FAQ data for rich snippets and SEO optimization
// This data powers FAQ schema markup throughout the site

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export const generalJapanFAQs: FAQItem[] = [
  {
    question: "What is the best time to visit Japan in 2025?",
    answer: "The best times to visit Japan are spring (March-May) for cherry blossoms, and autumn (September-November) for colorful foliage and mild weather. Spring offers the iconic sakura season with temperatures around 15-20°C, while autumn provides comfortable temperatures and stunning red maple leaves.",
    category: "planning"
  },
  {
    question: "Do I need a visa to visit Japan?",
    answer: "Citizens of many countries including the US, Canada, UK, Australia, and EU countries can visit Japan visa-free for tourism stays up to 90 days. However, you must have a valid passport with at least 6 months remaining validity and proof of onward travel.",
    category: "planning"
  },
  {
    question: "How much does a trip to Japan cost in 2025?",
    answer: "A mid-range Japan trip costs approximately $150-250 per person per day, including accommodation ($80-150), meals ($40-80), transportation ($20-40), and activities ($10-30). Budget travelers can manage with $80-120 per day, while luxury travelers may spend $400+ daily.",
    category: "budget"
  },
  {
    question: "Is the JR Pass worth it for Japan travel?",
    answer: "The JR Pass is worth it if you're traveling between multiple cities. A 7-day JR Pass costs ¥29,650 ($200), which pays for itself with just one Tokyo-Kyoto-Osaka round trip. It covers JR trains, including most shinkansen (bullet trains), JR buses, and JR ferries.",
    category: "transportation"
  },
  {
    question: "Can I use my credit card everywhere in Japan?",
    answer: "While card acceptance has improved significantly, Japan is still largely cash-based. Major hotels, department stores, and tourist attractions accept cards, but many restaurants, small shops, and traditional establishments are cash-only. Always carry cash (Japanese yen).",
    category: "practical"
  },
  {
    question: "Do I need to speak Japanese to travel in Japan?",
    answer: "You don't need to speak Japanese, but learning basic phrases helps. Major tourist areas have English signs, and many young people speak some English. Download translation apps like Google Translate (works offline), and carry a pocket phrasebook for emergencies.",
    category: "language"
  },
  {
    question: "What should I pack for Japan?",
    answer: "Pack comfortable walking shoes, layers for varying weather, portable phone charger, universal adapter (Type A/B plugs), hand towel (many restrooms don't provide them), and cash wallet. Leave space in your luggage for souvenirs - Japan has amazing shopping.",
    category: "packing"
  },
  {
    question: "Is Japan safe for solo travelers?",
    answer: "Japan is one of the safest countries in the world for solo travelers, including women. Crime rates are extremely low, people are helpful, and the transportation system is reliable. However, always use common sense and keep emergency contacts handy.",
    category: "safety"
  }
];

export const tokyoFAQs: FAQItem[] = [
  {
    question: "How many days do I need in Tokyo?",
    answer: "Plan at least 4-5 days in Tokyo to see major attractions like Senso-ji Temple, Tokyo Skytree, Shibuya Crossing, and different neighborhoods like Harajuku, Shinjuku, and Akihabara. A week allows for day trips to nearby areas like Nikko or Kamakura.",
    category: "planning"
  },
  {
    question: "What are the must-visit Tokyo neighborhoods?",
    answer: "Essential Tokyo neighborhoods include Shibuya (famous crossing, youth culture), Harajuku (fashion, kawaii culture), Shinjuku (nightlife, business district), Asakusa (traditional, Senso-ji Temple), Ginza (upscale shopping), and Akihabara (electronics, anime culture).",
    category: "attractions"
  },
  {
    question: "Where should I stay in Tokyo for first-time visitors?",
    answer: "Best areas for first-time visitors are Shinjuku (excellent transportation hub), Shibuya (vibrant, central), or Asakusa (traditional atmosphere, budget-friendly). All offer easy access to major attractions and extensive train connections.",
    category: "accommodation"
  },
  {
    question: "How do I navigate Tokyo's train system?",
    answer: "Download Hyperdia or Google Maps for train navigation. Buy a Tokyo Metro 24/48/72-hour pass for unlimited rides on Tokyo Metro and Toei lines. IC cards (Suica/Pasmo) work on all trains and many shops. Rush hours are 7-9 AM and 5-7 PM.",
    category: "transportation"
  }
];

export const kyotoFAQs: FAQItem[] = [
  {
    question: "How many days do I need in Kyoto?",
    answer: "Allow 3-4 days in Kyoto to visit major temples like Kinkaku-ji (Golden Pavilion), Fushimi Inari Shrine, Kiyomizu-dera, and explore districts like Gion and Arashiyama. Additional days allow for deeper cultural experiences and day trips to Nara.",
    category: "planning"
  },
  {
    question: "When is the best time to visit Kyoto temples?",
    answer: "Visit temples early morning (8-9 AM) to avoid crowds and enjoy peaceful atmosphere. Golden hour (late afternoon) offers beautiful lighting for photography. Avoid weekends and Japanese holidays for the most serene experience.",
    category: "timing"
  },
  {
    question: "Can I see geisha in Kyoto?",
    answer: "Gion district is the best place to spot geiko (Kyoto's term for geisha) and maiko, especially in the early evening (5-6 PM) as they head to appointments. Be respectful - don't chase, block, or take photos without permission. Consider booking a proper geisha experience.",
    category: "culture"
  },
  {
    question: "What's the difference between temples and shrines in Kyoto?",
    answer: "Temples are Buddhist (like Kinkaku-ji, Kiyomizu-dera) and shrines are Shinto (like Fushimi Inari). Temples often have statues of Buddha and offer meditation, while shrines have torii gates and are for prayers to kami (spirits). Both are important cultural sites.",
    category: "culture"
  }
];

export const foodFAQs: FAQItem[] = [
  {
    question: "What are Japan's must-try foods?",
    answer: "Essential Japanese foods include sushi and sashimi, ramen (various regional styles), tempura, yakitori, okonomiyaki, takoyaki, miso soup, and regional specialties like Kobe beef, Hiroshima-style okonomiyaki, and Kyoto kaiseki cuisine.",
    category: "cuisine"
  },
  {
    question: "How much should I budget for food in Japan?",
    answer: "Food costs vary widely: convenience store meals (¥300-800), casual restaurants (¥800-2000), mid-range dining (¥2000-5000), high-end restaurants (¥10,000+). Street food and department store food courts offer great value and authentic experiences.",
    category: "budget"
  },
  {
    question: "Is it rude to tip in Japanese restaurants?",
    answer: "Tipping is not customary in Japan and can sometimes be considered rude or confusing. Excellent service is expected as standard. Simply pay the bill amount - the price includes service. Some high-end establishments may include a service charge.",
    category: "etiquette"
  },
  {
    question: "Can vegetarians find food in Japan?",
    answer: "Vegetarian options exist but require careful navigation. Buddhist temple cuisine (shojin ryori) is fully vegetarian. Many dishes contain dashi (fish stock), so learn key phrases or carry a translation card. Tokyo and Kyoto have dedicated vegetarian restaurants.",
    category: "dietary"
  }
];

export const seasonalFAQs: FAQItem[] = [
  {
    question: "When do cherry blossoms bloom in Japan 2025?",
    answer: "Cherry blossom season typically runs late March to early May, varying by region. Tokyo and Kyoto usually bloom in late March to early April, while northern areas like Tohoku bloom in late April to early May. Check Japan Weather Association forecasts for exact dates.",
    category: "seasonal"
  },
  {
    question: "What should I pack for winter in Japan?",
    answer: "Winter essentials include warm layers, waterproof winter coat, insulated boots with good grip, warm hat and gloves, thermal underwear, and hand/foot warmers (available at convenience stores). Indoor spaces are well-heated, so layers are key.",
    category: "seasonal"
  },
  {
    question: "Is summer too hot to visit Japan?",
    answer: "Japanese summers (June-September) are hot and humid with temperatures often exceeding 30°C (86°F). However, excellent air conditioning, summer festivals, and seasonal foods make it worthwhile. Pack lightweight, breathable clothing and stay hydrated.",
    category: "seasonal"
  },
  {
    question: "When do autumn leaves change color in Japan?",
    answer: "Autumn foliage season runs from September to December, starting in northern areas and mountains. Peak times: Hokkaido (September-October), Tokyo/Kyoto (November-December), Kyushu (November-December). Mountain areas change first, followed by cities.",
    category: "seasonal"
  }
];

// Generate FAQ schema markup
export function generateFAQSchema(faqs: FAQItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Get FAQs by category
export function getFAQsByCategory(category?: string): FAQItem[] {
  const allFAQs = [
    ...generalJapanFAQs,
    ...tokyoFAQs,
    ...kyotoFAQs,
    ...foodFAQs,
    ...seasonalFAQs
  ];

  if (!category) return allFAQs;
  return allFAQs.filter(faq => faq.category === category);
}

// Get relevant FAQs for a specific page/location
export function getRelevantFAQs(pageType: 'general' | 'tokyo' | 'kyoto' | 'food' | 'seasonal'): FAQItem[] {
  switch (pageType) {
    case 'tokyo':
      return [...generalJapanFAQs.slice(0, 3), ...tokyoFAQs];
    case 'kyoto':
      return [...generalJapanFAQs.slice(0, 3), ...kyotoFAQs];
    case 'food':
      return [...generalJapanFAQs.slice(0, 2), ...foodFAQs];
    case 'seasonal':
      return [...generalJapanFAQs.slice(0, 2), ...seasonalFAQs];
    default:
      return generalJapanFAQs;
  }
}