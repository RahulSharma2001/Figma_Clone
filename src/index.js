import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Room } from "./Room";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Room>
    <App />
  </Room>
);
