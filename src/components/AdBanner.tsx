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
  // Only render ads in production
  if (process.env.NODE_ENV !== "production") {
    return (
      <div
        className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-500 ${className}`}
        style={style}
      >
        <div className="text-sm font-medium">Ad Space</div>
        <div className="text-xs">Slot: {adSlot}</div>
        <div className="text-xs">Format: {adFormat}</div>
      </div>
    );
  }

  return (
    <div className={`ad-banner ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>
  );
};

export default AdBanner;
