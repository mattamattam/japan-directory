import { useState, useEffect } from "react";
import { apiClient, PlaceSearchResult } from "@/lib/api-client";

export function usePlace(query: string | null) {
  const [place, setPlace] = useState<PlaceSearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setPlace(null);
      return;
    }

    let cancelled = false;

    const searchPlace = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiClient.searchPlace(query);
        if (!cancelled) {
          setPlace(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to search place"
          );
          setPlace(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    searchPlace();

    return () => {
      cancelled = true;
    };
  }, [query]);

  return { place, loading, error };
}
