import { FlatList, StyleSheet } from "react-native";
import TarefaCard from "./TarefaCard";

type Tarefa = {
    id: string,
    titulo: string,
    desc: string,
    prazo: Date,
    finished: boolean
}

type ListaTarefasProps = {
    tarefas : Tarefa[],
    desktop : boolean,
    onEditar: (tarefa: Tarefa) => void,
    onExcluir: (id: string) => void
}

export default function ListaTarefas({
    tarefas,
    desktop,
    onEditar,
    onExcluir
} : ListaTarefasProps) {

    const numColunas = desktop ? 3 : 1;

    return (
        <FlatList
            key={numColunas}
            numColumns={numColunas}
            contentContainerStyle={[styles.lista, desktop && styles.listadesktop]}
            data={tarefas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
                <TarefaCard 
                    id={item.id}
                    titulo={item.titulo}
                    desc={item.desc}
                    prazo={item.prazo}
                    finished={item.finished}
                    desktop={desktop}
                    onEditar={onEditar}
                    onExcluir={onExcluir}
                />}
            />
    )
}

const styles = StyleSheet.create({
    lista : {
        gap: 30,
        paddingVertical: 20,
    },

    listadesktop : {
        marginLeft: 60
    }
})
