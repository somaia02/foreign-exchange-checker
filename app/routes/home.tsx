import { data } from "react-router";
import type { Route } from "./+types/home.ts";

import { saved } from "./cookies.ts";
import logo from "../assets/images/logo.svg";
import LiveMarket from "./LiveMarket.tsx";
import Converter from "./Converter.tsx";
import { fetchCurrencies, fetchAllRates } from "./api/api.ts";
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

export default function App() {
  return (
    <>
      <Header />
      <LiveMarket />
      <Content />
    </>
  );
}

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="FX_Checker logo" />
      <p className="header__info">55 CURRENCIES · EOD · ECB DATA</p>
    </header>
  );
}

function Content() {
  return (
    <div className="content">
      <Converter />
    </div>
  );
}
