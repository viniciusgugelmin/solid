import { Router } from "express";
import { userRouter } from "./user.routes";
import { systemRouter } from "./system.routes";

const routes = Router();

if (process.env.NODE_ENV !== "production") {
  routes.use("/", systemRouter);
}

routes.use("/users", userRouter);

export { routes };
