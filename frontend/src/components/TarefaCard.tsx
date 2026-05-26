import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../constants/theme";
import { useState } from "react";
import ModalConfirmarExclusao from "./ModalConfirmarExclusao";

type TarefaProps = {
    id: string,
    titulo: string,
    desc: string,
    prazo: Date,
    finished: boolean,
    desktop: boolean,
    onToggle: (id: string) => void,
    onEditar: (tarefa: {
        id: string;
        titulo: string;
        desc: string;
        prazo: Date;
        finished: boolean;
    }) => void,
    onExcluir: (id: string) => void
}

export default function TarefaCard({ 
    id,
    titulo,
    desc,
    prazo,
    finished,
    desktop,
    onToggle,
    onEditar,
    onExcluir
} : TarefaProps) {

    const [expandida, setExpandida] = useState(false);
    const [modalExcluirVisivel, setModalExcluirVisivel] = useState(false);

    const atrasada = new Date() > prazo;

    const confirmarExclusao = () => {
        setModalExcluirVisivel(false);
        onExcluir(id);
    };

    return (
        <View
            style={[styles.card, desktop && styles.desktop]}
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

                <Pressable onPress={() => onToggle(id)}>
                    { finished ? (
                        <Text style={ styles.finalizado }>
                            { "Finalizado" }
                        </Text>
                    ) : (
                        <Text style={ atrasada ? styles.atraso : styles.andamento }>
                            { atrasada ? "Atrasada" : "Em andamento" }
                        </Text>
                    )}
                    
                </Pressable>
            </View>

            {expandida && (
                <View>
                    <Text style={styles.desc}>
                    {desc}
                    </Text>

                    <View style={styles.flex}>

                        <View style={styles.flexdata}>
                            <MaterialIcons name="schedule" size={24} color={Colors.light.primary}/>
                            <Text style={styles.data}>
                                {prazo.toLocaleTimeString("pt-br")}
                            </Text>
                        </View>

                        <View style={styles.flexreverse}>
                            <Pressable onPress={() => onEditar({ id, titulo, desc, prazo, finished })}>
                                <MaterialIcons name="edit" size={30} color={Colors.light.primary}/>
                            </Pressable>
                            
                            <Pressable onPress={() => setModalExcluirVisivel(true)}>
                                <MaterialIcons name="delete" size={30} color={Colors.light.error}/>
                            </Pressable>
                        </View>

                    </View>
                </View>
                
            )}

            <Pressable onPress={() => setExpandida(prev => !prev)}>
                <MaterialIcons 
                    name={expandida ? "expand-less" : "expand-more"}
                    size={24}
                    style={styles.mais}
                />
            </Pressable>

            <ModalConfirmarExclusao
                visivel={modalExcluirVisivel}
                onCancelar={() => setModalExcluirVisivel(false)}
                onConfirmar={confirmarExclusao}
            />
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

    desktop : {
        width: '30%',
        marginHorizontal: 20,
        alignSelf: 'flex-start'
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

    flexreverse : {
        flexDirection: 'row',
        justifyContent: 'flex-end', 
        alignItems: 'center',
        gap: 15
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

    mais : {
        color: Colors.light.primary,
        alignSelf: 'center'
    },

    desc : {
        color: Colors.light.onSurfaceVariant,
        textAlign: 'justify'
    }
})
