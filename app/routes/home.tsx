import { data } from "react-router";
import { useState } from "react";
import type { Route } from "./+types/home.ts";
import { type Key } from "react-aria-components";

import { saved } from "./cookies.ts";
import logo from "../assets/images/logo.svg";
import LiveMarket from "./LiveMarket.tsx";
import Converter from "./Converter.tsx";
import Details from "./Details.tsx";
import { fetchCurrencies, fetchAllRates } from "./api/api.ts";
import { CurrencyContext } from "./CurrencyContext.ts";
import "./home.css";

export async function loader({ request }: Route.LoaderArgs) {
  const currencies = await fetchCurrencies();
  const [latestRates, prevRates] = await fetchAllRates();
  const cookieHeader = request.headers.get("Cookie");
  const savedCookie = (await saved.parse(cookieHeader)) || {};
  const favoritePairs = savedCookie.favoritePairs || [];
  const conversionLogs = savedCookie.conversionLogs || [];
  return data({
    currencies,
    latestRates,
    prevRates,
    favoritePairs,
    conversionLogs,
  });
}

export async function action({ request }: Route.ActionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await saved.parse(cookieHeader)) || {};
  const reqData = await request.json();
  const favoritePairs = reqData.favoritePairs || cookie.favoritePairs;
  const conversionLogs = reqData.conversionLogs || cookie.conversionLogs;
  cookie.favoritePairs = favoritePairs;
  cookie.conversionLogs = conversionLogs;

  return data(
    { favoritePairs, conversionLogs },
    {
      headers: {
        "Set-Cookie": await saved.serialize(cookie),
      },
    },
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  const [sendCurrency, setSendCurrency] = useState<Key | null>("usd");
  const [receiveCurrency, setReceiveCurrency] = useState<Key | null>("eur");
  const [sendValue, setSendValue] = useState<string>("");
  const currencies = {
    sendCurrency,
    setSendCurrency,
    receiveCurrency,
    setReceiveCurrency,
    sendValue,
    setSendValue,
  };
  return (
    <CurrencyContext value={currencies}>
      <Header count={Object.values(loaderData.currencies).length} />
      <LiveMarket />
      <Content />
    </CurrencyContext>
  );
}

function Header({ count }: { count: number }) {
  return (
    <header className="header">
      <img src={logo} alt="FX_Checker logo" />
      <p className="header__info">{count} CURRENCIES · EOD · ECB DATA</p>
    </header>
  );
}

function Content() {
  return (
    <div className="content">
      <Converter />
      <Details />
    </div>
  );
}
