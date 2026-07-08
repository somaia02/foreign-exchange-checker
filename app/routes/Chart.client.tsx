import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { useWindowWidth } from "./useWindowWidth";
import EmptyChart from "./EmptyChart";

import "./Chart.css";
import { usePairRate } from "./api/usePairRate";
import XAxis from "./XAxis";
import YAxis from "./YAxis";

const duration = {
  "1d": 2,
  "1w": 7,
  "1m": 31,
  "3m": 92,
  "1y": 365,
  "5y": 365 * 5,
};
/* From design */
const height = 298;
const marginTop = 5;
const marginRight = 5;
const marginBottom = 26;
const marginLeft = 52;

export type Timeframe = "1d" | "1w" | "1m" | "3m" | "1y" | "5y";
export default function Chart({ timeframe }: { timeframe: Timeframe }) {
  const windowWidth = useWindowWidth();
  const [chartWidth, setChartWidth] = useState(300);
  const svgRef = useRef<SVGSVGElement>(null);

  const dates = getDates(timeframe);
  const date0 = dates[0].toISOString().split("T")[0];
  const rateData = usePairRate({ from: date0 });
  useEffect(() => {
    const width = svgRef.current?.getBoundingClientRect()?.width;
    setChartWidth(width ?? 300);
  }, [windowWidth, rateData.loading]);
  if (rateData.error != "") return <EmptyChart content={rateData.error} />;
  if (rateData.loading) return <EmptyChart />;
  const rates = rateData.rates!.map((d) => d.rate);
  const data = rates.map((rate, index) => ({ date: dates[index], rate }));
  const xRange = [dates[0], dates.at(-1)!];
  const yDomain = d3.extent(rates);
  const yRange = yDomain[0] ? yDomain : [0, 1];

  const x = d3
    .scaleUtc()
    .domain(xRange)
    .range([marginLeft, chartWidth - marginRight]);
  const y = d3
    .scaleLinear()
    .domain(yRange)
    .range([height - marginBottom, marginTop]);
  const line = d3
    .line<{ date: Date; rate: number }>()
    .x((d) => x(d.date))
    .y((d) => y(d.rate));
  const topArea = d3
    .area<{ date: Date; rate: number }>()
    .x((d) => x(d.date))
    .y0(marginTop)
    .y1((d) => y(d.rate));

  const tickCount = Math.min(dates.length, windowWidth > 600 ? 5 : 3);
  const dateFormat = timeframe == "5y" ? "%b %Y" : "%b %d";

  return (
    <svg className="chart" ref={svgRef} height={height}>
      <defs>
        <linearGradient id="myGradient" gradientTransform="rotate(90)">
          <stop offset="0%" stop-color="var(--lime-500)" />
          <stop
            offset="100%"
            stop-color="rgb(from var(--neutral-700) r g b / 0)"
          />
        </linearGradient>
      </defs>
      <rect
        width={chartWidth - marginLeft - marginRight - 1}
        height={height - marginBottom - marginTop}
        fill="url('#myGradient')"
        transform={`translate(${marginLeft + 1}, ${marginTop + 1})`}
      />
      <path fill="var(--neutral-700)" d={topArea(data) ?? undefined} />
      <path
        className="chart__line"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d={line(data) ?? undefined}
      />
      <XAxis
        x={x}
        tickCount={tickCount}
        dateFormat={dateFormat}
        height={height}
      />
      <YAxis
        y={y}
        yRange={yRange}
        width={chartWidth - marginLeft - marginRight}
        marginLeft={marginLeft}
      />
    </svg>
  );
}

function getDates(timeframe: Timeframe) {
  return Array.from({ length: duration[timeframe] }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (duration[timeframe] - 1 - i));
    return date;
  });
}
