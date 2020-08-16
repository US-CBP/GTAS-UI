import React from "react";
import ReactDOM from "react-dom";
import NoteTypeCats from "./NoteTypeCats";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<NoteTypeCats />, div);
});
