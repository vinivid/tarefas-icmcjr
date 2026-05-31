import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { createUsuario, CreateUsuarioErr } from "../models/usuario.model.js";

const secret = process.env.JWT_SECRET!;

function gerarToken(
  nome: string,
  dataNascimento: Date,
  email: string,
) {
  return sign(
    { nome, dataNascimento, email},
    secret
  );
}

/**
 * Registra o usuário no banco de dados.
 * 
 * @param req post request contendo os campos
 * para registro do usuário.
 * 
 * @param res Caso ele consiga registrar é enviado
 * uma resposta 201 com uma token de
 * autenticação jwt para ser utilizada
 * pelo usuário.
 * 
 * Caso contrario envia uma resposta
 * 409 com um campo de erro indicando 
 * a razão de erro.
 */
export async function registrar(req: Request, res: Response) {
  const { nome, dataNascimento, email, cpf, senha } = req.body;
  const resul = await createUsuario(nome, dataNascimento, email, cpf, senha);

  if (resul !== null) {
    res
      .status(409)
      .json({ err: resul });
  } else {
    res
      .status(201)
      .json({ token: gerarToken(nome, dataNascimento, email)});
  }
}