import convertIcon from "../assets/images/icon-exchange-vertical.svg";
import CurrencySelector from "./CurrencySelector.tsx";
import ConverterFooter from "./ConverterFooter.tsx";
import { type Key } from "react-aria-components";
import { useContext, useRef, useState } from "react";
import { usePairRate } from "./api/usePairRate.ts";
import { CurrencyContext } from "./CurrencyContext.ts";
import { displayFormat } from "./utils.tsx";
import "./Converter.css";

interface CalculatorItemProps {
  title: string;
  currency: Key | null;
  value: string;
  onCurrencyChange: (c: Key | null) => void;
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: string[];
}

export default function Converter() {
  const data = usePairRate({});
  const [receiveLastIsDot, setReceiveLastIsDot] = useState(false);
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
  console.log(sendValue, receiveLastIsDot);

  const sendValueNum = Number(sendValue);
  const sendValueDisplayed = displayFormat(sendValue);
  let receiveValue: string = "";
  let converterInfo;
  if (data.error !== "") {
    converterInfo = data.error;
  } else if (data.loading) {
    converterInfo = "Loading rate ...";
  } else {
    receiveValue = sendValue ? String(sendValueNum * data.rates![0].rate) : "";
    converterInfo = `1 ${sendCurrency} = ${data.rates![0].rate} ${receiveCurrency}`;
  }
  const receiveValueDisplayed =
    displayFormat(receiveValue).includes(".") || !receiveLastIsDot
      ? displayFormat(receiveValue)
      : displayFormat(receiveValue) + ".";
  function handleSendValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSendValue(e.target.value.replace(",", ""));
    setReceiveLastIsDot(false);
  }
  function handleReceiveValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (data.rates![0] && e.target.value !== "") {
      console.log("Typed: ", e.target.value);
      console.log(
        "Send",
        String(
          Number(e.target.value.replaceAll(",", "")) / data.rates![0].rate,
        ),
      );
      setSendValue(
        String(
          Number(e.target.value.replaceAll(",", "")) / data.rates![0].rate,
        ),
      );
    } else {
      setSendValue("");
    }
    if (e.target.value.at(-1) === ".") {
      setReceiveLastIsDot(true);
    } else {
      setReceiveLastIsDot(false);
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
          value={sendValueDisplayed}
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
          value={receiveValueDisplayed}
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
        <input
          placeholder="0"
          type="text"
          inputMode="decimal"
          value={value}
          className={`calculator-item__input color-${color}`}
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
