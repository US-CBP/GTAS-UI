import React from "react";
import ReactDOM from "react-dom";
import LoaderStats from "./LoaderStats";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LoaderStats />, div);
});
