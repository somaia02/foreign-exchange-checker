import { useEffect, useState } from "react";
import Chart, { type Timeframe } from "./Chart.client";
import EmptyChart from "./EmptyChart";
import "./ChartPanel.css";
export default function ChartPanel({ timeframe }: { timeframe: Timeframe }) {
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
  }, []);
  const chart = didMount ? <Chart timeframe={timeframe} /> : <EmptyChart />;
  return <div className="chart-panel">{chart}</div>;
}
