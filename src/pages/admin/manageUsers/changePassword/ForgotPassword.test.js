import React from "react";
import ReactDOM from "react-dom";
import ForgotPassword from "./ForgotPassword";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ForgotPassword />, div);
});
