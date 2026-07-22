import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface YAxisProps {
  y: d3.ScaleLinear<number, number, never>;
  yRange: number[];
  width: number;
  marginLeft: number;
}

export default function YAxis({ width, marginLeft, y, yRange }: YAxisProps) {
  const gy = useRef<SVGGElement>(null);
  const gyGrid = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!gy.current || !gyGrid.current) return;
    d3.select(gy.current).call(
      d3
        .axisLeft(y)
        .tickValues([yRange[0], yRange[1], (yRange[0] + yRange[1]) / 2])
        .tickFormat(d3.format(".4f")),
    );
    d3.select(gyGrid.current).call(
      d3
        .axisLeft(y)
        .tickFormat(() => "")
        .tickValues([yRange[0], yRange[1], (yRange[0] + yRange[1]) / 2])
        .tickSizeInner(-width),
    );
  }, [gy, gyGrid, y, yRange, width, marginLeft]);

  return (
    <>
      <g
        ref={gy}
        transform={`translate(${marginLeft - 12},0)`}
        className="no-tick"
      />
      <g
        ref={gyGrid}
        transform={`translate(${marginLeft},0)`}
        className="gridline"
      />
    </>
  );
}
