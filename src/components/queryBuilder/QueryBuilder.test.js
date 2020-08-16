import React from "react";
import ReactDOM from "react-dom";
import QueryBuilder from "./QueryBuilder";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<QueryBuilder />, div);
});
