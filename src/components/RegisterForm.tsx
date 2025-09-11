import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";

export default function RegisterForm({ onRegisterSuccess }: { onRegisterSuccess: () => void }) {
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      console.log("Formulario enviado", form);
      const res = await fetch("https://admingastosapi-production.up.railway.app/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(form)
      });
      const token = await res.text();
      localStorage.setItem("token", token);
      setMessage("✅ Registro exitoso");
      onRegisterSuccess(); // vuelve al login
    } catch {
      setMessage("❌ Error en el registro");
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
        <Typography variant="h5" gutterBottom>Registro</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Nombre" name="nombre" fullWidth margin="normal" value={form.nombre} onChange={handleChange} required />
          <TextField label="Correo" name="email" type="email" fullWidth margin="normal" value={form.email} onChange={handleChange} required />
          <TextField label="Contraseña" name="password" type="password" fullWidth margin="normal" value={form.password} onChange={handleChange} required />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Registrarse</Button>
        </form>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>{message}</Typography>
      </Paper>
    </Box>
  );
}