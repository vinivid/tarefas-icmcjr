import { Router } from "express";
import { registrar, loginEmail, loginCpf, atualizarPerfil, excluirConta } from "../controllers/auth.controller.js";
import { authToken } from "../middlewares/auth.middleware.js";

export const authRouter = Router();

authRouter.post("/login/email", loginEmail);
authRouter.post("/login/cpf", loginCpf);
authRouter.post("/registrar", registrar);
authRouter.put("/usuario/:id", authToken, atualizarPerfil);
authRouter.delete("/usuario/:id", authToken, excluirConta);