import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import { LoginError, useAuth } from "@/src/context/AuthContext";

import { Colors } from "@/src/constants/theme";

import Botao from "@/src/components/Botao";
import LineInput from "@/src/components/LineInput";
import { createCpf, createEmail, createPassword } from "@/src/types/User";

const LoginType = {
  Email: "Email",
  Cpf: "Cpf"
};

export default function Login() {
  const { login } = useAuth();

  const [ logVal, setLogVal ] = useState('');
  const [ passVal, setPassVal ] = useState('');
  const [ errEmailCpf, setErrEmailCpf ] = useState(false);
  const [ cpfNotFound, setCpfNotFound ] = useState(false);
  const [ emailNotFound, setEmailNotFound ] = useState(false);
  const [ wrongPassword, setWrongPassword ] = useState(false); 
  const [ errPass, setErrPass ] = useState(false);
  const [ otherError, setOtherError ] = useState(false);
  const [ logType, setLogType ] = useState(LoginType.Email);

  const loginError = (e : LoginError) => {
    if (e === LoginError.CpfNotFound)
      setCpfNotFound(true);

    if (e === LoginError.EmailNotFound)
      setEmailNotFound(true);

    if (e === LoginError.WrongPassword)
      setWrongPassword(true)

    if (e === LoginError.OtherError)
      setOtherError(true);
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.light.background}}>
      <View 
        style={styles.loginView}
      >
        <View 
          style={styles.legendContainer}
        >
          {cpfNotFound && (
            <Text 
              style={styles.legendTextError}
            >
              Cpf não registrado
            </Text>
          )}
          {emailNotFound && (
            <Text 
              style={styles.legendTextError}
            >
              Email não registrado
            </Text>
          )}
          <LineInput
            label="Email/cpf do usuário"
            onChangeText={(s) => {
              if (/^[\d.-]+$/.test(s)) 
                setLogType(LoginType.Cpf);
              else
                setLogType(LoginType.Email);
              setLogVal(s);
              setErrEmailCpf(false);
              setCpfNotFound(false);
              setEmailNotFound(false);
            }}
            error={errEmailCpf}
            errorValue="Email/Cpf inválido"
            onClosePress={() => setLogVal('')}
            value={logVal}
            placeholder="Email/cpf "
          />
        </View>

        <View 
          style={styles.legendContainer}
        >
          {wrongPassword && (
            <Text 
              style={styles.legendTextError}
            >
              Senha errada
            </Text>
          )}
          <LineInput
            label="Senha"
            onChangeText={(s) => {
              setErrPass(false);
              setPassVal(s);
              setWrongPassword(false);
            }}
            error={errPass}
            errorValue="Senha inválida"
            onClosePress={() => setLogVal('')}
            value={passVal}
            secureTextEntry={true}
            placeholder="Senha"
          />
        </View>
        <View 
          style={styles.legendContainer}
        >
          {otherError && (
            <Text 
              style={styles.legendTextError}
            >
              Senha errada
            </Text>
          )}
          <Botao 
            conteudo="Logar"
            onPress={() => {
              const password = createPassword(passVal);
              if (!password.ok) {
                setErrPass(true);
                return;
              }

              if (logType === LoginType.Email) {
                const email = createEmail(logVal);
                if (email.ok) {
                  const lRes = login(password.value, email.value)
                  if (lRes !== null)
                    loginError(lRes);

                } else {
                  setErrEmailCpf(true);
                }
              } else {
                const cpf = createCpf(logVal);
                if (cpf.ok) {
                  const lRes = login(password.value, undefined, cpf.value)
                  if (lRes !== null)
                    loginError(lRes);
                } else {
                  setErrEmailCpf(true);
                }
              }
            }}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  legendContainer : {
    rowGap: 10
  },
  legendTextError : {
    color: Colors.light.error,
    fontFamily: "RobotoMono_400Regular",
    fontSize: 12,
    marginLeft: 5
  },
  loginView : {
    flex: 1,
    flexDirection: 'column',
    marginTop: 75,
    rowGap: 44,
    marginHorizontal: '11%',
  }
})