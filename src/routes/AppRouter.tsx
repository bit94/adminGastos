// src/AppRouter.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Dashboard from "../pages/Dashboard.js";
import Gastos from "../pages/Gastos.js";
import Reportes from "../pages/Reportes.js";
import Usuarios from "../pages/Usuarios.js";
import Configuracion from "../pages/Configuracion.js";
import LoginForm from "../components/LoginForm.js";
import RegisterForm from "../components/RegisterForm.js";

export default function AppRouter() {
  const [showRegister, setShowRegister] = useState(false);
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/gastos" element={<Gastos />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route
          path="/login"
          element={
            showRegister ? (
              <RegisterForm onRegisterSuccess={() => setShowRegister(false)} />
            ) : (
              <LoginForm
                onLoginSuccess={() => {
                  window.location.href = "/"; // fuerza recarga para que se reevalúe isAuthenticated
                }}
                onShowRegister={() => setShowRegister(true)}
              />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}