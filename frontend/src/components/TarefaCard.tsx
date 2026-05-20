import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../constants/theme";
import { useState } from "react";

type TarefaProps = {
    titulo: string,
    desc: string,
    prazo: Date,
    finished: boolean
}

export default function TarefaCard({ 
    titulo,
    desc,
    prazo,
    finished
} : TarefaProps) {

    const [terminada, setTerminada] = useState(finished);
    const [expandida, setExpandida] = useState(false);

    return (
        <View
            style={styles.card}
        >
            <Text
                style={styles.titulo}
            >
                {titulo}
            </Text>

            <View style={styles.flex}>
                <View style={styles.flexdata}>
                    <MaterialIcons name="calendar-today" size={24} color={Colors.light.primary}/>
                    <Text style={styles.data}>
                        {prazo.toLocaleDateString("pt-br")}
                    </Text>
                </View>

                <Pressable onPress={() => setTerminada(prev => !prev)}>
                    <Text style={ terminada ? styles.finalizado : styles.andamento }>
                        { terminada ? "Finalizado" : "Em andamento" }
                    </Text>
                </Pressable>
            </View>

            {expandida && (
                <Text style={styles.desc}>
                {desc}
                </Text>
            )}

            <Pressable onPress={() => setExpandida(prev => !prev)}>
                <MaterialIcons 
                    name={expandida ? "expand-less" : "expand-more"}
                    size={24}
                    style={styles.mais}
                />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    card : {
        backgroundColor: 'white',
        alignSelf: 'center',

        borderWidth: 0,
        borderColor: Colors.light.primary,
        borderRadius: 20,

        shadowColor: Colors.light.primary,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10,

        width: '90%',
        paddingVertical: 10,
        paddingHorizontal: 20,
        gap: 12
    },

    titulo : {
        color: Colors.light.primary,
        fontWeight: 800,
        fontSize: 20,
        marginTop: 5
    },

    flex : {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center'
    },

    flexdata : {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },

    data : {
        color: Colors.light.primary,
        fontSize: 15,
        fontWeight: 800
    },

    finalizado : {
        color: 'green',
        fontWeight: 600,
        borderColor: 'green',
        borderWidth: 2,
        borderRadius: 20,
        paddingHorizontal: 5
    },

    andamento : {
        color: 'goldenrod',
        borderColor: 'goldenrod',
        fontWeight: 600,
        borderWidth: 2,
        borderRadius: 20,
        paddingHorizontal: 5
    },

    mais : {
        color: Colors.light.primary,
        alignSelf: 'center'
    },

    desc : {
        color: 'gray'
    }
})