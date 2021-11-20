import { ChakraProvider } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Box } from "@chakra-ui/layout";

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

  const monthData = filterData(
    data,
    currentDate.startOf("month").toString(),
    currentDate.endOf("month").toString()
  );
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  console.log("activeCAtegory", activeCategory);

  return (
    <ChakraProvider>
      <div className="App">
        <TotalUsageByDeviceChart data={data} />
        <UsagePerDayChart data={monthData} />
      </div>
    </ChakraProvider>
  );
}

export default App;
