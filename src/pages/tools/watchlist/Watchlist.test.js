import React from "react";
import ReactDOM from "react-dom";
import Watchlist from "./Watchlist";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Watchlist />, div);
});
