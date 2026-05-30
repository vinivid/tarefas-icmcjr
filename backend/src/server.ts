import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { findUsuarioByEmail } from "./models/usuario.model.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🗣");
});

// Fazendo uma query simples
app.get("/tst", async (req, res) => {
  const usr = await findUsuarioByEmail("a@g.c");
  res
    .status(200)
    .json(usr)
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor na porta ${PORT}`);
})
