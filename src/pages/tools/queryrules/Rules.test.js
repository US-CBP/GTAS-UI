import React from "react";
import ReactDOM from "react-dom";
import Rules from "./Rules";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Rules />, div);
});
