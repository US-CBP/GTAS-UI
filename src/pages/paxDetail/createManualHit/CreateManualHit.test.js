import React from "react";
import ReactDOM from "react-dom";
import CreateManualHit from "./CreateManualHit";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CreateManualHit />, div);
});
