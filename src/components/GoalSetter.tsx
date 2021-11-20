import { Button } from "@chakra-ui/button";
import {
  Appliance,
  currentDate,
  DataSet,
  Measurement,
} from "../context/DataContext";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { sumBy } from "lodash";
import { useContext, useState } from "react";
import GoalContext from "../context/GoalContext";
import { Select } from "@chakra-ui/select";
import { Stack } from "@chakra-ui/layout";

export enum GoalType {
  Liters = "Liters",
  Money = "Budget",
  Power = "Power",
}

interface MonthlyGoal {
  monthlyGoalType: string;
  monthlyGoalAmount: string;
}

//In Helsinki, residents pay 1.96 euros per cubic metre of clean drinking water.
const waterLiterPrice = 1.96 / 1000;

// Finland Household, kWh price: 0.160 EURO
const electricityPrice = 0.16;

const getAverageHeatingForLiterOfWater = (
  data: DataSet,
  months: number //use data from last N months
) => {
  const myApartmentData = data.houses[0].apartments[0];
  const sumByDevice = Object.values(Appliance).map((appliance) => {
    const myMeasurements = myApartmentData[appliance].measurements.filter(
      (m) =>
        m.TimeStamp >= currentDate.minus({ months }).toString() &&
        m.TimeStamp <= currentDate.toString()
    );

    return {
      liters: sumBy(myMeasurements, (x) =>
        parseFloat((x as Measurement).Consumption)
      ),
      power: sumBy(myMeasurements, (x) =>
        parseFloat((x as Measurement).Power_Consumption)
      ),
    };
  });

  const totalPower = sumBy(sumByDevice, (x) => x.power);
  const totalLiters = sumBy(sumByDevice, (x) => x.liters);

  return totalPower / totalLiters;
};

// budget needed for litersGOAL = goalLiters * waterLiterPrice  +  average kWh used per liter * goalLiters * kWh price
const getForecastedBudget = (values: MonthlyGoal, data: DataSet) => {
  const goalLiters = parseInt(values.monthlyGoalAmount);

  const priceForWater = goalLiters * waterLiterPrice;
  const energyNeededToHeatOneLiter = getAverageHeatingForLiterOfWater(data, 12);
  const priceHeating =
    energyNeededToHeatOneLiter * goalLiters * electricityPrice;

  return priceForWater + priceHeating;
};

// priceForOneLiter = average kWh used per liter * kWh price + waterLiterPrice
// liters needed for budgetGOAL = goalMoney / priceForOneLiter
const getForecastedLiters = (values: MonthlyGoal, data: DataSet) => {
  const goalMoney = parseInt(values.monthlyGoalAmount);

  const energyNeededToHeatOneLiter = getAverageHeatingForLiterOfWater(data, 12);
  const priceForOneLiter =
    energyNeededToHeatOneLiter * electricityPrice + waterLiterPrice;

  return goalMoney / priceForOneLiter;
};

export const GoalSetter = ({ data }: { data: DataSet }) => {
  const { litersGoal, setLitersGoal, moneyGoal, setMoneyGoal, setPowerGoal } =
    useContext(GoalContext);

  const [newGoalSet, setNewGoalSet] = useState(false);

  const handleSubmit = (values: MonthlyGoal, {}) => {
    setNewGoalSet(true);
    if (values.monthlyGoalType === GoalType.Power) {
      localStorage.setItem(GoalType.Power, values.monthlyGoalAmount);
      setPowerGoal(values.monthlyGoalAmount);
    } else if (values.monthlyGoalType === GoalType.Liters) {
      localStorage.setItem(GoalType.Liters, values.monthlyGoalAmount);
      setLitersGoal(values.monthlyGoalAmount);

      const forecastedMoney = getForecastedBudget(values, data);
      localStorage.setItem(GoalType.Money, forecastedMoney.toFixed(2));
      setMoneyGoal(forecastedMoney.toFixed(2));
    } else if (values.monthlyGoalType === GoalType.Money) {
      localStorage.setItem(GoalType.Money, values.monthlyGoalAmount.toString());
      setMoneyGoal(values.monthlyGoalAmount.toString());

      const forecastedLiters = getForecastedLiters(values, data);
      localStorage.setItem(GoalType.Liters, forecastedLiters.toFixed(2));
      setLitersGoal(forecastedLiters.toFixed(2));
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          monthlyGoalType: GoalType.Liters.toString(),
          monthlyGoalAmount: "4000",
        }}
        onSubmit={handleSubmit}
        //validate
      >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <Stack spacing={3}>
              <Select
                name="monthlyGoalType"
                value={values.monthlyGoalType}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option
                  value={GoalType.Liters.toString()}
                  label={GoalType.Liters.toString()}
                />
                <option
                  value={GoalType.Money.toString()}
                  label={GoalType.Money.toString()}
                />
                <option
                  value={GoalType.Power.toString()}
                  label={GoalType.Power.toString()}
                />
              </Select>

              <Field
                type="text"
                name="monthlyGoalAmount"
                style={{ backgroundColor: "yellow" }}
                onChange={(values: any) => {
                  setNewGoalSet(false);
                  handleChange(values);
                }}
              />
              <ErrorMessage name="monthlyGoalAmount" component="div" />

              <Button type="submit">Set Goal</Button>
            </Stack>

            {newGoalSet && values.monthlyGoalType === GoalType.Liters && (
              <div>
                You will spend ~{moneyGoal} EUR on water if you stick to your
                goal!
              </div>
            )}

            {newGoalSet && values.monthlyGoalType === GoalType.Money && (
              <div>You should use ~{litersGoal} to hit your budget goal!</div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};
