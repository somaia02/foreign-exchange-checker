import convertIcon from "../assets/images/icon-exchange-vertical.svg";
import CurrencySelector from "./CurrencySelector.tsx";
import ConverterFooter from "./ConverterFooter.tsx";
import { NumberField } from "./NumberField.tsx";
import { type Key } from "react-aria-components";
import { useContext, useRef } from "react";
import { usePairRate } from "./api/usePairRate.ts";
import { CurrencyContext } from "./CurrencyContext.ts";
import "./Converter.css";

interface CalculatorItemProps {
  title: string;
  currency: Key | null;
  value: number;
  onCurrencyChange: (c: Key | null) => void;
  onValueChange: (v: number) => void;
  disabled?: string[];
}

export default function Converter() {
  const data = usePairRate({});
  const currenciesInfo = useContext(CurrencyContext);
  if (currenciesInfo == null) return <p>Null context</p>;
  const {
    sendCurrency,
    receiveCurrency,
    setSendCurrency,
    setReceiveCurrency,
    sendValue,
    setSendValue,
  } = currenciesInfo;
  let receiveValue = 0;
  let converterInfo;
  if (data.error !== "") {
    converterInfo = data.error;
  } else if (data.loading) {
    converterInfo = "Loading rate ...";
  } else {
    receiveValue = sendValue * data.rates![0].rate;
    converterInfo = `1 ${sendCurrency} = ${data.rates![0].rate} ${receiveCurrency}`;
  }

  function handleReceiveValueChange(val: number) {
    if (data.rates![0]) {
      setSendValue(val / data.rates![0].rate);
    } else {
      setSendValue(0);
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
          onValueChange={setSendValue}
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
  const color = title === "send" ? "white" : "lime";
  return (
    <div className="calculator-item" ref={triggerRef}>
      <p className="calculator-item__title">{title}</p>
      <div className="calculator-item__options">
        <NumberField
          aria-label={title}
          placeholder="0"
          value={value}
          onChange={onValueChange}
          formatOptions={{ maximumFractionDigits: 3 }}
          className={`calculator-item__input color-${color}`}
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
