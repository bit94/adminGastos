// src/context/AuthContext.tsx
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState, useEffect } from "react";

interface DecodedToken {
    sub: string;
    roles: string[];
    exp: number;
    nombre?: string;
}

interface User {
    email: string;
    role: "ADMIN" | "USER";
    nombre?: string;
}

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => { }
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const nowInSeconds = Math.floor(Date.now() / 1000);

      if (decoded.exp < nowInSeconds) {
        console.warn("Token expirado");
        localStorage.removeItem("token");
        setUser(null);
        window.location.href = "/login";
        return;
      }

      const user: User = {
        email: decoded.sub,
        role: decoded.roles.includes("ADMIN") ? "ADMIN" : "USER",
        nombre: decoded.nombre
      };
      setUser(user);
    } catch (err) {
      console.error("Token inválido", err);
      localStorage.removeItem("token");
      setUser(null);
      window.location.href = "/login";
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;