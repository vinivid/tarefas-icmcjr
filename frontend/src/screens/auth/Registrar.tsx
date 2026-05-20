import { useState } from "react";
import { View, StyleSheet, Text, ScrollView, KeyboardAvoidingView, Platform } from "react-native";

import { useAuth } from "@/src/context/AuthContext";

import Botao from "@/src/components/Botao";
import LineInput from "@/src/components/LineInput";
import UserFieldInput from "@/src/components/auth/UserFieldInput";
import MaskedUserFieldInput from "@/src/components/auth/MaskedUserFieldInput";

import { UserInputError } from "@/src/types/User";

import useUsernameStr from "@/src/hooks/auth/useUsernameStr";
import usePasswordStr from "@/src/hooks/auth/usePasswordStr";
import useEmailStr from "@/src/hooks/auth/useEmailStr";
import useCpfStr from "@/src/hooks/auth/useCpfStr";
import useDateStr from "@/src/hooks/auth/useDateStr";
import { RegisterError } from "@/src/context/AuthContext";
import { Colors } from "@/src/constants/theme";

export default function Registrar() {
  const { register } = useAuth();

  const { usernameStr, username, setUsernameStr } = useUsernameStr('');
  const { dateStr, date, setDateStr } = useDateStr('');
  const { emailStr, email, setEmailStr } = useEmailStr('');
  const { cpfStr, cpf, setCpfStr } = useCpfStr('');
  const { passwordStr, password, setPasswordStr } = usePasswordStr('');
  const [ passwordRepeat, setPasswordRepeat ] = useState('');
  const [ passwordDiff, setPasswordDiff ] = useState(false);
  const [ emailRegistered, setEmailRegistered ] = useState(false);
  const [ cpfRegistered, setCpfRegistered ] = useState(false);
  const [ otherError, setOtherError ] = useState(false);

  return (
    <View style={{flex: 1, backgroundColor: Colors.light.background}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
        >
          <UserFieldInput
            label="Usuário"
            fieldStr={usernameStr}
            fieldRes={username}
            setFieldStr={setUsernameStr}
            errorMsg={usernameErrorMsg}
            placeholder="Nome de usuário"
          />
          <View 
            style={styles.legendContainer}
          >
            <Text 
              style={styles.legendText}
            >
              dd/mm/aaaa
            </Text>
            <MaskedUserFieldInput
              label="Data de nascimento"
              fieldStr={dateStr}
              fieldRes={date}
              setFieldStr={(m, u) => setDateStr(m)}
              keyboardType="numeric"
              errorMsg={dateErrorMsg}
              maxLenght={10}
              placeholder="dd/mm/aaaa"
              mask={[/\d/,/\d/,'/',/\d/,/\d/,'/',/\d/,/\d/,/\d/,/\d/]}
            />
          </View>
          <View
            style={styles.legendContainer}
          >
            {emailRegistered && (
              <Text 
                style={styles.legendTextError}
              >
                Email já registrado
              </Text>
            )}
            <UserFieldInput
              label="Email"
              fieldStr={emailStr}
              fieldRes={email}
              setFieldStr={(s) => {
                setEmailRegistered(false);
                setEmailStr(s);
              }}
              keyboardType="email-address"
              errorMsg={emailErrorMsg}
              placeholder="Email do usuário"
            />
          </View>
          <View
            style={styles.legendContainer}
          >
            {cpfRegistered && (
              <Text 
                style={styles.legendTextError}
              >
                Cpf já registrado
              </Text>
            )}
            <MaskedUserFieldInput
              label="Cpf"
              fieldStr={cpfStr}
              fieldRes={cpf}
              maxLenght={14}
              setFieldStr={(m, u) => {
                setCpfRegistered(false);
                setCpfStr(m);
              }}
              keyboardType="numeric"
              errorMsg={cpfErrorMsg}
              placeholder="Seu Cpf"
              mask={[/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/]}
            />
          </View>
          <UserFieldInput
            label="Senha"
            fieldStr={passwordStr}
            fieldRes={password}
            setFieldStr={(s) => {
              if (passwordRepeat !== '' && (passwordStr !== passwordRepeat))
                setPasswordDiff(true);
              else
                setPasswordDiff(false);
              setPasswordStr(s);
            }}
            errorMsg={passwordErrorMsg}
            secureTextEntry={true}
            placeholder="Sua senha"
          />
          <LineInput
            label="Repita senha"
            placeholder="Repita sua senha"
            value={passwordRepeat}
            onChangeText={(s) => {
              if (s !== '' && passwordStr !== s)
                setPasswordDiff(true);
              else
                setPasswordDiff(false);
              setPasswordRepeat(s);
            }}
            secureTextEntry={true}
            onClosePress={() => setPasswordRepeat('')}
            error={passwordDiff}
            errorValue="As senhas precisam ser iguais"
          />
          <View 
            style={styles.legendContainer}
          >
            { otherError && (
              <Text
                style={styles.legendTextError}
              >
                Um erro ocorreu ao tentar registrar
              </Text>
            )}

            { (username.ok && date.ok && email.ok && cpf.ok && password.ok && !passwordDiff && passwordRepeat !== '') ? (
              <Botao 
                conteudo="Registar"
                onPress={() => {
                  const v = register(username.value, date.value, email.value, cpf.value, password.value);
                  if (v !== null) {
                    if (v === RegisterError.CpfExists)
                      return setCpfRegistered(true);
                    if (v === RegisterError.EmailExists)
                      return setEmailRegistered(true);
                    else 
                      setOtherError(true);
                  }
                }}
              />
            ) : (
              <Botao 
                conteudo="Registar"
                onPress={() => {}}
                desativado={true}
              />
            )}
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
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

function dateErrorMsg(err : UserInputError) {
  if (err === UserInputError.Empty) 
    return "É necessário preencher a data";

  if (err === UserInputError.InvalidInput)
    return "Data inválida";

  return "Erro impossível";
}

function emailErrorMsg(err : UserInputError) {
  if (err === UserInputError.Empty)
    return "É necessário preencher o email";

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
    return "O cpf tem exatamente 11 digitos";

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

const styles = StyleSheet.create({
  legendText : {
    color: Colors.light.onSurfaceVariant,
    fontFamily: "RobotoMono_300Light",
    fontSize: 12,
    marginLeft: 5
  },
  legendContainer : {
    rowGap: 10
  },
  legendTextError : {
    color: Colors.light.error,
    fontFamily: "RobotoMono_400Regular",
    fontSize: 12,
    marginLeft: 5
  },
  scrollView : {
    flexDirection: 'column',
    marginTop: 75,
    rowGap: 44,
    marginHorizontal: '11%',
    flexGrow: 1,
    paddingBottom: 200
  }
})