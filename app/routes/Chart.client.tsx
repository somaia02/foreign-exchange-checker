import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { useWindowWidth } from "./useWindowWidth";
import "./Chart.css";

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
const marginRight = 0;
const marginBottom = 26;
const marginLeft = 52;

export type Timeframe = "1d" | "1w" | "1m" | "3m" | "1y" | "5y";
export default function Chart({ timeframe }: { timeframe: Timeframe }) {
  const windowWidth = useWindowWidth();
  const [chartWidth, setChartWidth] = useState(300);
  const svgRef = useRef<SVGSVGElement>(null);
  const gx = useRef<SVGGElement>(null);
  const gy = useRef<SVGGElement>(null);

  const dates = getDates(timeframe);
  const rates = [1, 2, 1, 3, 4, 2, 3];
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

  const tickCount = windowWidth > 600 ? 5 : 3;
  const dateFormat = timeframe == "5y" ? "%d %Y" : "%B %d";
  const xTickFormatter = (value: Date | d3.NumberValue) =>
    d3.utcFormat(dateFormat)(value as Date);

  useEffect(() => {
    const width = svgRef.current?.getBoundingClientRect()?.width;
    setChartWidth(width ?? 0);
  }, [windowWidth]);

  useEffect(() => {
    if (!gx.current) return;

    d3.select(gx.current).call(
      d3.axisBottom(x).ticks(tickCount).tickFormat(xTickFormatter),
    );
  }, [gx, x, tickCount, dateFormat]);

  useEffect(() => {
    if (!gy.current) return;

    d3.select(gy.current).call(
      d3
        .axisLeft(y)
        .tickValues([yRange[0], yRange[1], (yRange[0] + yRange[1]) / 2])
        .tickFormat(d3.format(".4f")),
    );
  }, [gy, y, yRange]);

  const topArea = d3
    .area<{ date: Date; rate: number }>()
    .x((d) => x(d.date))
    .y0(marginTop)
    .y1((d) => y(d.rate));

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
      <g
        className="chart__x-axis"
        ref={gx}
        transform={`translate(0,${height - 16})`}
      />
      <g className="chart__y-axis" ref={gy} transform={`translate(44,0)`} />
      <rect
        width={chartWidth - marginLeft - marginRight}
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
    </svg>
  );
}

function getDates(timeframe: Timeframe) {
  return Array.from({ length: duration[timeframe] }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date;
  });
}
