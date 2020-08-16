import React from "react";
import ReactDOM from "react-dom";
import FlightHistory from "./FlightHistory";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FlightHistory />, div);
});
