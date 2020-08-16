import React from "react";
import ReactDOM from "react-dom";
import Tabs from "./Tabs";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  const tabs = [{ title: `TEST1`, link: `/test/link` }];
  ReactDOM.render(<Tabs tabs={tabs} />, div);
});
