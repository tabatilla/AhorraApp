import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import Router from "./components/Router";
import "./css/reset.scss";
import "./css/style.scss";

render(<App />, document.querySelector("#app"));
