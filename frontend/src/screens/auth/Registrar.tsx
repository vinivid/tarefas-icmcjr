import { View } from "react-native";

import { useAuth } from "@/src/context/AuthContext";

import Botao from "@/src/components/Botao";
import UserFieldInput from "@/src/components/auth/UserFieldInput";

import { UserInputError } from "@/src/types/User";

import useUsernameStr from "@/src/hooks/auth/useUsernameStr";
import usePasswordStr from "@/src/hooks/auth/usePasswordStr";
import useEmailStr from "@/src/hooks/auth/useEmailStr";
import useCpfStr from "@/src/hooks/auth/useCpfStr";

/// TODO: implementar senha dupla e estilizar a tela
export default function Registrar() {
  const { usernameStr, username, setUsernameStr } = useUsernameStr('');
  const { emailStr, email, setEmailStr } = useEmailStr('');
  const { cpfStr, cpf, setCpfStr } = useCpfStr('');
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
        label="Email"
        fieldStr={emailStr}
        fieldRes={email}
        setFieldStr={setEmailStr}
        keyboardType="email-address"
        errorMsg={emailErrorMsg}
        placeholder="Email do usuário"
      />
      <UserFieldInput
        label="Cpf"
        fieldStr={cpfStr}
        fieldRes={cpf}
        setFieldStr={setCpfStr}
        keyboardType="numeric"
        errorMsg={cpfErrorMsg}
        placeholder="Seu Cpf"
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

function emailErrorMsg(err : UserInputError) {
  if (err === UserInputError.Maxlen)
    return "O número máximo de carcteres é 256";

  if (err === UserInputError.InvalidChars)
    return "Não é permitido o uso de carateres especiais";

  if (err === UserInputError.InvalidInput)
    return "Email inválido";

  return "Erro impossivel";
}

function cpfErrorMsg(err : UserInputError) {
  if (err === UserInputError.Maxlen || err === UserInputError.Minlen)
    return "O cpf tem exatamente 11 caracteres";

  if (err === UserInputError.InvalidInput)
    return "Cpf inválido";

  return "Erro impossível";
}

function passwordErrorMsg(err : UserInputError) {
  if (err === UserInputError.Minlen)
    return "É necessário no minímo 8 caracteres";

  if (err === UserInputError.Empty)
    return "É necessário ter no minímo 8 caracteres que não são somente espaço";

  if (err === UserInputError.InvalidChars)
    return "Não é permitido o uso de carateres especiais";

  if (err === UserInputError.Maxlen)
    return "O tamanho máximo é de 64 caracteres";

  if (err === UserInputError.TrailingSpace)
    return "Não permitido espaços no final da senha";
  
  return "Erro impossivl";
}