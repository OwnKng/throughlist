import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import ThemeProvider from "./Components/ThemeProvider";

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
