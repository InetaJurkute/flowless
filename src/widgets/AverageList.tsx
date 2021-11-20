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
      <HorizontalCard
        customText="Current total water spend per person this month is"
        measurementUnit="liters"
        amount={isAboveAverage ? +diff.toFixed(2) : +(-diff).toFixed(2)}
        isAboveAverage={isAboveAverage}
        title="test"
      />
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
