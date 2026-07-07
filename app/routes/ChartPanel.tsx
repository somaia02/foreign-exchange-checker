import { useEffect, useState } from "react";
import Chart, { type Timeframe } from "./Chart.client";
import "./ChartPanel.css";
export default function ChartPanel({ timeframe }: { timeframe: Timeframe }) {
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
  }, []);
  const chart = didMount ? <Chart timeframe={timeframe} /> : <LoadingChart />;
  return <div className="chart-panel">{chart}</div>;
}
function LoadingChart() {
  return (
    <div className="loading-chart">
      <p>Loading...</p>
    </div>
  );
}
