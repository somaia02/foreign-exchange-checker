const BASE = "EGP";
export interface dataItem {
  iso_code: string;
  iso_numeric: string;
  name: string;
  symbol: string;
  start_date: string;
  end_date: string;
}
export async function fetchCurrencies() {
  const currencies = await fetchData(
    "https://api.frankfurter.dev/v2/currencies",
  );
  const currenciesInfo = currencies.reduce(
    (acc: Record<string, dataItem>, currency: dataItem) => {
      acc[currency.iso_code.toLowerCase()] = currency;
      return acc;
    },
    {},
  );
  return currenciesInfo;
}
export async function fetchAllRates() {
  const url = `https://api.frankfurter.dev/v2/rates?base=${BASE}`;
  const rates = await fetchData(url);
  const date = getPrevDate(rates[0].date);
  const prevRates = await fetchData(`${url}&date=${date}`);
  return [rates, prevRates];
}

async function fetchData(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  const json = await response.json();
  return json;
}
function getPrevDate(currDate: string) {
  const latestDate = new Date(currDate);
  const prevDate = new Date(latestDate);
  prevDate.setDate(prevDate.getDate() - 1);
  return prevDate.toISOString().split("T")[0];
}
