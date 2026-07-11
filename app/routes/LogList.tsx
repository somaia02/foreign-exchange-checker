import type { Key } from "react-aria-components";
import { Delete, ArrowRight } from "./icons";
import ms from "ms";

import "./LogList.css";

export interface logItem {
  time: number;
  base: Key | null;
  quote: Key | null;
  baseAmount: number;
  quoteAmount: number;
}

export default function LogList({
  logs,
  onDelete,
}: {
  logs: logItem[];
  onDelete: (t: "all" | number) => void;
}) {
  return (
    <div className="log-list list">
      {logs.toReversed().map((l: logItem) => (
        <LogItem key={l.time} log={l} onDelete={onDelete} />
      ))}
    </div>
  );
}
function LogItem({
  log,
  onDelete,
}: {
  log: logItem;
  onDelete: (t: "all" | number) => void;
}) {
  const elapsed = Date.now() - log.time;
  let displayedTime: string;
  if (elapsed > ms("1d")) {
    displayedTime = Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
    }).format(log.time);
  } else {
    displayedTime = ms(elapsed);
  }
  return (
    <div className="log-item list-item">
      <div className="log-item__left">
        <p className="log-item__time">{displayedTime}</p>
        <p className="log-item__currencies">
          {log.base}
          <ArrowRight />
          {log.quote}
        </p>
      </div>
      <div className="log-item__right">
        <p className="log-item__send-value">
          {log.baseAmount.toLocaleString("en-US")}
        </p>
        <p className="log-item__receive-value">
          {log.quoteAmount.toLocaleString("en-US")}
        </p>
      </div>
      <button
        type="button"
        className="log-item__delete-btn"
        onClick={() => onDelete(log.time)}
      >
        <Delete />
      </button>
    </div>
  );
}
