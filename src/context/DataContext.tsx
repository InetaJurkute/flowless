import { createContext } from "react";
import data from "./db.json";
import { DateTime } from "luxon";

export const currentDate = DateTime.now().minus({ years: 1 });

export interface Measurement {
  Consumption: string;
  Temp: string;
  FlowTime: string;
  PowerConsumption: string;
  TimeStamp: string;
}

export enum Applience {
  Shower = "Hydractiva_shower",
  KitchenFaucet = "Kitchen_optima_faucet",
  Faucet = "Optima_faucet",
  Dishwasher = "Dishwasher",
  WashingMachine = "Washing_machine",
}

export interface ApartmentData {
  [index: string]: any;
  people: string;
  [Applience.Shower]: { measurements: Measurement[] };
  [Applience.KitchenFaucet]: { measurements: Measurement[] };
  [Applience.Faucet]: { measurements: Measurement[] };
  [Applience.Dishwasher]: { measurements: Measurement[] };
  [Applience.WashingMachine]: { measurements: Measurement[] };
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
      [Applience.Shower]: {
        measurements: a[Applience.Shower].measurements.filter(
          (m) => (!to || m.TimeStamp <= to) && (!from || m.TimeStamp >= from)
        ),
      },
      [Applience.KitchenFaucet]: {
        measurements: a[Applience.KitchenFaucet].measurements.filter(
          (m) => (!to || m.TimeStamp <= to) && (!from || m.TimeStamp >= from)
        ),
      },
      [Applience.Faucet]: {
        measurements: a[Applience.Faucet].measurements.filter(
          (m) => (!to || m.TimeStamp <= to) && (!from || m.TimeStamp >= from)
        ),
      },
      [Applience.Dishwasher]: {
        measurements: a[Applience.Dishwasher].measurements.filter(
          (m) => (!to || m.TimeStamp <= to) && (!from || m.TimeStamp >= from)
        ),
      },
      [Applience.WashingMachine]: {
        measurements: a[Applience.WashingMachine].measurements.filter(
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
