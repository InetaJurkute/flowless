import { Button } from "@chakra-ui/button";
import {
  Appliance,
  currentDate,
  currentMonth,
  DataSet,
  Measurement,
} from "../context/DataContext";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { sumBy, sum } from "lodash";

enum GoalType {
  Liters = "Liters",
  Money = "Money",
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

export const GoalSetter = ({ data }: { data: DataSet }) => {
  const handleSubmit = (values: MonthlyGoal, {}) => {
    console.log("calculate matching goal", values);

    //all hell breaks loose if form is not validated
    if (values.monthlyGoalType === GoalType.Liters) {
      const goalLiters = parseInt(values.monthlyGoalAmount);

      const priceForWater = goalLiters * waterLiterPrice;
      const energyNeededToHeatOneLiter = getAverageHeatingForLiterOfWater(
        data,
        12
      );
      const priceHeating =
        energyNeededToHeatOneLiter * goalLiters * electricityPrice;

      console.log("TOTAL PRICE, euro", priceForWater + priceHeating);
    }

    if (values.monthlyGoalType === GoalType.Money) {
    }

    //save to local state
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
            />
            <ErrorMessage name="monthlyGoalAmount" component="div" />

            <Button type="submit">Set Goal</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
