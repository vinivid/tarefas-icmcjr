import { useState, useEffect} from "react"
import { View, Text, ScrollView, Modal, Pressable, StyleSheet, KeyboardAvoidingView, Platform, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import { emailErrorMsg, cpfErrorMsg, usernameErrorMsg, passwordErrorMsg, dateErrorMsg } from "../auth/authUtils";

import { Colors } from "@/src/constants/theme"
import Botao from "@/src/components/Botao"
import UserFieldInput from "@/src/components/auth/UserFieldInput"
import MaskedUserFieldInput from "@/src/components/auth/MaskedUserFieldInput";
import LineInput from "@/src/components/LineInput"
import { useAuth } from "@/src/context/AuthContext"

import useUsernameStr from "@/src/hooks/auth/useUsernameStr";
import usePasswordStr from "@/src/hooks/auth/usePasswordStr";
import useEmailStr from "@/src/hooks/auth/useEmailStr";
import useCpfStr from "@/src/hooks/auth/useCpfStr";
import useDateStr from "@/src/hooks/auth/useDateStr";

export default function Perfil() {
  const { usuario, logout, atualizarPerfil, excluirConta} = useAuth();

  const [editando, setEditando] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);

  const { usernameStr, username, setUsernameStr } = useUsernameStr("");
  const { dateStr, date, setDateStr } = useDateStr("");
  const { emailStr, email, setEmailStr } = useEmailStr("");
  const { cpfStr, cpf, setCpfStr } = useCpfStr("");
  const { passwordStr, password, setPasswordStr } = usePasswordStr('');
  const [ passwordRepeat, setPasswordRepeat ] = useState('');
  const [ passwordDiff, setPasswordDiff ] = useState(false);
  
  const [erroCampos, setErroCampos] = useState(false);
  const [erroSenha, setErroSenha] = useState(false);

  const [textoExcluir, setTextoExcluir] = useState("");

  useEffect(() => {
  if (!usuario) return;
  setUsernameStr(usuario.nome);
  const data = new Date(usuario.dataNascimento); 
  setDateStr(data.toLocaleDateString('en-CH').replace(/\./g, '/'));
  setEmailStr(usuario.email);
  setCpfStr(usuario.cpf);
}, [usuario]);

  function handleCancelarEdicao() {
    setUsernameStr(usuario?.nome ?? "");
    setDateStr(new Date(usuario?.dataNascimento ?? "").toLocaleDateString('en-CH').replace(/\./g, '/'));
    setEmailStr(usuario?.email ?? "");
    setCpfStr(usuario?.cpf ?? "");
    setPasswordStr("");
    setPasswordRepeat("");
    setEditando(false);
    setErroCampos(false);
    setErroSenha(false);
  }

  async function handleConfirmarAlteracoes() {
    if (!username.ok || !date.ok || !email.ok || !cpf.ok) {
      setErroCampos(true);
      return;
    }
    setErroCampos(false);

    if (!password.ok || passwordDiff || passwordRepeat === '') {
      setErroSenha(true);
      return;
    }
    setErroSenha(false);

    const err = await atualizarPerfil({
      nome: username.value,
      dataNascimento: date.value,
      email: email.value,
      cpf: cpf.value,
      senha: password.value
    });

    if (err === "EMAIL_EXISTS" || err === "CPF_EXISTS") {
      setErroCampos(true);
      return;
    }
    setPasswordStr("");
    setPasswordRepeat("");
    setPasswordDiff(false);
    setEditando(false);
  }
  async function handleExcluirConta() {
    if (textoExcluir !== "Excluir") return;
    await excluirConta();
    setModalVisivel(false);
  }

  function handleLogout() {
    logout();
  }

  const SENHA_PLACEHOLDER = "●".repeat((usuario?.senha?.length ?? 0) > 0 ? usuario!.senha!.length : 10)

  return (
    <TouchableWithoutFeedback> 
      <KeyboardAvoidingView
      style={styles.tela}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      
      {editando && (
        <Pressable onPress={handleCancelarEdicao} style={styles.botaoVoltar}>
          <MaterialCommunityIcons name="arrow-left" size={26} color={Colors.light.onSurface} />
        </Pressable>
      )}

      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.titulo}>Sua Conta</Text>

        <UserFieldInput 
          label="Nome completo" 
          fieldStr={usernameStr} 
          fieldRes={username}
          editable={editando}
          setFieldStr={setUsernameStr}
          errorMsg={usernameErrorMsg}
        />

        <MaskedUserFieldInput
          label="Data de nascimento"
          fieldStr={dateStr}
          fieldRes={date}
          setFieldStr={(m, u) => setDateStr(m)}
          keyboardType="numeric"
          errorMsg={dateErrorMsg}
          maxLenght={10}
          editable={editando}
          mask={[/\d/,/\d/,'/',/\d/,/\d/,'/',/\d/,/\d/,/\d/,/\d/]}
        />

        <UserFieldInput
          label="Email"
          fieldStr={emailStr}
          fieldRes={email}
          setFieldStr={setEmailStr}
          keyboardType="email-address"
          errorMsg={emailErrorMsg}
          placeholder="Email do usuário"
          editable={editando}
        />

        <MaskedUserFieldInput
          label="Cpf"
          fieldStr={cpfStr}
          fieldRes={cpf}
          maxLenght={14}
          setFieldStr={(m, u) => {setCpfStr(m)}}
          keyboardType="numeric"
          errorMsg={cpfErrorMsg}
          placeholder="Seu Cpf"
          editable={editando}
          mask={[/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/]}
        />

        {!editando ? (
          <LineInput 
            label="Senha" 
            value={SENHA_PLACEHOLDER} 
            onChangeText={() => {}}
            onClosePress={() => {}} 
            editable={false} 
          />
        ) : (
          <>
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
          </>
        )}

        <View style={styles.botoes}>
  {!editando ? (
    <>
      <Botao conteudo="Editar perfil" onPress={() => setEditando(true)} />
      <Botao conteudo="Sair" onPress={handleLogout} />
    </>
  ) : (
    <>
      <View style={styles.legendContainer}>
              {(erroCampos || erroSenha) && (
                <Text style={styles.legendTextError}>
                  Corrija os campos inválidos antes de salvar.
                </Text>
              )}
              <Botao conteudo="Confirmar alterações" onPress={handleConfirmarAlteracoes} />
            </View>
            <Pressable style={styles.botaoExcluir} onPress={() => setModalVisivel(true)}>
              <Text style={styles.botaoExcluirTexto}>Excluir conta</Text>
            </Pressable>
          </>
        )}
      </View>

      </ScrollView>

      <Modal visible={modalVisivel} transparent animationType="fade" onRequestClose={() => setModalVisivel(false)}>
        <TouchableWithoutFeedback>
        <View style={styles.modalFundo}>
          <View style={styles.modalCaixa}>

            <Text style={styles.modalTitulo}>Excluir a sua conta do APP?</Text>

            <Text style={styles.modalAviso}>
              Você está solicitando a exclusão da sua conta no APP. Uma vez confirmada, a sua conta será perdida para sempre.
            </Text>

            <Text style={styles.modalInstrucao}>
              Por favor digite "Excluir" para continuar
            </Text>

            <View style={styles.modalInput}>
              <TextInput
                value={textoExcluir}
                onChangeText={setTextoExcluir}
                placeholder="Excluir"
                style={styles.inputExcluir}
              />
            </View>

            <View style={styles.divisor} />

            <Pressable
              onPress={handleExcluirConta}
              style={textoExcluir !== "Excluir" ? styles.botaoDesabilitado : undefined}
            >
              <Text style={styles.modalBotaoExcluir}>Excluir permanentemente a conta</Text>
            </Pressable>

            <View style={styles.divisor} />

            <Pressable onPress={() => setModalVisivel(false)}>
              <Text style={styles.modalBotaoCancelar}>Cancelar</Text>
            </Pressable>

          </View>
        </View>
        </TouchableWithoutFeedback>
      </Modal>

    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  botaoVoltar: {
    padding: 12,
    alignSelf: "flex-start",
  },
  container: {
    padding: 24,
    paddingBottom: 48,
    gap: 16,
    width: "100%",
    maxWidth: 720, 
    alignSelf: "center",
  },
  titulo : {
    color: Colors.light.primary,
    fontWeight: 800,
    fontSize: 32,
    marginBottom: 10,
    alignSelf: "center",
  },
  botoes: {
    marginTop: 8,
    gap: 12,
    alignItems: "center",
  },
  botaoExcluir: {
    backgroundColor: Colors.light.error,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 100,
  },
  botaoExcluirTexto: {
    color: Colors.light.background,
    fontFamily: "RobotoMono_700Bold",
  },
  modalFundo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalCaixa: {
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    paddingTop: 24,
    paddingHorizontal: 0,
    paddingBottom: 0,
    width: "100%",
    overflow: "hidden",
  },
  modalTitulo: {
    fontSize: 18,
    fontFamily: "RobotoMono_700Bold",
    color: Colors.light.primary,
    textAlign: "center",
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  modalAviso: {
    fontSize: 13,
    fontFamily: "RobotoMono_400Regular",
    textAlign: "center",
    padding: 20,
    paddingBottom: 30,
    lineHeight: 22,
  },
  modalInstrucao: {
    fontSize: 13,
    fontFamily: "RobotoMono_400Regular",
    color: Colors.light.onSurface,
    textAlign: "center",
    paddingHorizontal: 24,
    marginTop: 4,
  },
  modalInput: {
    paddingHorizontal: 16,
    marginTop: 4,
  },
  divisor: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginTop: 8,
  },
  modalBotaoExcluir: {
    color: Colors.light.error,
    fontFamily: "RobotoMono_700Bold",
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 16,
  },
  botaoDesabilitado: {
    opacity: 0.3,
  },
  inputExcluir: {
    marginHorizontal: 40, 
    marginVertical: 10,
    height: 40,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 18,
    paddingHorizontal: 20,
    color: "#444",
    backgroundColor: "#FFF",
  },
  modalBotaoCancelar: {
    color: Colors.light.onSurface,
    fontFamily: "RobotoMono_400Regular",
    fontSize: 15,
    textAlign: "center",
    paddingVertical: 16,
  },
  legendContainer: {
  rowGap: 6,
  alignItems: "center",
},
legendTextError: {
  color: Colors.light.error,
  fontFamily: "RobotoMono_400Regular",
  fontSize: 12,
  marginLeft: 5,
},
})