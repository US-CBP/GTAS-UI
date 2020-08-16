import React from "react";
import ReactDOM from "react-dom";
import CodeEditor from "./CodeEditor";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CodeEditor />, div);
});
