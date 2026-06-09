import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type Username, type BirthDate, type Email, type Cpf, type Password} from "@/src/types/User";
import { useStorageState } from "../hooks/secureStore";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  authToken: string | null;
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
  logout : () => void;
  atualizarPerfil: (dados: Partial<Omit<Usuario, "id">>) => Promise<null | "EMAIL_EXISTS" | "CPF_EXISTS" | "OTHER_ERROR">;
  excluirConta: () => Promise<boolean>;
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
  const [[c_, authToken], setAuthToken] = useStorageState("token");
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    async function carregarUsr() {
      const usrStore = await AsyncStorage.getItem("usr");

      if (usrStore) {
        const usr = JSON.parse(usrStore);
        usr.dataNascimento = new Date(usr.dataNascimento);
        setUsuario(usr);
      }
    }

    carregarUsr();
  }, [])
  
  async function salvarUsr(usuario : Usuario) {
    await AsyncStorage.setItem("usr", JSON.stringify(usuario));
  }

  async function removerUsr() {
    await AsyncStorage.removeItem("usr");    
  }

  const registrar = async (nome : Username, dataNascimento : BirthDate, 
    email : Email, cpf : Cpf, senha : Password
  ) => {
    const url = "http://localhost:8080/api/v1/auth/registrar";
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
          await salvarUsr(data.usuario);
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

    /// Somente por que esta tendo problemas com o backend
    if (email === "abc@g.c" && senha === "12345678") {
      setAuthToken("1");
      setUsuario({
        id: "1",
        nome: "Teste",
        dataNascimento: new Date("2005-06-2006"),
        email: "abc@g.c",
        cpf: "12345678911",
        senha: "12345678"
      })
      return null;
    }

    if (email === undefined && cpf === undefined)
      throw new Error("Um email ou cpf devem ser passados para o login");

    if (email !== undefined) {
      const url = "http://localhost:8080/api/v1/auth/login/email";

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
            await salvarUsr(data.usuario);
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
      const url = "http://localhost:8080/api/v1/auth/login/cpf";
      
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
            await salvarUsr(data.usuario);
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
    setAuthToken(null);
    removerUsr();
  }

  const atualizarPerfil = async (dados: Partial<Omit<Usuario, "id">>) => {
    if (!usuario || !authToken) return "OTHER_ERROR";

    const url = `http://localhost:8080/api/v1/auth/usuario/${usuario.id}`;
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify(dados)
      });

      switch (res.status) {
        case 200: {
          const data = await res.json();
          const usuarioAtualizado = {
            ...data.usuario,
            dataNascimento: new Date(data.usuario.dataNascimento),
            senha: dados.senha ?? usuario.senha 
          };
          setUsuario(usuarioAtualizado);
          await salvarUsr(usuarioAtualizado);
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

    return "OTHER_ERROR";
  }

  const excluirConta = async () => {
    if (!usuario || !authToken) return false;

    const url = `http://localhost:8080/api/v1/auth/usuario/${usuario.id}`;
    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${authToken}` }
      });

      if (res.status === 200) {
        logout();
        return true;
      }
    } catch (err) {
      console.error(err);
    }

    return false;
  }

  return (
    <AuthContext.Provider value={{authToken, usuario, registrar, login, logout, atualizarPerfil, excluirConta}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error("Error setting up the context");

  return ctx;
}