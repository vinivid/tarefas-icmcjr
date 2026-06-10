import { useState } from "react";
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform, Image, useWindowDimensions} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "@/src/constants/theme";
import Botao from "@/src/components/Botao";
import LineInput from "@/src/components/LineInput";
import { createEmail, createCpf } from "@/src/types/User";
import { type AuthScreenNavigationProp } from "@/src/navigation/AuthNavigator";

const TipoIdentificador = {
  Email: "Email",
  Cpf: "Cpf",
};

export default function EsqueciSenha() {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const { width } = useWindowDimensions();

  const showImage = width >= 768;
  const imageSize = width < 1000 ? 360 : 520;

  const [valor, setValor] = useState("");
  const [tipoId, setTipoId] = useState(TipoIdentificador.Email);
  const [erroCampo, setErroCampo] = useState(false);
  const [erroNaoEncontrado, setErroNaoEncontrado] = useState(false);
  const [erroOutro, setErroOutro] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function handleSolicitar() {
    setErroNaoEncontrado(false);
    setErroOutro(false);

    let body: { email?: string; cpf?: string };

    if (tipoId === TipoIdentificador.Email) {
      const email = createEmail(valor);

      if (!email.ok) {
        setErroCampo(true);
        return;
      }

      body = { email: email.value };
    } else {
      const cpf = createCpf(valor);

      if (!cpf.ok) {
        setErroCampo(true);
        return;
      }

      body = { cpf: cpf.value };
    }

    setErroCampo(false);
    setCarregando(true);

    try {
      const res = await fetch(
        "http://localhost:8080/api/v1/auth/esqueci-senha",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (res.status === 200) {
        navigation.navigate("RedefinirSenha");
      } else if (res.status === 404) {
        setErroNaoEncontrado(true);
      } else {
        setErroOutro(true);
      }
    } catch (err) {
      console.error(err);
      setErroOutro(true);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboard}
      >
        <View
          style={[
            styles.container,
            showImage && styles.containerDesktop,
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
            <Text style={styles.descricao}>
              Digite seu email ou CPF cadastrado. Enviaremos um código de
              redefinição de senha.
            </Text>

            <View style={styles.legendContainer}>
              {erroNaoEncontrado && (
                <Text style={styles.legendTextError}>
                  Email/CPF não encontrado
                </Text>
              )}

              {erroOutro && (
                <Text style={styles.legendTextError}>
                  Erro ao enviar email. Tente novamente.
                </Text>
              )}

              <LineInput
                label="Email/CPF"
                value={valor}
                placeholder="Email ou CPF"
                error={erroCampo}
                errorValue="Email/CPF inválido"
                onClosePress={() => setValor("")}
                onChangeText={(s) => {
                  if (/^[\d.-]+$/.test(s))
                    setTipoId(TipoIdentificador.Cpf);
                  else
                    setTipoId(TipoIdentificador.Email);

                  setValor(s);
                  setErroCampo(false);
                  setErroNaoEncontrado(false);
                  setErroOutro(false);
                }}
              />
            </View>

            <View style={styles.legendContainer}>
              <Botao
                conteudo={carregando ? "Enviando..." : "Enviar código"}
                onPress={handleSolicitar}
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

  containerDesktop: {
    flexDirection: "row",
    gap: 60,
  },

  form: {
    width: "100%",
    maxWidth: 340,
    rowGap: 44,
  },

  descricao: {
    color: Colors.light.onSurface,
    fontFamily: "RobotoMono_400Regular",
    fontSize: 13,
    lineHeight: 22,
    textAlign: "center",
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
});