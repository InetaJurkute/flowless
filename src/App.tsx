import { ChakraProvider, Grid, GridItem, Heading } from "@chakra-ui/react";
import React, { useContext, useMemo, useState } from "react";
import sumBy from "lodash/sumBy";

import "./App.css";
import DataContext, { currentDate, filterData } from "./context/DataContext";
import { UsagePerDayChart } from "./charts/UsagePerDayChart";
import { SpendCard } from "./widgets/SpendCard";
import { currentMonth, Appliance, Measurement } from "./context/DataContext";
import { WaterIcon } from "./components/icons/WaterIcon";
import { blueColor, mediumGrayColor } from "./theme/colors";
import { TotalUsageByDeviceChart } from "./TotalUsageByDeviceChart";
import { getAverage } from "./utils";
import { sum } from "lodash";
import AverageList from "./widgets/AverageList";
import { GoalSetter, GoalType } from "./components/GoalSetter";
import { ChallengesPage } from "./pages/ChallengesPage";
import GoalContext from "./context/GoalContext";

enum MenuCategory {
  Consumption = "Consumption",
  Spend = "Spend",
  Sustainability = "Sustainability",
  Challenges = "Challenges",
}

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

  //   <ChakraProvider>
  //   <div className="App">
  //     <Heading textAlign="left" as="h1" size="xl" marginBottom="32px">
  //       Welcome, <br />
  //       here's your dashboard
  //     </Heading>
  //     {/* <MenuCategoryStrip
  //       categories={Object.values(MenuCategory)}
  //       activeCategory={activeCategory}
  //       setActiveCategory={setActiveCategory}
  //     /> */}
  //     <div className="dashboard-wrapper">
  //       <div className="flex-bigger">
  //         <TotalUsageByDeviceChart data={getTotalUsageByDeiceData} />
  //       </div>
  //       <div className="flex-small">
  //         <Grid
  //           gap={4}
  //           templateRows="repeat(5, 1fr)"
  //           templateColumns="repeat(2, 1fr)"
  //         >
  //           <GridItem colStart={1} colEnd={2} rowStart={1} rowEnd={4}>
  //             <SpendCard
  //               icon={<WaterIcon />}
  //               title="Water Consumption"
  //               amount={getTotalConsumption}
  //               measurementUnit="liters"
  //               goalAmount={120}
  //               bgColor={mediumGrayColor}
  //               textColor={blueColor}
  //             />
  //           </GridItem>
  //           <GridItem colStart={2} colEnd={3} rowStart={1} rowEnd={3}>
  //             <SpendCard
  //               icon={<WaterIcon />}
  //               title="Water Consumption"
  //               amount={getTotalConsumption}
  //               measurementUnit="liters"
  //               goalAmount={120}
  //               bgColor={mediumGrayColor}
  //               textColor={blueColor}
  //             />
  //           </GridItem>
  //           <GridItem colStart={1} colEnd={2} rowStart={4} rowEnd={6}>
  //             <SpendCard
  //               icon={<WaterIcon />}
  //               title="Water Consumption"
  //               amount={getTotalConsumption}
  //               measurementUnit="liters"
  //               goalAmount={120}
  //               bgColor={mediumGrayColor}
  //               textColor={blueColor}
  //             />
  //           </GridItem>
  //           <GridItem colStart={2} colEnd={3} rowStart={3} rowEnd={6}>
  //             <SpendCard
  //               icon={<WaterIcon />}
  //               title="Water Consumption"
  //               amount={getTotalConsumption}
  //               measurementUnit="liters"
  //               goalAmount={120}
  //               bgColor={mediumGrayColor}
  //               textColor={blueColor}
  //             />
  //           </GridItem>
  //         </Grid>
  //       </div>
  //     </div>
  //     {activeCategory === MenuCategory.Consumption && (
  //       <UsagePerDayChart data={monthData} />
  //     )}
  //   </div>
  // </ChakraProvider>

  return (
    <GoalContext.Provider
      value={{ litersGoal, setLitersGoal, moneyGoal, setMoneyGoal }}
    >
      <ChakraProvider>
        <div className="App">
          {/* <MenuCategoryStrip
            categories={Object.values(MenuCategory)}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          /> */}
          <GoalSetter data={data} />
          <Heading textAlign="left" as="h1" size="xl" marginBottom="32px">
            Welcome, <br />
            here's your dashboard
          </Heading>
          <div className="dashboard-wrapper">
            <div className="flex-bigger">
              <TotalUsageByDeviceChart data={getTotalUsageByDeiceData} />
            </div>
            <div className="flex-small">
              <Grid
                gap={4}
                templateRows="repeat(5, 1fr)"
                templateColumns="repeat(2, 1fr)"
              >
                <GridItem colStart={1} colEnd={2} rowStart={1} rowEnd={4}>
                  <SpendCard
                    icon={<WaterIcon />}
                    title="Water Consumption"
                    amount={getTotalConsumption}
                    measurementUnit="liters"
                    goalAmount={Number(litersGoal)}
                    bgColor={mediumGrayColor}
                    textColor={blueColor}
                  />
                </GridItem>
                <GridItem colStart={2} colEnd={3} rowStart={1} rowEnd={3}>
                  <SpendCard
                    icon={<WaterIcon />}
                    title="Water Consumption"
                    amount={getTotalConsumption}
                    measurementUnit="liters"
                    goalAmount={120}
                    bgColor={mediumGrayColor}
                    textColor={blueColor}
                  />
                </GridItem>
                <GridItem colStart={1} colEnd={2} rowStart={4} rowEnd={6}>
                  <SpendCard
                    icon={<WaterIcon />}
                    title="Water Consumption"
                    amount={getTotalConsumption}
                    measurementUnit="liters"
                    goalAmount={120}
                    bgColor={mediumGrayColor}
                    textColor={blueColor}
                  />
                </GridItem>
                <GridItem colStart={2} colEnd={3} rowStart={3} rowEnd={6}>
                  <SpendCard
                    icon={<WaterIcon />}
                    title="Water Consumption"
                    amount={getTotalConsumption}
                    measurementUnit="liters"
                    goalAmount={120}
                    bgColor={mediumGrayColor}
                    textColor={blueColor}
                  />
                </GridItem>
              </Grid>
            </div>
          </div>

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
    </GoalContext.Provider>
  );
}

export default App;
