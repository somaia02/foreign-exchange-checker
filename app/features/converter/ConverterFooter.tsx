import { type Key } from "react-aria-components";
import { useFetcher, useLoaderData } from "react-router";
import { useEffect, useState } from "react";

import FavoriteBtn from "../../components/FavoriteBtn.tsx";
import { Check } from "../../components/icons.tsx";
import "./ConverterFooter.css";

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
  const [logBtnClicked, setLogBtnClicked] = useState(false);
  const fetcher = useFetcher();
  const data = useLoaderData();
  const conversionLogs = data.conversionLogs;
  const clickedLogBtn = (
    <>
      <Check />
      <span>Logged</span>
    </>
  );

  function handleLogClick() {
    const logInfo = {
      time: Date.now(),
      base: sendCurrency,
      quote: receiveCurrency,
      baseAmount: sendValue,
      quoteAmount: receiveValue,
    };
    fetcher.submit(
      { conversionLogs: [...conversionLogs, logInfo] },
      {
        method: "post",
        encType: "application/json",
      },
    );
    setLogBtnClicked(true);
  }
  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
    if (logBtnClicked) {
      timeoutId = setTimeout(() => setLogBtnClicked(false), 2000);
    }
    return () => clearTimeout(timeoutId);
  }, [logBtnClicked]);
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
          className={`converter__log-btn ${logBtnClicked ? "converter__log-btn--logged" : ""}`}
          disabled={!sendValue || !receiveValue}
        >
          {logBtnClicked ? clickedLogBtn : "Log conversion"}
        </button>
      </div>
    </div>
  );
}
