import { useState, useRef } from "react"
import { View, Text, ScrollView, Modal, Pressable, StyleSheet, KeyboardAvoidingView, Platform, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import { Colors } from "@/src/constants/theme"
import Botao from "@/src/components/Botao"
import LineInput from "@/src/components/LineInput"
import { useAuth } from "@/src/context/AuthContext"

function mascaraCpf(valor: string) {
  const digits = valor.replace(/\D/g, "").slice(0, 11)
  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
}

function mascaraData(valor: string) {
  const digits = valor.replace(/\D/g, "").slice(0, 8)
  return digits
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
}


function validarNome(nome: string) {
  if (!nome.trim()) return "Nome é obrigatório."
  if (nome.trim().length < 3) return "Nome deve ter ao menos 3 caracteres."
  return ""
}

function validarData(data: string) {
  if (!data.trim()) return "Data é obrigatória."
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(data)) return "Use o formato DD/MM/AAAA."

  const [dia, mes, ano] = data.split("/").map(Number)
  const anoAtual = new Date().getFullYear()

  const diasNoMes = new Date(ano, mes, 0).getDate()
  if (
    ano < 1900 || ano > anoAtual ||
    mes < 1 || mes > 12 ||
    dia < 1 || dia > diasNoMes
  ) return "Insira uma data válida."

  return ""
}

function validarEmail(email: string) {
  if (!email.trim()) return "E-mail é obrigatório."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "E-mail inválido."
  return ""
}

function validarCpf(cpf: string) {
  if (!cpf.trim()) return "CPF é obrigatório."
  if (cpf.replace(/\D/g, "").length !== 11) return "CPF deve ter 11 dígitos."
  return ""
}

function validarSenha(senha: string) {
  if (!senha) return "Nova senha é obrigatória."
  if (senha.length < 6) return "Senha deve ter ao menos 6 caracteres."
  return ""
}

function validarConfirmacao(senha: string, confirmacao: string) {
  if (!confirmacao) return "Confirme a senha."
  if (senha !== confirmacao) return "As senhas não coincidem."
  return ""
}

export default function Perfil() {
  const { user, logout } = useAuth()
  const navigation = useNavigation()

  const [editando, setEditando] = useState(false)
  const [modalVisivel, setModalVisivel] = useState(false)

  const [nome, setNome] = useState(user?.nome ?? "")
  const [dataNascimento, setDataNascimento] = useState(user?.dataNascimento ?? "")
  const [email, setEmail] = useState(user?.email ?? "")
  const [cpf, setCpf] = useState(user?.cpf ?? "")
  const [novaSenha, setNovaSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [textoExcluir, setTextoExcluir] = useState("")

  const [erros, setErros] = useState({
    nome: "", dataNascimento: "", email: "", cpf: "", novaSenha: "", confirmarSenha: "",
  })

  const validacaoAtiva = useRef(false)

  function atualizarNome(v: string) {
    setNome(v)
    if (validacaoAtiva.current) setErros(e => ({ ...e, nome: validarNome(v) }))
  }
  function atualizarData(v: string) {
    const formatado = mascaraData(v)
    setDataNascimento(formatado)
    if (validacaoAtiva.current) setErros(e => ({ ...e, dataNascimento: validarData(formatado) }))
  }
  function atualizarEmail(v: string) {
    setEmail(v)
    if (validacaoAtiva.current) setErros(e => ({ ...e, email: validarEmail(v) }))
  }
  function atualizarCpf(v: string) {
    const formatado = mascaraCpf(v)
    setCpf(formatado)
    if (validacaoAtiva.current) setErros(e => ({ ...e, cpf: validarCpf(formatado) }))
  }
  function atualizarNovaSenha(v: string) {
    setNovaSenha(v)
    if (validacaoAtiva.current)
      setErros(e => ({ ...e, novaSenha: validarSenha(v), confirmarSenha: validarConfirmacao(v, confirmarSenha) }))
  }
  function atualizarConfirmarSenha(v: string) {
    setConfirmarSenha(v)
    if (validacaoAtiva.current) setErros(e => ({ ...e, confirmarSenha: validarConfirmacao(novaSenha, v) }))
  }

  function handleCancelarEdicao() {
    setNome(user?.nome ?? "")
    setDataNascimento(user?.dataNascimento ?? "")
    setEmail(user?.email ?? "")
    setCpf(user?.cpf ?? "")
    setNovaSenha("")
    setConfirmarSenha("")
    setErros({ nome: "", dataNascimento: "", email: "", cpf: "", novaSenha: "", confirmarSenha: "" })
    validacaoAtiva.current = false
    setEditando(false)
  }

  function handleConfirmarAlteracoes() {
    validacaoAtiva.current = true
    const novosErros = {
      nome: validarNome(nome),
      dataNascimento: validarData(dataNascimento),
      email: validarEmail(email),
      cpf: validarCpf(cpf),
      novaSenha: validarSenha(novaSenha),
      confirmarSenha: validarConfirmacao(novaSenha, confirmarSenha),
    }
    setErros(novosErros)
    if (Object.values(novosErros).some(e => e !== "")) return
    validacaoAtiva.current = false
    setEditando(false)
  }

  function handleExcluirConta() {
    if (textoExcluir !== "Excluir") return
    logout()
    setModalVisivel(false)
  }

  const SENHA_PLACEHOLDER = "*".repeat((user?.senha?.length ?? 0) > 0 ? user!.senha!.length : 10)

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
      <KeyboardAvoidingView
      style={styles.tela}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      
      {editando && (
        <Pressable onPress={handleCancelarEdicao} style={styles.botaoVoltar}>
          <MaterialCommunityIcons name="arrow-left" size={26} color={Colors.light.onSurface} />
        </Pressable>
      )}

      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

        <LineInput label="Nome completo" value={nome} onChangeText={atualizarNome}
          onClosePress={() => atualizarNome("")} editable={editando}
          error={!!erros.nome} errorValue={erros.nome} />

        <LineInput label="Data de nascimento" value={dataNascimento} onChangeText={atualizarData}
          onClosePress={() => atualizarData("")} keyboardType="numeric"
          editable={editando} error={!!erros.dataNascimento} errorValue={erros.dataNascimento} />

        <LineInput label="E-mail" value={email} onChangeText={atualizarEmail}
          onClosePress={() => atualizarEmail("")} keyboardType="email-address"
          editable={editando} error={!!erros.email} errorValue={erros.email} />

        <LineInput label="CPF" value={cpf} onChangeText={atualizarCpf}
          onClosePress={() => atualizarCpf("")} placeholder="XXX.XXX.XXX-XX" keyboardType="numeric"
          editable={editando} error={!!erros.cpf} errorValue={erros.cpf} />

        {!editando ? (
          <LineInput label="Senha" value={SENHA_PLACEHOLDER} onChangeText={() => {}}
            onClosePress={() => {}} editable={false} />
        ) : (
          <>
            <LineInput label="Nova senha" value={novaSenha} onChangeText={atualizarNovaSenha}
              onClosePress={() => atualizarNovaSenha("")} secureTextEntry editable
              error={!!erros.novaSenha} errorValue={erros.novaSenha} />

            <LineInput label="Confirmar senha" value={confirmarSenha} onChangeText={atualizarConfirmarSenha}
              onClosePress={() => atualizarConfirmarSenha("")} secureTextEntry editable
              error={!!erros.confirmarSenha} errorValue={erros.confirmarSenha} />
          </>
        )}

        <View style={styles.botoes}>
          {!editando ? (
            <Botao conteudo="Editar perfil" onPress={() => setEditando(true)} />
          ) : (
            <>
              <Botao conteudo="Confirmar alterações" onPress={handleConfirmarAlteracoes} />
              <Pressable style={styles.botaoExcluir} onPress={() => setModalVisivel(true)}>
                <Text style={styles.botaoExcluirTexto}>Excluir conta</Text>
              </Pressable>
            </>
          )}
        </View>

      </ScrollView>

      <Modal visible={modalVisivel} transparent animationType="fade" onRequestClose={() => setModalVisivel(false)}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                style={styles.input}
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
  input: {
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
})