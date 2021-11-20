import React, { createContext } from "react";
import data from "./db.json";

export const currentDate = "2020-11-15";

export interface Measurement {
  Consumption: string;
  Temp: string;
  FlowTime: string;
  PowerConsumption: string;
  TimeStamp: string;
}

export enum KitchenApplience {
  Shower = "Hydractiva_shower",
  KitchenFaucet = "Kitchen_optima_faucet",
  Faucet = "Optima_faucet",
  Dishwasher = "Dishwasher",
  WashingMachine = "Washing_machine",
}

export interface ApartmentData {
  people: string;
  [KitchenApplience.Shower]: { measurements: Measurement[] };
  [KitchenApplience.KitchenFaucet]: { measurements: Measurement[] };
  [KitchenApplience.Faucet]: { measurements: Measurement[] };
  [KitchenApplience.Dishwasher]: { measurements: Measurement[] };
  [KitchenApplience.WashingMachine]: { measurements: Measurement[] };
}

export interface HouseData {
  apartments: ApartmentData[];
}

export interface DataSet {
  houses: HouseData[];
}

const dataSet = data as DataSet;
const filteredDataSet: DataSet = {houses: [{apartments: []}]};
dataSet.houses[0].apartments.forEach(a => {
    filteredDataSet.houses[0].apartments.push({
        ...a,
        [KitchenApplience.Shower]: {measurements: a[KitchenApplience.Shower].measurements.filter(m => m.TimeStamp < currentDate)},
        [KitchenApplience.KitchenFaucet]: {measurements: a[KitchenApplience.KitchenFaucet].measurements.filter(m => m.TimeStamp < currentDate)},
        [KitchenApplience.Faucet]: {measurements: a[KitchenApplience.Faucet].measurements.filter(m => m.TimeStamp < currentDate)},
        [KitchenApplience.Dishwasher]: {measurements: a[KitchenApplience.Dishwasher].measurements.filter(m => m.TimeStamp < currentDate)},
        [KitchenApplience.WashingMachine]: {measurements: a[KitchenApplience.WashingMachine].measurements.filter(m => m.TimeStamp < currentDate)}
    })
})

const DataContext = createContext(filteredDataSet);

export default DataContext;
