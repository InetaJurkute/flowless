import { Heading } from "@chakra-ui/layout";
import { ResponsiveCalendar } from "@nivo/calendar";
import { useMemo } from "react";
import { Appliance, DataSet, Measurement } from "../context/DataContext";
import { flowless } from "./theme";

export const GithubContributionsChart = ({ data }: { data: DataSet }) => {
  const dataForChart = useMemo(() => {
    const dateMap: { [index: string]: number } = {};

    const processMeasurements = (x: Measurement) => {
      const key = x.TimeStamp.substring(0, 10);
      const value = dateMap[key];
      if (value) {
        dateMap[key] = value + parseFloat(x.Consumption);
      } else {
        dateMap[key] = parseFloat(x.Consumption);
      }
    };

    data.houses[0].apartments[0][Appliance.Dishwasher].measurements.forEach(
      processMeasurements
    );
    data.houses[0].apartments[0][Appliance.KitchenFaucet].measurements.forEach(
      processMeasurements
    );
    data.houses[0].apartments[0][Appliance.Faucet].measurements.forEach(
      processMeasurements
    );
    data.houses[0].apartments[0][Appliance.WashingMachine].measurements.forEach(
      processMeasurements
    );
    data.houses[0].apartments[0][Appliance.Shower].measurements.forEach(
      processMeasurements
    );

    return Object.entries(dateMap).map((kv) => ({
      day: kv[0],
      value: +kv[1].toFixed(2),
    }));
  }, [data]);

  return (
    <div className="responsive-chart-wrapper" style={{ height: 250 }}>
      <Heading as="h5" size="sm">
        Consumptions by Day in 2020 in Liters
      </Heading>
      <ResponsiveCalendar
        data={dataForChart}
        from="2020-01-01"
        to="2020-12-31"
        emptyColor="#eeeeee"
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        minValue={0}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        theme={flowless}
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
          },
        ]}
      />
    </div>
  );
};
