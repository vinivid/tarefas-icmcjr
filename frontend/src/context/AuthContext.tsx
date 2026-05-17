import { createContext, useContext, useState, type ReactNode } from "react";

type AuthContextType = {
  auth : boolean,
  login : () => boolean,
  logout : () => void
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children
} : {
  children: ReactNode
}) {
  const [auth, setAuth] = useState(false);

  const login = () => {
    setAuth(true);
    return true;
  }

  const logout = () => {
    setAuth(false);
  }

  return (
    <AuthContext.Provider value={{auth, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error("Error setting up the context");

  return ctx;
}