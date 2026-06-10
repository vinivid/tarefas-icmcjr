import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken";


/**
 * Middleware que verifica se o header de autenticação 
 * está correto.
 * 
 * @param req request com header contendo campo de autorização
 * @param res caso não tenha autorização é envidao como resposta
 * o status 401.
 * @param next próximo middleware
 */
export async function authToken(req : Request, res : Response, next : NextFunction) {
  const secret = process.env.JWT_SECRET!;

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  } else {
    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.sendStatus(401);

        const payload = decoded as { usr_id: string };

        (req as any).userId = payload.usr_id;
        
        next();
    })
  }
}