import { useEffect, useState } from "react";
import { getErrorMessage } from '../utils';

interface Currency {
  iso_code: string,
  iso_numeric: string,
  name: string,
  symbol: string,
  start_date: string,
  end_date: string
}

export function useCurrencies() {
  const [currencies, setCurrencies] = useState<Currency[] | null>(null);
  const data = {data: currencies, error: "", loading: !Boolean(currencies)};
  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      const response = await fetch(
        "https://api.frankfurter.dev/v2/currencies",
        {signal: controller.signal}
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const json = await response.json();
      setCurrencies(json);
    }
    try {
      fetchData();
    } catch(error) {
      data.error = getErrorMessage(error) ;
    }
    return (() => {
      controller.abort();
    });
  }, []);
  return data;
}