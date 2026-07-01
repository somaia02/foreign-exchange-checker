import { useContext } from "react";
import { usePairRate } from "./api/usePairRate";
import { CurrencyContext } from "./CurrencyContext";
import "./ConversionStats.css";

export default function ConversionStats() {
  const currenciesInfo = useContext(CurrencyContext);
  if (currenciesInfo == null) return <p>Null context</p>;
  const { sendCurrency, receiveCurrency } = currenciesInfo;
  const lastRateData = usePairRate(
    String(sendCurrency),
    String(receiveCurrency),
  );
  const prevDate = new Date();
  prevDate.setDate(prevDate.getDate() - 1);
  const prevDateStr = prevDate.toISOString().split("T")[0];
  const openRateData = usePairRate(
    String(sendCurrency),
    String(receiveCurrency),
    prevDateStr,
  );
  if (lastRateData.error != "" || openRateData.error != "") {
    return (
      <>
        <p>{lastRateData.error}</p>
        <p>{openRateData.error}</p>
      </>
    );
  } else if (lastRateData.loading || openRateData.loading) {
    return <p>Loading ...</p>;
  }
  const lastRate = lastRateData.rate!;
  const openRate = openRateData.rate!;
  const change = lastRate - openRate;
  const changePercent = (100 * change) / openRate;
  const changeValue =
    change > 0 ? `+${change.toFixed(2)}` : `${change.toFixed(2)}`;
  const color = change > 0 ? "green" : change < 0 ? "red" : "white";
  const changePercentValue =
    change > 0
      ? `▲ +${changePercent.toFixed(2)}%`
      : change < 0
        ? `▼ ${changePercent.toFixed(2)}`
        : `${changePercent.toFixed(2)}`;
  return (
    <div className="history__stats">
      <StatCell
        key="open"
        title="Open"
        value={String(openRate)}
        color="white"
      />
      <StatCell
        key="last"
        title="Last"
        value={String(lastRate)}
        color="white"
      />
      <StatCell key="change" title="Change" value={changeValue} color={color} />
      <StatCell
        key="% change"
        title="% Change"
        value={changePercentValue}
        color={color}
      />
    </div>
  );
}
function StatCell({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="history__stat-cell">
      <p className="history__stat-title">{title}</p>
      <p className={`history__stat-value color-${color}`}>{value}</p>
    </div>
  );
}
