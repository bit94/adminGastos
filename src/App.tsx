import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm.js";
import RegisterForm from "./components/RegisterForm.js";
import CustomThemeProvider from "./theme.js";
import { useNavigate } from "react-router-dom";

function App(): React.JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token.length > 10) {
      setIsLoggedIn(true);
    }
  }, []);

  if (isLoggedIn) {
    navigate("/");
  }

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
    </CustomThemeProvider>
  );
}

export default App;