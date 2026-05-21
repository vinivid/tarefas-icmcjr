import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../constants/theme";
import { useState } from "react";
import TarefaCard from "./TarefaCard";

type Tarefa = {
    id: number,
    titulo: string,
    desc: string,
    prazo: Date,
    finished: boolean
}

type ListaTarefasProps = {
    tarefas : Tarefa[]
}

export default function ListaTarefas({
    tarefas
} : ListaTarefasProps) {
    return (
        <View>
            {tarefas.map((tarefa) => ( 
                <TarefaCard 
                    titulo={tarefa.titulo}
                    desc={tarefa.desc}
                    prazo={tarefa.prazo}
                    finished={tarefa.finished}/>
            ))}
        </View>
    )
}