import { Request, Response } from "express";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { hash, genSalt } from "bcrypt";

import { findUsuarioByEmail, findUsuarioByCpf, updateUsuario } from "../models/usuario.model.js";
import { criarResetToken, findResetToken, deletarResetToken } from "../models/reset_token.model.js";

/**
 * Cria o transporter do nodemailer usando Gmail.
 * Requer as variáveis de ambiente:
 * EMAIL_USER — endereço Gmail
 * EMAIL_PASS — senha de app do Gmail
 */
function criarTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!
    },
    tls: {
      rejectUnauthorized: false
    }
  });
}

/**
 * Solicita a redefinição de senha.
 * Recebe email ou cpf no body, encontra o usuário,
 * gera um token de 6 dígitos e envia por email.
 *
 * @param req body: { email?: string, cpf?: string }
 * @param res 200 se o email foi enviado, 404 se não encontrou usuário
 */
export async function solicitarRedefinicao(req: Request, res: Response) {

  console.log("ENTROU EM solicitarRedefinicao");
  
  const { email, cpf } = req.body;

  let usuarios;
  if (email) {
    usuarios = await findUsuarioByEmail(email);
  } else if (cpf) {
    usuarios = await findUsuarioByCpf(cpf);
  } else {
    return res.status(400).json({ err: "EMAIL_OU_CPF_NECESSARIO" });
  }

  if (usuarios.length !== 1) {
    return res.sendStatus(404);
  }

  const usuario = usuarios[0];

  const token = crypto.randomInt(100000, 999999).toString();

  await criarResetToken(usuario.id, token);

  console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "OK" : "NÃO DEFINIDA");

  const transporter = criarTransporter();

  await transporter.verify();

  console.log("SMTP OK");

  await transporter.sendMail({
    from: `"App" <${process.env.EMAIL_USER}>`,
    to: usuario.email,
    subject: "Redefinição de senha",
    text: `Seu código de redefinição de senha é: ${token}\n\nEle expira em 15 minutos.`,
    html: `
      <div style="font-family: monospace; padding: 24px;">
        <h2>Redefinição de senha</h2>
        <p>Seu código de redefinição é:</p>
        <h1 style="letter-spacing: 8px;">${token}</h1>
        <p>Ele expira em <strong>15 minutos</strong>.</p>
        <p>Se você não solicitou isso, ignore este email.</p>
      </div>
    `
  });

  res.sendStatus(200);
}

/**
 * Redefine a senha do usuário após validar o token.
 *
 * @param req body: { token: string, novaSenha: string }
 * @param res 200 se alterou, 400 se token inválido/expirado
 */
export async function redefinirSenha(req: Request, res: Response) {
  const { token, novaSenha } = req.body;

  const resetToken = await findResetToken(token);

  if (!resetToken) {
    return res.status(400).json({ err: "TOKEN_INVALIDO" });
  }

  const result = await updateUsuario(resetToken.usuarioId.toString(), { senha: novaSenha });

  if (typeof result === "string") {
    return res.status(400).json({ err: result });
  }

  await deletarResetToken(token);

  res.sendStatus(200);
}