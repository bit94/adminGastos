// src/theme.tsx
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useMemo, useState, ReactNode } from "react";

export default function CustomThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <button onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
        Cambiar a tema {mode === "dark" ? "claro" : "oscuro"}
      </button>
      {children}
    </ThemeProvider>
  );
}