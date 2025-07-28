"use client";

import React, { useEffect, useState } from "react";

export default function ExchangeRate() {
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    async function fetchRate() {
      setLoading(true);
      setError(null);
      try {
        // Check localStorage for cached rate
        const cached = localStorage.getItem("usd_jpy_rate");
        const cachedExpiry = localStorage.getItem("usd_jpy_rate_expiry");
        const now = new Date();
        // Calculate next midnight JST (UTC+9)
        const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
        const nextMidnightJST = new Date(jstNow);
        nextMidnightJST.setHours(24, 0, 0, 0);
        const expiryUTC = new Date(
          nextMidnightJST.getTime() - 9 * 60 * 60 * 1000
        ); // convert back to UTC

        if (cached && cachedExpiry && new Date(cachedExpiry) > now) {
          setRate(Number(cached));
          setLoading(false);
          return;
        }
        // Use Frankfurter API (no key required)
        const res = await fetch(
          "https://api.frankfurter.app/latest?from=USD&to=JPY"
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (!data.rates || typeof data.rates.JPY !== "number") {
          throw new Error("JPY rate not found");
        }
        setRate(data.rates.JPY);
        localStorage.setItem("usd_jpy_rate", String(data.rates.JPY));
        localStorage.setItem("usd_jpy_rate_expiry", expiryUTC.toISOString());
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
        return null;
      } finally {
        setLoading(false);
      }
    }
    fetchRate();
  }, [mounted]);

  return !mounted ? null : (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center max-w-xs mx-auto mt-8">
      <span className="text-gray-700 font-semibold mb-2">
        USD/JPY Exchange Rate
      </span>
      {loading ? (
        <span className="text-gray-400">Loading...</span>
      ) : error ? (
        <span className="text-red-500">{error}</span>
      ) : (
        <span className="text-2xl font-bold text-gray-900">
          1 USD ={" "}
          {rate?.toLocaleString(undefined, { maximumFractionDigits: 2 })} JPY
        </span>
      )}
    </div>
  );
}
