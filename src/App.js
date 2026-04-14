import React from "react"; 
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Welcome from "./pages/Welcome";
import Providers from "./pages/Providers";

export default function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/providers" element={<Providers />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
