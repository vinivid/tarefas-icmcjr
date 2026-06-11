import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";

import { app } from "../../src/app.js";

let mongo: MongoMemoryServer;

const usuarioId = new mongoose.Types.ObjectId().toString();
const outroUsuarioId = new mongoose.Types.ObjectId().toString();

function token(userId = usuarioId) {
    return jwt.sign({ usr_id: userId }, process.env.JWT_SECRET!);
}

beforeAll(async () => {
    process.env.JWT_SECRET = "segredo-de-teste";
    mongo = await MongoMemoryServer.create();
    await mongoose.connect(mongo.getUri());
}, 300000);

afterEach(async () => {
    for (const collection of Object.values(mongoose.connection.collections)) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongoose.connection.close();
    if (mongo) await mongo.stop();
});

test("CRUD completo de tarefas", async () => {
    const criacao = await request(app)
        .post("/api/v1/tarefas")
        .set("Authorization", `Bearer ${token()}`)
        .send({
            titulo: "Estudar",
            desc: "Revisar o conteudo",
            prazo: "2026-06-20T14:00:00.000Z"
        });

    expect(criacao.status).toBe(201);
    expect(criacao.body).toMatchObject({
        titulo: "Estudar",
        desc: "Revisar o conteudo",
        finished: false
    });
    expect(criacao.body.id).toBeTypeOf("string");

    const listagem = await request(app)
        .get("/api/v1/tarefas")
        .set("Authorization", `Bearer ${token()}`);

    expect(listagem.status).toBe(200);
    expect(listagem.body).toHaveLength(1);
    expect(listagem.body[0].id).toBe(criacao.body.id);

    const atualizacao = await request(app)
        .put(`/api/v1/tarefas/${criacao.body.id}`)
        .set("Authorization", `Bearer ${token()}`)
        .send({ titulo: "Estudar TypeScript", finished: true });

    expect(atualizacao.status).toBe(200);
    expect(atualizacao.body).toMatchObject({
        id: criacao.body.id,
        titulo: "Estudar TypeScript",
        finished: true
    });

    const exclusao = await request(app)
        .delete(`/api/v1/tarefas/${criacao.body.id}`)
        .set("Authorization", `Bearer ${token()}`);

    expect(exclusao.status).toBe(204);

    const listaVazia = await request(app)
        .get("/api/v1/tarefas")
        .set("Authorization", `Bearer ${token()}`);

    expect(listaVazia.body).toEqual([]);
});

test("nao permite acessar ou alterar tarefas de outro usuario", async () => {
    const criacao = await request(app)
        .post("/api/v1/tarefas")
        .set("Authorization", `Bearer ${token()}`)
        .send({
            titulo: "Tarefa privada",
            desc: "Somente do proprietario",
            prazo: "2026-06-20T14:00:00.000Z"
        });

    const listaOutroUsuario = await request(app)
        .get("/api/v1/tarefas")
        .set("Authorization", `Bearer ${token(outroUsuarioId)}`);

    expect(listaOutroUsuario.status).toBe(200);
    expect(listaOutroUsuario.body).toEqual([]);

    const atualizacao = await request(app)
        .put(`/api/v1/tarefas/${criacao.body.id}`)
        .set("Authorization", `Bearer ${token(outroUsuarioId)}`)
        .send({ finished: true });

    expect(atualizacao.status).toBe(404);

    const exclusao = await request(app)
        .delete(`/api/v1/tarefas/${criacao.body.id}`)
        .set("Authorization", `Bearer ${token(outroUsuarioId)}`);

    expect(exclusao.status).toBe(404);
});

test("exige autenticacao nas rotas de tarefas", async () => {
    const resposta = await request(app).get("/api/v1/tarefas");
    expect(resposta.status).toBe(401);
});
