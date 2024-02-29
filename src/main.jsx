import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import GlobalState from "./context/index.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <GlobalState>
        <App />
      </GlobalState>
    </Router>
  </React.StrictMode>
);
