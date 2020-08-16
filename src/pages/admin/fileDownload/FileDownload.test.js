import React from "react";
import ReactDOM from "react-dom";
import FileDownload from "./FileDownload";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FileDownload />, div);
});
