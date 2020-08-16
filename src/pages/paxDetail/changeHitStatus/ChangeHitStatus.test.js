import React from "react";
import ReactDOM from "react-dom";
import ChangeHitStatus from "./ChangeHitStatus";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ChangeHitStatus />, div);
});
