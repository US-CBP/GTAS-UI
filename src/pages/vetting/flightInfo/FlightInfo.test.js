import React from "react";
import ReactDOM from "react-dom";
import FlightInfo from "./FlightInfo";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FlightInfo />, div);
});
