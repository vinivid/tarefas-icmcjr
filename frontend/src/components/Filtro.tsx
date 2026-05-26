import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/src/constants/theme";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function Filtro() {

    const [aberto, setAberto] = useState(false);
    const options = ["Atrasado", "Em andamento", "Finalizado"];

    return (
        <View style={{position: 'relative'}}>
            <Pressable style={styles.btnfiltro} onPress={() => setAberto(prev => !prev)}>
                <MaterialIcons name="filter-alt" size={24} color={Colors.light.primary}/>
                <Text style={styles.txtfiltro}>
                    Filtro
                </Text>
            </Pressable>

            {aberto && (
                <View style={styles.dropdown}>
                    <Pressable>
                        <Text style={styles.atraso}>
                        Atrasado
                        </Text>
                    </Pressable>

                    <Pressable>
                        <Text style={styles.andamento}>
                        Em andamento
                        </Text>
                    </Pressable>

                    <Pressable>
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
        position: 'absolute',
        top: 45,
        left: 0,
        minWidth: 100,
        marginVertical: 5,
        gap: 5,
    },

    finalizado : {
        color: 'green',
        fontWeight: 600,
        borderColor: 'green',
        borderWidth: 2,
        borderRadius: 20,
        paddingHorizontal: 5
    },

    atraso : {
        color: Colors.light.error,
        borderColor: Colors.light.error,
        fontWeight: 600,
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
})