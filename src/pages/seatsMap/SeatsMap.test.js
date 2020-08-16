import React from "react";
import ReactDOM from "react-dom";
import SeatsMap from "./SeatsMap";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SeatsMap />, div);
});
