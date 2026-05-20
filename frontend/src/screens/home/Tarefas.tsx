import { Text, View } from "react-native"
import TarefaCard from "../../components/TarefaCard"

const desc = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis malesuada justo, vitae ullamcorper tellus pharetra vel. In luctus, nibh in interdum placerat, orci sapien cursus lorem, sit amet tincidunt leo odio at neque. Sed pellentesque efficitur ante, ut aliquam arcu vestibulum vel. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc blandit tellus in nisi cursus, a facilisis lacus tempus. Sed rutrum a elit sit amet sagittis. Nullam malesuada commodo nunc eget fermentum.';
const data = new Date(2026, 4, 22);

export default function Tarefas() {
  return (
    <View>
      <Text style={{color: 'red'}}>Tela de tarefas</Text>
      <TarefaCard titulo="Tarefa de teste" desc={desc} prazo={data} finished={false}></TarefaCard>
    </View>
  )
}