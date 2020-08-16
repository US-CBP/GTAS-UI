import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./i18n";
import * as serviceWorker from "./serviceWorker";
import "./fonts/Lato/Lato-Bold.ttf";
import "./fonts/Lato/Lato-Regular.ttf";

if (process.env.NODE_ENV === "development") {
  console.log("IN DEVELOPMENT");

  // const { worker } = require("./services/mocks/server");
  // worker.start();
}

ReactDOM.render(<App />, document.getElementById("root"));
