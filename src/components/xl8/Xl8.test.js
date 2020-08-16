import React from "react";
import ReactDOM from "react-dom";
import Xl8 from "./Xl8";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Xl8 />, div);
});
