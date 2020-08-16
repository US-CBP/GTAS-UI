import React from "react";
import ReactDOM from "react-dom";
import NoteTypeModal from "./NoteTypeModal";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<NoteTypeModal />, div);
});
