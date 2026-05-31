import { createContext, useContext, useState, type ReactNode } from "react";
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
  EmailNotFound: "EMAIL_NOT_FOUND",
  CpfNotFound: "CPF_NOT_FOUND",
  WrongPassword: "WRONG_PASSWORD",
  OtherError: "OTHER_ERROR"
}

export type LoginError = 
  typeof LoginError[keyof typeof LoginError];


type AuthContextType = {
  authToken: string;
  usuario: Usuario | null;
  registrar: (
    nome: Username, 
    dataNascimento: BirthDate,
    email: Email,
    cpf: Cpf,
    senha: Password
  ) => Promise<RegisterError | null>
  login : (
    senha: Password, 
    email?: Email, 
    cpf?: Cpf
  ) => Promise<LoginError | null>;
  logout : () => void
}

const AuthContext = createContext<AuthContextType | null>(null);

export type Usuario = {
  id: string;
  nome: Username;
  dataNascimento: BirthDate;
  email: Email;
  cpf: Cpf;
  senha: Password;
}

export function AuthProvider({
  children
}: {
  children: ReactNode
}) {
  const [authToken, setAuthToken] = useState('');
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  
  const registrar = async (nome : Username, dataNascimento : BirthDate, 
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
          setUsuario(data.usuario);
          return null;
        }
        case 409: {
          const err = await res.json();
          return err.err;
        }
      }
    } catch (err) {
      console.error(err);
    }

    return RegisterError.OtherError;
  }

  const login = async (senha: Password, email?: Email, cpf?: Cpf) => {
    if (email === undefined && cpf === undefined)
      throw new Error("Um email ou cpf devem ser passados para o login");

    if (email !== undefined) {
      const url = "http://localhost:8080/api/auth/login/email";

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, senha })
        })

        switch (res.status) {
          case 200: {
            const data = await res.json();
            setAuthToken(data.token);
            setUsuario(data.usuario);
            return null;
          }
          case 404:
            return LoginError.EmailNotFound;
          case 401:
            return LoginError.WrongPassword;
        }
      } catch (err) {
        console.error(err);
      }

    } else {
      const url = "http://localhost:8080/api/auth/login/cpf";
      
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cpf, senha })
        })

        switch (res.status) {
          case 200: {
            const data = await res.json();
            setAuthToken(data.token);
            setUsuario(data.usuario);
            return null;
          }
          case 404:
            return LoginError.CpfNotFound;
          case 401:
            return LoginError.WrongPassword;
        }
      } catch (err) {
        console.error(err);
      }
    }

    return LoginError.OtherError;
  }

  const logout = () => {
    setUsuario(null);
    setAuthToken('');
  }

  return (
    <AuthContext.Provider value={{authToken, usuario, registrar, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error("Error setting up the context");

  return ctx;
}