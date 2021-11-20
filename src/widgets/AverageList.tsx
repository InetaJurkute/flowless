import { Grid, GridItem } from "@chakra-ui/react";
import { Appliance } from "../context/DataContext";
import {
  nivoGreenColor,
  nivoIvoryColor,
  nivoOrangeColor,
  nivoRedColor,
  nivoYellowColor,
} from "../theme/colors";
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
  const cardData = props.monthlySpend.map((data) => {
    const diff =
      data.total / props.peopleCount - props.averageSpend[data.device];
    const isAboveAverage = diff > 0;
    return { diff, isAboveAverage, device: data.device };
  });

  return (
    <>
      <Grid
        margin="64px 0"
        gap={4}
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(2, 1fr)"
      >
        <GridItem colStart={1} colEnd={2} rowStart={1} rowEnd={2}>
          <HorizontalCard
            customText="Current total water spend per person this month is"
            measurementUnit="liters"
            amount={isAboveAverage ? +diff.toFixed(2) : +(-diff).toFixed(2)}
            isAboveAverage={isAboveAverage}
          />
        </GridItem>

        <GridItem colStart={2} colEnd={3} rowStart={1} rowEnd={2}>
          <HorizontalCard
            bgColor={nivoIvoryColor}
            customText="Current total water spend per person with your"
            measurementUnit="liters"
            amount={+cardData[0].diff.toFixed(2)}
            isAboveAverage={cardData[0].isAboveAverage}
            title={cardData[0].device}
            subTitle="this month is"
          />
        </GridItem>
        <GridItem colStart={2} colEnd={3} rowStart={2} rowEnd={3}>
          <HorizontalCard
            bgColor={nivoRedColor}
            customText="Current total water spend per person with your"
            measurementUnit="liters"
            amount={+cardData[1].diff.toFixed(2)}
            isAboveAverage={cardData[1].isAboveAverage}
            title={cardData[1].device}
            subTitle="this month is"
          />
        </GridItem>

        <GridItem colStart={1} colEnd={2} rowStart={3} rowEnd={4}>
          <HorizontalCard
            bgColor={nivoYellowColor}
            customText="Current total water spend per person with your"
            measurementUnit="liters"
            amount={+cardData[2].diff.toFixed(2)}
            isAboveAverage={cardData[2].isAboveAverage}
            title={cardData[2].device}
            subTitle="this month is"
          />
        </GridItem>
        <GridItem colStart={2} colEnd={3} rowStart={3} rowEnd={4}>
          <HorizontalCard
            bgColor={nivoOrangeColor}
            customText="Current total water spend per person with your"
            measurementUnit="liters"
            amount={+cardData[3].diff.toFixed(2)}
            isAboveAverage={cardData[3].isAboveAverage}
            title={cardData[3].device}
            subTitle="this month is"
          />
        </GridItem>

        <GridItem colStart={1} colEnd={2} rowStart={2} rowEnd={3}>
          <HorizontalCard
            bgColor={nivoGreenColor}
            customText="Current total water spend per person with your"
            measurementUnit="liters"
            amount={+cardData[4].diff.toFixed(2)}
            isAboveAverage={cardData[4].isAboveAverage}
            title={cardData[4].device}
            subTitle="this month is"
          />
        </GridItem>
      </Grid>
    </>
  );
};

export default AverageList;
