import { useLoaderData } from "react-router";

import logo from "../../assets/images/logo.svg";
import LiveMarket from "../liveMarket/LiveMarket.tsx";
import Converter from "../converter/Converter.tsx";
import Details from "../details/Details.tsx";
import "./Homepage.css";

export default function Homepage() {
  const data = useLoaderData();
  const count = Object.values(data.currencies).length;

  return (
    <>
      <header className="header">
        <img src={logo} alt="FX_Checker logo" />
        <p className="header__info">{count} CURRENCIES · EOD · ECB DATA</p>
      </header>
      <main>
        <LiveMarket />
        <div className="content">
          <Converter />
          <Details />
        </div>
      </main>
    </>
  );
}
