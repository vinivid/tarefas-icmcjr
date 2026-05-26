import { Text, View, StyleSheet, Pressable, useWindowDimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Colors } from "@/src/constants/theme";
import ListaTarefas from "@/src/components/ListaTarefas";
import ModalTarefa from "../../components/ModalTarefa";
import Filtro from "@/src/components/Filtro";

type Tarefa = {
  id: string;
  titulo: string;
  desc: string;
  prazo: Date;
  finished: boolean;
};

export type TipoFiltro =
  | "todos"
  | "atrasado"
  | "andamento"
  | "finalizado";


const tarefasTeste = [
  {
    id: '1',
    titulo: "Tarefa de teste 1",
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis malesuada justo, vitae ullamcorper tellus pharetra vel. In luctus, nibh in interdum placerat, orci sapien cursus lorem, sit amet tincidunt leo odio at neque. Sed pellentesque efficitur ante, ut aliquam arcu vestibulum vel. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc blandit tellus in nisi cursus, a facilisis lacus tempus. Sed rutrum a elit sit amet sagittis. Nullam malesuada commodo nunc eget fermentum.',
    prazo: new Date(2026, 4, 22),
    finished: false
  },
  {
    id: '2',
    titulo: "Tarefa de teste 2",
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis malesuada justo, vitae ullamcorper tellus pharetra vel. In luctus, nibh in interdum placerat, orci sapien cursus lorem, sit amet tincidunt leo odio at neque. Sed pellentesque efficitur ante, ut aliquam arcu vestibulum vel. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc blandit tellus in nisi cursus, a facilisis lacus tempus. Sed rutrum a elit sit amet sagittis. Nullam malesuada commodo nunc eget fermentum.',
    prazo: new Date(2026, 4, 23),
    finished: false
  },
  {
    id: '3',
    titulo: "Tarefa de teste 3",
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis malesuada justo, vitae ullamcorper tellus pharetra vel. In luctus, nibh in interdum placerat, orci sapien cursus lorem, sit amet tincidunt leo odio at neque. Sed pellentesque efficitur ante, ut aliquam arcu vestibulum vel. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc blandit tellus in nisi cursus, a facilisis lacus tempus. Sed rutrum a elit sit amet sagittis. Nullam malesuada commodo nunc eget fermentum.',
    prazo: new Date(2026, 4, 24),
    finished: false
  },
  {
    id: '4',
    titulo: "Tarefa de teste 4",
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis malesuada justo, vitae ullamcorper tellus pharetra vel. In luctus, nibh in interdum placerat, orci sapien cursus lorem, sit amet tincidunt leo odio at neque. Sed pellentesque efficitur ante, ut aliquam arcu vestibulum vel. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc blandit tellus in nisi cursus, a facilisis lacus tempus. Sed rutrum a elit sit amet sagittis. Nullam malesuada commodo nunc eget fermentum.',
    prazo: new Date(2026, 4, 25),
    finished: false
  },
  {
    id: '5',
    titulo: "Tarefa de teste 5",
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis malesuada justo, vitae ullamcorper tellus pharetra vel. In luctus, nibh in interdum placerat, orci sapien cursus lorem, sit amet tincidunt leo odio at neque. Sed pellentesque efficitur ante, ut aliquam arcu vestibulum vel. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc blandit tellus in nisi cursus, a facilisis lacus tempus. Sed rutrum a elit sit amet sagittis. Nullam malesuada commodo nunc eget fermentum.',
    prazo: new Date(2026, 4, 26),
    finished: false
  }
]

export default function Tarefas() {
  const { width } = useWindowDimensions();
  const desktop = width >= 900;       
 
  const [filtro, setFiltro] = useState<TipoFiltro>("todos");
  const [modalVisivel, setModalVisivel] = useState(false);
  const [listaTarefas, setListaTarefas] = useState<Tarefa[]>(tarefasTeste);
  const [tarefaEditando, setTarefaEditando] = useState<Tarefa | undefined>(undefined);

  const criarDataPrazo = (data: string, hora: string) => {
    const partesData = data.split('/');
    const partesHora = hora.split(':');

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

  const excluirTarefa = (id: string) => {
    setListaTarefas((tarefasAtuais) =>
      tarefasAtuais.filter((tarefa) => tarefa.id !== id)
    );
  };

  const toggleFinalizado = (id: string) => {
    setListaTarefas((tarefasAtuais) =>
      tarefasAtuais.map((tarefa) => 
        tarefa.id === id
          ? {
            ...tarefa,
            finished: !(tarefa.finished)
          }
          : tarefa ))
  }

  const salvarTarefa = (novaTarefa: { titulo: string; descricao: string; data: string; hora: string }) => {
    const dataConvertida = criarDataPrazo(novaTarefa.data, novaTarefa.hora);

    if (tarefaEditando) {
      setListaTarefas((tarefasAtuais) =>
        tarefasAtuais.map((tarefa) =>
          tarefa.id === tarefaEditando.id
            ? {
                ...tarefa,
                titulo: novaTarefa.titulo,
                desc: novaTarefa.descricao,
                prazo: dataConvertida,
                finished: tarefaEditando.finished,
              }
            : tarefa
        )
      );
      return;
    }

    const tarefaPronta: Tarefa = {
      id: Math.random().toString(), 
      titulo: novaTarefa.titulo,
      desc: novaTarefa.descricao,
      prazo: dataConvertida,
      finished: false
    };

    setListaTarefas((tarefasAtuais) => [tarefaPronta, ...tarefasAtuais]);
  };

  const tarefaParaEditar = tarefaEditando
    ? {
        titulo: tarefaEditando.titulo,
        descricao: tarefaEditando.desc,
        data: tarefaEditando.prazo.toLocaleDateString("pt-BR"),
        hora: tarefaEditando.prazo.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }
    : undefined;

  const tarefasFiltradas = listaTarefas.filter((tarefa) => {
    if (filtro === "todos")
      return true;
    if (filtro === "finalizado" && tarefa.finished === true)
      return true;
    if (filtro === "atrasado" && new Date() > tarefa.prazo && !tarefa.finished)
      return true;
    if (filtro === "andamento" && !tarefa.finished && new Date() <= tarefa.prazo)
      return true;

    return false;
  })

  return (
    <View style={styles.container}>
      
      {desktop && (
        <View>
          <Text style={styles.titulo}>
            Olá, nome! 👋
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
      
      {listaTarefas.length === 0 && (
        <Text style={styles.textoVazio}>
          Nenhuma tarefa adicionada ainda.
        </Text>
      )}

      <ListaTarefas
        tarefas={tarefasFiltradas}
        desktop={desktop}
        onToggle={toggleFinalizado}
        onEditar={abrirModalEdicao}
        onExcluir={excluirTarefa}
      />

      <ModalTarefa 
        visivel={modalVisivel} 
        fecharModal={fecharModal} 
        onSalvar={salvarTarefa}
        desktop={desktop}
        tarefaParaEditar={tarefaParaEditar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20, 
    backgroundColor: '#F9F7FD',
  },

  titulo : {
    color: Colors.light.primary,
    fontWeight: 800,
    fontSize: 40,
    marginLeft: 80
  },
  
  subtitulo : {
    color: Colors.light.primaryTint,
    fontWeight: 800,
    fontSize: 24,
    marginLeft: 80
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    zIndex: 100,
    elevation: 100
  },

  headerDesktop: {
    marginHorizontal: 80,
    marginTop: 60,
    marginBottom: 10
  },

  botaoMais: {
    backgroundColor: 'transparent',
    borderWidth: 2, 
    borderColor: '#6750A4', 
    width: 30,
    height: 30,
    borderRadius: 15, 
    justifyContent: 'center',
    alignItems: 'center', 
  },

  textoVazio: {
    textAlign: 'center', 
    color: 'gray', 
    marginTop: 20,
  }
});
