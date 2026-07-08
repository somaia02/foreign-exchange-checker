import { useEffect, useState, useContext } from "react";
import { getError } from "../utils";
import { CurrencyContext } from "../CurrencyContext";

interface dataItem {
  date: string;
  base: string;
  quote: string;
  rate: number;
}
interface usePairParams {
  date?: string;
  from?: string;
}

export function usePairRate({ date, from }: usePairParams) {
  const [rates, setRates] = useState<dataItem[] | null>(null);
  const [error, setError] = useState("");
  const data = { rates: rates, error: error, loading: !rates };
  const currenciesInfo = useContext(CurrencyContext);
  let base = "";
  let quote = "";
  if (!currenciesInfo) {
    setError("Null context");
  } else {
    base = String(currenciesInfo.sendCurrency);
    quote = String(currenciesInfo.receiveCurrency);
  }

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        const dateQuery = date ? `?date=${date}` : "";
        const url = from
          ? `https://api.frankfurter.dev/v2/rates/?base=${base}&quotes=${quote}&from=${from}`
          : `https://api.frankfurter.dev/v2/rate/${base}/${quote}${dateQuery}`;
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
  }, [base, quote, date]);
  return data;
}
