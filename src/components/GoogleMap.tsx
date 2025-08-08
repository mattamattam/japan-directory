"use client";

import { useEffect, useRef, useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { apiClient } from "@/lib/api-client";

interface GoogleMapProps {
  placeName: string;
  className?: string;
  viewType?: "place" | "city"; // 'place' for specific locations, 'city' for city-wide view
}

interface PlaceLocation {
  lat: number;
  lng: number;
  formatted_address?: string;
}

export default function GoogleMap({
  placeName,
  className = "",
  viewType = "place",
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [location, setLocation] = useState<PlaceLocation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch location data from Places API
  useEffect(() => {
    let isMounted = true;

    async function fetchLocationData() {
      if (!placeName) return;

      try {
        const data = await apiClient.searchPlace(placeName);

        if (data && isMounted) {

          // Check for different possible location structures in the API response
          let locationData = null;

          if (data.location) {
            // External API structure with location.latitude/longitude
            locationData = { lat: data.location.latitude, lng: data.location.longitude };
          } else if (data.name) {
            // Fallback: Use Google Maps Geocoding for known places
            // For places like "Nara Park", we can try to geocode them

            // Try geocoding the place name (wait for Google Maps API to load)
            const tryGeocoding = () => {
              if (!window.google?.maps?.Geocoder) {
                setTimeout(tryGeocoding, 100);
                return;
              }

              const geocoder = new window.google.maps.Geocoder();
              geocoder.geocode(
                {
                  address: `${data.name}, ${data.formatted_address || "Japan"}`,
                },
                (results: any, status: string) => {
                  if (status === "OK" && results && results[0] && isMounted) {
                    const geoLocation = results[0].geometry.location;

                    setLocation({
                      lat: geoLocation.lat(),
                      lng: geoLocation.lng(),
                      formatted_address: data.formatted_address,
                    });
                  } else {
                  }
                }
              );
            };

            tryGeocoding();
            return; // Exit early for geocoding attempt
          }

          if (locationData && isMounted) {
            setLocation({
              lat: locationData.lat,
              lng: locationData.lng,
              formatted_address: data.formatted_address,
            });
          } else if (isMounted) {
            setError("Location not found");
          }
        }
      } catch (error) {
        if (isMounted) {
          setError("Failed to load map");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchLocationData();

    return () => {
      isMounted = false;
    };
  }, [placeName, viewType]);

  // Initialize Google Map
  useEffect(() => {
    if (!location || !mapRef.current) return;

    // Wait for Google Maps API to load
    const initializeMap = () => {
      if (!window.google?.maps) {
        // If Google Maps is not loaded yet, wait and try again
        setTimeout(initializeMap, 100);
        return;
      }

      try {
        // Set zoom level based on view type
        const zoomLevel = viewType === "city" ? 11 : 15; // City view: 11, Place view: 15

        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: location.lat, lng: location.lng },
          zoom: zoomLevel,
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: true,
          scaleControl: false,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        });

        // Add marker (only for place view, not city view)
        if (viewType === "place") {
          new window.google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: placeName,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#ef4444",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            },
          });
        } else {
        }

        mapInstanceRef.current = map;
      } catch (error) {
        setError("Failed to initialize map");
      }
    };

    initializeMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    };
  }, [location, placeName, viewType]);

  // Don't render if no location or error
  if (isLoading) {
    return (
      <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MapPinIcon className="h-5 w-5 mr-2 text-red-600" />
          Location
        </h3>
        <div className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  if (error || !location) {
    return null; // Don't show the component if there's an error or no location
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <MapPinIcon className="h-5 w-5 mr-2 text-red-600" />
        Location
      </h3>

      {/* Map Container */}
      <div className="relative">
        <div
          ref={mapRef}
          className="w-full h-48 rounded-lg overflow-hidden bg-gray-200"
        />
      </div>

      {/* Address */}
      {location.formatted_address && (
        <div className="mt-3 text-sm text-gray-600">
          <p>{location.formatted_address}</p>
        </div>
      )}

      {/* Google Attribution */}
      <div className="mt-2 text-xs text-gray-400">Powered by Google Maps</div>
    </div>
  );
}
