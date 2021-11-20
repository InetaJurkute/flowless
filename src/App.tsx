import React, { useContext } from "react";

import logo from "./logo.svg";
import "./App.css";
import DataContext from "./context/DataContext";

function App() {
  const data = useContext(DataContext);
  console.log("data stuff", data.houses[0].apartments);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
