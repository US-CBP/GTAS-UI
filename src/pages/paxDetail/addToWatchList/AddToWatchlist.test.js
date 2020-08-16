import React from "react";
import ReactDOM from "react-dom";
import AddToWatchlist from "./AddToWatchlist";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AddToWatchlist />, div);
});
