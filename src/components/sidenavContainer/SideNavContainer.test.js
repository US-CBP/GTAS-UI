import React from "react";
import ReactDOM from "react-dom";
import SideNavContainer from "./SideNavContainer";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SideNavContainer />, div);
});
