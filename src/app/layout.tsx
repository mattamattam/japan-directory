import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Optimize font loading
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://visitjapanhq.com"),
  title: {
    default:
      "Visit Japan HQ - Ultimate Japan Travel Guide 2025 | Hotels, Tours & Culture",
    template: "%s | Visit Japan HQ",
  },
  description:
    "Plan your perfect Japan trip with our expert travel guides. Discover Tokyo, Kyoto, Osaka attractions, authentic experiences, best hotels & restaurants. Updated 2025.",
  keywords: [
    "Japan travel guide 2025",
    "best time to visit Japan",
    "Tokyo attractions",
    "Kyoto temples",
    "Japan itinerary",
    "JR Pass guide",
    "Japanese culture experiences",
    "Japan hotels booking",
    "cherry blossom season",
    "Japan food tours",
    "traditional Japanese experiences",
    "Tokyo food guide",
    "Osaka travel tips",
  ].join(", "),
  authors: [{ name: "Visit Japan HQ" }],
  creator: "Visit Japan HQ",
  publisher: "Visit Japan HQ",
  category: "Travel",
  classification: "Travel Guide",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://visitjapanhq.com",
    languages: {
      en: "https://visitjapanhq.com",
      "en-US": "https://visitjapanhq.com",
      "en-GB": "https://visitjapanhq.com",
      "en-AU": "https://visitjapanhq.com",
      "en-CA": "https://visitjapanhq.com",
      "x-default": "https://visitjapanhq.com",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://visitjapanhq.com",
    siteName: "Visit Japan HQ",
    title: "Visit Japan HQ - Ultimate Japan Travel Guide 2025",
    description:
      "Plan your perfect Japan trip with our expert travel guides. Discover Tokyo, Kyoto, Osaka attractions, authentic experiences, best hotels & restaurants.",
    images: [
      {
        url: "/images/og-japan-travel-guide.jpg",
        width: 1200,
        height: 630,
        alt: "Visit Japan HQ - Your Ultimate Japan Travel Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visit Japan HQ - Ultimate Japan Travel Guide 2025",
    description:
      "Plan your perfect Japan trip with our expert travel guides. Discover attractions, experiences, hotels & restaurants.",
    images: ["/images/twitter-japan-travel.jpg"],
    creator: "@visitjapanhq",
    site: "@visitjapanhq",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if ads should be shown
  const shouldShowAds = process.env.NODE_ENV === "production";

  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />

        {/* Google AdSense - Meta tag */}
        {shouldShowAds && (
          <meta
            name="google-adsense-account"
            content="ca-pub-9762028848349439"
          />
        )}
      </head>
      <body className={inter.className}>
        {children}

        {/* Load scripts after page content */}

        {/* Google Maps API */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="lazyOnload"
        />

        {shouldShowAds && (
          <Script
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9762028848349439"
            strategy="lazyOnload"
            crossOrigin="anonymous"
          />
        )}

        {process.env.NODE_ENV === "production" && (
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-GL294NMWVF"
            strategy="lazyOnload"
          />
        )}

        {process.env.NODE_ENV === "production" && (
          <Script id="ga-init" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GL294NMWVF', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
