import { ResponsiveRadar } from "@nivo/radar";
import { useMemo } from "react";
import { sumBy } from "lodash";
import { DataSet, KitchenAppliance, Measurement } from "./context/DataContext";

interface TotalUsageByDeviceChartProps {
  data: DataSet;
}

export const TotalUsageByDeviceChart = ({
  data,
}: TotalUsageByDeviceChartProps) => {
  const getTotalUsageByDeiceData = useMemo(() => {
    //USE THE FIRST ONE
    const myApartmentData = data.houses[0].apartments[0];

    const summedData = Object.values(KitchenAppliance).map((device) => ({
      device,
      total: sumBy(myApartmentData[device].measurements, (x) =>
        parseFloat((x as Measurement).Consumption)
      ),
    }));

    return summedData;
  }, [data.houses]);

  const radarChartData = getTotalUsageByDeiceData;

  return (
    <div style={{ height: 500 }}>
      <h3>Total Consumption By Device</h3>
      <ResponsiveRadar
        data={radarChartData}
        keys={["total"]}
        indexBy="device"
        valueFormat=">-.2f"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        borderColor={{ from: "color" }}
        gridLabelOffset={36}
        dotSize={10}
        dotColor={{ theme: "background" }}
        dotBorderWidth={2}
        colors={{ scheme: "nivo" }}
        blendMode="multiply"
        motionConfig="wobbly"
        legends={[
          {
            anchor: "top-left",
            direction: "column",
            translateX: -50,
            translateY: -40,
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
