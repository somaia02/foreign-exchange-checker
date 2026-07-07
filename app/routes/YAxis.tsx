import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface YAxisProps {
  y: d3.ScaleLinear<number, number, never>;
  yRange: number[];
}

export default function YAxis({ y, yRange }: YAxisProps) {
  const gy = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!gy.current) return;
    d3.select(gy.current).call(
      d3
        .axisLeft(y)
        .tickValues([yRange[0], yRange[1], (yRange[0] + yRange[1]) / 2])
        .tickFormat(d3.format(".4f")),
    );
  }, [gy, y, yRange]);

  return <g ref={gy} transform={`translate(44,0)`} />;
}
