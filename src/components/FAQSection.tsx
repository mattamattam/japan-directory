"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  faqs: FAQ[];
  structured?: boolean; // Whether to include structured data
}

export default function FAQSection({ 
  title = "Frequently Asked Questions", 
  faqs, 
  structured = true 
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Generate FAQ structured data
  const faqStructuredData = structured ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
      {/* Structured Data */}
      {faqStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData, null, 2)
          }}
        />
      )}
      
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {title}
      </h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              className="w-full px-6 py-4 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  {faq.question}
                </h3>
                <ChevronDownIcon 
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </button>
            
            {openIndex === index && (
              <div className="px-6 pb-4">
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// Common FAQ sets for reuse
export const JAPAN_TRAVEL_FAQS: FAQ[] = [
  {
    question: "Do I need a visa to visit Japan?",
    answer: "Many countries have visa-free agreements with Japan for tourist stays up to 90 days. Check with the Japanese embassy in your country or use the official visa checker on the Ministry of Foreign Affairs website to confirm your specific requirements."
  },
  {
    question: "What's the best time to visit Japan?",
    answer: "Japan is beautiful year-round, but spring (March-May) for cherry blossoms and fall (September-November) for autumn colors are most popular. Summer can be hot and humid, while winter offers skiing and fewer crowds."
  },
  {
    question: "Is it expensive to travel in Japan?",
    answer: "Japan can be expensive, but budget-friendly options exist. Budget travelers can expect $50-80/day, mid-range $100-150/day, and luxury $200+/day. Use convenience stores for cheap meals and consider a JR Pass for long-distance travel."
  },
  {
    question: "Do I need to speak Japanese to travel in Japan?",
    answer: "While knowing some Japanese phrases helps, many signs in major cities are in English, and translation apps work well. Major tourist areas have English-speaking staff, and Japanese people are generally very helpful to tourists."
  },
  {
    question: "Is Japan safe for tourists?",
    answer: "Japan is one of the safest countries in the world. Crime rates are very low, and it's safe to walk alone at night even in major cities. Natural disasters like earthquakes can occur, but Japan has excellent disaster preparedness systems."
  }
];

export const TOKYO_FAQS: FAQ[] = [
  {
    question: "How many days should I spend in Tokyo?",
    answer: "A minimum of 4-5 days is recommended to see Tokyo's major attractions. For a more comprehensive experience including day trips, plan for 7-10 days."
  },
  {
    question: "What are the must-visit districts in Tokyo?",
    answer: "Essential districts include Shibuya and Shinjuku for city energy, Asakusa for traditional culture, Ginza for luxury shopping, and Harajuku for youth culture and fashion."
  },
  {
    question: "How do I get around Tokyo?",
    answer: "Tokyo has an excellent public transportation system. Get a prepaid IC card (Suica or Pasmo) for easy travel on trains, subways, and buses. The JR Yamanote Line connects most major districts."
  },
  {
    question: "Where should I stay in Tokyo?",
    answer: "Shinjuku and Shibuya offer convenience and nightlife. Asakusa provides traditional atmosphere. Ginza is central but expensive. Consider proximity to train lines when choosing accommodation."
  }
];

export const KYOTO_FAQS: FAQ[] = [
  {
    question: "How many temples should I visit in Kyoto?",
    answer: "Focus on 3-5 major temples rather than rushing through many. Must-sees include Kiyomizu-dera, Fushimi Inari, and Kinkaku-ji (Golden Pavilion). Each offers unique experiences and requires 1-2 hours."
  },
  {
    question: "Can I see geishas in Kyoto?",
    answer: "You might spot geiko (Kyoto's term for geisha) in the Gion district, especially in the evening. Please be respectful and avoid blocking their path for photos. Consider a cultural show or tea ceremony for a proper geisha experience."
  },
  {
    question: "Is Kyoto crowded?",
    answer: "Popular temples and districts can be very crowded, especially during cherry blossom season and fall foliage. Visit early morning or late afternoon, and consider less popular but equally beautiful temples."
  },
  {
    question: "How do I get around Kyoto?",
    answer: "Kyoto has an efficient bus system covering most attractions. A day bus pass offers good value. Trains connect major areas, and the city is also bike-friendly with rental shops throughout."
  }
];