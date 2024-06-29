import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/CSS/style.css";
import "./index.css";
import Home from "./assets/Views/Home.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
