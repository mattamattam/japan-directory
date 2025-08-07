import {
  CalendarIcon,
  CheckBadgeIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { format, differenceInDays, parseISO } from "date-fns";

interface ContentMetadataProps {
  lastUpdated: string | Date;
  publishedAt?: string | Date;
  verifiedDate?: string | Date;
  sources?: string[];
  factChecked?: boolean;
  className?: string;
}

export default function ContentMetadata({
  lastUpdated,
  publishedAt,
  verifiedDate,
  sources = [],
  factChecked = false,
  className = "",
}: ContentMetadataProps) {
  const updatedDate =
    typeof lastUpdated === "string" ? parseISO(lastUpdated) : lastUpdated;
  const publishDate = publishedAt
    ? typeof publishedAt === "string"
      ? parseISO(publishedAt)
      : publishedAt
    : null;
  const verifyDate = verifiedDate
    ? typeof verifiedDate === "string"
      ? parseISO(verifiedDate)
      : verifiedDate
    : null;

  const daysSinceUpdate = differenceInDays(new Date(), updatedDate);

  // Content freshness status
  const getFreshnessStatus = () => {
    if (daysSinceUpdate <= 30)
      return {
        status: "fresh",
        color: "text-green-600 bg-green-50",
        icon: CheckBadgeIcon,
      };
    if (daysSinceUpdate <= 90)
      return {
        status: "recent",
        color: "text-yellow-600 bg-yellow-50",
        icon: ClockIcon,
      };
    return {
      status: "outdated",
      color: "text-orange-600 bg-orange-50",
      icon: ExclamationTriangleIcon,
    };
  };

  const freshness = getFreshnessStatus();
  const StatusIcon = freshness.icon;

  return (
    <div className={`text-sm text-gray-600 ${className}`}>
      <div className="flex items-center flex-wrap gap-4 mb-3">
        {/* Freshness Indicator */}
        <div
          className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${freshness.color}`}
        >
          <StatusIcon className="h-3 w-3 mr-1" />
          <span>
            {freshness.status === "fresh" && "Recently Updated"}
            {freshness.status === "recent" && "Recently Verified"}
            {freshness.status === "outdated" && "Content Aging"}
          </span>
        </div>
        {factChecked && (
          <div className="flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
            <CheckBadgeIcon className="h-3 w-3 mr-1" />
            Fact-Checked
          </div>
        )}
      </div>

      {/* Date Information */}
      <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600">
        {publishDate && (
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>Published: {format(publishDate, "MMM dd, yyyy")}</span>
          </div>
        )}
        <div className="flex items-center">
          <ClockIcon className="h-4 w-4 mr-1" />
          <span className="font-semibold text-[10px] uppercase tracking-wide text-gray-500">
            Last updated: {format(updatedDate, "MMM dd, yyyy")}
          </span>
        </div>
        {verifyDate && (
          <div className="flex items-center">
            <CheckBadgeIcon className="h-4 w-4 mr-1" />
            <span>Verified: {format(verifyDate, "MMM dd, yyyy")}</span>
          </div>
        )}
      </div>

      {/* Content Notice */}
      {daysSinceUpdate > 90 && (
        <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
          <ExclamationTriangleIcon className="h-4 w-4 inline mr-1" />
          This content may need updating. Prices, schedules, and information may
          have changed.
        </div>
      )}
    </div>
  );
}

// Simplified version for cards
export function ContentFreshnessBadge({
  lastUpdated,
  className = "",
}: {
  lastUpdated: string | Date;
  className?: string;
}) {
  const updatedDate =
    typeof lastUpdated === "string" ? parseISO(lastUpdated) : lastUpdated;
  const daysSinceUpdate = differenceInDays(new Date(), updatedDate);

  if (daysSinceUpdate <= 7) {
    return (
      <div
        className={`inline-flex items-center px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium ${className}`}
      >
        <CheckBadgeIcon className="h-3 w-3 mr-1" />
        Recently Updated
      </div>
    );
  }

  if (daysSinceUpdate <= 30) {
    return (
      <div
        className={`inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium ${className}`}
      >
        <ClockIcon className="h-3 w-3 mr-1" />
        Current
      </div>
    );
  }

  return null; // Don't show badge for older content
}

// Content Status Pills component
export function ContentStatusPills({
  lastUpdated,
  factChecked = false,
}: {
  lastUpdated: string | Date;
  factChecked?: boolean;
}) {
  const updatedDate =
    typeof lastUpdated === "string" ? parseISO(lastUpdated) : lastUpdated;
  const daysSinceUpdate = differenceInDays(new Date(), updatedDate);

  // Content freshness status
  const getFreshnessStatus = () => {
    if (daysSinceUpdate <= 30)
      return {
        status: "fresh",
        color: "text-green-600 bg-green-50",
        icon: CheckBadgeIcon,
      };
    if (daysSinceUpdate <= 90)
      return {
        status: "recent",
        color: "text-yellow-600 bg-yellow-50",
        icon: ClockIcon,
      };
    return {
      status: "outdated",
      color: "text-orange-600 bg-orange-50",
      icon: ExclamationTriangleIcon,
    };
  };

  const freshness = getFreshnessStatus();
  const StatusIcon = freshness.icon;

  return (
    <div className="flex items-center flex-wrap gap-4">
      {/* Freshness Indicator */}
      <div
        className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${freshness.color}`}
      >
        <StatusIcon className="h-3 w-3 mr-1" />
        <span>
          {freshness.status === "fresh" && "Recently Updated"}
          {freshness.status === "recent" && "Recently Verified"}
          {freshness.status === "outdated" && "Content Aging"}
        </span>
      </div>
      {factChecked && (
        <div className="flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
          <CheckBadgeIcon className="h-3 w-3 mr-1" />
          Fact-Checked
        </div>
      )}
    </div>
  );
}

// Last Updated Text component
export function LastUpdatedText({
  lastUpdated,
}: {
  lastUpdated: string | Date;
}) {
  const updatedDate =
    typeof lastUpdated === "string" ? parseISO(lastUpdated) : lastUpdated;

  return (
    <div className="flex items-center">
      <ClockIcon className="h-4 w-4 mr-1" />
      <span className="font-semibold text-[10px] uppercase tracking-wide text-gray-500">
        Last updated: {format(updatedDate, "MMM dd, yyyy")}
      </span>
    </div>
  );
}
