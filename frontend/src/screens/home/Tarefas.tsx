import { Text, View } from "react-native"
import TarefaCard from "../../components/TarefaCard"

export default function Tarefas() {
  return (
    <View>
      <Text style={{color: 'red'}}>Tela de tarefas</Text>
      <TarefaCard titulo="teste" desc="testando" prazo="data" finished={false}></TarefaCard>
    </View>
  )
}