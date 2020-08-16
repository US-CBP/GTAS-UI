import React from "react";
import ReactDOM from "react-dom";
import SegmentTable from "./SegmentTable";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SegmentTable id="test" data={[]} />, div);
});
