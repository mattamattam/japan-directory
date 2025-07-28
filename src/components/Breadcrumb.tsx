import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-1 text-xs text-gray-500">
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && (
            <ChevronRightIcon className="h-3 w-3 mx-1 text-gray-400" />
          )}
          <Link
            href={item.href}
            className="hover:text-red-600 transition-colors"
          >
            {item.name}
          </Link>
        </div>
      ))}
    </nav>
  );
}
