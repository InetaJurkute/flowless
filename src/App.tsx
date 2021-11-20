import { ChakraProvider } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Box } from "@chakra-ui/layout";

import "./App.css";
import DataContext from "./context/DataContext";
import { TotalUsageByDeviceChart } from "./TotalUsageByDeviceChart";

function App() {
  const data = useContext(DataContext);

  return (
    <ChakraProvider>
      <div className="App">
        <TotalUsageByDeviceChart data={data} />
        <Box
          w="100%"
          h="200px"
          bgGradient="linear(to-r, green.200, pink.500)"
        />
      </div>
    </ChakraProvider>
  );
}

export default App;
