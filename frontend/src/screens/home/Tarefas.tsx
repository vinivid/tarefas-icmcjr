import { Text, View, StyleSheet, Pressable, useWindowDimensions, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Colors } from "@/src/constants/theme";
import ListaTarefas from "@/src/components/ListaTarefas";
import TarefaCard from "../../components/TarefaCard";
import ModalTarefa from "../../components/ModalTarefa";

type Tarefa = {
  id: string;
  titulo: string;
  desc: string;
  prazo: Date;
  finished: boolean;
};

const tarefas = [
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
 
  const [modalVisivel, setModalVisivel] = useState(false);
  const [listaTarefas, setListaTarefas] = useState<Tarefa[]>(tarefas);

  const adicionarTarefaNaLista = (novaTarefa: { titulo: string; descricao: string; data: string; hora: string }) => {
    const partesData = novaTarefa.data.split('/');
    const dataConvertida = new Date(Number(partesData[2]), Number(partesData[1]) - 1, Number(partesData[0]));

    const tarefaPronta: Tarefa = {
      id: Math.random().toString(), 
      titulo: novaTarefa.titulo,
      desc: novaTarefa.descricao,
      prazo: dataConvertida,
      finished: false
    };

    setListaTarefas([tarefaPronta, ...listaTarefas]);
  };

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
      
      <View style={styles.header}>
        <Pressable style={styles.botaoMais} onPress={() => setModalVisivel(true)}>
          <MaterialIcons name="add" size={20} color="#6750A4" />
        </Pressable>
      </View>
      
      <ListaTarefas tarefas={tarefas} desktop={desktop}/>

      {listaTarefas.length === 0 && (
        <Text style={styles.textoVazio}>
          Nenhuma tarefa adicionada ainda.
        </Text>
      )}

      <ModalTarefa 
        visivel={modalVisivel} 
        fecharModal={() => setModalVisivel(false)} 
        onSalvar={adicionarTarefaNaLista} 
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
    alignItems: 'flex-end', 
    marginBottom: 20,
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
