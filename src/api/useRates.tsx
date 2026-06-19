import { useEffect, useState } from "react";
import { getErrorMessage } from '../utils';

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
  const data = {data: [rates, prevRates], error: "", loading: !Boolean(rates && prevRates)};
  const url = `https://api.frankfurter.dev/v2/rates?base=${BASE}`;
  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      const response = await fetch(url, {signal: controller.signal});
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const json = await response.json();
      setRates(json);
      const date = getPrevDate(json[0].date);
      const prevDataResponse = await fetch(`${url}&date=${date}`, {signal: controller.signal});
      if (!prevDataResponse.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const prevDataJson = await prevDataResponse.json();
      setPrevRates(prevDataJson);

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

function getPrevDate(currDate: string) {
  const latestDate = new Date(currDate);
  const prevDate = new Date(latestDate);
  prevDate.setDate(prevDate.getDate() - 1);
  return prevDate.toISOString().split("T")[0];
}