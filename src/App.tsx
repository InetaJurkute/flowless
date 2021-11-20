import { ChakraProvider } from "@chakra-ui/react";
import React, { useContext, useMemo, useState } from "react";
import sumBy from "lodash/sumBy";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import DataContext, { currentDate, filterData } from "./context/DataContext";
import { currentMonth, Appliance, Measurement } from "./context/DataContext";
import { getAverage } from "./utils";
import { sum } from "lodash";
import { GoalType } from "./components/GoalSetter";
import { ChallengesPage } from "./pages/ChallengesPage";
import GoalContext from "./context/GoalContext";
import { PowerConsumptionPerDayChart } from "./charts/PowerConsuptionPerDayChart";
import { Dashboard } from "./pages/Dashboard";
import { ConsumptionPage } from "./pages/ConsumptionPage";
import { labelMap } from "./applianceLabel";
import { AverageSpend } from "./widgets/AverageList";

function App() {
  const [litersGoal, setLitersGoal] = useState(
    localStorage.getItem(GoalType.Liters)
  );
  const [moneyGoal, setMoneyGoal] = useState(
    localStorage.getItem(GoalType.Money)
  );
  const data = useContext(DataContext);

  const monthData = useMemo(() => {
    return filterData(
      data,
      currentDate.startOf("month").toString(),
      currentDate.endOf("month").toString()
    );
  }, [data]);

  const applianceAverages = {
    [labelMap.get(Appliance.Dishwasher)!]: getAverage(
      monthData,
      Appliance.Dishwasher
    ),
    [labelMap.get(Appliance.Faucet)!]: getAverage(monthData, Appliance.Faucet),
    [labelMap.get(Appliance.KitchenFaucet)!]: getAverage(
      monthData,
      Appliance.KitchenFaucet
    ),
    [labelMap.get(Appliance.Shower)!]: getAverage(monthData, Appliance.Shower),
    [labelMap.get(Appliance.WashingMachine)!]: getAverage(
      monthData,
      Appliance.WashingMachine
    ),
  };
  const monthlyAverages = {
    ...applianceAverages,
    Total: sum(Object.values(applianceAverages)),
  } as AverageSpend;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const getTotalUsageByDeiceData = useMemo(() => {
    //USE THE FIRST ONE
    const myApartmentData = data.houses[0].apartments[0];

    const summedData = Object.values(Appliance).map((device) => {
      const myMeasurements = myApartmentData[device].measurements.filter(
        (m) => m.TimeStamp >= currentMonth.toString()
      );
      return {
        device: labelMap.get(device)!,
        total: sumBy(myMeasurements, (x) =>
          parseFloat((x as Measurement).Consumption)
        ),
      };
    });

    return summedData;
  }, [data.houses]);

  const getTotalConsumption = useMemo(() => {
    return Math.floor(sumBy(getTotalUsageByDeiceData, (x) => x.total));
  }, [getTotalUsageByDeiceData]);

  return (
    <GoalContext.Provider
      value={{ litersGoal, setLitersGoal, moneyGoal, setMoneyGoal }}
    >
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="flowless"
              element={
                <Dashboard
                  data={data}
                  getTotalConsumption={getTotalConsumption}
                  getTotalUsageByDeiceData={getTotalUsageByDeiceData}
                />
              }
            />
            <Route
              path="flowless/consumption"
              element={
                <ConsumptionPage
                  data={data}
                  getTotalConsumption={getTotalConsumption}
                  getTotalUsageByDeiceData={getTotalUsageByDeiceData}
                  monthData={monthData}
                  monthlyAverages={monthlyAverages}
                />
              }
            />
            <Route
              path="flowless/power"
              element={<PowerConsumptionPerDayChart data={monthData} />}
            />
            <Route path="flowless/challenges" element={<ChallengesPage />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </GoalContext.Provider>
  );
}

export default App;
