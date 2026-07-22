import { useContext } from "react";
import { type Key } from "react-aria-components";

import { CurrencyContext } from "../../lib/CurrencyContext.ts";
import { displayFormat } from "../../lib/utils.tsx";
import EmptyTabPanel from "../../components/EmptyTabPanel.tsx";
import CompareList from "./CompareList";
import "./Compare.css";

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
  const { sendCurrency, sendValue, setReceiveCurrency } = currenciesInfo;
  if (sendValue === "") return <EmptyTabPanel tab="compare" />;

  return (
    <div className="compare list-wrapper">
      <CompareHeader sendValue={sendValue} sendCurrency={sendCurrency} />
      <CompareList
        quotes={QUOTES}
        base={String(sendCurrency)}
        value={Number(sendValue)}
        setReceiveCurrency={setReceiveCurrency}
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
