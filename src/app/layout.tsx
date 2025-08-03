import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
  const shouldShowAds =
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_PUBLIC_SHOW_ADS !== "false";

  return (
    <html lang="en">
      <head>
        {/* Google AdSense */}
        {shouldShowAds && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
