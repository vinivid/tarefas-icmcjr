import { createContext, use, useContext, useState, type ReactNode } from "react";
import { type Username, type BirthDate, type Email, type Cpf, type Password, createBirthYear } from "@/src/types/User";


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


type AuthContextType = {
  authToken: string;
  user: Usuario | null;
  register: (
    nome: Username, 
    dataNascimento: BirthDate,
    email: Email,
    cpf: Cpf,
    senha: Password
  ) => Promise<RegisterError | null>
  login : (password: Password, 
    email?: Email, 
    cpf?: Cpf
  ) => LoginError | null;
  logout : () => void
}

const AuthContext = createContext<AuthContextType | null>(null);

export type Usuario = {
  nome: Username;
  dataNascimento: BirthDate;
  email: Email;
  cpf: Cpf;
  senha: Password;
}

// dados ficticios enquanto não tem backend
const USUARIO_FICTICIO: Usuario = {
  nome: "Fulano de tal",
  dataNascimento: new Date("2000-03-03"),
  email: "fulano@dominio.com",
  cpf: "255.193.040-50",
  senha: "minhasenha123",
}

export function AuthProvider({
  children
}: {
  children: ReactNode
}) {
  const [authToken, setAuthToken] = useState('');
  const [user, setUser] = useState<Usuario | null>(null);
  // Sempre retorna true quando ocorre sem falhas
  const register = async (nome : Username, dataNascimento : BirthDate, 
    email : Email, cpf : Cpf, senha : Password
  ) => {
    const url = "http://localhost:8080/api/auth/registrar";
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, dataNascimento, email, cpf, senha })
      });

      switch (res.status) {
        case 201: {
          const data = await res.json();
          setAuthToken(data.token);
          setUser(data.usuario);
          return null;
        }
        case 409: {
          const err = await res.json();
          return err.err;
        }
      }

      if (res.status !== 201 && res.status !== 409) {
        return RegisterError.OtherError;
      }
    } catch (err) {
      console.error(err);
    }
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
      setAuthToken("a");
      return null;
    } else {
      // colocando um caminho como exemplo de cpf inexistente
      if (cpf === "94124923082")
        return LoginError.CpfNotFound;

      // Colocando uma senha errada como exemplo
      if (password === '12345679')
        return LoginError.WrongPassword;

      setUser(USUARIO_FICTICIO);
      setAuthToken('');
      return null;
    }
  }

  const logout = () => {
    setUser(null);
    setAuthToken('');
  }

  return (
    <AuthContext.Provider value={{authToken, user, register, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error("Error setting up the context");

  return ctx;
}