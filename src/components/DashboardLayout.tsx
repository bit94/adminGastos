import { Box, Drawer, List, ListItem, ListItemText, Typography, ListItemButton } from "@mui/material";
import DashboardCard from "./DashboardCard";
import Grid from "@mui/material/GridLegacy";

const drawerWidth = 240;

const menuItems = [
    { title: "Gastos", emoji: "💸", path: "/gastos" },
    { title: "Reportes", emoji: "📊", path: "/reportes" },
    { title: "Usuarios", emoji: "👥", path: "/usuarios" },
    { title: "Configuración", emoji: "⚙️", path: "/configuracion" },
];

export default function DashboardLayout() {
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
                    <List>
                        {menuItems.map((item, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton onClick={() => (window.location.href = item.path)}>
                                    <ListItemText primary={`${item.emoji} ${item.title}`} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </List>
            </Drawer>

            {/* Main content */}
            <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Bienvenido al panel principal 🚀
                </Typography>
                <Grid container spacing={3}>
                    {menuItems.map((item, index) => (
                        <Grid item xs={12} md={6} key={index} component="div">
                            <DashboardCard {...item} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}