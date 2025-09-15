import { Box, Drawer, List, ListItem, ListItemText, Typography, ListItemButton } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
    { title: "Gastos", emoji: "💸", path: "/gastos" },
    { title: "Reportes", emoji: "📊", path: "/reportes" },
    { title: "Usuarios", emoji: "👥", path: "/usuarios" },
    { title: "Configuración", emoji: "⚙️", path: "/configuracion" },
];

export default function DashboardLayout() {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: "flex" }}>
            {/* Sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        backgroundColor: "background.default",
                        color: "text.primary",
                    },
                }}
            >
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6">Menú</Typography>
                </Box>
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton onClick={() => navigate(item.path)}>
                                <ListItemText primary={`${item.emoji} ${item.title}`} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            {/* Main content */}
            <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
                <Outlet />
            </Box>
        </Box>
    );
}