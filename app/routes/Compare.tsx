import { useContext } from "react";
import { CurrencyContext } from "./CurrencyContext";
import { type Key } from "react-aria-components";
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
  const { sendCurrency, sendValue } = currenciesInfo;
  return (
    <div className="compare list-wrapper">
      <CompareHeader sendValue={sendValue} sendCurrency={sendCurrency} />
      <CompareList
        quotes={QUOTES}
        base={String(sendCurrency)}
        value={sendValue || 0}
      />
    </div>
  );
}
function CompareHeader({
  sendValue,
  sendCurrency,
}: {
  sendValue: "" | number;
  sendCurrency: Key | null;
}) {
  return (
    <div className="compare-header list-header">
      <p className="compare-header__main">
        <span className="compare-header__multi">Multi-currency</span>
        <span className="compare-header__value">
          {sendValue.toLocaleString("en-US") || 0} from {sendCurrency}
        </span>
      </p>
      <p className="compare-header__pairs">{QUOTES.length} pairs</p>
    </div>
  );
}
