import React from "react";
import ReactDOM from "react-dom";
import WLModal from "./WLModal";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<WLModal />, div);
});
