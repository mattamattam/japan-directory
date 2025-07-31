import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Visit Japan - Your Complete Guide to Japan Travel",
  description:
    "Your ultimate guide to visiting Japan. Find the best destinations, experiences, lodging, food, and travel tips for Tokyo, Kyoto, Osaka, and beyond. Plan your perfect Japan trip with our comprehensive guide.",
  keywords:
    "visit Japan, Japan travel, Japan tourism, Tokyo travel, Kyoto travel, Osaka travel, Japan destinations, Japan experiences, Japan lodging, Japan food, Japan vacation, Japan guide",
  authors: [{ name: "Visit Japan" }],
  creator: "Visit Japan",
  publisher: "Visit Japan",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://japan-directory.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Visit Japan - Your Complete Guide to Japan Travel",
    description:
      "Your ultimate guide to visiting Japan. Find the best destinations, experiences, lodging, food, and travel tips for Tokyo, Kyoto, Osaka, and beyond.",
    url: "https://japan-directory.com",
    siteName: "Visit Japan",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Visit Japan",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visit Japan - Your Complete Guide to Japan Travel",
    description:
      "Your ultimate guide to visiting Japan. Find the best destinations, experiences, lodging, food, and travel tips.",
    images: ["/og-image.jpg"],
  },
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.svg" />

        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
          crossOrigin="anonymous"
        ></script>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'GA_MEASUREMENT_ID');
                    `}
        </Script>

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "Japan Travel Directory",
              description: "Your ultimate guide to Japan tourism",
              url: "https://japan-directory.com",
              logo: "https://japan-directory.com/logo.png",
              address: {
                "@type": "PostalAddress",
                addressCountry: "US",
              },
              sameAs: [
                "https://facebook.com/japantraveldirectory",
                "https://twitter.com/japantraveldir",
                "https://instagram.com/japantraveldirectory",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
