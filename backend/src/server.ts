import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { User } from "./models/usuario.model.js";

dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🗣");
});

// Fazendo uma query simples
app.get("/tst", async (req, res) => {
  const usr = await User.find({ nome: "A" })
  res
    .status(200)
    .json(usr)
})


async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    
    app.listen(PORT, () => {
      console.log(`Servidor na porta ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();