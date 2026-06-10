import { useState } from "react";
import { View, StyleSheet, Text, ScrollView, KeyboardAvoidingView, Platform, Image, useWindowDimensions} from "react-native";
import { useAuth } from "@/src/context/AuthContext";

import Botao from "@/src/components/Botao";
import LineInput from "@/src/components/LineInput";
import UserFieldInput from "@/src/components/auth/UserFieldInput";
import MaskedUserFieldInput from "@/src/components/auth/MaskedUserFieldInput";

import { emailErrorMsg, cpfErrorMsg, usernameErrorMsg, passwordErrorMsg, dateErrorMsg } from "./authUtils";

import useUsernameStr from "@/src/hooks/auth/useUsernameStr";
import usePasswordStr from "@/src/hooks/auth/usePasswordStr";
import useEmailStr from "@/src/hooks/auth/useEmailStr";
import useCpfStr from "@/src/hooks/auth/useCpfStr";
import useDateStr from "@/src/hooks/auth/useDateStr";
import { RegisterError } from "@/src/context/AuthContext";
import { Colors } from "@/src/constants/theme";

export default function Registrar() {
  const { registrar } = useAuth();

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

  const { width } = useWindowDimensions();
  const showImage = width >= 768;
  const imageSize = width < 1000 ? 360 : 520;

  return (
    <View style={{flex: 1, backgroundColor: Colors.light.background}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollView,
            showImage && styles.scrollViewDesktop,
          ]}
        >

          {showImage && (
            <Image
              source={require("@/src/assets/images/stock_init.png")}
              resizeMode="contain"
              style={{
                width: imageSize,
                height: imageSize,
                alignSelf: "center",
              }}
            />
          )}

          <View style={styles.form}>
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
                conteudo="Registrar"
                onPress={ async () => {
                  const v = await registrar(username.value, date.value, email.value, cpf.value, password.value);
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
                conteudo="Registrar"
                onPress={() => {}}
                desativado={true}
              />
            )}
          </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  legendText: {
    color: Colors.light.onSurfaceVariant,
    fontFamily: "RobotoMono_300Light",
    fontSize: 12,
    marginLeft: 5,
  },

  legendContainer: {
    rowGap: 10,
  },

  legendTextError: {
    color: Colors.light.error,
    fontFamily: "RobotoMono_400Regular",
    fontSize: 12,
    marginLeft: 5,
  },

  scrollView: {
    flexGrow: 1,
    paddingTop: 75,
    paddingHorizontal: 24,
    paddingBottom: 120,
    alignItems: "center",
  },

  scrollViewDesktop: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 60,
  },

  form: {
    width: "100%",
    maxWidth: 340,
    rowGap: 44,
  },
});