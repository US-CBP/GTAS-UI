import React from "react";
import ReactDOM from "react-dom";
import SignUpRequests from "./SignUpRequests";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SignUpRequests />, div);
});
