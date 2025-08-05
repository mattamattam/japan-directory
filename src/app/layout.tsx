import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Japan Travel Guide - Your Complete Guide to Japan",
  description:
    "Discover the best of Japan with our comprehensive travel guide. From Tokyo to Kyoto, get insider tips, cultural insights, and practical advice for your Japan adventure.",
  keywords:
    "Japan travel, Tokyo guide, Kyoto travel, Japan tourism, Japanese culture, travel tips",
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
        {/* Google AdSense */}
        {shouldShowAds && (
          <>
            <meta
              name="google-adsense-account"
              content="ca-pub-9762028848349439"
            ></meta>
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9762028848349439"
              crossOrigin="anonymous"
            />
          </>
        )}

        {process.env.NODE_ENV === "production" && (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=G-GL294NMWVF`}
            strategy="afterInteractive"
          />
        )}
        {process.env.NODE_ENV === "production" && (
          <Script id="ga-init" strategy="afterInteractive">
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
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
