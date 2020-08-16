import React from "react";
import ReactDOM from "react-dom";
import ManageUsers from "./ManageUsers";

/**
 * Requires user context
 * Requires Admin role
 */

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ManageUsers />, div);
});
