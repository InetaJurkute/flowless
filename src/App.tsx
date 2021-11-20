import { ChakraProvider } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Box } from "@chakra-ui/layout";

import "./App.css";
import DataContext, { currentDate, filterData } from "./context/DataContext";
import { TotalUsageByDeviceChart } from "./TotalUsageByDeviceChart";
import { UsagePerDayChart } from "./charts/UsagePerDayChart";

function App() {
  const data = useContext(DataContext);

  const monthData = filterData(
    data,
    currentDate.startOf("month").toString(),
    currentDate.endOf("month").toString()
  );

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
