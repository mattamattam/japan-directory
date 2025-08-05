import React from "react";
import AdBanner from "./AdBanner";

interface SidebarAdProps {
  adSlot: string;
  className?: string;
}

const SidebarAd: React.FC<SidebarAdProps> = ({ adSlot, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 ${className}`}>
      <div className="text-center text-sm text-gray-500 mb-2">
        📢 Sidebar Advertisement
      </div>
      <AdBanner
        adSlot={adSlot}
        adFormat="rectangle"
        className="min-h-[250px]"
      />
    </div>
  );
};

export default SidebarAd;
