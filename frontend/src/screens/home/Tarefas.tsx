import { Text, View } from "react-native"
import TarefaCard from "../../components/TarefaCard"
import ListaTarefas from "@/src/components/ListaTarefas";

const desc = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis malesuada justo, vitae ullamcorper tellus pharetra vel. In luctus, nibh in interdum placerat, orci sapien cursus lorem, sit amet tincidunt leo odio at neque. Sed pellentesque efficitur ante, ut aliquam arcu vestibulum vel. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc blandit tellus in nisi cursus, a facilisis lacus tempus. Sed rutrum a elit sit amet sagittis. Nullam malesuada commodo nunc eget fermentum.';
const data = new Date(2026, 4, 22);

const tarefas = [
  {
    id: 1,
    titulo: "Tarefa de teste 1",
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis malesuada justo, vitae ullamcorper tellus pharetra vel. In luctus, nibh in interdum placerat, orci sapien cursus lorem, sit amet tincidunt leo odio at neque. Sed pellentesque efficitur ante, ut aliquam arcu vestibulum vel. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc blandit tellus in nisi cursus, a facilisis lacus tempus. Sed rutrum a elit sit amet sagittis. Nullam malesuada commodo nunc eget fermentum.',
    prazo: new Date(2026, 4, 22),
    finished: false
  },
  {
    id: 2,
    titulo: "Tarefa de teste 2",
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis malesuada justo, vitae ullamcorper tellus pharetra vel. In luctus, nibh in interdum placerat, orci sapien cursus lorem, sit amet tincidunt leo odio at neque. Sed pellentesque efficitur ante, ut aliquam arcu vestibulum vel. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc blandit tellus in nisi cursus, a facilisis lacus tempus. Sed rutrum a elit sit amet sagittis. Nullam malesuada commodo nunc eget fermentum.',
    prazo: new Date(2026, 4, 23),
    finished: false
  },
  {
    id: 3,
    titulo: "Tarefa de teste 3",
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis malesuada justo, vitae ullamcorper tellus pharetra vel. In luctus, nibh in interdum placerat, orci sapien cursus lorem, sit amet tincidunt leo odio at neque. Sed pellentesque efficitur ante, ut aliquam arcu vestibulum vel. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc blandit tellus in nisi cursus, a facilisis lacus tempus. Sed rutrum a elit sit amet sagittis. Nullam malesuada commodo nunc eget fermentum.',
    prazo: new Date(2026, 4, 24),
    finished: false
  },
  {
    id: 4,
    titulo: "Tarefa de teste 4",
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis malesuada justo, vitae ullamcorper tellus pharetra vel. In luctus, nibh in interdum placerat, orci sapien cursus lorem, sit amet tincidunt leo odio at neque. Sed pellentesque efficitur ante, ut aliquam arcu vestibulum vel. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc blandit tellus in nisi cursus, a facilisis lacus tempus. Sed rutrum a elit sit amet sagittis. Nullam malesuada commodo nunc eget fermentum.',
    prazo: new Date(2026, 4, 25),
    finished: false
  },
  {
    id: 5,
    titulo: "Tarefa de teste 5",
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis malesuada justo, vitae ullamcorper tellus pharetra vel. In luctus, nibh in interdum placerat, orci sapien cursus lorem, sit amet tincidunt leo odio at neque. Sed pellentesque efficitur ante, ut aliquam arcu vestibulum vel. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc blandit tellus in nisi cursus, a facilisis lacus tempus. Sed rutrum a elit sit amet sagittis. Nullam malesuada commodo nunc eget fermentum.',
    prazo: new Date(2026, 4, 26),
    finished: false
  }
]

export default function Tarefas() {
  return (
    <View>
      <Text style={{color: 'red'}}>Tela de tarefas</Text>
      <ListaTarefas tarefas={tarefas}/>
    </View>
  )
}