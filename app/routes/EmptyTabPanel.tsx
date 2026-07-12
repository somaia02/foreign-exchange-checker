import { useContext } from "react";
import "./EmptyTabPanel.css";
import { CurrencyContext } from "./CurrencyContext";
type Tab = "history" | "compare" | "favorites" | "log";

const titles = {
  history: "No chart data available",
  compare: "No comparison available",
  favorites: "No pinned pairs yet",
  log: "No conversions logged yet",
};
const details = {
  history: <HistoryDetails />,
  compare:
    "Enter an amount in SEND above to see what your money is worth in other currencies.",
  favorites:
    "Pin a pair to track its rate here. Tap the star icon on any conversion or comparison row.",
  log: "Every conversion is recorded here automatically when you tap LOG CONVERSION. Your log is private to this session and this browser.",
};

export default function EmptyTabPanel({
  tab,
  content,
}: {
  tab: Tab;
  content?: string;
}) {
  return (
    <div className="empty-panel">
      <p className="empty-panel__title">{titles[tab]}</p>
      <p className="empty-panel__details">{content ? content : details[tab]}</p>
    </div>
  );
}
function HistoryDetails() {
  let base, quote, content;
  const currenciesInfo = useContext(CurrencyContext);
  if (!currenciesInfo) {
    content = "Context error";
  } else {
    base = base ?? String(currenciesInfo.sendCurrency);
    quote = quote ?? String(currenciesInfo.receiveCurrency);
  }
  content = (
    <>
      We couldn't load rate history for{" "}
      <span className="empty-panel__currencies">
        {base}/{quote}
      </span>{" "}
      right now. This usually clears up in a minute.
    </>
  );
  return content;
}
