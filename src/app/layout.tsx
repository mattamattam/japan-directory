import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap", // Optimize font loading
  preload: true
});

export const metadata: Metadata = {
  metadataBase: new URL('https://visitjapanhq.com'),
  title: "Japan Travel Guide - Your Complete Guide to Japan",
  description:
    "Discover the best of Japan with our comprehensive travel guide. From Tokyo to Kyoto, get insider tips, cultural insights, and practical advice for your Japan adventure.",
  keywords:
    "Japan travel, Tokyo guide, Kyoto travel, Japan tourism, Japanese culture, travel tips",
  alternates: {
    languages: {
      'en': 'https://visitjapanhq.com',
      'en-US': 'https://visitjapanhq.com',
      'en-GB': 'https://visitjapanhq.com',
      'en-AU': 'https://visitjapanhq.com',
      'en-CA': 'https://visitjapanhq.com',
      'x-default': 'https://visitjapanhq.com',
    },
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
