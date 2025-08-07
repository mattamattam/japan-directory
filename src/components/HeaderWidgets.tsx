"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  CloudIcon,
  SunIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

// Constants for exchange rate widget
const EXCHANGE_CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
];

const EXCHANGE_DISPLAY_DURATION = 6500; // 6.5 seconds per currency

// Compact Exchange Rate Widget
function CompactExchangeRate({ sharedTick }: { sharedTick: number }) {
  const [currentCurrencyIndex, setCurrentCurrencyIndex] = useState(0);
  const [rate, setRate] = useState<number | null>(null);
  const [trend, setTrend] = useState<"up" | "down" | "stable" | null>(null);
  const [currency, setCurrency] = useState<string>("USD");
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [exchangeRateData, setExchangeRateData] = useState<{
    [key: string]: any;
  }>({});
  const exchangeRateDataRef = useRef(exchangeRateData);
  const currentCurrencyIndexRef = useRef(currentCurrencyIndex);
  const isClient = useIsClient();

  // Keep refs in sync with state
  useEffect(() => {
    exchangeRateDataRef.current = exchangeRateData;
    currentCurrencyIndexRef.current = currentCurrencyIndex;
  }, [exchangeRateData, currentCurrencyIndex]);

  // Use shared tick for coordinated rotation
  useEffect(() => {
    if (!isClient) return;

    // Start fade out
    setIsTransitioning(true);

    // After fade out completes, change currency and fade in
    setTimeout(() => {
      const nextIndex =
        (currentCurrencyIndexRef.current + 1) % EXCHANGE_CURRENCIES.length;
      setCurrentCurrencyIndex(nextIndex);

      // Quick fade in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, FADE_DURATION);
  }, [sharedTick, isClient]); // Rotate on shared tick

  useEffect(() => {
    if (!isClient) return;

    const currentCurrency = EXCHANGE_CURRENCIES[currentCurrencyIndex];
    const currencyCode = currentCurrency.code;

    // Check if we already have data for this currency
    if (exchangeRateDataRef.current[currencyCode]) {
      const cachedData = exchangeRateDataRef.current[currencyCode];
      setRate(cachedData.rate);
      setTrend(cachedData.trend);
      setCurrency(cachedData.currency);
      setLoading(false);
      return;
    }

    // Fetch new data only if we don't have it cached
    async function fetchRate() {
      setLoading(true);
      try {
        // Fetch from our proxy API
        const response = await fetch(
          `/api/exchange-rate?currency=${currencyCode}`
        );
        if (!response.ok) throw new Error("Exchange rate API failed");

        const data = await response.json();
        if (data.rate) {
          // Cache the data
          const newData = {
            ...exchangeRateDataRef.current,
            [currencyCode]: {
              rate: data.rate,
              trend: data.trend,
              currency: data.currency,
            },
          };
          setExchangeRateData(newData);
          exchangeRateDataRef.current = newData;

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
  }, [currentCurrencyIndex, isClient]); // Only fetch when currency changes or component mounts

  if (!isClient || loading || !rate) {
    return (
      <div className="flex items-center space-x-2 text-xs">
        <div className="flex items-center space-x-1 opacity-0">
          <span className="text-gray-600 font-medium">USD/JPY:</span>
          <span className="font-semibold text-gray-900">¥0.00</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 text-xs">
      <div
        className={`flex items-center space-x-1 transition-opacity duration-300 ease-in-out ${
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
        {trend === "down" && <ArrowDownIcon className="h-3 w-3 text-red-600" />}
      </div>
    </div>
  );
}

// Constants moved outside component to prevent re-creation
const WEATHER_CITIES = [
  { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
  { name: "Osaka", lat: 34.6937, lon: 135.5023 },
  { name: "Kyoto", lat: 35.0116, lon: 135.7681 },
  { name: "Yokohama", lat: 35.4437, lon: 139.638 },
  { name: "Nagoya", lat: 35.1815, lon: 136.9066 },
  { name: "Sapporo", lat: 43.0618, lon: 141.3545 },
  { name: "Fukuoka", lat: 33.5902, lon: 130.4017 },
  { name: "Kobe", lat: 34.6901, lon: 135.1955 },
];

const DISPLAY_DURATION = 6500; // 6.5 seconds per city
const FADE_DURATION = 300; // 300ms fade transition

// Helper functions moved outside components
const getWeatherIcon = (weatherCode: number) => {
  // Thunderstorm
  if (weatherCode >= 200 && weatherCode < 300) return BoltIcon;

  // Drizzle
  if (weatherCode >= 300 && weatherCode < 400) return "rain";

  // Rain
  if (weatherCode >= 500 && weatherCode < 600) return "rain";

  // Snow
  if (weatherCode >= 600 && weatherCode < 700) return "snow";

  // Atmosphere (fog, mist, etc.)
  if (weatherCode >= 700 && weatherCode < 800) return CloudIcon;

  // Clear
  if (weatherCode === 800) return SunIcon;

  // Clouds
  if (weatherCode >= 801 && weatherCode <= 899) return CloudIcon;

  return CloudIcon;
};

const fahrenheitToCelsius = (fahrenheit: number) =>
  Math.round(((fahrenheit - 32) * 5) / 9);

// Custom hook to handle client-side mounting
const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

// Weather Widget with Fade Transitions
function WeatherWidget({ sharedTick }: { sharedTick: number }) {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [weatherData, setWeatherData] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isClient = useIsClient();

  // Use shared tick for coordinated rotation
  useEffect(() => {
    if (!isClient) return;

    // Start fade out
    setIsTransitioning(true);

    // After fade out completes, change city and fade in
    setTimeout(() => {
      setCurrentCityIndex((prev) => (prev + 1) % WEATHER_CITIES.length);
      // Quick fade in
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, FADE_DURATION);
  }, [sharedTick, isClient]); // Rotate on shared tick

  useEffect(() => {
    if (!isClient) return;

    async function fetchAllWeather() {
      try {
        setLoading(true);

        // Fetch all weather data from our proxy API
        const response = await fetch("/api/weather");

        if (!response.ok) throw new Error("Weather API failed");

        const data = await response.json();

        if (data.cities) {
          // Convert array to object for easier lookup
          const weatherObject = data.cities.reduce((acc: any, item: any) => {
            if (item.weather && item.weather.current) {
              // Transform the data structure to match what our component expects
              acc[item.city] = {
                main: {
                  temp: item.weather.current.temp,
                  feels_like: item.weather.current.feels_like,
                  humidity: item.weather.current.humidity,
                },
                weather: item.weather.current.weather || [
                  { id: 800, description: "clear" },
                ],
              };
            }
            return acc;
          }, {});

          setWeatherData(weatherObject);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllWeather();
  }, [isClient]); // Only fetch on mount, not on every rotation

  const currentCity = WEATHER_CITIES[currentCityIndex];
  const weather = weatherData[currentCity.name];

  if (!isClient || loading || !weather) {
    return (
      <div className="flex items-center space-x-2 text-xs">
        <div className="flex items-center space-x-2 opacity-0">
          <span className="text-gray-600">Tokyo:</span>
          <SunIcon className="h-4 w-4 text-gray-600" />
          <span className="font-semibold text-gray-900">0°F / 0°C</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 text-xs">
      <div
        className={`flex items-center space-x-2 transition-opacity duration-300 ease-in-out ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="text-gray-600">{currentCity.name}:</span>
        {getWeatherIcon(weather.weather[0]?.id || 800) === "rain" ? (
          <div className="relative h-4 w-4">
            <CloudIcon className="h-4 w-4 text-gray-600" />
            <div className="absolute -bottom-1 left-0 right-0">
              <div className="flex justify-between px-1">
                <div className="flex flex-col space-y-0.5 transform -rotate-12">
                  <div className="h-0.5 w-0.5 bg-blue-400 rounded-full"></div>
                  <div className="h-0.5 w-0.5 bg-blue-400 rounded-full"></div>
                  <div className="h-0.5 w-0.5 bg-blue-400 rounded-full"></div>
                </div>
                <div className="flex flex-col space-y-0.5 transform -rotate-12">
                  <div className="h-0.5 w-0.5 bg-blue-400 rounded-full"></div>
                  <div className="h-0.5 w-0.5 bg-blue-400 rounded-full"></div>
                  <div className="h-0.5 w-0.5 bg-blue-400 rounded-full"></div>
                </div>
                <div className="flex flex-col space-y-0.5 transform -rotate-12">
                  <div className="h-0.5 w-0.5 bg-blue-400 rounded-full"></div>
                  <div className="h-0.5 w-0.5 bg-blue-400 rounded-full"></div>
                  <div className="h-0.5 w-0.5 bg-blue-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        ) : getWeatherIcon(weather.weather[0]?.id || 800) === "snow" ? (
          <div className="relative h-4 w-4">
            <CloudIcon className="h-4 w-4 text-gray-600" />
            <div className="absolute -bottom-1 left-0 right-0">
              <div className="flex justify-between px-1">
                <div className="flex flex-col space-y-0.5">
                  <div className="h-0.5 w-0.5 bg-gray-300 rounded-full"></div>
                  <div className="h-0.5 w-0.5 bg-gray-300 rounded-full"></div>
                  <div className="h-0.5 w-0.5 bg-gray-300 rounded-full"></div>
                </div>
                <div className="flex flex-col space-y-0.5">
                  <div className="h-0.5 w-0.5 bg-gray-300 rounded-full"></div>
                  <div className="h-0.5 w-0.5 bg-gray-300 rounded-full"></div>
                  <div className="h-0.5 w-0.5 bg-gray-300 rounded-full"></div>
                </div>
                <div className="flex flex-col space-y-0.5">
                  <div className="h-0.5 w-0.5 bg-gray-300 rounded-full"></div>
                  <div className="h-0.5 w-0.5 bg-gray-300 rounded-full"></div>
                  <div className="h-0.5 w-0.5 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          React.createElement(getWeatherIcon(weather.weather[0]?.id || 800), {
            className: "h-4 w-4 text-gray-600",
          })
        )}
        <span className="font-semibold text-gray-900">
          {Math.round(weather.main?.temp || 0)}°F /{" "}
          {fahrenheitToCelsius(Math.round(weather.main?.temp || 0))}°C
        </span>
      </div>
    </div>
  );
}

// Shared timer for coordinating widget refreshes
function useSharedTimer() {
  const [currentTick, setCurrentTick] = useState(0);
  const isClient = useIsClient();

  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      setCurrentTick((prev) => prev + 1);
    }, 6500); // 6.5 seconds

    return () => clearInterval(interval);
  }, [isClient]);

  return currentTick;
}

// Main Header Widgets Component
export default function HeaderWidgets({
  showExchangeRate = true,
}: {
  showExchangeRate?: boolean;
}) {
  const isClient = useIsClient();
  const sharedTick = useSharedTimer();

  // Return a placeholder during SSR to maintain layout
  if (!isClient) {
    return (
      <div className="hidden lg:flex flex-col items-end space-y-1">
        {showExchangeRate && (
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-gray-400">USD/JPY: --</span>
          </div>
        )}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-gray-400">Weather: --°F / --°C</span>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden lg:flex flex-col items-end space-y-1">
      {showExchangeRate && <CompactExchangeRate sharedTick={sharedTick} />}
      <WeatherWidget sharedTick={sharedTick} />
    </div>
  );
}
