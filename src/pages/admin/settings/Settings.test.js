import React from "react";
import ReactDOM from "react-dom";
import Settings from "./Settings";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Settings />, div);
});
