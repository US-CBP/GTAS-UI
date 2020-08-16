import React from "react";
import ReactDOM from "react-dom";
import EventNotesModal from "./EventNotesModal";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<EventNotesModal />, div);
});
