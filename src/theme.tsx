import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, IconButton, Box } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useMemo, useState, ReactNode } from "react";

export default function CustomThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  const toggleTheme = () => setMode(mode === "dark" ? "light" : "dark");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          position: "fixed",
          top: 16,
          right: 16, // Cambia a left: 16 si prefieres esquina izquierda
          zIndex: 9999,
        }}
      >
        <IconButton onClick={toggleTheme} color="inherit">
          {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>
      {children}
    </ThemeProvider>
  );
}