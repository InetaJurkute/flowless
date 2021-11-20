import { createContext } from "react";
import { DateTime } from "luxon";
import data from "./db.json";

export const currentDate = DateTime.now().minus({ years: 1 });

export interface Measurement {
  Consumption: string;
  Temp: string;
  FlowTime: string;
  PowerConsumption: string;
  TimeStamp: string;
}

export enum KitchenAppliance {
  Shower = "Hydractiva_shower",
  KitchenFaucet = "Kitchen_optima_faucet",
  Faucet = "Optima_faucet",
  Dishwasher = "Dishwasher",
  WashingMachine = "Washing_machine",
}

export interface ApartmentData {
  [index: string]: any;
  people: string;
  [KitchenAppliance.Shower]: { measurements: Measurement[] };
  [KitchenAppliance.KitchenFaucet]: { measurements: Measurement[] };
  [KitchenAppliance.Faucet]: { measurements: Measurement[] };
  [KitchenAppliance.Dishwasher]: { measurements: Measurement[] };
  [KitchenAppliance.WashingMachine]: { measurements: Measurement[] };
}

export interface HouseData {
  apartments: ApartmentData[];
}

export interface DataSet {
  houses: HouseData[];
}

const dataSet = data as unknown as DataSet;
const filteredDataSet: DataSet = { houses: [{ apartments: [] }] };
dataSet.houses[0].apartments.forEach((a) => {
  filteredDataSet.houses[0].apartments.push({
    ...a,
    [KitchenAppliance.Shower]: {
      measurements: a[KitchenAppliance.Shower].measurements.filter(
        (m) => m.TimeStamp < currentDate.toString()
      ),
    },
    [KitchenAppliance.KitchenFaucet]: {
      measurements: a[KitchenAppliance.KitchenFaucet].measurements.filter(
        (m) => m.TimeStamp < currentDate.toString()
      ),
    },
    [KitchenAppliance.Faucet]: {
      measurements: a[KitchenAppliance.Faucet].measurements.filter(
        (m) => m.TimeStamp < currentDate.toString()
      ),
    },
    [KitchenAppliance.Dishwasher]: {
      measurements: a[KitchenAppliance.Dishwasher].measurements.filter(
        (m) => m.TimeStamp < currentDate.toString()
      ),
    },
    [KitchenAppliance.WashingMachine]: {
      measurements: a[KitchenAppliance.WashingMachine].measurements.filter(
        (m) => m.TimeStamp < currentDate.toString()
      ),
    },
  });
});

const DataContext = createContext(filteredDataSet);

export default DataContext;
