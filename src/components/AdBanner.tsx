import React from "react";

interface AdBannerProps {
  adSlot: string;
  adFormat?:
    | "auto"
    | "fluid"
    | "rectangle"
    | "banner"
    | "leaderboard"
    | "skyscraper";
  className?: string;
  style?: React.CSSProperties;
}

const AdBanner: React.FC<AdBannerProps> = ({
  adSlot,
  adFormat = "auto",
  className = "",
  style = {},
}) => {
  // Check if ads should be shown based on environment
  const shouldShowAds = process.env.NODE_ENV === "production";

  // Show placeholder in development
  if (process.env.NODE_ENV !== "production") {
    return (
      <div
        className={`bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed border-blue-300 rounded-lg p-4 text-center ${className}`}
        style={style}
      >
        <div className="text-sm font-medium text-blue-700 mb-1">
          📢 Ad Space
        </div>
        <div className="text-xs text-blue-600 mb-1">Slot: {adSlot}</div>
        <div className="text-xs text-blue-600 mb-2">Format: {adFormat}</div>
        <div className="text-xs text-blue-500">
          (Would show real ad in production)
        </div>
      </div>
    );
  }

  return (
    <div className={`ad-banner ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9762028848349439"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>
  );
};

export default AdBanner;
