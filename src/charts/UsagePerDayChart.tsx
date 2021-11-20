import { ResponsiveBar } from "@nivo/bar";
import { sumBy } from "lodash";
import { useMemo } from "react";
import {
  currentDate,
  DataSet,
  Applience,
  filterData,
  Measurement,
} from "../context/DataContext";

const barColors = {
  [`${Applience.Dishwasher}Color`]: "hsl(345, 70%, 50%)",
  [`${Applience.Faucet}Color`]: "hsl(345, 70%, 50%)",
  [`${Applience.KitchenFaucet}Color`]: "hsl(345, 70%, 50%)",
  [`${Applience.Shower}Color`]: "hsl(345, 70%, 50%)",
  [`${Applience.WashingMachine}Color`]: "hsl(345, 70%, 50%)",
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
        [Applience.Dishwasher]: sumBy(
          dayData.houses[0].apartments[0][Applience.Dishwasher].measurements,
          (x) => parseFloat((x as Measurement).Consumption)
        ),
        [Applience.Faucet]: sumBy(
          dayData.houses[0].apartments[0][Applience.Faucet].measurements,
          (x) => parseFloat((x as Measurement).Consumption)
        ),
        [Applience.KitchenFaucet]: sumBy(
          dayData.houses[0].apartments[0][Applience.KitchenFaucet].measurements,
          (x) => parseFloat((x as Measurement).Consumption)
        ),
        [Applience.Shower]: sumBy(
          dayData.houses[0].apartments[0][Applience.Shower].measurements,
          (x) => parseFloat((x as Measurement).Consumption)
        ),
        [Applience.WashingMachine]: sumBy(
          dayData.houses[0].apartments[0][Applience.WashingMachine]
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
    <div style={{ height: 500 }}>
      <h3>Consumption Per Day By Device</h3>
      <ResponsiveBar
        data={chartData}
        keys={Object.values(Applience)}
        indexBy="day"
        valueFormat=">-.2f"
        margin={{ top: 70, right: 180, bottom: 40, left: 80 }}
        borderColor={{ from: "color" }}
        enableLabel={false}
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
