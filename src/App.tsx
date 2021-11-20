import { ChakraProvider } from "@chakra-ui/react";
import React, { useContext, useMemo, useState } from "react";

import "./App.css";
import DataContext, { currentDate, filterData } from "./context/DataContext";
import { TotalUsageByDeviceChart } from "./TotalUsageByDeviceChart";
import { UsagePerDayChart } from "./charts/UsagePerDayChart";
import { MenuCategoryStrip } from "./components/MenuCategoryStrip";

enum MenuCategory {
  Cat1 = "Cat1",
  Cat2 = "Cat2",
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
        <TotalUsageByDeviceChart data={data} />
        <UsagePerDayChart data={monthData} />
      </div>
    </ChakraProvider>
  );
}

export default App;
