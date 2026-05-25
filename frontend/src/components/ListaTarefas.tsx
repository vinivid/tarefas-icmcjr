import { FlatList, StyleSheet, useWindowDimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../constants/theme";
import { useState } from "react";
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
    desktop : boolean
}

export default function ListaTarefas({
    tarefas,
    desktop
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
                    titulo={item.titulo}
                    desc={item.desc}
                    prazo={item.prazo}
                    finished={item.finished}
                    desktop={desktop}
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
        paddingHorizontal: 60
    }
})