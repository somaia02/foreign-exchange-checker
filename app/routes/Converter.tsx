import convertIcon from "../assets/images/icon-exchange-vertical.svg";
import CurrencySelector from "./Select/CurrencySelector.tsx";
import ConverterFooter from "./ConverterFooter.tsx";
import { type Key } from "react-aria-components";
import { useRef, useState } from "react";
import { usePairRate } from "./api/usePairRate.ts";
import "./Converter.css";

interface CalculatorItemProps {
  title: string;
  currency: Key | null;
  value: string | number;
  onCurrencyChange: (c: Key | null) => void;
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: string[];
}

export default function Converter() {
  const [sendValue, setSendValue] = useState<"" | number>("");
  const [sendCurrency, setSendCurrency] = useState<Key | null>("usd");
  const [receiveCurrency, setReceiveCurrency] = useState<Key | null>("eur");
  const data = usePairRate(String(sendCurrency), String(receiveCurrency));
  let receiveValue: string | number = "";
  let converterInfo;
  if (data.error !== "") {
    converterInfo = data.error;
  } else if (data.loading) {
    converterInfo = "Loading rate ...";
  } else {
    receiveValue = sendValue ? Number((sendValue * data.rate!).toFixed(2)) : "";
    converterInfo = `1 ${sendCurrency} = ${data.rate!} ${receiveCurrency}`;
  }

  function handleSendValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSendValue(Number(e.target.value));
  }
  function handleReceiveValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (data.rate) {
      setSendValue(Number((Number(e.target.value) / data.rate).toFixed(2)));
    } else {
      setSendValue("");
    }
  }
  function handleSwapClick() {
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
          onClick={handleSwapClick}
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
      <ConverterFooter
        info={converterInfo}
        sendCurrency={sendCurrency}
        receiveCurrency={receiveCurrency}
        sendValue={sendValue}
        receiveValue={receiveValue}
      />
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
          value={value}
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
