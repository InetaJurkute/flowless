import { Grid, GridItem } from "@chakra-ui/react";
import { Appliance } from "../context/DataContext";
import { HorizontalCard } from "./HorizontalCard";

export interface AverageSpend {
  [Appliance.Dishwasher]: number;
  [Appliance.Faucet]: number;
  [Appliance.KitchenFaucet]: number;
  [Appliance.Shower]: number;
  [Appliance.WashingMachine]: number;
  Total: number;
}

const AverageList = (props: {
  monthlySpend: { total: number; device: Appliance }[];
  averageSpend: AverageSpend;
  totalSpend: number;
  peopleCount: number;
}) => {
  const diff = props.totalSpend / props.peopleCount - props.averageSpend.Total;
  const isAboveAverage = diff > 0;
  return (
    <>
      <Grid
        marginTop="64px"
        gap={4}
        templateRows="repeat(4, 1fr)"
        templateColumns="repeat(2, 1fr)"
      >
        <GridItem colSpan={2} rowStart={1} rowEnd={2}>
          <HorizontalCard
            customText="Current total water spend per person this month is"
            measurementUnit="liters"
            amount={+diff.toFixed(2)}
            isAboveAverage={isAboveAverage}
            title="test"
          />
        </GridItem>

        <GridItem colStart={1} colEnd={2} rowStart={2} rowEnd={3}>
          <HorizontalCard
            customText="Current total water spend per person this month is"
            measurementUnit="liters"
            amount={+diff.toFixed(2)}
            isAboveAverage={isAboveAverage}
            title="test"
          />
        </GridItem>
        <GridItem colStart={2} colEnd={3} rowStart={2} rowEnd={3}>
          <HorizontalCard
            customText="Current total water spend per person this month is"
            measurementUnit="liters"
            amount={+diff.toFixed(2)}
            isAboveAverage={isAboveAverage}
            title="test"
          />
        </GridItem>

        <GridItem colStart={1} colEnd={2} rowStart={3} rowEnd={4}>
          <HorizontalCard
            customText="Current total water spend per person this month is"
            measurementUnit="liters"
            amount={+diff.toFixed(2)}
            isAboveAverage={isAboveAverage}
            title="test"
          />
        </GridItem>
        <GridItem colStart={2} colEnd={3} rowStart={3} rowEnd={4}>
          <HorizontalCard
            customText="Current total water spend per person this month is"
            measurementUnit="liters"
            amount={+diff.toFixed(2)}
            isAboveAverage={isAboveAverage}
            title="test"
          />
        </GridItem>

        <GridItem colStart={1} colEnd={2} rowStart={4} rowEnd={5}>
          <HorizontalCard
            customText="Current total water spend per person this month is"
            measurementUnit="liters"
            amount={+diff.toFixed(2)}
            isAboveAverage={isAboveAverage}
            title="test"
          />
        </GridItem>
        <GridItem colStart={2} colEnd={3} rowStart={4} rowEnd={5}>
          <HorizontalCard
            customText="Current total water spend per person this month is"
            measurementUnit="liters"
            amount={+diff.toFixed(2)}
            isAboveAverage={isAboveAverage}
            title="test"
          />
        </GridItem>
      </Grid>

      {diff > 0 ? (
        <li>
          Current total water spend per person this month is {diff.toFixed(2)}L
          above the global average.
        </li>
      ) : (
        <li>
          Current total water spend per person this month is{" "}
          {(diff * -1).toFixed(2)}L below the global average.
        </li>
      )}
      {props.monthlySpend.map((data) => {
        const diff =
          data.total / props.peopleCount - props.averageSpend[data.device];
        return diff > 0 ? (
          <li>
            Current total water spend per person with your {data.device} this
            month is {diff.toFixed(2)}L above the global average.
          </li>
        ) : (
          <li>
            Current total water spend per person with your {data.device} this
            month is {(diff * -1).toFixed(2)}L below the global average.
          </li>
        );
      })}
    </>
  );
};

export default AverageList;
