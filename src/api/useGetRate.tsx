import { useEffect, useState } from "react";

export function useGetRate(base: string, quote: string) {
  const [rate, setRate] = useState<number | null>(null);
  const [error, setError] = useState("");
  const data = {rate: rate, error: error, loading: !Boolean(rate)};
  const url = `https://api.frankfurter.dev/v2/rate/${base}/${quote}`;
  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      const response = await fetch(url, {signal: controller.signal});
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        return;
      }
      const json = await response.json();
      setRate(json.rate);
    }
    fetchData();
    
    return (() => {
      controller.abort();
    });
  }, [base, quote]);
  return data;
}
