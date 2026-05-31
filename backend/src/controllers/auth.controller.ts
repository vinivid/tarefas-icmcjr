import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";

import { createUsuario, findUsuarioByCpf, findUsuarioByEmail, type UsuarioDoc } from "../models/usuario.model.js";

const secret = process.env.JWT_SECRET!;

// Gera uma token do jwt
function gerarToken(usr_id: string) {
  return jwt.sign(
    { usr_id },
    secret
  );
}

/**
 * Verifica se é um usuário valido para login,
 * isto é, existe somente um usuário nos usuários
 * encontrados e a senha utilizada bate com a senha
 * encriptada.
 * 
 * @param usr array de usuário após buscar por 
 * um identificador de usuário.
 * @param senha a senha a ser verificada. Ela 
 * é uma string
 * @param res envia uma resposta 404 caso não
 * tenha sido encontrado somente um usuário.
 * 
 * Caso contrario envia uma resposta 200
 * com um corpo contendo a token de autenticação
 * e os dados do usuário.
 */
async function verificarUsuarioLogin(usr: UsuarioDoc[], senha: any, res: Response) {
  if (usr.length !== 1) {
    res.sendStatus(404);
  } else {
    let u = usr[0];
    
    if (await compare(senha, u.senha)) {
      res
        .status(200)
        .json(
        {
          token: gerarToken(u.id), 
          usuario: {
            id: u.id, 
            nome: u.nome, 
            dataNascimento: u.dataNascimento, 
            email: u.email, 
            cpf: u.cpf, 
            senha
          }
        });
    } else {
      res.sendStatus(401);
    }
  }
}

/**
 * Realiza o login de um usuário utilizando do email
 * como chave para procura.
 * 
 * @param req um post request cujo corpo contem o email
 * e a senha para tentar realizar o login.
 * @param res ver {@link verificarUsuarioLogin}.
 */
export async function loginEmail(req: Request, res: Response) {
  const { email, senha } = req.body;

  const usr = await findUsuarioByEmail(email);

  verificarUsuarioLogin(usr, senha, res);
}

/**
 * Realiza o login de um usuário utilizando do cpf
 * como chave para procura.
 * 
 * @param req um post request cujo corpo contem o cpf
 * e a senha para tentar realizar o login.
 * @param res ver {@link verificarUsuarioLogin}.
 */
export async function loginCpf(req: Request, res: Response) {
  const { cpf, senha } = req.body;

  const usr = await findUsuarioByCpf(cpf);

  verificarUsuarioLogin(usr, senha, res);
}

/**
 * Registra o usuário no banco de dados.
 * 
 * @param req post request contendo os campos
 * para registro do usuário.
 * 
 * @param res Caso ele consiga registrar é enviado
 * uma resposta 201 com corpo contendo a token de
 * autenticação e os dados do usuário.
 * 
 * Caso contrario envia uma resposta
 * 409 com um campo de erro indicando 
 * a razão de erro.
 */
export async function registrar(req: Request, res: Response) {
  const { nome, dataNascimento, email, cpf, senha } = req.body;
  const result = await createUsuario(nome, dataNascimento, email, cpf, senha);

  if (typeof result === "string") {
    res
      .status(409)
      .json({ err: result });
  } else {
    res
      .status(201)
      .json({ token: gerarToken(result.id), usuario: {id: result.id, nome, dataNascimento, email, cpf, senha}});
  }
}