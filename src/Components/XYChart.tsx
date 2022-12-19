import { Grid, LineSeries, XYChart, Axis, Tooltip } from "@visx/xychart";
import { format } from "date-fns";
import { curveLinear, curveStep, curveCardinal } from "@visx/curve";

type ChartProps = {
  width: number;
  height: number;
  data: { x: string; y: number }[];
};

const Chart = ({ width, height, data }: ChartProps) => {
  return (
    <XYChart
      xScale={{ type: "time" }}
      yScale={{ type: "linear" }}
      margin={{ top: 30, right: 10, bottom: 50, left: 50 }}
      width={width}
      height={height}
    >
      <Grid numTicks={data.length} />
      <LineSeries
        dataKey="line"
        data={data}
        curve={curveLinear}
        xAccessor={(d: any) => new Date(d.x)}
        yAccessor={(d: any) => d.y as number}
        strokeWidth={6}
        colorAccessor={(x) => "rgba(23, 233, 217, .5)"}
      />
      <Axis
        orientation="bottom"
        numTicks={8}
        tickFormat={(v) => format(v, "dd MMM yy")}
        label="Time"
      />
      <Axis orientation="left" numTicks={10} label="Game Time" />
      <Tooltip<{ x: string; y: number }>
        showVerticalCrosshair
        showSeriesGlyphs
        renderTooltip={({ tooltipData }) => (
          <div>
            <>
              {tooltipData!.nearestDatum!.datum.x}
              <br />
              GameTime (Seconds): {tooltipData!.nearestDatum!.datum.y}
            </>
          </div>
        )}
      />
    </XYChart>
  );
};

export default Chart;
