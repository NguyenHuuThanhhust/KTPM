import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import HouseholdDetail from "./pages/HouseholdDetail";
import "./index.css";
import PopulationDetail from "./pages/PopulationDetail";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/household-detail" element={<HouseholdDetail />} />
        <Route
          path="/population-detail/:householdId"
          element={<PopulationDetail />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
