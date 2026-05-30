import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt";

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  dataNascimento: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  cpf: {
    type: String,
    unique: true,
    required: true
  },
  senha: {
    type: String,
    required: true 
  }
});

const Usuario = mongoose.model("User", usuarioSchema);

// Erros realativos a criação de usuário no banco de dados
export const CreateUsuarioErr = {
  EmailExists: "EMAIL_EXISTS",
  CpfExists: "CPF_EXISTS"
}

export type CreateUsuarioErr = 
  typeof CreateUsuarioErr[keyof typeof CreateUsuarioErr];


  /**
 * Encontra um usuário por email.
 * 
 * @param email cpf do usuário que deseja encontrar.
 * @returns um array de usuários com o mesmo email. 
 * Se não encontrar nenhum, retorna []. Em teoria
 * o array terá tamnho máximo de 1.
 */
export async function findUsuarioByEmail(email: string) {
  return await Usuario.find({ email });
}

/**
 * Encontra um usuário por cpf.
 * 
 * @param cpf cpf do usuário que deseja encontrar.
 * @returns um array de usuários com o mesmo CPF. 
 * Se não encontrar nenhum, retorna []. Em teoria
 * o array terá tamnho máximo de 1.
 */
export async function findUsuarioByCpf(cpf: string) {
  return await Usuario.find({ cpf });
}

/** 
 * Cria um usuário e insere ele no banco de dados.
 * Obs: Está sendo assumindo que todos os inputs 
 * da função são validos. Não esta sendo feita 
 * nenhuma verificação e erros de inputs serão 
 * erros de dados no banco.
 * 
 * @param nome nome do usuário
 * @param dataNascimento string no formato ISO 8601 
 * da data de nascimento
 * @param email email do usuário
 * @param cpf cpf do usuário
 * @param senha senha do usuário
 * @returns retorna null caso tudo tenha ocorrido com
 * sucesso ou CreateUserError caso tenha ocorrido algum
 * erro relativo ao banco de dados.
 */
export async function createUsuario(
  nome : string,
  dataNascimento: string,
  email: string,
  cpf: string,
  senha: string
) : Promise<null | CreateUsuarioErr >
{
  if (await Usuario.exists({ email }))
    return CreateUsuarioErr.EmailExists;

  if (await Usuario.exists({ cpf }))
    return CreateUsuarioErr.CpfExists;

  const salt = await genSalt();
  const hashSen = await hash(senha, salt);

  const novo_usr = new Usuario({nome, dataNascimento, email, cpf, senha: hashSen});
  await novo_usr.save();

  return null;
}