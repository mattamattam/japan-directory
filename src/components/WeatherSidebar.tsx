"use client";

import React, { useEffect, useState } from "react";
import { CloudIcon, SunIcon, BoltIcon } from "@heroicons/react/24/outline";

interface WeatherSidebarProps {
  destinationName?: string;
  className?: string;
}

export default function WeatherSidebar({
  destinationName,
  className = "",
}: WeatherSidebarProps) {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    async function fetchWeather() {
      try {
        setLoading(true);
        // Use destination name in query parameter
        let url = "/api/weather";
        if (destinationName) {
          url += `?location=${encodeURIComponent(destinationName)}`;
        }
        
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
          },
        });
        if (!response.ok) throw new Error("Weather API failed");
        const data = await response.json();

        if (data.cities) {
          // Find weather for the destination or default to Tokyo
          const targetCity = destinationName || "Tokyo";
          const cityMatch = data.cities.find(
            (city: any) =>
              city.city.toLowerCase() === targetCity.toLowerCase()
          ) || data.cities.find((city: any) => city.city === "Tokyo");

          if (cityMatch && cityMatch.weather) {
            
            // Handle different weather data structures
            let weatherData;
            
            if (cityMatch.weather.current) {
              // Format: { weather: { current: { temp, feels_like, humidity, weather } } }
              weatherData = {
                city: cityMatch.city,
                main: {
                  temp: cityMatch.weather.current.temp,
                  feels_like: cityMatch.weather.current.feels_like,
                  humidity: cityMatch.weather.current.humidity,
                },
                weather: cityMatch.weather.current.weather || [
                  { id: 800, description: "clear" },
                ],
              };
            } else if (cityMatch.weather.main && cityMatch.weather.weather) {
              // Standard OpenWeatherMap format: { weather: { main: {temp, ...}, weather: [...] } }
              weatherData = {
                city: cityMatch.city,
                main: cityMatch.weather.main,
                weather: cityMatch.weather.weather,
              };
            } else {
              // Fallback: assume it's direct OpenWeatherMap format
              weatherData = {
                city: cityMatch.city,
                main: cityMatch.weather,
                weather: cityMatch.weather?.weather || [
                  { id: 800, description: "clear" },
                ],
              };
            }

            setWeatherData(weatherData);
          }
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [mounted, destinationName]);

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

  if (!mounted) {
    return (
      <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Current Weather
        </h3>
        <div className="text-center text-gray-400">Loading...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Current Weather
        </h3>
        <div className="text-center text-gray-400">Loading weather...</div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Current Weather
        </h3>
        <div className="text-center text-gray-400">Weather unavailable</div>
      </div>
    );
  }

  const weatherIcon = getWeatherIcon(weatherData.weather?.[0]?.id || 800);
  const tempF = Math.round(weatherData.main?.temp || 0);
  const tempC = fahrenheitToCelsius(tempF);

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Current Weather
      </h3>
      <div className="text-center">
        <div className="flex justify-center mb-3">
          {weatherIcon === "rain" ? (
            <div className="relative h-12 w-12">
              <CloudIcon className="h-12 w-12 text-blue-500" />
              <div className="absolute -bottom-2 left-0 right-0">
                <div className="flex justify-between px-2">
                  <div className="flex flex-col space-y-1 transform -rotate-12">
                    <div className="h-1 w-1 bg-blue-400 rounded-full"></div>
                    <div className="h-1 w-1 bg-blue-400 rounded-full"></div>
                    <div className="h-1 w-1 bg-blue-400 rounded-full"></div>
                  </div>
                  <div className="flex flex-col space-y-1 transform -rotate-12">
                    <div className="h-1 w-1 bg-blue-400 rounded-full"></div>
                    <div className="h-1 w-1 bg-blue-400 rounded-full"></div>
                    <div className="h-1 w-1 bg-blue-400 rounded-full"></div>
                  </div>
                  <div className="flex flex-col space-y-1 transform -rotate-12">
                    <div className="h-1 w-1 bg-blue-400 rounded-full"></div>
                    <div className="h-1 w-1 bg-blue-400 rounded-full"></div>
                    <div className="h-1 w-1 bg-blue-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : weatherIcon === "snow" ? (
            <div className="relative h-12 w-12">
              <CloudIcon className="h-12 w-12 text-blue-500" />
              <div className="absolute -bottom-2 left-0 right-0">
                <div className="flex justify-between px-2">
                  <div className="flex flex-col space-y-1">
                    <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                    <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                    <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                    <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                    <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                    <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                    <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            React.createElement(weatherIcon, {
              className: "h-12 w-12 text-blue-500",
            })
          )}
        </div>
        <div className="mb-2">
          <div className="text-sm text-gray-600 font-medium">
            {weatherData.city || destinationName || "Japan"}
          </div>
        </div>
        <div className="mb-2">
          <div className="text-2xl font-bold text-gray-900">{tempF}°F</div>
          <div className="text-lg text-gray-600">({tempC}°C)</div>
        </div>
        <div className="text-sm text-gray-600 capitalize">
          {weatherData.weather?.[0]?.description || "Clear"}
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
            <div>
              <div className="font-medium">Feels like</div>
              <div>{Math.round(weatherData.main?.feels_like || 0)}°F</div>
            </div>
            <div>
              <div className="font-medium">Humidity</div>
              <div>{weatherData.main?.humidity || 0}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
