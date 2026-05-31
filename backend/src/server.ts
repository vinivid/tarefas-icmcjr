import mongoose from "mongoose";
import dotenv from "dotenv";

import { app } from "./app.js"

dotenv.config();
const PORT = process.env.PORT || 8080;

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