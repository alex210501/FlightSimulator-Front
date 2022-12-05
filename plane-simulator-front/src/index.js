import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import MapChart from "./MapChart";
import Timer from "./time";

function App() {
  return (
    <div >
      <div className="timer" ><Timer /></div>
      <div className ='map'><MapChart /></div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
