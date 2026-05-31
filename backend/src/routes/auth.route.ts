import { Router } from "express";
import { registrar, loginEmail, loginCpf } from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.post("/login/email", loginEmail);
authRouter.post("/login/cpf", loginCpf);
authRouter.post("/registrar", registrar);