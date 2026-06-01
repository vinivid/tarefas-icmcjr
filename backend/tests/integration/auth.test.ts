import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

import { app } from "../../src/app.js";
import { createUsuario } from "../../src/models/usuario.model.js";

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
})

afterEach(async () => {
  const collections = mongoose.connection.collections;

  for (const col of Object.values(collections)) {
    await col.deleteMany({});
  }
})

afterAll(async () => {
  mongoose.connection.close();
  mongo.stop();
})

async function gerarUsr() {
  await createUsuario("Teste", "2000-06-06", "a@g.c", "96383923048", "12345678")
}

test("Registrar com dados corretos", async () => {
  const res = await request(app)
    .post("/api/auth/registrar")
    .send({
      nome: "Teste",
      dataNascimento: "2000-06-06",
      email: "a@g.c",
      cpf: "96383923048",
      senha: "12345678"
    });
  
  expect(res.status).toEqual(201);
})

test("Registrar com email conflitante", async () => {
  await gerarUsr();
  const res = await request(app)
    .post("/api/auth/registrar")
    .send({
      nome: "Teste",
      dataNascimento: "2000-06-06",
      email: "a@g.c",
      cpf: "96383923048",
      senha: "12345678"
    });
  
  expect(res.status).toEqual(409);
  expect(res.body).toEqual({err : "EMAIL_EXISTS"})
})

test("Registrar com cpf conflitante", async () => {
  await gerarUsr();
  const res = await request(app)
    .post("/api/auth/registrar")
    .send({
      nome: "Teste",
      dataNascimento: "2000-06-06",
      email: "a@gg.c",
      cpf: "96383923048",
      senha: "12345678"
    });
  
  expect(res.status).toEqual(409);
  expect(res.body).toEqual({err : "CPF_EXISTS"})
})

test("Login com email", async () => {
  await gerarUsr();
  const res = await request(app)
    .post("/api/auth/login/email")
    .send({
      email: "a@g.c",
      senha: "12345678"
    });
  
  expect(res.status).toEqual(200);
})

test("Login com email inexistente", async () => {
  await gerarUsr();
  const res = await request(app)
    .post("/api/auth/login/email")
    .send({
      email: "a@gg.c",
      senha: "12345678"
    });
  
  expect(res.status).toEqual(404);
})

test("Login com email porém senha errada", async () => {
  await gerarUsr();
  const res = await request(app)
    .post("/api/auth/login/email")
    .send({
      email: "a@g.c",
      senha: "123456789"
    });
  
  expect(res.status).toEqual(401);
})

test("Login com cpf", async () => {
  await gerarUsr();
  const res = await request(app)
    .post("/api/auth/login/cpf")
    .send({
      cpf: "96383923048",
      senha: "12345678"
    });
  
  expect(res.status).toEqual(200);
})

test("Login com cpf inexistente", async () => {
  await gerarUsr();
  const res = await request(app)
    .post("/api/auth/login/cpf")
    .send({
      cpf: "96383923038",
      senha: "12345678"
    });
  
  expect(res.status).toEqual(404);
})

test("Login com cpf porém senha errada", async () => {
  await gerarUsr();
  const res = await request(app)
    .post("/api/auth/login/cpf")
    .send({
      cpf: "96383923048",
      senha: "1234567891"
    });
  
  expect(res.status).toEqual(401);
})