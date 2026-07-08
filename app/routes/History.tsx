import { useState } from "react";
import { type Key } from "react-aria-components";
import ConversionStats from "./ConversionStats";
import ChartPanel from "./ChartPanel";
import type { Timeframe } from "./Chart.client";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "./Tabs";
import "./History.css";

interface RateChartProps {
  selectedKey: Key;
  onSelectionChange: (k: Key) => void;
}

export default function History() {
  const [timeframe, setTimeframe] = useState<Key>("1m");
  return (
    <div className="history">
      <ConversionStats />
      <RateChart selectedKey={timeframe} onSelectionChange={setTimeframe} />
    </div>
  );
}
function RateChart({ selectedKey, onSelectionChange }: RateChartProps) {
  const options = ["1d", "1w", "1m", "3m", "1y", "5y"];
  return (
    <Tabs
      selectedKey={selectedKey}
      onSelectionChange={onSelectionChange}
      className="rate-chart"
    >
      <TabList aria-label="Timeframes" className="timeframe-selector">
        {options.map((item) => (
          <Tab key={item} id={item} className="timeframe-selector__tab">
            {item}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {options.map((item) => (
          <TabPanel key={item} id={item}>
            <ChartPanel timeframe={item as Timeframe} />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}
