import React from "react";
import ReactDOM from "react-dom";
import Vetting from "./Vetting";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Vetting />, div);
});
