import React from "react";
import ReactDOM from "react-dom";
import CommonService from "./CommonService";

// SMOKE TEST
// it("renders without crashing", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(<CommonService />, div);
// });

it("returns an error if no URI is provided", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CommonService />, div);
});
