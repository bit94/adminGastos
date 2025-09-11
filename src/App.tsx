import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import CustomThemeProvider from "./theme";

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token.length > 10) {
      setIsLoggedIn(true);
    }
  }, []);

  if (isLoggedIn) {
    return <div>Bienvenido al panel principal 🚀</div>;
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