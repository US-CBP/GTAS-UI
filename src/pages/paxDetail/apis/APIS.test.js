import React from "react";
import ReactDOM from "react-dom";
import APIS from "./APIS";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<APIS />, div);
});
