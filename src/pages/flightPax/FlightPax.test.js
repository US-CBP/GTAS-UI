import React from "react";
import ReactDOM from "react-dom";
import FlightPax from "./FlightPax";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FlightPax />, div);
});
