import convertIcon from "./assets/images/icon-exchange-vertical.svg";
import CurrencySelector from "./Select/CurrencySelector.tsx";
import { type Key } from "react-aria-components";
import { useRef, useState } from "react";
import { useGetRate } from "./api/useGetRate.tsx";
import "./Converter.css";

interface CalculatorItemProps {
  title: string;
  currency: Key | null;
  value: number | null;
  onCurrencyChange: (c: Key | null) => void;
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: string[];
}

export default function Converter() {
  const [sendValue, setSendValue] = useState<number | null>(null);
  const [sendCurrency, setSendCurrency] = useState<Key | null>("usd");
  const [receiveCurrency, setReceiveCurrency] = useState<Key | null>("eur");
  const data = useGetRate(String(sendCurrency), String(receiveCurrency));
  if (data.error !== "") return <p>{data.error}</p>;
  if (data.loading) return <p>Loading ... </p>;
  const receiveValue = sendValue
    ? Number((sendValue * data.rate!).toFixed(2))
    : null;

  function handleSendValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSendValue(Number(e.target.value));
  }
  function handleReceiveValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSendValue(Number((Number(e.target.value) / data.rate!).toFixed(2)));
  }
  function handleClick() {
    const currSendCurrency = sendCurrency;
    const currReceiveCurrency = receiveCurrency;
    setSendCurrency(currReceiveCurrency);
    setReceiveCurrency(currSendCurrency);
  }

  return (
    <div className="converter">
      <h1 className="converter__title">Check the rate</h1>
      <div className="calculator">
        <CalculatorItem
          title="send"
          currency={sendCurrency}
          value={sendValue}
          onCurrencyChange={setSendCurrency}
          onValueChange={handleSendValueChange}
          disabled={[String(receiveCurrency)]}
        ></CalculatorItem>
        <button
          type="button"
          className="calculator__btn"
          aria-label="Swap currencies"
          onClick={handleClick}
        >
          <img src={convertIcon} alt="Up and down exchange arrows" />
        </button>
        <CalculatorItem
          title="receive"
          currency={receiveCurrency}
          value={receiveValue}
          onCurrencyChange={setReceiveCurrency}
          onValueChange={handleReceiveValueChange}
          disabled={[String(sendCurrency)]}
        ></CalculatorItem>
      </div>
      <div className="converter__footer"></div>
    </div>
  );
}

function CalculatorItem({
  title,
  currency,
  value,
  onCurrencyChange,
  onValueChange,
  disabled = [],
}: CalculatorItemProps) {
  const triggerRef = useRef(null);
  const color = title === "send" ? "" : "lime";
  return (
    <div className="calculator-item" ref={triggerRef}>
      <p className="calculator-item__title">{title}</p>
      <div className="calculator-item__options">
        <input
          placeholder="0"
          type="text"
          value={value || undefined}
          className={`calculator-item__input ${color}`}
          onChange={onValueChange}
        />
        <CurrencySelector
          triggerRef={triggerRef}
          value={currency}
          onChange={onCurrencyChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
