import { useState } from "react";
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "@/src/constants/theme";
import Botao from "@/src/components/Botao";
import LineInput from "@/src/components/LineInput";
import { createPassword } from "@/src/types/User";
import { passwordErrorMsg } from "../auth/authUtils";
import { type AuthScreenNavigationProp } from "@/src/navigation/AuthNavigator";

export default function RedefinirSenha() {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  const [token, setToken] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [repetirSenha, setRepetirSenha] = useState('');

  const [erroToken, setErroToken] = useState(false);
  const [erroSenha, setErroSenha] = useState(false);
  const [erroSenhaDiff, setErroSenhaDiff] = useState(false);
  const [erroOutro, setErroOutro] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function handleRedefinir() {
    setErroToken(false);
    setErroSenha(false);
    setErroSenhaDiff(false);
    setErroOutro(false);

    if (token.trim() === '') {
      setErroToken(true);
      return;
    }

    const senha = createPassword(novaSenha);
    if (!senha.ok) {
      setErroSenha(true);
      return;
    }

    if (novaSenha !== repetirSenha) {
      setErroSenhaDiff(true);
      return;
    }

    setCarregando(true);

    try {
      const res = await fetch("http://localhost:8080/api/v1/auth/redefinir-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, novaSenha: senha.value })
      });

      if (res.status === 200) {
        navigation.navigate("Login");
      } else if (res.status === 400) {
        setErroToken(true);
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
            Digite o código de 6 dígitos enviado para o seu email e sua nova senha.
          </Text>

          <View style={styles.legendContainer}>
            {erroToken && (
              <Text style={styles.legendTextError}>
                Código inválido ou expirado
              </Text>
            )}
            <LineInput
              label="Código"
              value={token}
              onChangeText={(s) => {
                setToken(s);
                setErroToken(false);
              }}
              error={erroToken}
              errorValue="Código inválido ou expirado"
              onClosePress={() => setToken('')}
              placeholder="000000"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.legendContainer}>
            {erroSenha && (
              <Text style={styles.legendTextError}>
                Senha inválida (mínimo 8 caracteres)
              </Text>
            )}
            <LineInput
              label="Nova senha"
              value={novaSenha}
              onChangeText={(s) => {
                setNovaSenha(s);
                setErroSenha(false);
                setErroSenhaDiff(false);
              }}
              error={erroSenha}
              errorValue="Senha inválida"
              onClosePress={() => setNovaSenha('')}
              placeholder="Nova senha"
              secureTextEntry={true}
            />
          </View>

          <View style={styles.legendContainer}>
            {erroSenhaDiff && (
              <Text style={styles.legendTextError}>
                As senhas precisam ser iguais
              </Text>
            )}
            <LineInput
              label="Repita a senha"
              value={repetirSenha}
              onChangeText={(s) => {
                setRepetirSenha(s);
                setErroSenhaDiff(false);
              }}
              error={erroSenhaDiff}
              errorValue="As senhas precisam ser iguais"
              onClosePress={() => setRepetirSenha('')}
              placeholder="Repita a nova senha"
              secureTextEntry={true}
            />
          </View>

          <View style={styles.legendContainer}>
            {erroOutro && (
              <Text style={styles.legendTextError}>
                Erro ao redefinir senha. Tente novamente.
              </Text>
            )}
            <Botao
              conteudo={carregando ? "Salvando..." : "Redefinir senha"}
              onPress={handleRedefinir}
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