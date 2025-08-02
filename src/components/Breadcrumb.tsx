import Link from "next/link";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/solid";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="bg-white border-b border-gray-200 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 text-xs">
          <Link
            href="/"
            className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
          >
            <HomeIcon className="h-3 w-3 mr-1" />
            <span className="font-medium">Home</span>
          </Link>

          {items.map((item, index) => (
            <div key={index} className="flex items-center">
              <ChevronRightIcon className="h-3 w-3 text-gray-400 mx-1" />
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-gray-700 transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium">{item.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
