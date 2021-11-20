import data from "./db.json";
import { ResponsiveRadar } from "@nivo/radar";
import { useMemo } from "react";
import { sumBy } from "lodash";

export const TotalUsageByDeviceChart = () => {
  console.log("data stuff", (data as any).houses.length);

  const getTotalUsageByDeiceData = useMemo(() => {
    //USE THE FIRST ONE
    const myApartmentData = (data as any).houses[0].apartments[0];

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
        parseFloat((x as any).Consumption)
      ),
    }));

    return summedData;
  }, []); // update dependencies

  const mockData = getTotalUsageByDeiceData as any;
  console.log("MOCK", mockData);

  return (
    <div style={{ height: 500 }}>
      <h3>Total Consumption By Device</h3>
      <ResponsiveRadar
        data={mockData}
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
