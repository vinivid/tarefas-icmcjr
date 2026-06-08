import { useState } from "react";
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "@/src/constants/theme";
import Botao from "@/src/components/Botao";
import LineInput from "@/src/components/LineInput";
import { createEmail, createCpf } from "@/src/types/User";
import { type AuthScreenNavigationProp } from "@/src/navigation/AuthNavigator";

const TipoIdentificador = {
  Email: "Email",
  Cpf: "Cpf"
};

export default function EsqueciSenha() {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  const [valor, setValor] = useState('');
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
      const res = await fetch("http://localhost:8080/api/v1/auth/esqueci-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      console.log("status:", res.status);

    const texto = await res.text();
    console.log("resposta:", texto);

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
    <View style={{ flex: 1, backgroundColor: Colors.light.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.view}>

          <Text style={styles.descricao}>
            Digite seu email ou CPF cadastrado. Enviaremos um código de redefinição de senha.
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
              error={erroCampo}
              errorValue="Email/CPF inválido"
              onClosePress={() => setValor('')}
              placeholder="Email ou CPF"
            />
          </View>

          <View style={styles.legendContainer}>
            <Botao
              conteudo={carregando ? "Enviando..." : "Enviar código"}
              onPress={handleSolicitar}
            />
          </View>

        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "column",
    marginTop: 75,
    rowGap: 44,
    marginHorizontal: "11%"
  },
  descricao: {
    color: Colors.light.onSurface,
    fontFamily: "RobotoMono_400Regular",
    fontSize: 13,
    lineHeight: 22,
    textAlign: "center"
  },
  legendContainer: {
    rowGap: 10
  },
  legendTextError: {
    color: Colors.light.error,
    fontFamily: "RobotoMono_400Regular",
    fontSize: 12,
    marginLeft: 5
  }
});