import React from "react";
import ReactDOM from "react-dom";
import PNR from "./PNR";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<PNR />, div);
});
