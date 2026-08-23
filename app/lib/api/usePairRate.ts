import { useEffect, useState } from "react";
import { getError } from "../utils";
import { useCurrencies } from "../CurrencyContext";

interface dataItem {
  date: string;
  base: string;
  quote: string;
  rate: number;
}
interface usePairParams {
  base?: string;
  quote?: string;
  date?: string;
  from?: string;
}

export function usePairRate({ base, quote, date, from }: usePairParams) {
  const [rates, setRates] = useState<dataItem[] | null>(null);
  const [error, setError] = useState("");
  const data = { rates: rates, error: error, loading: !rates };
  const currenciesInfo = useCurrencies();
  const queryBase = base ?? String(currenciesInfo.sendCurrency);
  const queryQuote = quote ?? String(currenciesInfo.receiveCurrency);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        const dateQuery = date ? `?date=${date}` : "";
        const url = from
          ? `https://api.frankfurter.dev/v2/rates/?base=${queryBase}&quotes=${queryQuote}&from=${from}`
          : `https://api.frankfurter.dev/v2/rate/${queryBase}/${queryQuote}${dateQuery}`;
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        const json = [await response.json()].flat();
        setRates(json);
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
  }, [queryBase, queryQuote, date, from, data.error]);
  return data;
}
