import { Request, Response } from "express";
import { createTarefa, findTarefasByUsuario } from "../models/tarefa.model";

export async function criarTarefa(req: Request, res: Response) {

    const { titulo, desc, prazo } = req.body;

    const tarefa = await createTarefa(
        (req as any).userId,            // O Typescript não reconhece o campo userId no tipo Request, mesmo ele tendo sido definido em auth.middleware, por isso o cast para any
        titulo,
        desc,
        prazo
    );

    res.status(201).json(tarefa);
}

export async function listarTarefas(req: Request, res: Response) {

    const tarefas = await findTarefasByUsuario(
        (req as any).userId
    );

    res.status(200).json(tarefas);
}