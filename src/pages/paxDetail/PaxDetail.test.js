import React from "react";
import ReactDOM from "react-dom";
import PaxDetail from "./PaxDetail";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<PaxDetail />, div);
});
