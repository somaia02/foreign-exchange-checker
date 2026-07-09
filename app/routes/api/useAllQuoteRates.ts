import { useEffect, useState } from "react";
import { getError } from "../utils";

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
    async function fetchData() {
      try {
        const url = `https://api.frankfurter.dev/v2/rates/?base=${base}`;
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        const json = await response.json();
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
          console.log("Fetch successfully aborted, ignoring error.");
          return;
        }
        setError(getError(e, "message"));
      }
    }
    if (data.error == "") fetchData();

    return () => {
      controller.abort();
    };
  }, [base]);
  return data;
}
