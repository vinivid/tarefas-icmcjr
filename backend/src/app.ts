import express from "express";
import cors from "cors";

import { authRouter } from "./routes/auth.route.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("🗣");
});