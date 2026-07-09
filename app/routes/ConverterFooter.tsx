import { type Key } from "react-aria-components";
import { useFetcher, useLoaderData } from "react-router";
import "./ConverterFooter.css";
import FavoriteBtn from "./FavoriteBtn.tsx";

interface ConverterFooterProps {
  info: string;
  sendCurrency: Key | null;
  receiveCurrency: Key | null;
  sendValue: string | number;
  receiveValue: string | number;
}

export default function ConverterFooter({
  info,
  sendCurrency,
  receiveCurrency,
  sendValue,
  receiveValue,
}: ConverterFooterProps) {
  let fetcher = useFetcher();
  const data = useLoaderData();
  let conversionLogs = data.conversionLogs;

  function handleLogClick() {
    const logInfo = {
      time: Date.now(),
      base: sendCurrency,
      quote: receiveCurrency,
      baseAmount: sendValue,
      quoteAmount: receiveValue,
    };
    conversionLogs.push(logInfo);
    fetcher.submit(
      { conversionLogs },
      {
        method: "post",
        encType: "application/json",
      },
    );
  }
  return (
    <div className="converter__footer">
      <p className="converter__info">{info}</p>
      <div className="converter__actions">
        <FavoriteBtn
          base={String(sendCurrency)}
          quote={String(receiveCurrency)}
          className="converter__fav-btn"
        />
        <button
          type="button"
          onClick={handleLogClick}
          className="converter__log-btn"
          disabled={!sendValue || !receiveValue}
        >
          Log conversion
        </button>
      </div>
    </div>
  );
}
