import { createContext, useContext, useState, type ReactNode } from "react";
import { type Username, type BirthDate, type Email, type Cpf, type Password } from "@/src/types/User";

// Erros relativos a criação de váriaves de usuário
export const RegisterError = {
  EmailExists: "EMAIL_EXISTS",
  CpfExists: "CPF_EXISTS",
  OtherError: "OTHER_ERROR"
}

export type RegisterError = 
  typeof RegisterError[keyof typeof RegisterError];

type AuthContextType = {
  auth: boolean;
  register: (username : Username, 
    birthDate : BirthDate,
    email: Email,
    cpf: Cpf,
    pass: Password
  ) => boolean | RegisterError
  login : () => boolean;
  logout : () => void
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children
} : {
  children: ReactNode
}) {
  const [auth, setAuth] = useState(false);

  // Sempre retorna true quando ocorre sem falhas
  const register = (username : Username, birthDate : BirthDate, 
    email : Email, cpf : Cpf, password : Password
  ) => {
    // Deixando apenas um usuário existente como exemplo
    // Em teoria seria feito um fetch enviando tods estes dados e seria
    // retornado uma token de login

    if (email === 'asd@g.c')
      return RegisterError.EmailExists;

    if (cpf === '51921128852')
      return RegisterError.CpfExists;

    // O OtherError seria para erros de conexão e etc
    setAuth(true);
    return true;
  } 

  const login = () => {
    setAuth(true);
    return true;
  }

  const logout = () => {
    setAuth(false);
  }

  return (
    <AuthContext.Provider value={{auth, register, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error("Error setting up the context");

  return ctx;
}