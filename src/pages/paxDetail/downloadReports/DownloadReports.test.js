import React from "react";
import ReactDOM from "react-dom";
import DownloadReports from "./DownloadReports";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<DownloadReports />, div);
});
