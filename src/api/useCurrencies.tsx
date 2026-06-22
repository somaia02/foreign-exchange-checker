import { useEffect, useState } from "react";

interface Currency {
  iso_code: string;
  iso_numeric: string;
  name: string;
  symbol: string;
  start_date: string;
  end_date: string;
}

export function useCurrencies() {
  const [currencies, setCurrencies] = useState<Currency[] | null>(null);
  const [error, setError] = useState("");
  const data = {
    currencies: currencies,
    error: error,
    loading: !currencies,
  };
  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      const response = await fetch(
        "https://api.frankfurter.dev/v2/currencies",
        { signal: controller.signal },
      );
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        return;
      }
      const json = await response.json();
      setCurrencies(json);
    }
    fetchData();

    return () => {
      controller.abort();
    };
  }, []);
  return data;
}
