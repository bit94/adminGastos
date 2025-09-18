import { Typography } from "@mui/material";
import { useAuth } from "@context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <Typography variant="h4">Bienvenido, {user?.nombre} ({user?.role})</Typography>
    </div>
  );
}