import React from "react";
import ReactDOM from "react-dom";
import QRDetails from "./QRDetails";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<QRDetails />, div);
});
