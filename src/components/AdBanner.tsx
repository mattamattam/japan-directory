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
  // Check if ads should be shown
  const shouldShowAds =
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_PUBLIC_SHOW_ADS !== "false";

  // Don't render anything if ads are disabled
  if (!shouldShowAds) {
    return null;
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
