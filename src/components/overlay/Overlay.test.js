import React from "react";
import ReactDOM from "react-dom";
import Overlay from "./Overlay";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <Overlay trigger="click" content="test">
      <div></div>
    </Overlay>,
    div
  );
});
