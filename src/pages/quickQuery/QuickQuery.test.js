import React from "react";
import ReactDOM from "react-dom";
import QuickQuery from "./QuickQuery";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<QuickQuery />, div);
});
