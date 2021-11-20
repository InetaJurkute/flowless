import { ChakraProvider } from "@chakra-ui/react";
import React, { useContext, useMemo, useState } from "react";
import sumBy from 'lodash/sumBy'

import "./App.css";
import DataContext, { currentDate, filterData } from "./context/DataContext";
import { TotalUsageByDeviceChart } from "./TotalUsageByDeviceChart";
import { UsagePerDayChart } from "./charts/UsagePerDayChart";
import { MenuCategoryStrip } from "./components/MenuCategoryStrip";
import { SpendCard } from "./widgets/SpendCard";
import { currentMonth, Appliance, Measurement } from "./context/DataContext";
import { getAverage } from "./utils";
import { sum } from "lodash";
import AverageList from "./widgets/AverageList";
import { GoalSetter } from "./components/GoalSetter";
import { ChallengesPage } from './pages/ChallengesPage'

enum MenuCategory {
  Consumption = "Consumption",
  Spend = "Spend",
  Sustainability = "Sustainability",
  Challenges = "Challenges",
}

function App() {
  const data = useContext(DataContext);

  const monthData = useMemo(() => {
    return filterData(
      data,
      currentDate.startOf("month").toString(),
      currentDate.endOf("month").toString()
    );
  }, [data]);

  const applianceAverages = {
    [Appliance.Dishwasher]: getAverage(monthData, Appliance.Dishwasher),
    [Appliance.Faucet]: getAverage(monthData, Appliance.Faucet),
    [Appliance.KitchenFaucet]: getAverage(monthData, Appliance.KitchenFaucet),
    [Appliance.Shower]: getAverage(monthData, Appliance.Shower),
    [Appliance.WashingMachine]: getAverage(monthData, Appliance.WashingMachine),
  };
  const monthlyAverages = {
    ...applianceAverages,
    Total: sum(Object.values(applianceAverages)),
  };
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const getTotalUsageByDeiceData = useMemo(() => {
    //USE THE FIRST ONE
    const myApartmentData = data.houses[0].apartments[0];

    const summedData = Object.values(Appliance).map((device) => {
      const myMeasurements = myApartmentData[device].measurements.filter(
        (m) => m.TimeStamp >= currentMonth.toString()
      );
      return {
        device,
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
    <ChakraProvider>
      <div className="App">
        <MenuCategoryStrip
          categories={Object.values(MenuCategory)}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <GoalSetter data={data} />
        <SpendCard amount={getTotalConsumption} />
        {activeCategory === null && (
          <TotalUsageByDeviceChart data={getTotalUsageByDeiceData} />
        )}
        {activeCategory === MenuCategory.Consumption && (
          <>
            <UsagePerDayChart data={monthData} />
            <AverageList
              monthlySpend={getTotalUsageByDeiceData}
              averageSpend={monthlyAverages}
              totalSpend={getTotalConsumption}
              peopleCount={parseFloat(data.houses[0].apartments[0].people)}
            />
          </>
        )}
        {activeCategory === MenuCategory.Challenges && <ChallengesPage />}
      </div>
    </ChakraProvider>
  );
}

export default App;
