import React, { createContext } from "react";
import data from "./db.json";

export const currentDate = '2020-'

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
  [index: string]: any;
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

const DataContext = createContext(dataSet);

export default DataContext;
