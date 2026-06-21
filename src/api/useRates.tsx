import { useEffect, useState } from "react";

interface DataItem {
    date: string,
    base: string,
    quote: string,
    rate: number
}

const BASE = "EGP";

export function useRates() {
  const [rates, setRates] = useState<DataItem[] | null>(null);
  const [prevRates, setPrevRates] = useState<DataItem[] | null>(null);
  const [error, setError] = useState("");
  const data = {data: [rates, prevRates], error: error, loading: !Boolean(rates && prevRates)};
  const url = `https://api.frankfurter.dev/v2/rates?base=${BASE}`;
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
      setRates(json);
      const date = getPrevDate(json[0].date);
      const prevDataResponse = await fetch(`${url}&date=${date}`, {signal: controller.signal});
      if (!prevDataResponse.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        return;
      }
      const prevDataJson = await prevDataResponse.json();
      setPrevRates(prevDataJson);

    }
    fetchData();
    
    return (() => {
      controller.abort();
    });
  }, []);
  return data;
}

function getPrevDate(currDate: string) {
  const latestDate = new Date(currDate);
  const prevDate = new Date(latestDate);
  prevDate.setDate(prevDate.getDate() - 1);
  return prevDate.toISOString().split("T")[0];
}