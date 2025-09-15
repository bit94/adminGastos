// src/AppRouter.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Gastos from "../pages/Gastos";
import Reportes from "../pages/Reportes";
import Usuarios from "../pages/Usuarios";
import Configuracion from "../pages/Configuracion";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import DashboardLayout from "../components/DashboardLayout";
import Dashboard from "@pages/Dashboard";

export default function AppRouter() {
  const [showRegister, setShowRegister] = useState(false);
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Routes>
      {/* Ruta protegida con layout persistente */}
      <Route
        path="/"
        element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />}
      >
        {/* Rutas hijas que se renderizan dentro del layout */}
        <Route index element={<Dashboard />} />
        <Route path="gastos" element={<Gastos />} />
        <Route path="reportes" element={<Reportes />} />
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="configuracion" element={<Configuracion />} />
      </Route>

      {/* Rutas públicas */}
      <Route
        path="/login"
        element={
          showRegister ? (
            <RegisterForm onRegisterSuccess={() => setShowRegister(false)} />
          ) : (
            <LoginForm
              onLoginSuccess={() => {
                window.location.href = "/"; // puedes refactorizar esto también
              }}
              onShowRegister={() => setShowRegister(true)}
            />
          )
        }
      />
    </Routes>
  );
}