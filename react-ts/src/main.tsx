import React from "react";
import ReactDOM from "react-dom/client";
import "./reset.css";
import "./main.css";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./navigation/AppRoutes";
import { ErrorBoundary } from "./components/error/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
