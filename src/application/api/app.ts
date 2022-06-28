import express from "express";
import cors from "cors";
import { index } from "./routes";

const app = express();
app.use(express.json());
app.use(cors());
app.use(index);

export { app };
