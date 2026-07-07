import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface XAxisProps {
  x: d3.ScaleTime<number, number, never>;
  tickCount: number;
  dateFormat: string;
  height: number;
}

export default function XAxis({
  x,
  tickCount,
  dateFormat,
  height,
}: XAxisProps) {
  const gx = useRef<SVGGElement>(null);
  const xTickFormatter = (value: Date | d3.NumberValue) =>
    d3.utcFormat(dateFormat)(value as Date);

  useEffect(() => {
    if (!gx.current) return;

    d3.select(gx.current).call(
      d3.axisBottom(x).ticks(tickCount).tickFormat(xTickFormatter),
    );
  }, [gx, x, tickCount, dateFormat]);

  return <g ref={gx} transform={`translate(0,${height - 16})`} />;
}
