import mongoose from "mongoose";

export const usuarioSchema = new mongoose.Schema({
  nome: String,
  email: String
});

export const User = mongoose.model("User", usuarioSchema);