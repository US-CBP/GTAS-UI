import React from "react";
import ReactDOM from "react-dom";
import Stepper from "./Stepper";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Stepper />, div);
});
