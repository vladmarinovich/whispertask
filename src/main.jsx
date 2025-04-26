// ✅ src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home";
import Config from "./pages/Config";
import { AuthProvider } from "./context/AuthContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/config" element={<Config />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);