import { useContext } from "react";
import { CurrencyContext } from "./CurrencyContext";
import { type Key } from "react-aria-components";
import CompareList from "./CompareList";
import { displayFormat } from "./utils.tsx";

import "./Compare.css";
import EmptyTabPanel from "./EmptyTabPanel.tsx";

const QUOTES = [
  "egp",
  "sar",
  "usd",
  "gbp",
  "jpy",
  "chf",
  "cad",
  "aud",
  "inr",
  "cny",
  "bdt",
];

export default function Compare() {
  const currenciesInfo = useContext(CurrencyContext);
  if (currenciesInfo == null) return <p>Null context</p>;
  const { sendCurrency, sendValue } = currenciesInfo;
  if (sendValue === "") return <EmptyTabPanel tab="compare" />;

  return (
    <div className="compare list-wrapper">
      <CompareHeader sendValue={sendValue} sendCurrency={sendCurrency} />
      <CompareList
        quotes={QUOTES}
        base={String(sendCurrency)}
        value={Number(sendValue)}
      />
    </div>
  );
}
function CompareHeader({
  sendValue,
  sendCurrency,
}: {
  sendValue: string;
  sendCurrency: Key | null;
}) {
  return (
    <div className="compare-header list-header">
      <p className="compare-header__main">
        <span className="compare-header__multi">Multi-currency</span>
        <span className="compare-header__value">
          {displayFormat(sendValue)} from {sendCurrency}
        </span>
      </p>
      <p className="compare-header__pairs">{QUOTES.length} pairs</p>
    </div>
  );
}
