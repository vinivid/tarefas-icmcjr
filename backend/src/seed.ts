/// Arquivo que inicializa os schemas e insere alguns dados
/// para teste

import mongoose from "mongoose";
import dotenv from "dotenv";
import { createUsuario } from "./models/usuario.model.js";

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URL!);

  await createUsuario(
    "A",
    "2007-01-12",
    "a@g.c",
    "28069389028",
    "12345678"
  );

  await createUsuario(
    "B",
    "2003-02-3",
    "foxtrot@prt.com",
    "507.831.940-99",
    "12345678"
  );

  console.log("Mongo inicializado");

  await mongoose.disconnect();
}

seed();