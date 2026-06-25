import { useEffect, useState } from "react";
import { getErrorMessage } from "../utils";

export function usePairRate(base: string, quote: string) {
  const [rate, setRate] = useState<number | null>(null);
  const [error, setError] = useState("");
  const data = { rate: rate, error: error, loading: !rate };
  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        const url = `https://api.frankfurter.dev/v2/rate/${base}/${quote}`;
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        const json = await response.json();
        setRate(json.rate);
      } catch (e) {
        setError(getErrorMessage(e));
      }
    }
    fetchData();

    return () => {
      controller.abort();
    };
  }, [base, quote]);
  return data;
}
