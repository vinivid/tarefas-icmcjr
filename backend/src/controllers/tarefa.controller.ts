import { Request, Response } from "express";
import mongoose from "mongoose";

import {
    createTarefa,
    deleteTarefa,
    findTarefasByUsuario,
    updateTarefa
} from "../models/tarefa.model.js";

function tarefaJson(tarefa: any) {
    return {
        id: tarefa.id,
        titulo: tarefa.titulo,
        desc: tarefa.desc,
        prazo: tarefa.prazo,
        finished: tarefa.finished
    };
}

export async function criarTarefa(req: Request, res: Response) {
    const { titulo, desc, prazo } = req.body;

    if (
        typeof titulo !== "string" ||
        titulo.trim() === "" ||
        typeof desc !== "string" ||
        desc.trim() === "" ||
        !prazo ||
        Number.isNaN(new Date(prazo).getTime())
    ) {
        return res.status(400).json({ err: "DADOS_INVALIDOS" });
    }

    const tarefa = await createTarefa(
        (req as any).userId,
        titulo.trim(),
        desc.trim(),
        new Date(prazo)
    );

    res.status(201).json(tarefaJson(tarefa));
}

export async function listarTarefas(req: Request, res: Response) {
    const tarefas = await findTarefasByUsuario(
        (req as any).userId
    );

    res.status(200).json(tarefas.map(tarefaJson));
}

export async function atualizarTarefa(req: Request, res: Response) {
    const id = req.params.id as string;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ err: "TAREFA_NOT_FOUND" });
    }

    const { titulo, desc, prazo, finished } = req.body;
    const dados: {
        titulo?: string;
        desc?: string;
        prazo?: Date;
        finished?: boolean;
    } = {};

    if (titulo !== undefined) {
        if (typeof titulo !== "string" || titulo.trim() === "") {
            return res.status(400).json({ err: "DADOS_INVALIDOS" });
        }
        dados.titulo = titulo.trim();
    }

    if (desc !== undefined) {
        if (typeof desc !== "string" || desc.trim() === "") {
            return res.status(400).json({ err: "DADOS_INVALIDOS" });
        }
        dados.desc = desc.trim();
    }

    if (prazo !== undefined) {
        const dataPrazo = new Date(prazo);
        if (Number.isNaN(dataPrazo.getTime())) {
            return res.status(400).json({ err: "DADOS_INVALIDOS" });
        }
        dados.prazo = dataPrazo;
    }

    if (finished !== undefined) {
        if (typeof finished !== "boolean") {
            return res.status(400).json({ err: "DADOS_INVALIDOS" });
        }
        dados.finished = finished;
    }

    if (Object.keys(dados).length === 0) {
        return res.status(400).json({ err: "DADOS_INVALIDOS" });
    }

    const tarefa = await updateTarefa(id, (req as any).userId, dados);

    if (!tarefa) {
        return res.status(404).json({ err: "TAREFA_NOT_FOUND" });
    }

    res.status(200).json(tarefaJson(tarefa));
}

export async function excluirTarefa(req: Request, res: Response) {
    const id = req.params.id as string;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({ err: "TAREFA_NOT_FOUND" });
    }

    const tarefa = await deleteTarefa(id, (req as any).userId);

    if (!tarefa) {
        return res.status(404).json({ err: "TAREFA_NOT_FOUND" });
    }

    res.sendStatus(204);
}
