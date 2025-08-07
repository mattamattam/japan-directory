"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import HeaderWidgets from "./HeaderWidgets";

// Types for navigation data
interface NavigationDestination {
  _id: string;
  name: string;
  slug: { current: string };
  region: string;
  districts: NavigationDistrict[];
}

interface NavigationDistrict {
  _id: string;
  name: string;
  slug: { current: string };
  description: string;
}

interface HeaderProps {
  navigationData?: {
    destinations: NavigationDestination[];
  };
  sectionPages?: Array<{
    _id: string;
    title: string;
    slug: { current: string };
    description: string;
  }>;
}

export default function Header({ navigationData, sectionPages }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Fallback data if no navigation data is provided
  const destinations = navigationData?.destinations || [];

  // Convert section pages to navigation format
  const navigation =
    sectionPages?.map((page) => ({
      name: page.title,
      href: `/${page.slug.current}`,
    })) || [];

  // Fallback navigation if no section pages are found
  const fallbackNavigation = [
    { name: "Lodging", href: "/lodging" },
    { name: "Food", href: "/food" },
    { name: "Essentials", href: "/essentials" },
    { name: "Itineraries", href: "/itineraries" },
    { name: "Blog", href: "/blog" },
    { name: "About Us", href: "/about" },
  ];

  // Use section pages if available, otherwise use fallback
  // The Sanity query already sorts by sortOrder, so we don't need client-side sorting
  const finalNavigation =
    navigation.length > 0 ? navigation : fallbackNavigation;

  // Helper function to check if a link is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Visit Japan HQ</span>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">訪</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Visit Japan HQ
              </span>
            </div>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop Navigation - Centered */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:items-center lg:gap-x-6">
          {/* Destinations Link */}
          <Link
            href="/destinations"
            className={`text-xs font-semibold leading-6 transition-colors whitespace-nowrap ${
              isActive("/destinations")
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-900 hover:text-red-600"
            }`}
          >
            Destinations
          </Link>

          {/* Other Navigation Items */}
          {finalNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-xs font-semibold leading-6 transition-colors whitespace-nowrap ${
                isActive(item.href)
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-900 hover:text-red-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Header Widgets - Only show on homepage */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {pathname === "/" ? (
            <HeaderWidgets showExchangeRate={true} />
          ) : (
            <div className="w-48" />
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Visit Japan HQ</span>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-2">
                    <span className="text-white font-bold text-lg">訪</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">
                    Visit Japan HQ
                  </span>
                </div>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {/* Mobile Destinations */}
                  <Link
                    href="/destinations"
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                      isActive("/destinations")
                        ? "text-red-600 bg-red-50"
                        : "text-gray-900 hover:bg-gray-50"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Destinations
                  </Link>

                  {/* Other Mobile Navigation */}
                  {finalNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                        isActive(item.href)
                          ? "text-red-600 bg-red-50"
                          : "text-gray-900 hover:bg-gray-50"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
