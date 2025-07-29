"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

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
}

const navigation = [
  { name: "Tips", href: "/tips" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
];

export default function Header({ navigationData }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (dropdown: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // Small delay to prevent flickering
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Fallback data if no navigation data is provided
  const destinations = navigationData?.destinations || [];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Japan Travel Directory</span>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">日</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">
                Japan Directory
              </span>
            </div>
          </Link>
        </div>

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

        <div className="hidden lg:flex lg:gap-x-12">
          {/* Destinations Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => handleMouseEnter("destinations")}
            onMouseLeave={handleMouseLeave}
          >
            <button className="text-sm font-semibold leading-6 text-gray-900 hover:text-red-600 transition-colors flex items-center">
              Destinations
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {activeDropdown === "destinations" && destinations.length > 0 && (
              <div className="absolute top-full left-0 mt-0 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-2">
                <div className="grid grid-cols-2 gap-4 p-4">
                  {destinations.map((destination) => (
                    <div key={destination._id}>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">
                        {destination.name}
                      </h3>
                      <div className="space-y-1">
                        {destination.districts &&
                        destination.districts.length > 0 ? (
                          <>
                            {destination.districts
                              .slice(0, 5)
                              .map((district) => (
                                <Link
                                  key={district._id}
                                  href={`/destinations/${destination.slug.current}/districts/${district.slug.current}`}
                                  className="block text-sm text-gray-700 hover:text-red-600"
                                >
                                  {district.name}
                                </Link>
                              ))}
                            <Link
                              href={`/destinations/${destination.slug.current}`}
                              className="block text-sm text-gray-700 hover:text-red-600 font-medium"
                            >
                              View All {destination.name}
                            </Link>
                          </>
                        ) : (
                          <Link
                            href={`/destinations/${destination.slug.current}`}
                            className="block text-sm text-gray-700 hover:text-red-600 font-medium"
                          >
                            View {destination.name}
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Other Navigation Items */}
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-red-600 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Button variant="outline" size="sm">
            <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button variant="primary" size="sm">
            Plan Trip
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Japan Travel Directory</span>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">日</span>
                  </div>
                  <span className="ml-2 text-xl font-bold text-gray-900">
                    Japan Directory
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
                  {destinations.map((destination) => (
                    <div key={destination._id} className="space-y-1">
                      <div className="text-base font-semibold text-gray-900">
                        {destination.name}
                      </div>
                      {destination.districts &&
                      destination.districts.length > 0 ? (
                        <>
                          {destination.districts.slice(0, 5).map((district) => (
                            <Link
                              key={district._id}
                              href={`/destinations/${destination.slug.current}/districts/${district.slug.current}`}
                              className="-mx-3 block rounded-lg px-3 py-2 text-sm leading-7 text-gray-900 hover:bg-gray-50"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {district.name}
                            </Link>
                          ))}
                          <Link
                            href={`/destinations/${destination.slug.current}`}
                            className="-mx-3 block rounded-lg px-3 py-2 text-sm leading-7 text-gray-900 hover:bg-gray-50 font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            View All {destination.name}
                          </Link>
                        </>
                      ) : (
                        <Link
                          href={`/destinations/${destination.slug.current}`}
                          className="-mx-3 block rounded-lg px-3 py-2 text-sm leading-7 text-gray-900 hover:bg-gray-50 font-medium"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          View {destination.name}
                        </Link>
                      )}
                    </div>
                  ))}

                  {/* Other Mobile Navigation */}
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6 space-y-4">
                  <Button variant="outline" className="w-full">
                    <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="primary" className="w-full">
                    Plan Trip
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
