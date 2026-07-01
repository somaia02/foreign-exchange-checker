import { useState } from "react";
import { type Key } from "react-aria-components";
import ConversionStats from "./ConversionStats";
import Chart from "./Chart";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "./Tabs";
import "./History.css";

interface TimeframeSelectorProps {
  selectedKey: Key;
  onSelectionChange: (k: Key) => void;
}

export default function History() {
  const [timeframe, setTimeframe] = useState<Key>("1w");
  return (
    <div className="history">
      <ConversionStats />
      <TimeframeSelector
        selectedKey={timeframe}
        onSelectionChange={setTimeframe}
      />
    </div>
  );
}
function TimeframeSelector({
  selectedKey,
  onSelectionChange,
}: TimeframeSelectorProps) {
  const options = ["1d", "1w", "1m", "3m", "1y", "5y"];
  return (
    <Tabs selectedKey={selectedKey} onSelectionChange={onSelectionChange}>
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
            <Chart timeframe={item} />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}
