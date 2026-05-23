import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import TarefaCard from "../../components/TarefaCard";
import ModalTarefa from "../../components/ModalTarefa";

type Tarefa = {
  id: string;
  titulo: string;
  desc: string;
  prazo: Date;
  finished: boolean;
};

export default function Tarefas() {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [listaTarefas, setListaTarefas] = useState<Tarefa[]>([]);

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
      <View style={styles.header}>
        <Pressable style={styles.botaoMais} onPress={() => setModalVisivel(true)}>
          <MaterialIcons name="add" size={20} color="#6750A4" />
        </Pressable>
      </View>
      
      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>      
        {listaTarefas.map((tarefa) => (
          <TarefaCard 
            key={tarefa.id} 
            titulo={tarefa.titulo} 
            desc={tarefa.desc} 
            prazo={tarefa.prazo} 
            finished={tarefa.finished} 
          />
        ))}

        {listaTarefas.length === 0 && (
          <Text style={styles.textoVazio}>
            Nenhuma tarefa adicionada ainda.
          </Text>
        )}
      </ScrollView>

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
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, 
    gap: 15,
  },
  textoVazio: {
    textAlign: 'center', 
    color: 'gray', 
    marginTop: 20,
  }
});