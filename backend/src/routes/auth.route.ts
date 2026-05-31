import { Router } from "express";
import { registrar } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/registrar", registrar)