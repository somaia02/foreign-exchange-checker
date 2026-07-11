import { useFetcher, useLoaderData } from "react-router";
import LogList, { type logItem } from "./LogList";
import "./Log.css";

export default function Log() {
  let fetcher = useFetcher();
  const data = useLoaderData();
  let conversionLogs = data.conversionLogs;

  function handleDelete(time: "all" | number) {
    if (time == "all") conversionLogs = [];
    else {
      conversionLogs = conversionLogs.filter((l: logItem) => l.time != time);
    }
    fetcher.submit(
      { conversionLogs },
      {
        method: "post",
        encType: "application/json",
      },
    );
  }
  return (
    <div className="log list-wrapper">
      <LogHeader count={conversionLogs.length} onClear={handleDelete} />
      <LogList logs={conversionLogs} onDelete={handleDelete} />
    </div>
  );
}

function LogHeader({
  count,
  onClear,
}: {
  count: number;
  onClear: (t: "all" | number) => void;
}) {
  return (
    <div className="log__header list-header">
      <p className="log__header__title">Conversion Log</p>
      <div className="log__header__content">
        <p className="log__count">{count} logged</p>
        <button className="log__clear-btn" onClick={() => onClear("all")}>
          Clear all
        </button>
      </div>
    </div>
  );
}
