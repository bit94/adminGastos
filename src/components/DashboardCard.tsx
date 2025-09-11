import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DashboardCardProps } from "../types/DashboardCardProps.js";

export default function DashboardCard({ title, emoji, path }: DashboardCardProps) {
    const navigate = useNavigate();

    return (
        <Card
            sx={{
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "scale(1.03)" }
            }}
            onClick={() => navigate(path)}
        >
            <CardContent>
                <Typography variant="h5" align="center">{emoji}</Typography>
                <Typography variant="subtitle1" align="center">{title}</Typography>
            </CardContent>
        </Card>
    );
}