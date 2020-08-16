import React from "react";
import ReactDOM from "react-dom";
import Queries from "./Queries";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Queries />, div);
});
