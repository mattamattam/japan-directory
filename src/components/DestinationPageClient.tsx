"use client";

import { useState, useRef, useEffect } from "react";
import {
  MapPinIcon,
  CalendarIcon,
  CurrencyYenIcon,
  ClockIcon,
  CloudIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import type { Destination } from "@/types";
import Link from "next/link";
import PortableText from "./PortableText";
import Breadcrumb from "./Breadcrumb";
import AdBanner from "./AdBanner";
import SidebarAd from "./SidebarAd";
import NewsletterSignup from "./NewsletterSignup";

// Add Google Maps types
declare global {
  interface Window {
    google: {
      maps: {
        // eslint-disable-next-line
        Map: any;
        // eslint-disable-next-line
        LatLng: any;
        // eslint-disable-next-line
        LatLngBounds: any;
        // eslint-disable-next-line
        MapTypeId: any;
        // eslint-disable-next-line
        Marker: any;
        // eslint-disable-next-line
        Polygon: any;
        // eslint-disable-next-line
        Geocoder: any;
        // eslint-disable-next-line
        SymbolPath: any;
        places: {
          // eslint-disable-next-line
          Autocomplete: any;
          // eslint-disable-next-line
          PlacesService: any;
        };
      };
    };
  }
}

interface DestinationPageClientProps {
  destination: Destination;
  districts: Array<{
    name: string;
    description: string;
    image: string;
    rating: number;
    reviewCount: number;
    highlights: string[];
    href: string;
  }>;
  params: { slug: string };
  showNewsletterSignup?: boolean;
}

export default function DestinationPageClient({
  destination,
  districts,
  params,
  showNewsletterSignup = false,
}: DestinationPageClientProps) {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line
  const mapInstanceRef = useRef<any>(null);

  // Extract the slug from the params - simplified
  const citySlug = params?.slug || "";

  // Function to get coordinates for districts
  const getDistrictCoordinates = (districtName: string) => {
    const coordinates: Record<string, { lat: number; lng: number }> = {
      Shibuya: { lat: 35.658, lng: 139.7016 },
      Shinjuku: { lat: 35.6895, lng: 139.6917 },
      Harajuku: { lat: 35.67, lng: 139.7 },
      Akihabara: { lat: 35.6985, lng: 139.773 },
      Asakusa: { lat: 35.7148, lng: 139.7967 },
      Dotonbori: { lat: 34.6686, lng: 135.5023 },
      Namba: { lat: 34.6633, lng: 135.5023 },
      Umeda: { lat: 34.702, lng: 135.495 },
      Gion: { lat: 35.005, lng: 135.775 },
      Arashiyama: { lat: 35.0094, lng: 135.677 },
      Higashiyama: { lat: 35.005, lng: 135.775 },
      Miyajima: { lat: 34.299, lng: 132.322 },
      "Peace Memorial Park": { lat: 34.3955, lng: 132.4534 },
    };

    return coordinates[districtName] || { lat: 35.6762, lng: 139.6503 }; // Default to Tokyo
  };

  const openMapModal = (districtName: string) => {
    setSelectedDistrict(districtName);
    setIsMapModalOpen(true);
  };

  const closeMapModal = () => {
    setIsMapModalOpen(false);
    setSelectedDistrict(null);
  };

  // Initialize map when modal opens
  useEffect(() => {
    if (isMapModalOpen && selectedDistrict && mapRef.current) {
      // Check if Google Maps API is loaded
      if (!window.google || !window.google.maps) {
        console.error("Google Maps API not loaded");
        return;
      }

      // Check if API key is configured
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      if (!apiKey || apiKey === "undefined") {
        console.error("Google Maps API key not configured");
        return;
      }

      try {
        const coords = getDistrictCoordinates(selectedDistrict);

        // Initialize Google Maps to match the exact Google Maps view
        const map = new window.google.maps.Map(mapRef.current, {
          center: coords,
          zoom: 15,
          mapTypeId: window.google.maps.MapTypeId.HYBRID, // Hybrid view (satellite + roads)
          tilt: 0, // No tilt for the standard view
          heading: 0,
          // Remove all controls for clean map view
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: false,
          scaleControl: false,
          // No custom styles to use Google&apos;s default styling
        });

        // Add marker for the district with standard Google Maps marker
        new window.google.maps.Marker({
          position: coords,
          map: map,
          title: selectedDistrict,
          // Use default Google Maps marker
        });

        mapInstanceRef.current = map;
      } catch (error) {
        console.error("Error initializing Google Maps:", error);
      }
    }

    // Cleanup map when modal closes
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    };
  }, [isMapModalOpen, selectedDistrict]);

  return (
    <>
      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            {
              label: "Destinations",
              href: "/destinations",
            },
            {
              label: destination.name,
            },
          ]}
        />

        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {destination.name}
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                {destination.description}
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center">
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  <span>Japan</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  <span>Best Time: {destination.bestTime || "Year-round"}</span>
                </div>
                <div className="flex items-center">
                  <CurrencyYenIcon className="h-5 w-5 mr-2" />
                  <span>Budget: Varies</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Google AdSense Banner */}
        <section className="bg-gray-50 py-4">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AdBanner adSlot="destination-page-banner" adFormat="banner" />
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* About Section */}
              <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  About {destination.name}
                </h2>
                <div className="prose prose-lg text-gray-600">
                  {destination.longDescription ? (
                    <PortableText content={destination.longDescription} />
                  ) : (
                    <>
                      <p className="mb-4">{destination.description}</p>
                      <p className="mb-4">
                        {destination.name} is one of Japan&apos;s most
                        captivating destinations, offering a perfect blend of
                        traditional culture and modern innovation. From ancient
                        temples and shrines to cutting-edge technology and
                        vibrant city life, there&apos;s something for every
                        traveler to discover.
                      </p>
                      <p>
                        Whether you&apos;re interested in exploring historic
                        districts, sampling world-class cuisine, or experiencing
                        the unique Japanese way of life, {destination.name}{" "}
                        promises an unforgettable journey through the heart of
                        Japan.
                      </p>
                    </>
                  )}
                </div>
              </section>

              {/* Districts/Sub-Areas Section */}
              <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Explore {destination.name}&apos;s Districts
                  </h2>
                  <span className="text-gray-500 text-sm">
                    {districts.length} districts to discover
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {districts.map((district) => (
                    <Link
                      key={district.name}
                      href={district.href}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-200 overflow-hidden block"
                    >
                      {/* District Image */}
                      <div className="relative h-48 bg-gray-200">
                        {district.image ? (
                          <Image
                            src={district.image}
                            alt={district.name}
                            width={400}
                            height={300}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                            <MapPinIcon className="h-12 w-12 text-white opacity-50" />
                          </div>
                        )}
                      </div>

                      {/* District Content */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {district.name}
                          </h3>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {district.description}
                        </p>

                        {/* District Highlights */}
                        {district.highlights &&
                          district.highlights.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {district.highlights
                                .slice(0, 2)
                                .map((highlight: string, index: number) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                                  >
                                    {highlight}
                                  </span>
                                ))}
                            </div>
                          )}

                        {/* District Info */}
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>Subway accessible</span>
                          <span className="text-red-600 hover:text-red-700 font-medium">
                            Explore district →
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Info
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
                    <span>
                      Best Time: {destination.bestTime || "Year-round"}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CurrencyYenIcon className="h-4 w-4 mr-2 text-gray-400" />
                    <span>Budget: Varies</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CloudIcon className="h-4 w-4 mr-2 text-gray-400" />
                    <span>Weather: Seasonal</span>
                  </div>
                </div>
              </div>

              {/* Highlights Section */}
              {destination.highlights && destination.highlights.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Highlights
                  </h3>
                  <div className="space-y-2">
                    {destination.highlights.map(
                      (highlight: string, index: number) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                          <span className="text-gray-700 text-sm">
                            {highlight}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Popular Activities */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Popular Activities
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Visit historic temples and shrines</li>
                  <li>• Explore local markets and shopping districts</li>
                  <li>• Sample authentic Japanese cuisine</li>
                  <li>• Experience traditional culture and customs</li>
                  <li>• Take scenic walks and photography</li>
                </ul>
              </div>

              {/* Travel Tips */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Travel Tips
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Learn basic Japanese phrases</li>
                  <li>• Respect local customs and traditions</li>
                  <li>• Use public transportation for convenience</li>
                  <li>• Book accommodations in advance</li>
                  <li>• Carry cash for smaller establishments</li>
                </ul>
              </div>

              {/* Sidebar Ad */}
              <SidebarAd adSlot="destination-sidebar-ad" />

              {/* Newsletter Signup (randomly shown) */}
              {showNewsletterSignup && (
                <div className="mt-6">
                  <NewsletterSignup />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Map Modal */}
      {isMapModalOpen && selectedDistrict && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeMapModal}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedDistrict} - {destination.name}
              </h3>
              <button
                onClick={closeMapModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="relative w-full h-[70vh]">
              <div
                ref={mapRef}
                className="w-full h-full"
                style={{ minHeight: "400px" }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
