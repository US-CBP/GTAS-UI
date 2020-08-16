import React from "react";
import ReactDOM from "react-dom";
import AuditLog from "./AuditLog";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AuditLog />, div);
});
