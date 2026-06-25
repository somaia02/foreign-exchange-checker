const BASE = "EGP";

export async function fetchCurrencies() {
  const currencies = await fetchData(
    "https://api.frankfurter.dev/v2/currencies",
  );
  return currencies;
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
