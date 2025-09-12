import CustomThemeProvider from "./theme.js";
import AppRouter from "./routes/AppRouter.js";
import { Box, Typography } from "@mui/material";
import { version } from "./Version.js";

function App(): React.JSX.Element {
  return (
    <CustomThemeProvider>
      <AppRouter />
      <Box sx={{ mt: 0, textAlign: "center" }}>
        <Typography variant="caption" align="center" sx={{ mt: 4, color: "text.secondary" }}>
          Versión {version}
        </Typography>
      </Box>
    </CustomThemeProvider>
  );
}

export default App;