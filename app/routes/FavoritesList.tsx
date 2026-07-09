import "./FavoritesList.css";
import FavoriteBtn from "./FavoriteBtn";
import { ArrowRight } from "./icons";
import { usePairRate } from "./api/usePairRate";

export default function FavoritesList({ favorites }: { favorites: string[] }) {
  return (
    <div className="favorites__list">
      {favorites.map((pair) => (
        <FavoritesItem base={pair.split(",")[0]} quote={pair.split(",")[1]} />
      ))}
    </div>
  );
}
function FavoritesItem({ base, quote }: { base: string; quote: string }) {
  const lastRateData = usePairRate({ base, quote });
  const prevDate = new Date();
  prevDate.setDate(prevDate.getDate() - 1);
  const prevDateStr = prevDate.toISOString().split("T")[0];
  const openRateData = usePairRate({ base, quote, date: prevDateStr });
  if (lastRateData.error != "" || openRateData.error != "") {
    return (
      <>
        <p>{lastRateData.error}</p>
        <p>{openRateData.error}</p>
      </>
    );
  } else if (lastRateData.loading || openRateData.loading) {
    return <p>Loading ...</p>;
  }
  const lastRate = lastRateData.rates![0].rate;
  const openRate = openRateData.rates![0].rate;
  const change = lastRate - openRate;
  const changePercent = (100 * change) / openRate;
  const color = change > 0 ? "green" : change < 0 ? "red" : "white";
  const changePercentText =
    change > 0
      ? `▲ +${changePercent.toFixed(2)}%`
      : change < 0
        ? `▼ ${changePercent.toFixed(2)}`
        : `${changePercent.toFixed(2)}`;
  return (
    <div className="favorites__item">
      <div className="favorites__pair">
        {base}
        <ArrowRight />
        {quote}
      </div>
      <div className="favorites__info">
        <p className="favorites__rate">{lastRate}</p>
        <p className={`favorites__change color-${color}`}>
          {changePercentText}
        </p>
      </div>
      <FavoriteBtn
        base={base}
        quote={quote}
        includeTxt={false}
        className="favorites__favBtn"
      />
    </div>
  );
}
