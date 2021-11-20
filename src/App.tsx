import { ChakraProvider } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Box } from "@chakra-ui/layout";

import "./App.css";
import DataContext from "./context/DataContext";
import { TotalUsageByDeviceChart } from "./TotalUsageByDeviceChart";
import { MenuCategoryStrip } from "./components/MenuCategoryStrip";

enum MenuCategory {
  Cat1 = "Cat1",
  Cat2 = "Cat2",
}

function App() {
  const data = useContext(DataContext);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  console.log("activeCAtegory", activeCategory);

  return (
    <ChakraProvider>
      <div className="App">
        <Box w="100%" padding="20px">
          <MenuCategoryStrip
            categories={Object.values(MenuCategory)}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          <Box margin="32px 0">
            <TotalUsageByDeviceChart data={data} />
          </Box>
          <Box
            w="100%"
            h="200px"
            bgGradient="linear(to-r, green.200, pink.500)"
          />
        </Box>
      </div>
    </ChakraProvider>
  );
}

export default App;
