import React from "react";
import ReactDOM from "react-dom/client";
// import Main from "./Main";
import { GlobalStyled } from "./Globalstyled";
import Router from "./Router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyled />
    <Router />
  </React.StrictMode>
);
