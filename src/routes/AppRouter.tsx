// src/AppRouter.tsx
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import Gastos from "../pages/Gastos";
import Reportes from "../pages/Reportes";
import Usuarios from "../pages/Usuarios";
import Configuracion from "../pages/Configuracion";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import DashboardLayout from "../components/DashboardLayout";
import Dashboard from "@pages/Dashboard";
import CatalogosLayout from "@components/CatalogosLayout";
import TipoPeriodo from "@components/TipoPeriodo";

export default function AppRouter() {
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);

  return (
    <Routes>
      {/* Ruta protegida con layout persistente */}
      <Route
        path="/"
        element={localStorage.getItem("token") ? <DashboardLayout /> : <Navigate to="/login" replace />}
      >
        {/* Rutas hijas que se renderizan dentro del layout */}
        <Route index element={<Dashboard />} />
        <Route path="gastos" element={<Gastos />} />
        <Route path="reportes" element={<Reportes />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="configuracion" element={<Configuracion />} />
        <Route path="catalogos" element={<CatalogosLayout />}>
          <Route path="tipo-periodo" element={<TipoPeriodo />} />
        </Route>
      </Route>

      {/* Rutas públicas */}
      <Route
        path="/login"
        element={
          showRegister ? (
            <RegisterForm onRegisterSuccess={() => setShowRegister(false)} />
          ) : (
            <LoginForm
              onLoginSuccess={() => navigate("/", { replace: true })}
              onShowRegister={() => setShowRegister(true)}
            />
          )
        }
      />
    </Routes>
  );
}