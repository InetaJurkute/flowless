import { ResponsiveRadar } from "@nivo/radar";
import { useMemo } from "react";
import { sumBy } from "lodash";
import {
  currentMonth,
  DataSet,
  KitchenAppliance,
  Measurement,
} from "./context/DataContext";

interface TotalUsageByDeviceChartProps {
  data: DataSet;
}

export const TotalUsageByDeviceChart = ({
  data,
}: TotalUsageByDeviceChartProps) => {
  const getTotalUsageByDeiceData = useMemo(() => {
    //USE THE FIRST ONE
    const myApartmentData = data.houses[0].apartments[0];

    const summedData = Object.values(KitchenAppliance).map((device) => {
      const myMeasurements = myApartmentData[device].measurements.filter(
        (m) => m.TimeStamp >= currentMonth.toString()
      );
      return {
        device,
        total: sumBy(myMeasurements, (x) =>
          parseFloat((x as Measurement).Consumption)
        ),
      };
    });

    return summedData;
  }, [data.houses]);

  const radarChartData = getTotalUsageByDeiceData;

  return (
    <div className="responsive-chart-wrapper">
      <h3>Total Consumption For Current Month</h3>
      <ResponsiveRadar
        data={radarChartData}
        keys={["total"]}
        indexBy="device"
        valueFormat=">-.2f"
        margin={{ top: 60, right: 80, bottom: 60, left: 80 }}
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
            translateY: -60,
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
