import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { User } from "./models/usuario.model.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🗣");
});

// Fazendo uma query simples
app.get("/tst", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL!);
  const usr = await User.find({ nome: "A" })
  res
    .status(200)
    .json(usr)
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor na porta ${PORT}`);
})
