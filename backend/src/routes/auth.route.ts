import { Router } from "express";
import { registrar } from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.post("/registrar", registrar)
