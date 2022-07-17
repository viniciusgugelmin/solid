import express from "express";
import cors from "cors";
import { routes } from "./routes/routes";
import { errorHandler } from "./handlers/errorHandler";
import dotenv from "dotenv";

dotenv.config();

class Server {
  readonly app: express.Application = express();

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
    const port = process.env.PORT || 3333;
    const domain = process.env.DOMAIN;

    this.app.listen(port, () => {
      console.log(`Server is running on: ${domain}`);
    });
  }
}

const server = new Server();

export { Server, server };
