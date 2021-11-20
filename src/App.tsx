import React, { useContext } from "react";

import "./App.css";
import DataContext from "./context/DataContext";
import { TotalUsageByDeviceChart } from "./TotalUsageByDeviceChart";

function App() {
  const data = useContext(DataContext);

  return (
    <div className="App">
      <TotalUsageByDeviceChart data={data} />
    </div>
  );
}

export default App;
