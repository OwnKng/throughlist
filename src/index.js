import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import ActiveProvider from "./Components/ActiveProvider";

ReactDOM.render(
  <ActiveProvider>
    <App />
  </ActiveProvider>,
  document.getElementById("root")
);
