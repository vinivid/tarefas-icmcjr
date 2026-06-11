import express from "express";
import cors from "cors";

import { authRouter } from "./routes/auth.route.js";
import { tarefaRouter } from "./routes/tarefa.route.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tarefas", tarefaRouter);

app.get("/", (req, res) => {
  res.send("🗣");
});
