import { ResponsiveRadar } from "@nivo/radar";
import { Appliance } from "./context/DataContext";

interface TotalUsageByDeviceChartProps {
  data: {
    device: Appliance;
    total: number;
  }[];
}

export const TotalUsageByDeviceChart = ({
  data,
}: TotalUsageByDeviceChartProps) => {
  return (
    <div className="responsive-chart-wrapper">
      <h3>Total Consumption For Current Month</h3>
      <ResponsiveRadar
        data={data}
        keys={["total"]}
        indexBy="device"
        valueFormat=">-.2f"
        margin={{ top: 60, right: 80, bottom: 120, left: 80 }}
        borderColor={{ from: "color" }}
        gridLabelOffset={24}
        dotSize={10}
        dotColor={{ theme: "background" }}
        dotBorderWidth={2}
        colors={{ scheme: "nivo" }}
        blendMode="multiply"
        motionConfig="wobbly"
        legends={[
          {
            anchor: "bottom",
            direction: "column",
            translateX: -50,
            translateY: -120,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: "#999",
            symbolSize: 12,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};
