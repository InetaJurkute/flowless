import { createContext } from "react";
import { DateTime } from "luxon";
import data from "./db.json";

export const currentDate = DateTime.now().minus({ years: 1 });
export const currentMonth = currentDate.startOf("month");

export interface Measurement {
  Consumption: string;
  Temp: string;
  FlowTime: string;
  PowerConsumption: string;
  TimeStamp: string;
}

export enum Appliance {
  Shower = "Hydractiva_shower",
  KitchenFaucet = "Kitchen_optima_faucet",
  Faucet = "Optima_faucet",
  Dishwasher = "Dishwasher",
  WashingMachine = "Washing_machine",
}

export interface ApartmentData {
  [index: string]: any;
  people: string;
  [Appliance.Shower]: { measurements: Measurement[] };
  [Appliance.KitchenFaucet]: { measurements: Measurement[] };
  [Appliance.Faucet]: { measurements: Measurement[] };
  [Appliance.Dishwasher]: { measurements: Measurement[] };
  [Appliance.WashingMachine]: { measurements: Measurement[] };
}

export interface HouseData {
  apartments: ApartmentData[];
}

export interface DataSet {
  houses: HouseData[];
}

export const filterData = (data: DataSet, from?: string, to?: string) => {
  const filteredDataSet: DataSet = { houses: [{ apartments: [] }] };
  data.houses[0].apartments.forEach((a) => {
    filteredDataSet.houses[0].apartments.push({
      ...a,
      [Appliance.Shower]: {
        measurements: a[Appliance.Shower].measurements.filter(
          (m) => (!to || m.TimeStamp <= to) && (!from || m.TimeStamp >= from)
        ),
      },
      [Appliance.KitchenFaucet]: {
        measurements: a[Appliance.KitchenFaucet].measurements.filter(
          (m) => (!to || m.TimeStamp <= to) && (!from || m.TimeStamp >= from)
        ),
      },
      [Appliance.Faucet]: {
        measurements: a[Appliance.Faucet].measurements.filter(
          (m) => (!to || m.TimeStamp <= to) && (!from || m.TimeStamp >= from)
        ),
      },
      [Appliance.Dishwasher]: {
        measurements: a[Appliance.Dishwasher].measurements.filter(
          (m) => (!to || m.TimeStamp <= to) && (!from || m.TimeStamp >= from)
        ),
      },
      [Appliance.WashingMachine]: {
        measurements: a[Appliance.WashingMachine].measurements.filter(
          (m) => (!to || m.TimeStamp <= to) && (!from || m.TimeStamp >= from)
        ),
      },
    });
  });
  return filteredDataSet;
};

const dataSet = data as unknown as DataSet;
const filteredDataSet = filterData(dataSet, undefined, currentDate.toString());

const DataContext = createContext(filteredDataSet);

export default DataContext;
