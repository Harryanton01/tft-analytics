import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ParentSize from "@visx/responsive/lib/components/ParentSize";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
