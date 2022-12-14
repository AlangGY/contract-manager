import { blue } from "@ant-design/colors";
import { globalCss } from "@stitches/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

if (process.env.REACT_APP_DEV) {
  const { worker } = require("./mocks/browser");
  worker.start({ onUnhandledRequest: "bypass" });
}

const globalStyles = globalCss({
  "*": {
    boxSizing: "border-box",
  },
  body: {
    margin: 0,
    width: "100%",
    height: "100vh",
  },
  "#root": {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  a: {
    color: "rgba(104, 109, 224,1.0)",
    fontWeight: "600",
    textDecoration: "none",
    "&:hover": {
      opacity: "0.7",
    },
  },
  ul: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "inline-block",
  },
});

globalStyles();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
