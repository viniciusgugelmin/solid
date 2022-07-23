import express from "express";
import cors from "cors";
import { routes } from "./routes/routes";
import { errorHandler } from "./handlers/errorHandler";
import dotenv from "dotenv";

dotenv.config();

export class Server {
  readonly app: express.Application = express();
  readonly port = +process.env.PORT || 5000;
  readonly domain = process.env.DOMAIN || `http://localhost:${this.port}`;

  constructor() {
    this.useConfig();
    this.useRoutes();
    this.useHandlers();
  }

  useConfig() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  useRoutes() {
    this.app.use("/api", routes);
  }

  useHandlers() {
    this.app.use(errorHandler);
  }

  init() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on: ${this.domain}`);
    });
  }
}
