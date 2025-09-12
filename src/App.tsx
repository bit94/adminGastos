import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm.js";
import RegisterForm from "./components/RegisterForm.js";
import CustomThemeProvider from "./theme.js";
import { useNavigate } from "react-router-dom";
import { version } from "./Version.js";
import { Box, Typography } from "@mui/material";

function App(): React.JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  if (isLoggedIn) return <></>;

  return (
    <CustomThemeProvider>
      {showRegister ? (
        <RegisterForm onRegisterSuccess={() => setShowRegister(false)} />
      ) : (
        <LoginForm
          onLoginSuccess={() => setIsLoggedIn(true)}
          onShowRegister={() => setShowRegister(true)}
        />
      )}

      <Box sx={{ mt: 0, textAlign: "center" }}>
        <Typography variant="caption" align="center" sx={{ mt: 4, color: "text.secondary" }}>
          Versión {version}
        </Typography>
      </Box>
    </CustomThemeProvider>
  );
}

export default App;