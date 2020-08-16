import React from "react";
import ReactDOM from "react-dom";
import UserModal from "./UserModal";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<UserModal />, div);
});
