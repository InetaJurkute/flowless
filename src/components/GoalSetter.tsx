import { Button } from "@chakra-ui/button";
import { DataSet } from "../context/DataContext";
import { Form, Formik, Field, ErrorMessage } from "formik";

enum GoalType {
  Liters = "Liters",
  Money = "Money",
}

interface MonthlyGoal {
  monthlyGoalType: string;
  monthlyGoalAmount: string;
}

export const GoalSetter = ({ data }: { data: DataSet }) => {
  const handleSubmit = (values: MonthlyGoal, {}) => {
    console.log("calculate matching goal", values);

    //calculate related liters/money
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
