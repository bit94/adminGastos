import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";

export default function LoginForm({
  onLoginSuccess,
  onShowRegister
}: {
  onLoginSuccess: () => void;
  onShowRegister: () => void;
}) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("https://admingastosapi-production.up.railway.app/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(form)
      });
      const token = await res.text();
      if (!token || token.length < 10) throw new Error("Token inválido");
      localStorage.setItem("token", token);
      onLoginSuccess();
    } catch {
      setError(true);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        px: 2
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: "100%" }}>
        <Typography variant="h5" gutterBottom>Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Correo" name="email" type="email" fullWidth margin="normal" value={form.email} onChange={handleChange} required />
          <TextField label="Contraseña" name="password" type="password" fullWidth margin="normal" value={form.password} onChange={handleChange} required />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Iniciar sesión</Button>
        </form>
        {error && <Typography color="error" sx={{ mt: 2 }}>Credenciales inválidas</Typography>}
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 1.5, cursor: "pointer", color: "primary.main", textDecoration: "underline" }}
          onClick={onShowRegister}
        >
          ¿No tienes cuenta? Regístrate
        </Typography>
      </Paper>
    </Box>
  );
}