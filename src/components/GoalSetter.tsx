import { Button } from "@chakra-ui/button";
import {
  Appliance,
  currentDate,
  DataSet,
  Measurement,
} from "../context/DataContext";
import { Form, Formik, Field, ErrorMessage, useFormikContext } from "formik";
import { sumBy } from "lodash";
import { useContext, useState } from "react";
import GoalContext from "../context/GoalContext";

export enum GoalType {
  Liters = "Liters",
  Money = "Budget",
}

interface MonthlyGoal {
  monthlyGoalType: string;
  monthlyGoalAmount: string;
}

//In Helsinki, residents pay 1.96 euros per cubic metre of clean drinking water.
const waterLiterPrice = 1.96 / 1000;

// Finland Household, kWh price: 0.160 EURO
const electricityPrice = 0.16;

//money needed by liters = liters * price + heating power * price
//liters needed by money = average heating needed per last 12 months * price + average liters needed per last 12 months * price

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

const getForecastedMoney = (values: MonthlyGoal, data: DataSet) => {
  const goalLiters = parseInt(values.monthlyGoalAmount);

  const priceForWater = goalLiters * waterLiterPrice;
  const energyNeededToHeatOneLiter = getAverageHeatingForLiterOfWater(data, 12);
  const priceHeating =
    energyNeededToHeatOneLiter * goalLiters * electricityPrice;

  return priceForWater + priceHeating;
};

const getForecastedLiters = (values: MonthlyGoal, data: DataSet) => {
  const goalMoney = parseInt(values.monthlyGoalAmount);

  const energyNeededToHeatOneLiter = getAverageHeatingForLiterOfWater(data, 12);
  const price = energyNeededToHeatOneLiter * electricityPrice + waterLiterPrice;

  return goalMoney / price;
};

export const GoalSetter = ({ data }: { data: DataSet }) => {
  const { litersGoal, setLitersGoal, moneyGoal, setMoneyGoal } =
    useContext(GoalContext);

  const [newGoalSet, setNewGoalSet] = useState(false);

  const handleSubmit = (values: MonthlyGoal, {}) => {
    setNewGoalSet(true);
    if (values.monthlyGoalType === GoalType.Liters) {
      localStorage.setItem(GoalType.Liters, values.monthlyGoalAmount);
      setLitersGoal(values.monthlyGoalAmount);

      const forecastedMoney = getForecastedMoney(values, data);
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
            <select
              name="monthlyGoalType"
              value={values.monthlyGoalType}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="" label="Select a type" />
              <option
                value={GoalType.Liters.toString()}
                label={GoalType.Liters.toString()}
              />
              <option
                value={GoalType.Money.toString()}
                label={GoalType.Money.toString()}
              />
            </select>

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

            {newGoalSet && values.monthlyGoalType === GoalType.Liters && (
              <div>
                You will spend ~{moneyGoal} EU on water if you stick to your
                goal!
              </div>
            )}

            {newGoalSet && values.monthlyGoalType === GoalType.Money &&  (
              <div>You should use ~{litersGoal} to hit your budget goal!</div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};
