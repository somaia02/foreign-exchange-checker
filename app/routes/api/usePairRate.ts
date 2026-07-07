import { useEffect, useState } from "react";
import { getError } from "../utils";

interface dataItem {
  date: string;
  base: string;
  quote: string;
  rate: number;
}
interface usePairParams {
  base: string;
  quote: string;
  date?: string;
  from?: string;
}

export function usePairRate({ base, quote, date, from }: usePairParams) {
  const [rates, setRates] = useState<number[] | null>(null);
  const [error, setError] = useState("");
  const data = { rates: rates, error: error, loading: !rates };
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
        const json = await response.json();
        console.log(json, url);
        if (from) {
          setRates(json.map((d: dataItem) => d.rate));
        } else {
          setRates([json.rate]);
        }
      } catch (e) {
        if (getError(e, "name") === "AbortError") {
          console.log("Fetch successfully aborted, ignoring error.");
          return;
        }
        setError(getError(e, "message"));
      }
    }
    fetchData();

    return () => {
      controller.abort();
    };
  }, [base, quote, date]);
  return data;
}
