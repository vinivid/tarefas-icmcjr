import mongoose from "mongoose";

/* Definir o modelo de tarefa */
const tarefaSchema = new mongoose.Schema({
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    titulo: {
        type: String,
        required: true
    },

    desc: {
        type: String,
        required: true
    },

    prazo: {
        type: Date,
        required: true
    },

    finished: {
        type: Boolean,
        required: true
    }
});

export const Tarefa = mongoose.model("Tarefa", tarefaSchema);

/**
 * @brief Cria uma nova tarefa com as informações fornecidas
 */
export async function createTarefa(
    usuarioId: string,
    titulo: string,
    desc: string,
    prazo: Date
) {
    const tarefa = new Tarefa({
        usuarioId,
        titulo,
        desc,
        prazo,
        finished: false
    });

    await tarefa.save();

    return tarefa;
}

/**
 * @brief Buscar todas as tarefas de um usuário pelo seu ID de usuário
 * @returns Uma lista de todas as tarefas do usuário em questão (?)
 */
export async function findTarefasByUsuario(usuarioId: string) {
    return await Tarefa.find({ usuarioId }).sort({ prazo: 1 });
}

/**
 * @brief Atualiza uma tarefa, encontrada pelo seu id, com novos dados
 */
export async function updateTarefa(
    id: string,
    usuarioId: string,
    dados: Partial<{
        titulo: string,
        desc: string,
        prazo: Date,
        finished: boolean
    }>
) {
    return await Tarefa.findOneAndUpdate(
        { _id: id, usuarioId },
        dados,
        { returnDocument: "after", runValidators: true }
    );
}

/**
 * @brief Exclui uma tarefa, encontrada por seu id
 */
export async function deleteTarefa(id: string, usuarioId: string) {
    return await Tarefa.findOneAndDelete({ _id: id, usuarioId });
}
