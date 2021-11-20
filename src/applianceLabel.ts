import { Appliance } from "./context/DataContext";

export enum ApplianceLabel {
  Shower = "Hydractiva Shower",
  KitchenFaucet = "Kitchen Optima Faucet",
  Faucet = "Optima Faucet",
  Dishwasher = "Dishwasher",
  WashingMachine = "Washing Machine",
}

export const labelMap = new Map<Appliance, ApplianceLabel>([
  [Appliance.Shower, ApplianceLabel.Shower],
  [Appliance.KitchenFaucet, ApplianceLabel.KitchenFaucet],
  [Appliance.Faucet, ApplianceLabel.Faucet],
  [Appliance.Dishwasher, ApplianceLabel.Dishwasher],
  [Appliance.WashingMachine, ApplianceLabel.WashingMachine],
]);
