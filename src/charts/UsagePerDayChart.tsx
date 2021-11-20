import { ResponsiveBar } from "@nivo/bar";
import { sumBy } from "lodash";
import { useMemo } from "react";
import {
  currentDate,
  DataSet,
  Appliance,
  filterData,
  Measurement,
} from "../context/DataContext";
import { flowless } from "./theme";

const barColors = {
  [`${Appliance.Dishwasher}Color`]: "hsl(345, 70%, 50%)",
  [`${Appliance.Faucet}Color`]: "hsl(345, 70%, 50%)",
  [`${Appliance.KitchenFaucet}Color`]: "hsl(345, 70%, 50%)",
  [`${Appliance.Shower}Color`]: "hsl(345, 70%, 50%)",
  [`${Appliance.WashingMachine}Color`]: "hsl(345, 70%, 50%)",
};

export const UsagePerDayChart = ({ data }: { data: DataSet }) => {
  const getUsagePerDayData = useMemo(() => {
    const chartData = [];
    for (let i = 1; i <= currentDate.day; i++) {
      const dayData = filterData(
        data,
        currentDate.set({ day: i }).startOf("day").toString(),
        currentDate.set({ day: i }).endOf("day").toString()
      );
      chartData.push({
        day: i,
        [Appliance.Dishwasher]: sumBy(
          dayData.houses[0].apartments[0][Appliance.Dishwasher].measurements,
          (x) => parseFloat((x as Measurement).Consumption)
        ),
        [Appliance.Faucet]: sumBy(
          dayData.houses[0].apartments[0][Appliance.Faucet].measurements,
          (x) => parseFloat((x as Measurement).Consumption)
        ),
        [Appliance.KitchenFaucet]: sumBy(
          dayData.houses[0].apartments[0][Appliance.KitchenFaucet].measurements,
          (x) => parseFloat((x as Measurement).Consumption)
        ),
        [Appliance.Shower]: sumBy(
          dayData.houses[0].apartments[0][Appliance.Shower].measurements,
          (x) => parseFloat((x as Measurement).Consumption)
        ),
        [Appliance.WashingMachine]: sumBy(
          dayData.houses[0].apartments[0][Appliance.WashingMachine]
            .measurements,
          (x) => parseFloat((x as Measurement).Consumption)
        ),
        ...barColors,
      });
    }

    return chartData;
  }, [data]);

  const chartData = getUsagePerDayData;

  return (
    <div className="responsive-chart-wrapper">
      <h3>Consumption Per Day By Device This Month(L)</h3>
      <ResponsiveBar
        data={chartData}
        keys={Object.values(Appliance)}
        indexBy="day"
        valueFormat=">-.2f"
        margin={{ top: 70, right: 180, bottom: 40, left: 80 }}
        borderColor={{ from: "color" }}
        enableLabel={false}
        theme={flowless}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};
