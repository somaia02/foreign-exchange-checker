import { useRates } from './api/useRates';
import './LiveMarket.css';

export default function LiveMarket() {
  const data = useRates();
  if (data.error !== "") return <p>{data.error}</p>;
  if (data.loading) return <p>Loading ... </p>;
  const [latestRates, prevRates] = data.data;
  const items = [];
  for (let i = 0; i < latestRates!.length; i++) {
    const currData = latestRates![i];
    const prevData = prevRates![i];
    const currRate = currData.rate;
    const prevRate = prevData.rate;
    const change = 100 * (currRate - prevRate) / prevRate;
    items.push(
      <LiveMarketItem key={`${currData.base}/${currData.quote}`} base={currData.base} quote={currData.quote} rate={currData.rate} change={change}/>
    );
  }
  return (
    <div className="live-market">
      <p className="live-market__title">&bull; Live markets</p>
      <div className="live-market__rates">
        <div className="live-market__scroller">
          {items}
        </div>
        <div className="live-market__scroller">
          {items}
        </div>
      </div>
    </div>
  );
}

function LiveMarketItem({ base, quote, rate, change }: { base: string, quote: string, rate: number, change: number }) {
  const icon = change > 0 ? "▲ +" : "▼ -";
  const changeClass = change > 0 ? "live-market__change-up" : "live-market__change-down";
  return (
    <div className="live-market__item">
      <p className="live-market__currency">{base}/{quote}</p>
      <p className="livemarket__rate">{rate}</p>
      <p className={changeClass} >{icon + Math.abs(change).toFixed(2)}</p>
    </div>
  );
}