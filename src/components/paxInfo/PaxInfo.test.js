import React from "react";
import ReactDOM from "react-dom";
import PaxInfo from "./PaxInfo";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<PaxInfo />, div);
});
