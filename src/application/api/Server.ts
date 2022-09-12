import express from "express";
import cors from "cors";
import "express-async-errors";
import { emailQueue } from "../config/MessageBroker/Queues";
import { messageBroker } from "../config/MessageBroker";
import { routes } from "./routes";
import { errorHandler } from "./handlers";

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

  useExternalConfig() {
    messageBroker.init().then(() => {
      console.log("Message broker is running");

      messageBroker.getQueues([emailQueue]).then(() => {
        console.log("Queues are being listened");
      });
    });
  }

  useRoutes() {
    this.app.use("/", routes);
  }

  useHandlers() {
    this.app.use(errorHandler);
  }

  init() {
    this.app.listen(this.port, async () => {
      console.log(`Server is running on: ${this.domain}`);
      this.useExternalConfig();
    });
  }
}
