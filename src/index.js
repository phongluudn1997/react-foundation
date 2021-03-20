import React from "react";
import ReactDOM from "react-dom";
import "@reach/dialog/styles.css";
import "./index.css";

import App from "./App";
import { AppProviders } from "./context";

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById("root")
);
