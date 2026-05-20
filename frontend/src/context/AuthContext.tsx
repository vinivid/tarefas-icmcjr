import { createContext, useContext, useState, type ReactNode } from "react";

type Usuario = {
  nome: string;
  dataNascimento: string;
  email: string;
  cpf: string;
  senha: string;
}

type AuthContextType = {
  auth: boolean;
  user: Usuario | null;
  login: () => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// dados ficticios enquanto não tem backend
const USUARIO_FICTICIO: Usuario = {
  nome: "Fulano de tal",
  dataNascimento: "01/01/2000",
  email: "fulano@dominio.com",
  cpf: "123.456.789-00",
  senha: "minhasenha123",
}

export function AuthProvider({
  children
}: {
  children: ReactNode
}) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState<Usuario | null>(null);

  const login = () => {
    setUser(USUARIO_FICTICIO);
    setAuth(true);
    return true;
  }

  const logout = () => {
    setUser(null);
    setAuth(false);
  }

  return (
    <AuthContext.Provider value={{ auth, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error("Error setting up the context");

  return ctx;
}