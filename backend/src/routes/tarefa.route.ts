import { Router } from "express";

import {
    atualizarTarefa,
    criarTarefa,
    excluirTarefa,
    listarTarefas
} from "../controllers/tarefa.controller.js";
import { authToken } from "../middlewares/auth.middleware.js";

export const tarefaRouter = Router();

tarefaRouter.use(authToken);
tarefaRouter.get("/", listarTarefas);
tarefaRouter.post("/", criarTarefa);
tarefaRouter.put("/:id", atualizarTarefa);
tarefaRouter.delete("/:id", excluirTarefa);
