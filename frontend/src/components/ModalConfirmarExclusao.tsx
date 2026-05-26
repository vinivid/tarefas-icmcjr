import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/theme";

type ModalConfirmarExclusaoProps = {
    visivel: boolean;
    onCancelar: () => void;
    onConfirmar: () => void;
}

export default function ModalConfirmarExclusao({
    visivel,
    onCancelar,
    onConfirmar
}: ModalConfirmarExclusaoProps) {
    return (
        <Modal visible={visivel} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.card}>
                    <Text style={styles.titulo}>
                        Excluir Tarefa
                    </Text>

                    <Text style={styles.mensagem}>
                        Tem certeza que deseja excluir esta tarefa? Esta ação não poderá ser desfeita.
                    </Text>

                    <View style={styles.acoes}>
                        <Pressable style={styles.botao} onPress={onCancelar}>
                            <Text style={styles.textoCancelar}>
                                Cancelar
                            </Text>
                        </Pressable>

                        <Pressable style={styles.botao} onPress={onConfirmar}>
                            <Text style={styles.textoExcluir}>
                                Excluir
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },

    card: {
        width: "100%",
        maxWidth: 420,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 24,
        gap: 16,
    },

    titulo: {
        color: Colors.light.onSurface,
        fontSize: 22,
        fontWeight: "800",
    },

    mensagem: {
        color: Colors.light.onSurfaceVariant,
        fontSize: 16,
        lineHeight: 22,
    },

    acoes: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 12,
        marginTop: 8,
    },

    botao: {
        minWidth: 88,
        minHeight: 40,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 12,
    },

    textoCancelar: {
        color: Colors.light.primary,
        fontSize: 16,
        fontWeight: "700",
    },

    textoExcluir: {
        color: Colors.light.error,
        fontSize: 16,
        fontWeight: "700",
    },
});
