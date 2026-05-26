import { FlatList, ScrollView, View, StyleSheet } from "react-native";
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
    onToggle: (id: string) => void,
    onEditar: (tarefa: Tarefa) => void,
    onExcluir: (id: string) => void
}

export default function ListaTarefas({
    tarefas,
    desktop,
    onToggle,
    onEditar,
    onExcluir
} : ListaTarefasProps) {

    const colunas : Tarefa[][] = [[], [], []];

    tarefas.forEach((tarefa, index) => {
        colunas[index % 3].push(tarefa)
    })

    return desktop ? (
        <ScrollView>
            <View style={styles.container}>
                { colunas.map((coluna) => 
                    (<View style={styles.coluna} key={colunas.indexOf(coluna)}>
                        {coluna.map((item) => 
                            <TarefaCard
                                key={item.id}
                                id={item.id}
                                titulo={item.titulo}
                                desc={item.desc}
                                prazo={item.prazo}
                                finished={item.finished}
                                desktop={desktop}
                                onToggle={onToggle}
                                onEditar={onEditar}
                                onExcluir={onExcluir}
                            />)}
                    </View>)
                ) }
            </View>
        </ScrollView>
    ) : (
        <FlatList
            key={1}
            contentContainerStyle={styles.lista}
            showsVerticalScrollIndicator={false}
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
                    onToggle={onToggle}
                    onEditar={onEditar}
                    onExcluir={onExcluir}
                />}
            />
    )
}

const styles = StyleSheet.create({
    lista : {
        gap: 20,
        paddingVertical: 20,
        overflow: 'visible'
    },

    coluna : {
        flex: 1,
        gap: 20,
        paddingHorizontal: 10
    },

    container : {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 20
    }
})
