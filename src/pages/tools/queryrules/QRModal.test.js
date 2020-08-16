import React from "react";
import ReactDOM from "react-dom";
import QRModal from "./QRModal";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<QRModal />, div);
});
