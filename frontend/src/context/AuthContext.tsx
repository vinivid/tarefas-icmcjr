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

export const LoginError = {
  EmailNotFound: "USR_NOT_FOUND",
  CpfNotFound: "CPF_NOT_FOUND",
  WrongPassword: "WRONG_PASSWORD",
  OtherError: "OTHER_ERROR"
}

export type LoginError = 
  typeof LoginError[keyof typeof LoginError];

type Usuario = {
  nome: string;
  dataNascimento: string;
  email: string;
  cpf: string;
  senha: string;
}

type AuthContextType = {
  auth: boolean;
  register: (username : Username, 
    birthDate : BirthDate,
    email: Email,
    cpf: Cpf,
    pass: Password
  ) => RegisterError | null
  login : (password: Password, 
    email?: Email, 
    cpf?: Cpf
  ) => LoginError | null;
  logout : () => void
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

  // Sempre retorna true quando ocorre sem falhas
  const register = (username : Username, birthDate : BirthDate, 
    email : Email, cpf : Cpf, password : Password
  ) => {
    // Deixando apenas um usuário existente como exemplo
    // Em teoria seria feito um fetch enviando tods estes dados e seria
    // retornado uma token de login

    if (email === 'asd@g.c')
      return RegisterError.EmailExists;

    if (cpf === '94124923082')
      return RegisterError.CpfExists;

    // O OtherError seria para erros de conexão e etc
    setUser(USUARIO_FICTICIO);
    setAuth(true);
    return null;
  } 

  const login = (password: Password, email?: Email, cpf?: Cpf) => {
    if (email === undefined && cpf === undefined)
      throw new Error("Um email ou cpf devem ser passados para o login");

    // Tenta logar utilizando o email
    if (email !== undefined) {
      // colocando um caminho como exemplo de email inexistente
      if (email === "a@g.c")
        return LoginError.EmailNotFound;

      // Colocando uma senha errada como exemplo
      if (password === '12345679')
        return LoginError.WrongPassword;

      setUser(USUARIO_FICTICIO);
      setAuth(true);
      return null;
    } else {
      // colocando um caminho como exemplo de cpf inexistente
      if (cpf === "94124923082")
        return LoginError.CpfNotFound;

      // Colocando uma senha errada como exemplo
      if (password === '12345679')
        return LoginError.WrongPassword;

      setUser(USUARIO_FICTICIO);
      setAuth(true);
      return null;
    }
  }

  const logout = () => {
    setUser(null);
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