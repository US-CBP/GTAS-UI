import React from "react";
import ReactDOM from "react-dom";
import FilterForm from "./FilterForm";

// SMOKE TEST
it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <FilterForm>
      <div></div>
    </FilterForm>,
    div
  );
});
