import React from "react";
import ReactDOM from "react-dom";
import WatchlistCats from "./WatchlistCats";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<WatchlistCats />, div);
});
