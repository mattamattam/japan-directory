"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Destinations", href: "/destinations" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
];

const destinationDropdownItems = {
  tokyo: [
    { name: "Shibuya", href: "/destinations/tokyo/districts/shibuya" },
    { name: "Shinjuku", href: "/destinations/tokyo/districts/shinjuku" },
    { name: "Harajuku", href: "/destinations/tokyo/districts/harajuku" },
    { name: "Akihabara", href: "/destinations/tokyo/districts/akihabara" },
    { name: "Asakusa", href: "/destinations/tokyo/districts/asakusa" },
    { name: "View All Tokyo", href: "/destinations/tokyo" },
  ],
  kyoto: [
    { name: "Gion", href: "/destinations/kyoto/districts/gion" },
    { name: "Arashiyama", href: "/destinations/kyoto/districts/arashiyama" },
    { name: "Higashiyama", href: "/destinations/kyoto/districts/higashiyama" },
    { name: "View All Kyoto", href: "/destinations/kyoto" },
  ],
  osaka: [
    { name: "Dotonbori", href: "/destinations/osaka/districts/dotonbori" },
    { name: "Namba", href: "/destinations/osaka/districts/namba" },
    {
      name: "Shinsaibashi",
      href: "/destinations/osaka/districts/shinsaibashi",
    },
    { name: "View All Osaka", href: "/destinations/osaka" },
  ],
  hiroshima: [
    { name: "Miyajima", href: "/destinations/hiroshima/districts/miyajima" },
    { name: "View All Hiroshima", href: "/destinations/hiroshima" },
  ],
};

export default function Header() {
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
            {activeDropdown === "destinations" && (
              <div className="absolute top-full left-0 mt-0 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-2">
                <div className="grid grid-cols-2 gap-4 p-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                      Tokyo
                    </h3>
                    <div className="space-y-1">
                      {destinationDropdownItems.tokyo.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block text-sm text-gray-700 hover:text-red-600"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                      Kyoto
                    </h3>
                    <div className="space-y-1">
                      {destinationDropdownItems.kyoto.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block text-sm text-gray-700 hover:text-red-600"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                      Osaka
                    </h3>
                    <div className="space-y-1">
                      {destinationDropdownItems.osaka.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block text-sm text-gray-700 hover:text-red-600"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                      Hiroshima
                    </h3>
                    <div className="space-y-1">
                      {destinationDropdownItems.hiroshima.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block text-sm text-gray-700 hover:text-red-600"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Other Navigation Items */}
          {navigation.slice(1).map((item) => (
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
                  <div className="space-y-1">
                    <div className="text-base font-semibold text-gray-900">
                      Tokyo
                    </div>
                    {destinationDropdownItems.tokyo.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-sm leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <div className="text-base font-semibold text-gray-900">
                      Kyoto
                    </div>
                    {destinationDropdownItems.kyoto.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-sm leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <div className="text-base font-semibold text-gray-900">
                      Osaka
                    </div>
                    {destinationDropdownItems.osaka.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-sm leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <div className="text-base font-semibold text-gray-900">
                      Hiroshima
                    </div>
                    {destinationDropdownItems.hiroshima.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-sm leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  {/* Other Mobile Navigation */}
                  {navigation.slice(1).map((item) => (
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
