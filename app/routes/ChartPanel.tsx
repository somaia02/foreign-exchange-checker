import { useEffect, useState } from "react";
import Chart, { type Timeframe } from "./Chart.client";
import EmptyChart from "./EmptyChart";
import "./ChartPanel.css";
import { usePairRate } from "./api/usePairRate";
export default function ChartPanel({ timeframe }: { timeframe: Timeframe }) {
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
  }, []);
  const chart = didMount ? <Chart timeframe={timeframe} /> : <EmptyChart />;
  return (
    <div className="chart-panel">
      <ChartHeader />
      {chart}
    </div>
  );
}
function ChartHeader() {
  const data = usePairRate({});
  if (data.error != "") return <p>{data.error}</p>;
  if (data.loading) return <p>Loading ...</p>;
  const { rate, base, quote } = data.rates![0];
  const date = Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZoneName: "short",
  }).format(new Date());

  return (
    <div className="chart-header">
      <p className="chart-header__currency">
        {base}/{quote}
      </p>
      <p className="chart-header__info">
        {rate} . {date.replace(",", "")}
      </p>
    </div>
  );
}
