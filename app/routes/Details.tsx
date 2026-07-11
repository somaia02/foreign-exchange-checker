import type { Key } from "react-aria-components";
import { useState } from "react";
import { Select, SelectItem } from "./Select/Select";
import History from "./History";
import Compare from "./Compare";
import Favorites from "./Favorites";
import Log from "./Log";
import "./Details.css";
import { useLoaderData } from "react-router";

type Tab = "history" | "compare" | "favorites" | "log";
interface DetailsTabsProps {
  value: Tab;
  onChange: (c: Tab) => void;
}
const content = {
  history: <History />,
  compare: <Compare />,
  favorites: <Favorites />,
  log: <Log />,
};

export default function Details() {
  const [selectedTab, setSelectedTab] = useState<Tab>("log");
  return (
    <div className="details">
      <DetailsTabs value={selectedTab} onChange={setSelectedTab} />
      {content[selectedTab]}
    </div>
  );
}

function DetailsTabs({ value, onChange }: DetailsTabsProps) {
  const tabs = ["history", "compare", "favorites", "log"];
  const data = useLoaderData();
  const favLen = data.favoritePairs.length;
  const logLen = data.conversionLogs.length;
  const count = ["", "", favLen, logLen];

  function handleChange(val: Key | null) {
    if (!tabs.includes(String(val))) return;
    onChange(val as Tab);
  }

  return (
    <Select
      aria-label="Select tab"
      value={value}
      onChange={handleChange}
      className="details__tab-selector"
    >
      {tabs.map((t: string, i: number) => (
        <SelectItem key={t} id={t} textValue={t} className="details__tab">
          {t}
          {count[i] !== "" ? <p className="details__count">{count[i]}</p> : ""}
        </SelectItem>
      ))}
    </Select>
  );
}
