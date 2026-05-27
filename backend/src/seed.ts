/// Arquivo que inicializa os schemas e insere alguns dados
/// para teste

import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/usuario.model.js";

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URL!);

  await User.deleteMany({});

  await User.create([
    {
      nome: "A",
      email: "a@g.c"
    },
    {
      nome: "B",
      email: "b@g.c"
    }
  ]);

  console.log("Mongo iniciado");

  await mongoose.disconnect();
}

seed();