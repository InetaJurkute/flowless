import { ResponsiveRadar } from "@nivo/radar";
import { useMemo } from "react";
import { sumBy } from "lodash";
import { DataSet, Measurement } from "./context/DataContext";

interface TotalUsageByDeviceChartProps {
  data: DataSet;
}

export const TotalUsageByDeviceChart = ({
  data,
}: TotalUsageByDeviceChartProps) => {
  const getTotalUsageByDeiceData = useMemo(() => {
    //USE THE FIRST ONE
    const myApartmentData = data.houses[0].apartments[0];

    const devices = [
      "Hydractiva_shower",
      "Kitchen_optima_faucet",
      "Optima_faucet",
      "Washing_machine",
      "Dishwasher",
    ];

    const summedData = devices.map((device) => ({
      device,
      total: sumBy(myApartmentData[device].measurements, (x) =>
        parseFloat((x as Measurement).Consumption)
      ),
    }));

    return summedData;
  }, []); // update dependencies

  const radarChartData = getTotalUsageByDeiceData;

  return (
    <div className="responsive-chart-wrapper">
      <h3>Total Consumption By Device</h3>
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
