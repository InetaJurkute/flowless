import React, { createContext } from "react";
import data from "./db.json";

export interface Measurement {
  Consumption: number;
  Temp: number;
  FlowTime: number;
  PowerConsumption: number;
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
  people: number;
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

const DataContext = createContext(dataSet);

export default DataContext;
