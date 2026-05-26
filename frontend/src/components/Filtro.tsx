import { Pressable, StyleSheet, Text, View } from "react-native";
import { TipoFiltro } from "../screens/home/Tarefas";
import { Colors } from "@/src/constants/theme";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

type FiltroProps = {
    onFiltroChange: (filtro: TipoFiltro) => void
}

export default function Filtro({
    onFiltroChange
} : FiltroProps) {

    const [aberto, setAberto] = useState(false);
    const options = ["Atrasado", "Em andamento", "Finalizado"];

    return (
        <View style={{position: 'relative'}}>
            <Pressable style={styles.btnfiltro} onPress={() => setAberto(prev => !prev)}>
                <MaterialIcons name="filter-alt" size={24} color={Colors.light.primary}/>
                <Text style={styles.txtfiltro}>
                    Filtro
                </Text>
                <MaterialIcons name="keyboard-arrow-down" size={24}color={Colors.light.primary}/>
            </Pressable>

            {aberto && (
                <View style={styles.dropdown}>

                    <Pressable onPress={() => onFiltroChange("todos")}>
                        <Text style={styles.todos}>
                        Todos
                        </Text>
                    </Pressable>

                    <Pressable onPress={() => onFiltroChange("atrasado")}>
                        <Text style={styles.atraso}>
                        Atrasado
                        </Text>
                    </Pressable>

                    <Pressable onPress={() => onFiltroChange("andamento")}>
                        <Text style={styles.andamento}>
                        Em andamento
                        </Text>
                    </Pressable>

                    <Pressable onPress={() => onFiltroChange("finalizado")}>
                        <Text style={styles.finalizado}>
                        Finalizado
                        </Text>
                    </Pressable>

                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    btnfiltro : {
        color: Colors.light.primary,
        fontWeight: 600,

        borderWidth: 2,
        borderColor: Colors.light.primary,
        borderRadius: 20,

        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },

    txtfiltro : {
        color: Colors.light.primary,
        fontWeight: 600
    },

    dropdown : {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: Colors.light.primary,
        borderRadius: 20,

        position: 'absolute',
        top: 35,
        left: 0,
        
        minWidth: 140,
        marginVertical: 5,
        gap: 5,

        zIndex: 100,
        elevation: 100
    },

    todos : {
        color: Colors.light.onSurface,
        fontWeight: 600,
        borderColor: Colors.light.onSurface,
        borderWidth: 2,
        borderRadius: 20,
        paddingHorizontal: 5,
        textAlign: 'center'
    },

    finalizado : {
        color: 'green',
        fontWeight: 600,
        borderColor: 'green',
        borderWidth: 2,
        borderRadius: 20,
        paddingHorizontal: 5,
        textAlign: 'center'
    },

    atraso : {
        color: Colors.light.error,
        borderColor: Colors.light.error,
        fontWeight: 600,
        borderWidth: 2,
        borderRadius: 20,
        paddingHorizontal: 5,
        textAlign: 'center'
    },

    andamento : {
        color: 'goldenrod',
        borderColor: 'goldenrod',
        fontWeight: 600,
        borderWidth: 2,
        borderRadius: 20,
        paddingHorizontal: 5,
        textAlign: 'center'
    },
})