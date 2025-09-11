import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard.js";
import Gastos from "../pages/Gastos.js";
import Reportes from "../pages/Reportes.js";
import Usuarios from "../pages/Usuarios.js";
import Configuracion from "../pages/Configuracion.js";

const isAuthenticated = !!localStorage.getItem("token");

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/gastos" element={<Gastos />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/configuracion" element={<Configuracion />} />
      </Routes>
    </BrowserRouter>
  );
}