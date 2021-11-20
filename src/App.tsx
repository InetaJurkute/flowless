import { ChakraProvider } from "@chakra-ui/react";
import React, { useContext, useMemo, useState } from "react";

import "./App.css";
import DataContext, { currentDate, filterData } from "./context/DataContext";
import { TotalUsageByDeviceChart } from "./TotalUsageByDeviceChart";
import { UsagePerDayChart } from "./charts/UsagePerDayChart";
import { MenuCategoryStrip } from "./components/MenuCategoryStrip";

enum MenuCategory {
  Consumption = "Consumption",
  Spend = "Spend",
  Sustainability = "Sustainability",
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
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <ChakraProvider>
      <div className="App">
        <MenuCategoryStrip
          categories={Object.values(MenuCategory)}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        {activeCategory === null && <TotalUsageByDeviceChart data={data} />}
        {activeCategory === MenuCategory.Consumption && (
          <UsagePerDayChart data={monthData} />
        )}
      </div>
    </ChakraProvider>
  );
}

export default App;
