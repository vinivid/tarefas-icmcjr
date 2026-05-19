import { Pressable, StyleSheet, Text, View } from "react-native";

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
                <Text style={styles.data}>
                    {prazo.toLocaleDateString("pt-br")}
                </Text>

                <Pressable onPress={() => setTerminada(prev => !prev)}>
                    <Text style={ terminada ? styles.finalizado : styles.andamento }>
                        { terminada ? "Finalizado" : "Em andamento" }
                    </Text>
                </Pressable>
            </View>

            <Pressable onPress={() => setExpandida(prev => !prev)}>
                <Text style={ expandida ? styles.desc : styles.mais }>
                    { expandida ? desc : 'v' }
                </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    card : {
        backgroundColor: 'white',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: Colors.light.primary,
        borderRadius: 20,
        width: '90%',
        paddingVertical: 50,
        paddingHorizontal: 20
    },

    titulo : {
        color: Colors.light.primary,
        fontWeight: 800,
        fontSize: 20
    },

    flex : {
        flexDirection: 'row',
        justifyContent: 'space-between' 
    },

    data : {
        color: Colors.light.primary,
        fontWeight: 800
    },

    finalizado : {
        color : 'green',
        borderColor : 'green',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 5
    },

    andamento : {
        color: 'gold',
        borderColor: 'gold',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 5
    },

    mais : {
        color: Colors.light.primary,
        alignSelf: 'center'
    },

    desc : {
        color: 'grey'
    }
})