import { View } from "react-native";

import { useAuth } from "@/src/context/AuthContext";

import Botao from "@/src/components/Botao";
import UserFieldInput from "@/src/components/auth/UserFieldInput";

import { UserInputError, type Username, createUsername } from "@/src/types/User";

import useUsernameStr from "@/src/hooks/auth/useUsernameStr";
import usePasswordStr from "@/src/hooks/auth/usePasswordStr";

export default function Registrar() {
  const { usernameStr, username, setUsernameStr } = useUsernameStr('');
  const { passwordStr, password, setPasswordStr } = usePasswordStr('');
  const { login } = useAuth();

  return (
    <View>
      <UserFieldInput
        label="Usuário"
        fieldStr={usernameStr}
        fieldRes={username}
        setFieldStr={setUsernameStr}
        errorMsg={usernameErrorMsg}
        placeholder="Nome de usuário"
      />
      <UserFieldInput
        label="Senha"
        fieldStr={passwordStr}
        fieldRes={password}
        setFieldStr={setPasswordStr}
        errorMsg={passwordErrorMsg}
        secureTextEntry={true}
        placeholder="Sua senha"
      />
      <Botao 
        conteudo="Registar"
        onPress={() => login()}
      >
      </Botao>
    </View>
  )
}

function usernameErrorMsg(err : UserInputError) {
  if (err === UserInputError.Empty) 
    return "É necessário ter pelo menos um caracter";

  if (err === UserInputError.InvalidChars)
    return "Não são permitidos caracteres especiais";

  if (err === UserInputError.Maxlen ) 
    return "O tamanho máximo são 15 caracteres";

  return "Erro impossível";
}

function passwordErrorMsg(err : UserInputError) {
  return "Erro impossível";
}