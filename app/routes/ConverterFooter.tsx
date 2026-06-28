import { type Key } from "react-aria-components";
import { useFetcher, useLoaderData } from "react-router";
import { StarFilledIcon } from "./icons.tsx";
import { StarIcon } from "./icons.tsx";
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
  let fetcher = useFetcher();
  const data = useLoaderData();
  let favoritePairs = data.favoritePairs;
  let conversionLogs = data.conversionLogs;
  const favorited = favoritePairs.includes(
    `${sendCurrency},${receiveCurrency}`,
  );
  const favBtnClassName = favorited ? "converter__fav-btn--favorited" : "";
  const favBtnIcon = favorited ? <StarFilledIcon /> : <StarIcon />;
  const favBtnTxt = favorited ? "Favorited" : "Favorite";

  function handleFavoriteClick() {
    const pair = `${sendCurrency},${receiveCurrency}`;
    if (favorited) {
      favoritePairs = favoritePairs.filter((item: string) => item !== pair);
    } else {
      favoritePairs.push(pair);
    }
    fetcher.submit(
      { favoritePairs },
      {
        method: "post",
        encType: "application/json",
      },
    );
  }
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
        <button
          type="button"
          onClick={handleFavoriteClick}
          className={`converter__fav-btn ${favBtnClassName}`}
        >
          {favBtnIcon}
          <span>{favBtnTxt}</span>
        </button>
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
