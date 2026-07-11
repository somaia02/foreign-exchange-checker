import { useLoaderData } from "react-router";
import "./CompareList.css";
import { useAllQuoteRates } from "./api/useAllQuoteRates";
import FlagIcon from "./FlagIcon";
import FavoriteBtn from "./FavoriteBtn";

interface CompareListProps {
  quotes: string[];
  base: string;
  value: number;
}

interface CompareItemProps {
  base: string;
  quote: string;
  name: string;
  rate: number;
  value: number;
}

export default function CompareList({ quotes, base, value }: CompareListProps) {
  const data = useLoaderData();
  const currencies = data.currencies;
  const rateData = useAllQuoteRates(base);
  if (rateData.error != "") return <p>{rateData.error}</p>;
  if (rateData.loading) return <p>Loading...</p>;
  const rates = rateData.rates!;
  return (
    <div className="compare__list list">
      {quotes.map((q) => {
        if (q == base) return;
        return (
          <CompareItem
            key={q}
            base={base}
            quote={q}
            name={currencies[q].name}
            rate={rates[q]}
            value={value * rates[q]}
          />
        );
      })}
    </div>
  );
}

function CompareItem({ base, quote, name, rate, value }: CompareItemProps) {
  return (
    <div className="compare__item list-item">
      <div>
        <FlagIcon code={quote} />
        <div className="compare-quote">
          <p className="compare-quote__symbol">{quote}</p>
          <p className="compare-quote__name">{name}</p>
        </div>
      </div>
      <div>
        <div className="compare__item__values">
          <p className="compare__receive-value">
            {Number(value.toFixed(2)).toLocaleString("en-US")}
          </p>
          <p className="compare__rate">@ {rate}</p>
        </div>
        <FavoriteBtn
          base={base}
          quote={quote}
          className="comapre__favBtn"
          includeTxt={false}
        />
      </div>
    </div>
  );
}
