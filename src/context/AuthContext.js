import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

const SESSION_TIMEOUT = 40 * 60 * 1000; // 40 minutos em milissegundos

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const lastLogin = localStorage.getItem("lastLoginTime");
        const now = Date.now();

        if (lastLogin && now - parseInt(lastLogin) > SESSION_TIMEOUT) {
          // Sessão expirada: fazer logout
          signOut(auth);
          localStorage.removeItem("lastLoginTime");
          setUser(null);
        } else {
          // Sessão válida: atualizar timestamp
          localStorage.setItem("lastLoginTime", now.toString());
          setUser(user);
        }
      } else {
        setUser(null);
        localStorage.removeItem("lastLoginTime");
      }
      setLoading(false);
    });

    // Verificar periodicamente (a cada 1 minuto) se a sessão expirou
    const interval = setInterval(() => {
      const lastLogin = localStorage.getItem("lastLoginTime");
      if (lastLogin && Date.now() - parseInt(lastLogin) > SESSION_TIMEOUT) {
        signOut(auth);
        localStorage.removeItem("lastLoginTime");
        setUser(null);
      }
    }, 60 * 1000); // Checar a cada 1 minuto

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  // Função para renovar a sessão
  const renewSession = () => {
    if (user) {
      localStorage.setItem("lastLoginTime", Date.now().toString());
    }
  };

  const logout = () => {
    signOut(auth);
    localStorage.removeItem("lastLoginTime");
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, renewSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
