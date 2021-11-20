import { Appliance, DataSet } from "./context/DataContext";

export const getAverage = (data: DataSet, appliance: Appliance) =>
  +(
    data.houses[0].apartments.reduce((acc, appartment) => {
      return (
        acc +
        appartment[appliance].measurements.reduce((acc, m) => {
          return (
            acc + parseFloat(m.Consumption) / parseFloat(appartment.people)
          );
        }, 0)
      );
    }, 0) / data.houses[0].apartments.length
  ).toFixed(2);
