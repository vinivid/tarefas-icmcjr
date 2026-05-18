import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../constants/theme";

type TarefaProps = {
    titulo: string,
    desc: string,
    prazo: string, // mudar o tipo do prazo
    finished: boolean
}

export default function TarefaCard({ 
    titulo,
    desc,
    prazo,
    finished
} : TarefaProps) {
    return (
        <View
            style={styles.card}
        >
            <Text
                style={styles.titulo}
            >
                Teste do Card de Tarefa
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card : {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: Colors.light.primary,
        borderRadius: 20,
        width: '90%',
        paddingVertical: 50
    },

    titulo : {
        color: Colors.light.primary,
        fontWeight: 800
    }
})