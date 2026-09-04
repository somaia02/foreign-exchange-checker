import { useEffect, useState } from "react";
import { getError, fetchData } from "../utils";

interface dataItem {
  date: string;
  base: string;
  quote: string;
  rate: number;
}
export function useAllQuoteRates(base: string) {
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [error, setError] = useState("");
  const data = { rates: rates, error: error, loading: !rates };

  useEffect(() => {
    const controller = new AbortController();
    async function fetchRates() {
      try {
        const url = `https://api.frankfurter.dev/v2/rates/?base=${base}`;
        const json = await fetchData(url, controller.signal);
        const newRates = json.reduce(
          (acc: Record<string, number>, currency: dataItem) => {
            acc[currency.quote.toLowerCase()] = currency.rate;
            return acc;
          },
          {},
        );
        setRates(newRates);
      } catch (e) {
        if (getError(e, "name") === "AbortError") {
          return;
        }
        setError(getError(e, "message"));
      }
    }
    fetchRates();

    return () => {
      controller.abort();
    };
  }, [base]);
  return data;
}
