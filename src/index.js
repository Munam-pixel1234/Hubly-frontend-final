// src/index.js

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Global CSS
import "./styles/variables.css";
import "./styles/global.css";

// Auth Provider
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
