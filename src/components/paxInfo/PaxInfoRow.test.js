import React from "react";
import ReactDOM from "react-dom";
import PaxInfoRow from "./PaxInfoRow";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<PaxInfoRow />, div);
});
