import React from "react";
import ReactDOM from "react-dom";
import Notification from "./Notification";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Notification />, div);
});
