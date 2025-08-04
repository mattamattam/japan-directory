"use client";

import React, { useEffect, useState } from "react";
import {
  CloudIcon,
  SunIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";

// Compact Exchange Rate Widget
function CompactExchangeRate() {
  const [currentCurrencyIndex, setCurrentCurrencyIndex] = useState(0);
  const [rate, setRate] = useState<number | null>(null);
  const [trend, setTrend] = useState<"up" | "down" | "stable" | null>(null);
  const [currency, setCurrency] = useState<string>("USD");
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [rotationCount, setRotationCount] = useState(0);
  const [shouldStop, setShouldStop] = useState(false);

  // Currencies to rotate through (JPY to other currencies)
  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
  ];

  // Configurable display duration (6.5 seconds default)
  const DISPLAY_DURATION = 6500; // 6.5 seconds per currency
  const FADE_DURATION = 1600; // 1600ms fade transition

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Stop rotation if we've reached 10 rotations
    if (shouldStop) {
      // Force to USD (index 0) and stop rotating
      setCurrentCurrencyIndex(0);
      return;
    }

    // Rotate through currencies with smooth fade transitions
    const interval = setInterval(() => {
      // Start fade out
      setIsTransitioning(true);

      // After fade out completes, change currency and fade in
      setTimeout(() => {
        const nextIndex = (currentCurrencyIndex + 1) % currencies.length;
        setCurrentCurrencyIndex(nextIndex);

        // Increment rotation count
        setRotationCount((prev) => {
          const newCount = prev + 1;
          // Stop after 10 rotations and stay on USD (index 0)
          if (newCount >= 10) {
            setShouldStop(true);
            return 10;
          }
          return newCount;
        });

        // Longer delay before starting fade in to ensure smooth transition
        setTimeout(() => {
          setIsTransitioning(false);
        }, 200);
      }, FADE_DURATION);
    }, DISPLAY_DURATION);

    return () => clearInterval(interval);
  }, [mounted, currencies.length, currentCurrencyIndex, shouldStop]);

  useEffect(() => {
    if (!mounted) return;

    async function fetchRate() {
      setLoading(true);
      try {
        const currentCurrency = currencies[currentCurrencyIndex];
        // Fetch from our proxy API
        const response = await fetch(
          `/api/exchange-rate?currency=${currentCurrency.code}`
        );
        if (!response.ok) throw new Error("Exchange rate API failed");

        const data = await response.json();
        if (data.rate) {
          setRate(data.rate);
          setTrend(data.trend);
          setCurrency(data.currency);
        }
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRate();
  }, [mounted, currentCurrencyIndex]);

  if (!mounted) return null;

  return (
    <div className="flex items-center space-x-2 text-xs">
      {loading ? (
        <span className="text-gray-400">...</span>
      ) : (
        <div
          className={`flex items-center space-x-1 transition-opacity duration-1600 ease-in-out ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="text-gray-600 font-medium">{currency}/JPY:</span>
          <span className="font-semibold text-gray-900">
            ¥
            {rate?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
          {trend === "up" && <ArrowUpIcon className="h-3 w-3 text-green-600" />}
          {trend === "down" && (
            <ArrowDownIcon className="h-3 w-3 text-red-600" />
          )}
        </div>
      )}
    </div>
  );
}

// Weather Widget with Fade Transitions
function WeatherWidget() {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [weatherData, setWeatherData] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Major Japanese cities with their coordinates
  const cities = [
    { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
    { name: "Osaka", lat: 34.6937, lon: 135.5023 },
    { name: "Kyoto", lat: 35.0116, lon: 135.7681 },
    { name: "Yokohama", lat: 35.4437, lon: 139.638 },
    { name: "Nagoya", lat: 35.1815, lon: 136.9066 },
    { name: "Sapporo", lat: 43.0618, lon: 141.3545 },
    { name: "Fukuoka", lat: 33.5902, lon: 130.4017 },
    { name: "Kobe", lat: 34.6901, lon: 135.1955 },
  ];

  // Configurable display duration (6.5 seconds default)
  const DISPLAY_DURATION = 6500; // 6.5 seconds per city
  const FADE_DURATION = 1600; // 1600ms fade transition

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Rotate through cities with smooth fade transitions
    const interval = setInterval(() => {
      // Start fade out
      setIsTransitioning(true);

      // After fade out completes, change city and fade in
      setTimeout(() => {
        setCurrentCityIndex((prev) => (prev + 1) % cities.length);
        // Longer delay before starting fade in to ensure smooth transition
        setTimeout(() => {
          setIsTransitioning(false);
        }, 200);
      }, FADE_DURATION);
    }, DISPLAY_DURATION);

    return () => clearInterval(interval);
  }, [mounted, cities.length]);

  useEffect(() => {
    if (!mounted) return;

    async function fetchAllWeather() {
      try {
        setLoading(true);
        console.log("Fetching weather data..."); // Debug

        // Fetch all weather data from our proxy API
        const response = await fetch("/api/weather");
        console.log("Weather response status:", response.status); // Debug

        if (!response.ok) throw new Error("Weather API failed");

        const data = await response.json();
        console.log("Weather data received:", data); // Debug

        if (data.cities) {
          // Convert array to object for easier lookup
          const weatherObject = data.cities.reduce((acc: any, item: any) => {
            if (item.weather) {
              acc[item.city] = item.weather;
            }
            return acc;
          }, {});

          console.log("Weather object created:", weatherObject); // Debug
          console.log("Sample weather data for Tokyo:", weatherObject.Tokyo); // Debug
          setWeatherData(weatherObject);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllWeather();
  }, [mounted]);

  if (!mounted) return null;

  const currentCity = cities[currentCityIndex];
  const weather = weatherData[currentCity.name];
  console.log("Current city:", currentCity.name); // Debug
  console.log("Weather for current city:", weather); // Debug

  const getWeatherIcon = (weatherCode: number) => {
    if (weatherCode >= 200 && weatherCode < 600) return CloudIcon; // Rain/storm
    if (weatherCode >= 600 && weatherCode < 700) return CloudIcon; // Snow (using cloud for now)
    if (weatherCode >= 700 && weatherCode < 800) return CloudIcon; // Atmosphere
    if (weatherCode === 800) return SunIcon; // Clear
    return CloudIcon;
  };

  return (
    <div className="flex items-center space-x-2 text-xs">
      {loading ? (
        <span className="text-gray-400">Weather loading...</span>
      ) : weather ? (
        <div
          className={`flex items-center space-x-2 transition-opacity duration-1600 ease-in-out ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="text-gray-600">{currentCity.name}:</span>
          {React.createElement(getWeatherIcon(weather.weather[0]?.id || 800), {
            className: "h-4 w-4 text-gray-600",
          })}
          <span className="font-semibold text-gray-900">
            {Math.round(weather.main?.temp || 0)}°F
          </span>
        </div>
      ) : (
        <div
          className={`flex items-center space-x-2 transition-opacity duration-1600 ease-in-out ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="text-gray-600">{currentCity.name}:</span>
          <span className="text-gray-400">--°F</span>
        </div>
      )}
    </div>
  );
}

// Main Header Widgets Component
export default function HeaderWidgets() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return a placeholder during SSR to maintain layout
  if (!mounted) {
    return (
      <div className="hidden lg:flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-gray-400">USD/JPY: --</span>
        </div>
        <div className="w-px h-4 bg-gray-300"></div>
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-gray-400">Weather: --</span>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden lg:flex items-center space-x-4">
      <CompactExchangeRate />
      {/* <div className="w-px h-4 bg-gray-300"></div>
      <WeatherWidget /> */}
    </div>
  );
}
