import { type Key } from "react-aria-components";
import { useState } from "react";
import { Select, SelectItem } from "./Select/Select";
import "./Details.css";
import { useLoaderData } from "react-router";

interface DetailsTabsProps {
  value: Key | null;
  onChange: (c: Key | null) => void;
}
export default function Details() {
  const [selectedTab, setSelectedTab] = useState<Key | null>("history");
  return (
    <div className="details">
      <DetailsTabs value={selectedTab} onChange={setSelectedTab} />
    </div>
  );
}
function DetailsTabs({ value, onChange }: DetailsTabsProps) {
  const tabs = ["history", "compare", "favorites", "log"];
  const data = useLoaderData();
  const favLen = data.favoritePairs.length;
  const logLen = data.conversionLogs.length;
  const count = ["", "", favLen, logLen];
  return (
    <Select
      aria-label="Select tab"
      value={value}
      onChange={onChange}
      className="details__tab-selector"
    >
      {tabs.map((t: string, i: number) => (
        <SelectItem id={t} textValue={t} className="details__tab">
          {t}
          {count[i] !== "" ? <p className="details__count">{count[i]}</p> : ""}
        </SelectItem>
      ))}
    </Select>
  );
}
