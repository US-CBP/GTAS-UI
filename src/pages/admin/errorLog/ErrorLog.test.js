import React from "react";
import ReactDOM from "react-dom";
import ErrorLog from "./ErrorLog";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ErrorLog />, div);
});
