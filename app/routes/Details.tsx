import type { Key } from "react-aria-components";
import { useState } from "react";
import { Select, SelectItem } from "./Select/Select";
import History from "./History";
import Compare from "./Compare";
import Favorites from "./Favorites";
import Log from "./Log";
import "./Details.css";
import { useLoaderData } from "react-router";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "./Tabs";

type Tab = "history" | "compare" | "favorites" | "log";
interface DetailsTabsProps {
  value: Tab;
  onChange: (v: Key | null) => void;
  count: (string | number)[];
}
const content = {
  history: <History />,
  compare: <Compare />,
  favorites: <Favorites />,
  log: <Log />,
};
const tabs = ["history", "compare", "favorites", "log"];

export default function Details() {
  const [selectedTab, setSelectedTab] = useState<Tab>("history");
  const data = useLoaderData();
  const favLen = data.favoritePairs.length;
  const logLen = data.conversionLogs.length;
  const count = ["", "", favLen, logLen];

  function handleChange(val: Key | null) {
    if (!tabs.includes(String(val))) return;
    setSelectedTab(val as Tab);
  }
  return (
    <div className="details">
      <DetailsTabs value={selectedTab} onChange={handleChange} count={count} />
    </div>
  );
}

function DetailsTabs({ value, onChange, count }: DetailsTabsProps) {
  return (
    <Tabs
      selectedKey={value}
      onSelectionChange={onChange}
      className="details-tabs"
    >
      <DetailsDropdown value={value} onChange={onChange} count={count} />
      <TabList aria-label="Timeframes" className="details-tab__selector">
        {tabs.map((item, i) => (
          <Tab key={item} id={item} className="details-tab__tab">
            {item}
            {count[i] !== "" ? (
              <p className="details__count">{count[i]}</p>
            ) : (
              ""
            )}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabs.map((item) => (
          <TabPanel key={item} id={item}>
            {content[value]}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}

function DetailsDropdown({ value, onChange, count }: DetailsTabsProps) {
  return (
    <div className="details-dropdown">
      <Select
        aria-label="Select tab"
        value={value}
        onChange={onChange}
        className="details-dropdown__selector"
      >
        {tabs.map((t: string, i: number) => (
          <SelectItem
            key={t}
            id={t}
            textValue={t}
            className="details-dropdown__tab"
          >
            {t}
            {count[i] !== "" ? (
              <p className="details__count">{count[i]}</p>
            ) : (
              ""
            )}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
