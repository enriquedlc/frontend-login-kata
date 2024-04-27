import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { ErrorBoundary } from "./components/error/ErrorBoundary";
import { AppRoutes } from "./navigation/AppRoutes";

import "./main.css";
import "./reset.css";

ReactDOM.createRoot(document.getElementById("root")!, {
  onRecoverableError: (error, errorInfo) => {
    console.error("__ON_RECOVERABLEERROR CREATE_ROOT__ " + error, errorInfo);
  },
}).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
