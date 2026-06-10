import { useState } from "react";
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform, Pressable, Image, useWindowDimensions} from "react-native";

import { LoginError, useAuth } from "@/src/context/AuthContext";
import { Colors } from "@/src/constants/theme";

import Botao from "@/src/components/Botao";
import LineInput from "@/src/components/LineInput";
import { createCpf, createEmail, createPassword } from "@/src/types/User";

import { useNavigation } from "@react-navigation/native";
import { type AuthScreenNavigationProp } from "@/src/navigation/AuthNavigator";

const LoginType = {
  Email: "Email",
  Cpf: "Cpf",
};

export default function Login() {
  const { login } = useAuth();
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const { width } = useWindowDimensions();

  const showImage = width >= 768;

  const imageSize = width < 1000 ? 360 : 520;

  const [logVal, setLogVal] = useState("");
  const [passVal, setPassVal] = useState("");
  const [errEmailCpf, setErrEmailCpf] = useState(false);
  const [cpfNotFound, setCpfNotFound] = useState(false);
  const [emailNotFound, setEmailNotFound] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [errPass, setErrPass] = useState(false);
  const [otherError, setOtherError] = useState(false);
  const [logType, setLogType] = useState(LoginType.Email);

  const loginError = (e: LoginError) => {
    if (e === LoginError.CpfNotFound) setCpfNotFound(true);
    if (e === LoginError.EmailNotFound) setEmailNotFound(true);
    if (e === LoginError.WrongPassword) setWrongPassword(true);
    if (e === LoginError.OtherError) setOtherError(true);
  };

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboard}
      >
        <View
          style={[
            styles.container,
            showImage && styles.containerWithImage,
          ]}
        >
          {showImage && (
            <Image
              source={require("@/src/assets/images/stock_init.png")}
              resizeMode="contain"
              style={{
                width: imageSize,
                height: imageSize,
              }}
            />
          )}

          <View style={styles.form}>
            {showImage && <Text style={styles.title}>Login</Text>}

            <View style={styles.fieldGroup}>
              {cpfNotFound && (
                <Text style={styles.errorText}>CPF não registrado</Text>
              )}

              {emailNotFound && (
                <Text style={styles.errorText}>Email não registrado</Text>
              )}

              <LineInput
                label="Email/cpf do usuário"
                value={logVal}
                placeholder="Email/cpf"
                error={errEmailCpf}
                errorValue="Email/Cpf inválido"
                onClosePress={() => setLogVal("")}
                onChangeText={(s) => {
                  setLogType(
                    /^[\d.-]+$/.test(s)
                      ? LoginType.Cpf
                      : LoginType.Email
                  );

                  setLogVal(s);
                  setErrEmailCpf(false);
                  setCpfNotFound(false);
                  setEmailNotFound(false);
                }}
              />
            </View>

            <View style={styles.fieldGroup}>
              {wrongPassword && (
                <Text style={styles.errorText}>Senha errada</Text>
              )}

              <LineInput
                label="Senha"
                value={passVal}
                placeholder="Senha"
                secureTextEntry
                error={errPass}
                errorValue="Senha inválida"
                onClosePress={() => setPassVal("")}
                onChangeText={(s) => {
                  setPassVal(s);
                  setErrPass(false);
                  setWrongPassword(false);
                }}
              />

              <Pressable
                onPress={() => navigation.navigate("EsqueciSenha")}
              >
                <Text style={styles.esqueciSenha}>
                  Esqueci minha senha
                </Text>
              </Pressable>
            </View>

            <View style={styles.fieldGroup}>
              {otherError && (
                <Text style={styles.errorText}>Ocorreu um erro</Text>
              )}

              <Botao
                conteudo="Entrar"
                onPress={async () => {
                  const password = createPassword(passVal);

                  if (!password.ok) {
                    setErrPass(true);
                    return;
                  }

                  if (logType === LoginType.Email) {
                    const email = createEmail(logVal);

                    if (!email.ok) {
                      setErrEmailCpf(true);
                      return;
                    }

                    const res = await login(password.value, email.value);

                    if (res) loginError(res);
                  } else {
                    const cpf = createCpf(logVal);

                    if (!cpf.ok) {
                      setErrEmailCpf(true);
                      return;
                    }

                    const res = await login(
                      password.value,
                      undefined,
                      cpf.value
                    );

                    if (res) loginError(res);
                  }
                }}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },

  keyboard: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  containerWithImage: {
    flexDirection: "row",
    gap: 50,
  },

  form: {
    width: "100%",
    maxWidth: 340,
    rowGap: 40,
  },

  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: Colors.light.primary,
    alignSelf: "center",
  },

  fieldGroup: {
    rowGap: 10,
  },

  errorText: {
    color: Colors.light.error,
    fontFamily: "RobotoMono_400Regular",
    fontSize: 12,
    marginLeft: 5,
  },

  esqueciSenha: {
    color: Colors.light.primary,
    fontFamily: "RobotoMono_400Regular",
    fontSize: 13,
    alignSelf: "flex-end",
    marginRight: 5,
  },
});