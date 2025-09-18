import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Typography,
    ListItemButton,
    IconButton,
    useMediaQuery,
    useTheme,
    Tooltip,
    Container,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import { version } from "../Version.js";
import ConfirmDialog from "./ConfirmDialog.js";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ajusta la ruta si es necesario

const drawerWidth = 240;

const menuItems = [
    { title: "Gastos", emoji: "💸", path: "/gastos", roles: ["USER", "ADMIN"] },
    { title: "Reportes", emoji: "📊", path: "/reportes", roles: ["ADMIN"] },
    { title: "Usuarios", emoji: "👥", path: "/usuarios", roles: ["ADMIN"] },
    { title: "Configuración", emoji: "⚙️", path: "/configuracion", roles: ["ADMIN", "USER"] },
    {
        title: "Catálogos",
        emoji: "📁",
        roles: ["ADMIN"],
        children: [
            { title: "Tipo de Periodo", path: "/catalogos/tipo-periodo", roles: ["ADMIN"] }
        ]
    },
    { title: "Cerrar sesión", emoji: "🚪", action: "logout" }
];

export default function DashboardLayout() {
    useAuth(); // Hook para verificar autenticación y redirigir si es necesario
    const navigate = useNavigate();
    const [menuVisible, setMenuVisible] = useState(true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const location = useLocation();
    const { user } = useAuth();

    return (
        <Box sx={{ display: "flex" }}>
            {/* Botón flotante para abrir/cerrar menú en cualquier tamaño */}
            {(!isMobile || (isMobile && !menuVisible)) && (
                <Tooltip title={menuVisible ? "Cerrar menú" : "Abrir menú"}>
                    <IconButton
                        onClick={() => setMenuVisible(!menuVisible)}
                        sx={{
                            position: "fixed",
                            top: 16,
                            left: menuVisible && !isMobile ? drawerWidth + 16 : 16,
                            zIndex: 1300,
                            backgroundColor: "background.paper",
                            boxShadow: 1,
                        }}
                    >
                        {menuVisible ? <ChevronLeftIcon /> : <MenuIcon />}
                    </IconButton>
                </Tooltip>
            )}

            {/* Menú lateral */}
            {menuVisible && (
                <Drawer
                    variant={isMobile ? "temporary" : "persistent"}
                    open={menuVisible}
                    onClose={() => setMenuVisible(false)}
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
                        {menuItems.filter(item => !item.roles || item.roles.includes(user?.role ?? ""))
                            .map((item, index) => {
                                const isCatalogosActive = item.children?.some(child =>
                                    location.pathname.startsWith(child.path)
                                );

                                return (
                                    <Box key={index}>
                                        {item.children ? (
                                            <>
                                                <ListItem>
                                                    <ListItemText
                                                        primary={`${item.emoji} ${item.title}`}
                                                        sx={{
                                                            fontWeight: isCatalogosActive ? 'bold' : 'normal',
                                                            color: isCatalogosActive ? 'primary.main' : 'inherit'
                                                        }}
                                                    />
                                                </ListItem>
                                                {item.children.filter(subItem => !subItem.roles || subItem.roles.includes(user?.role ?? ""))
                                                    .map((subItem, subIndex) => (
                                                        <ListItem key={subIndex} disablePadding sx={{ pl: 4 }}>
                                                            <ListItemButton
                                                                selected={location.pathname === subItem.path}
                                                                onClick={() => {
                                                                    navigate(subItem.path);
                                                                    if (isMobile) setMenuVisible(false);
                                                                }}
                                                            >
                                                                <ListItemText primary={`↳ ${subItem.title}`} />
                                                            </ListItemButton>
                                                        </ListItem>
                                                    ))}
                                            </>
                                        ) : (
                                            <ListItem disablePadding>
                                                <ListItemButton
                                                    onClick={() => {
                                                        if (item.action === "logout") {
                                                            setLogoutDialogOpen(true);
                                                        } else if (item.path) {
                                                            navigate(item.path);
                                                            if (isMobile) setMenuVisible(false);
                                                        }
                                                    }}
                                                >
                                                    <ListItemText primary={`${item.emoji} ${item.title}`} />
                                                </ListItemButton>
                                            </ListItem>
                                        )}
                                    </Box>
                                );
                            })}
                    </List>
                </Drawer>
            )}

            {/* Contenido principal */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    p: 4,
                    ml: menuVisible && !isMobile ? `${drawerWidth}px` : 0,
                    transition: "margin-left 0.3s ease"
                }}
            >
                <Container maxWidth="md">
                    <Box display={"flex"} flexDirection="column" gap={4}>
                        <Outlet />
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="body2" color="text.secondary">
                                Versión {version}
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Diálogo de confirmación para cerrar sesión */}
            <ConfirmDialog
                open={logoutDialogOpen}
                title="¿Cerrar sesión?"
                message="¿Estás seguro de que deseas cerrar sesión? Esta acción te llevará al inicio de sesión."
                confirmText="Aceptar"
                cancelText="Cancelar"
                variant="warning"
                onConfirm={() => {
                    localStorage.removeItem("token");
                    setLogoutDialogOpen(false);
                    navigate("/login");
                }}
                onClose={() => setLogoutDialogOpen(false)}
            />
        </Box>
    );
}