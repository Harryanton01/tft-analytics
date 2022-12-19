import React, { useMemo } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { format } from "date-fns";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Grid } from "@visx/grid";
import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";

const verticalMargin = 120;

// accessors
const getX = (d: any) => new Date(d.x);
const getY = (d: any) => d.y as number;

type TooltipData = {
  x: string;
  y: number;
};
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: "rgba(0,0,0,0.9)",
  color: "white",
};
export type BarsProps = {
  width: number;
  height: number;
  events?: boolean;
  margin?: { top: number; right: number; bottom: number; left: number };
  data: { x: string; y: number }[];
};
let tooltipTimeout: number;
const BarChart = ({
  width,
  height,
  events = false,
  data,
  margin = { top: 30, right: 10, bottom: 50, left: 50 },
}: BarsProps) => {
  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<TooltipData>();
  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    // TooltipInPortal is rendered in a separate child of <body /> and positioned
    // with page coordinates which should be updated on scroll. consider using
    // Tooltip or TooltipWithBounds if you don't need to render inside a Portal
    scroll: true,
  });
  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand({
        range: [0, xMax],
        round: true,
        domain: data.map(getX),
        padding: 0.4,
      }),
    [xMax]
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(getY))],
      }),
    [yMax]
  );
  console.log(tooltipData);
  return width < 10 ? null : (
    <>
      <svg width={width} height={height}>
        <Group top={margin.top} left={margin.left}>
          <Grid
            xScale={xScale}
            yScale={yScale}
            width={xMax}
            height={yMax}
            stroke="black"
            strokeOpacity={0.2}
            numTicksRows={data.length}
            numTicksColumns={0}
            xOffset={xScale.bandwidth() / 2}
          />
          {data.map((d) => {
            const xDatum = getX(d);
            const barWidth = xScale.bandwidth();
            const barHeight = yMax - (yScale(getY(d)) ?? 0);
            const barX = xScale(xDatum);
            const barY = yMax - barHeight;
            return (
              <Bar
                key={`bar-${xDatum}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill="rgba(23, 233, 217, .5)"
                onMouseLeave={() => {
                  tooltipTimeout = window.setTimeout(() => {
                    hideTooltip();
                  }, 300);
                }}
                onMouseMove={(event) => {
                  if (tooltipTimeout) clearTimeout(tooltipTimeout);
                  const eventSvgCoords = localPoint(event);

                  const top = eventSvgCoords?.y;
                  const left = eventSvgCoords!.x + 10;
                  showTooltip({
                    tooltipData: d,
                    tooltipTop: top,
                    tooltipLeft: left,
                  });
                }}
              />
            );
          })}
          <AxisBottom
            scale={xScale}
            numTicks={8}
            top={yMax}
            tickFormat={(v) => format(v, "dd MMM yy")}
            label="Time"
          />
          <AxisLeft scale={yScale} numTicks={10} label="Game Time" left={10} />
        </Group>
      </svg>
      {tooltipOpen && tooltipData && (
        <TooltipInPortal
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <div>
            <>
              {tooltipData.x}
              <br />
              GameTime (Seconds): {tooltipData.y}
            </>
          </div>
        </TooltipInPortal>
      )}
    </>
  );
};

export default BarChart;
