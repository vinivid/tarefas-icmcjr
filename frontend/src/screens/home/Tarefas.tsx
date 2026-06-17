import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

import { Colors } from "@/src/constants/theme";
import ListaTarefas from "@/src/components/ListaTarefas";
import ModalTarefa from "../../components/ModalTarefa";
import Filtro from "@/src/components/Filtro";
import { useAuth } from "@/src/context/AuthContext";
import { API_URL } from "@/src/constants/api";

type Tarefa = {
  id: string;
  titulo: string;
  desc: string;
  prazo: Date;
  finished: boolean;
};

type TarefaApi = Omit<Tarefa, "prazo"> & {
  prazo: string;
};

export type TipoFiltro =
  | "todos"
  | "atrasado"
  | "andamento"
  | "finalizado";

const TAREFAS_URL = `${API_URL}/tarefas`;

function converterTarefa(tarefa: TarefaApi): Tarefa {
  return {
    ...tarefa,
    prazo: new Date(tarefa.prazo)
  };
}

export default function Tarefas() {
  const { width } = useWindowDimensions();
  const { authToken, usuario } = useAuth();
  const desktop = width >= 900;
  const primeiroNome = usuario?.nome.trim().split(/\s+/)[0];

  const [filtro, setFiltro] = useState<TipoFiltro>("todos");
  const [modalVisivel, setModalVisivel] = useState(false);
  const [listaTarefas, setListaTarefas] = useState<Tarefa[]>([]);
  const [tarefaEditando, setTarefaEditando] = useState<Tarefa | undefined>(undefined);
  const [carregando, setCarregando] = useState(true);
  const [erroCarregamento, setErroCarregamento] = useState(false);

  useEffect(() => {
    let ativo = true;

    async function carregarTarefas() {
      if (!authToken) {
        if (ativo) setCarregando(false);
        return;
      }

      try {
        setErroCarregamento(false);
        const res = await fetch(TAREFAS_URL, {
          headers: { Authorization: `Bearer ${authToken}` }
        });

        if (!res.ok) throw new Error("Erro ao carregar tarefas");

        const tarefas: TarefaApi[] = await res.json();
        if (ativo) setListaTarefas(tarefas.map(converterTarefa));
      } catch (err) {
        console.error(err);
        if (ativo) setErroCarregamento(true);
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarTarefas();

    return () => {
      ativo = false;
    };
  }, [authToken]);

  const criarDataPrazo = (data: string, hora: string) => {
    const partesData = data.split("/");
    const partesHora = hora.split(":");

    return new Date(
      Number(partesData[2]),
      Number(partesData[1]) - 1,
      Number(partesData[0]),
      Number(partesHora[0]) || 0,
      Number(partesHora[1]) || 0
    );
  };

  const abrirModalCriacao = () => {
    setTarefaEditando(undefined);
    setModalVisivel(true);
  };

  const abrirModalEdicao = (tarefa: Tarefa) => {
    setTarefaEditando(tarefa);
    setModalVisivel(true);
  };

  const fecharModal = () => {
    setModalVisivel(false);
    setTarefaEditando(undefined);
  };

  const excluirTarefa = async (id: string) => {
    if (!authToken) return;

    try {
      const res = await fetch(`${TAREFAS_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` }
      });

      if (!res.ok) throw new Error("Erro ao excluir tarefa");

      setListaTarefas((tarefasAtuais) =>
        tarefasAtuais.filter((tarefa) => tarefa.id !== id)
      );
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível excluir a tarefa.");
    }
  };

  const toggleFinalizado = async (id: string) => {
    if (!authToken) return;

    const tarefa = listaTarefas.find((item) => item.id === id);
    if (!tarefa) return;

    try {
      const res = await fetch(`${TAREFAS_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({ finished: !tarefa.finished })
      });

      if (!res.ok) throw new Error("Erro ao atualizar tarefa");

      const tarefaAtualizada = converterTarefa(await res.json());
      setListaTarefas((tarefasAtuais) =>
        tarefasAtuais.map((item) =>
          item.id === id ? tarefaAtualizada : item
        )
      );
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível atualizar a tarefa.");
    }
  };

  const salvarTarefa = async (novaTarefa: {
    titulo: string;
    descricao: string;
    data: string;
    hora: string;
  }) => {
    if (!authToken) return false;

    const prazo = criarDataPrazo(novaTarefa.data, novaTarefa.hora);
    const editando = tarefaEditando !== undefined;
    const url = editando
      ? `${TAREFAS_URL}/${tarefaEditando.id}`
      : TAREFAS_URL;

    try {
      const res = await fetch(url, {
        method: editando ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({
          titulo: novaTarefa.titulo,
          desc: novaTarefa.descricao,
          prazo
        })
      });

      if (!res.ok) throw new Error("Erro ao salvar tarefa");

      const tarefaSalva = converterTarefa(await res.json());

      if (editando) {
        setListaTarefas((tarefasAtuais) =>
          tarefasAtuais.map((tarefa) =>
            tarefa.id === tarefaSalva.id ? tarefaSalva : tarefa
          )
        );
      } else {
        setListaTarefas((tarefasAtuais) => [tarefaSalva, ...tarefasAtuais]);
      }

      return true;
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível salvar a tarefa.");
      return false;
    }
  };

  const tarefaParaEditar = tarefaEditando
    ? {
        titulo: tarefaEditando.titulo,
        descricao: tarefaEditando.desc,
        data: tarefaEditando.prazo.toLocaleDateString("pt-BR"),
        hora: tarefaEditando.prazo.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit"
        })
      }
    : undefined;

  const tarefasFiltradas = listaTarefas.filter((tarefa) => {
    if (filtro === "todos") return true;
    if (filtro === "finalizado" && tarefa.finished) return true;
    if (filtro === "atrasado" && new Date() > tarefa.prazo && !tarefa.finished) return true;
    if (filtro === "andamento" && !tarefa.finished && new Date() <= tarefa.prazo) return true;

    return false;
  });

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        {desktop && primeiroNome && (
          <View>
            <Text style={styles.titulo}>
              Olá, {primeiroNome}! 👋
            </Text>
            <Text style={styles.subtitulo}>
              Vamos organizar seu dia!
            </Text>
          </View>
        )}

        <View style={[styles.header, desktop && styles.headerDesktop]}>
          <Filtro onFiltroChange={setFiltro}/>

          <Pressable style={styles.botaoMais} onPress={abrirModalCriacao}>
            <MaterialIcons name="add" size={20} color="#6750A4" />
          </Pressable>
        </View>

        {carregando && (
          <ActivityIndicator color={Colors.light.primary} style={styles.carregando} />
        )}

        {!carregando && erroCarregamento && (
          <Text style={styles.textoErro}>
            Não foi possível carregar as tarefas.
          </Text>
        )}

        {!carregando && !erroCarregamento && listaTarefas.length === 0 && (
          <Text style={styles.textoVazio}>
            Nenhuma tarefa adicionada ainda.
          </Text>
        )}

        {!carregando && !erroCarregamento && (
          <ListaTarefas
            tarefas={tarefasFiltradas}
            desktop={desktop}
            onToggle={toggleFinalizado}
            onEditar={abrirModalEdicao}
            onExcluir={excluirTarefa}
          />
        )}

        <ModalTarefa
          visivel={modalVisivel}
          fecharModal={fecharModal}
          onSalvar={salvarTarefa}
          desktop={desktop}
          tarefaParaEditar={tarefaParaEditar}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.light.background,
    height: "100%",
    overflow: "visible"
  },

  container: {
    flex: 1,
    paddingTop: 30,
    width: "90%",
    alignSelf: "center",
    backgroundColor: Colors.light.background,
    overflow: "visible"
  },

  titulo: {
    color: Colors.light.primary,
    fontWeight: 800,
    fontSize: 40,
    marginLeft: 10
  },

  subtitulo: {
    color: Colors.light.primaryMedium,
    fontWeight: 800,
    fontSize: 24,
    marginLeft: 10
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 100,
    elevation: 100
  },

  headerDesktop: {
    marginHorizontal: 10,
    marginTop: 60,
    marginBottom: 10
  },

  botaoMais: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#6750A4",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center"
  },

  carregando: {
    marginTop: 30
  },

  textoVazio: {
    textAlign: "center",
    color: "gray",
    marginTop: 20
  },

  textoErro: {
    textAlign: "center",
    color: Colors.light.error,
    marginTop: 20
  }
});
