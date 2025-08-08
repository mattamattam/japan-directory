"use client";

import { useEffect, useRef, useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/solid";

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

      console.log(`🗺️ GoogleMap: Fetching location for "${placeName}"`);

      try {
        const response = await fetch(
          `/api/places?query=${encodeURIComponent(placeName)}`,
          {
            headers: {
              "Cache-Control": "max-age=3600",
            },
          }
        );

        console.log(`🗺️ GoogleMap: API response status:`, response.status);

        if (response.ok && isMounted) {
          const data = await response.json();
          console.log(`🗺️ GoogleMap: API response data:`, data);

          // Check for different possible location structures in the API response
          let locationData = null;

          if (data.geometry?.location) {
            // Standard Google Places API structure
            locationData = data.geometry.location;
          } else if (data.location) {
            // Alternative structure
            locationData = data.location;
          } else if (data.lat && data.lng) {
            // Direct lat/lng in response
            locationData = { lat: data.lat, lng: data.lng };
          } else if (data.latitude && data.longitude) {
            // Alternative coordinate field names
            locationData = { lat: data.latitude, lng: data.longitude };
          } else if (data.name) {
            // Fallback: Use Google Maps Geocoding for known places
            // For places like "Nara Park", we can try to geocode them
            console.log(
              `🗺️ GoogleMap: No coordinates found, trying geocoding for: ${data.name}`
            );

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
                (results, status) => {
                  if (status === "OK" && results && results[0] && isMounted) {
                    const geoLocation = results[0].geometry.location;
                    console.log(`🗺️ GoogleMap: Geocoded location:`, {
                      lat: geoLocation.lat(),
                      lng: geoLocation.lng(),
                    });
                    setLocation({
                      lat: geoLocation.lat(),
                      lng: geoLocation.lng(),
                      formatted_address: data.formatted_address,
                    });
                  } else {
                    console.log(`🗺️ GoogleMap: Geocoding failed:`, status);
                  }
                }
              );
            };

            tryGeocoding();
            return; // Exit early for geocoding attempt
          }

          if (data && !data.error && locationData && isMounted) {
            console.log(`🗺️ GoogleMap: Location found:`, locationData);
            console.log(`🗺️ GoogleMap: Setting location to:`, {
              lat: locationData.lat || locationData.latitude,
              lng: locationData.lng || locationData.longitude,
              formatted_address: data.formatted_address,
            });
            setLocation({
              lat: locationData.lat || locationData.latitude,
              lng: locationData.lng || locationData.longitude,
              formatted_address: data.formatted_address,
            });
          } else if (isMounted) {
            console.log(`🗺️ GoogleMap: No valid location data found`);
            console.log(`🗺️ GoogleMap: Full API response:`, data);
            setError("Location not found");
          }
        } else if (isMounted) {
          console.log(
            `🗺️ GoogleMap: Failed to fetch location - response not ok`
          );
          setError("Failed to fetch location");
        }
      } catch (error) {
        if (isMounted) {
          console.warn(
            `🗺️ GoogleMap: Failed to fetch location for ${placeName}:`,
            error
          );
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
  }, [placeName]);

  // Initialize Google Map
  useEffect(() => {
    if (!location || !mapRef.current) return;

    console.log(`🗺️ GoogleMap: Initializing map for location:`, location);

    // Wait for Google Maps API to load
    const initializeMap = () => {
      if (!window.google?.maps) {
        console.log(
          `🗺️ GoogleMap: Google Maps API not loaded yet, retrying...`
        );
        // If Google Maps is not loaded yet, wait and try again
        setTimeout(initializeMap, 100);
        return;
      }

      console.log(`🗺️ GoogleMap: Google Maps API loaded, creating map...`);

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

        console.log(`🗺️ GoogleMap: Map created successfully`);

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

          console.log(`🗺️ GoogleMap: Marker added successfully`);
        } else {
          console.log(`🗺️ GoogleMap: City view - no marker added`);
        }

        mapInstanceRef.current = map;
      } catch (error) {
        console.error("🗺️ GoogleMap: Error initializing Google Maps:", error);
        setError("Failed to initialize map");
      }
    };

    initializeMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    };
  }, [location, placeName]);

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
