import React from "react";
import ReactDOM from "react-dom";
import LinkAnalysis from "./LinkAnalysis";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LinkAnalysis />, div);
});
