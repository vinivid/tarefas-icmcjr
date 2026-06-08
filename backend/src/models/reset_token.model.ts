import mongoose from "mongoose";

const resetTokenSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  token: {
    type: String,
    required: true
  },
  expiracao: {
    type: Date,
    required: true
  }
});

export type ResetTokenDoc = mongoose.HydratedDocument<
  mongoose.InferSchemaType<typeof resetTokenSchema>
>;

const ResetToken = mongoose.model("ResetToken", resetTokenSchema);

/**
 * Cria um token de redefinição de senha para um usuário.
 *
 * @param usuarioId id do usuário
 * @param token token gerado
 * @returns o documento criado
 */
export async function criarResetToken(usuarioId: string, token: string) {
  await ResetToken.deleteMany({ usuarioId });

  const expiracao = new Date(Date.now() + 15 * 60 * 1000); //15 minutos

  const doc = new ResetToken({ usuarioId, token, expiracao });
  await doc.save();
  return doc;
}

/**
 * Busca um token de redefinição válido (não expirado).
 *
 * @param token token a ser buscado
 * @returns o documento ou null se não encontrado/expirado
 */
export async function findResetToken(token: string) {
  return await ResetToken.findOne({
    token,
    expiracao: { $gt: new Date() }
  });
}

/**
 * Remove um token de redefinição.
 *
 * @param token token a ser removido
 */
export async function deletarResetToken(token: string) {
  await ResetToken.deleteOne({ token });
}